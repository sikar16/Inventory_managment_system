import prisma from "../../config/prisma.js";
import supplierOfferSchem from "./supplierOfferSchem.js";

const supplierOfferController = {
  getSingleSupplierOffer: async (req, res, next) => {
    try {
      const supplierOfferId = parseInt(req.params.id, 10);
      if (isNaN(supplierOfferId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid supplier offer ID",
        });
      }

      const supplierOffer = await prisma.supplayerOffer.findFirst({
        where: { id: supplierOfferId },
        include: {
          _count:true,
          offerItem:true,
          purchasedOrder:true,
          supplayer:true
        }
      });

      if (!supplierOffer) {
        return res.status(404).json({
          success: false,
          message: "Supplier offer not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Supplier offer fetched successfully",
        data: supplierOffer,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  getAllSupplierOffers: async (req, res, next) => {
    try {
      const supplierOffers = await prisma.supplayerOffer.findMany({
        include: {
          _count:true,
          offerItem:true,
          purchasedOrder:true,
          supplayer:true
        }
      });

      return res.status(200).json({
        success: true,
        message: "Supplier offers fetched successfully",
        data: supplierOffers,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  createSupplierOffer: async (req, res, next) => {
    try {
      const requiredField = ["purchasedOrderId", "supplayerId","totalPrice","items"];
      for (const field of requiredField) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }
      const data = supplierOfferSchem.create.parse(req.body);

      const isSupplierExist = await prisma.suppliers.findFirst({
        where: { id: data.supplayerId }
      });

      if (!isSupplierExist) {
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }
      const isPurchasedOrderExist = await prisma.purchasedOrder.findFirst({
        where: { id: data.purchasedOrderId }
      });

      if (!isPurchasedOrderExist) {
        return res.status(404).json({
          success: false,
          message: "purchased order not found",
        });
      }

      for (const item of data.items) {
        const isProductExist = await prisma.product.findFirst({
          where: {
            id: item.productId,
          },
        });
        if (!isProductExist) {
          return res.status(404).json({
            success: false,
            message: `Product with id ${item.productId} not found`,
          });
        }
      }

      const newSupplierOffer = await prisma.supplayerOffer.create({
        include: {
          _count: true,
          supplayer: true,
          purchasedOrder:true,
          offerItem: {
            include: {
              products: {
                include: {
                  productAttributes: true
                }
              },
              supplayerOffer: true
            }
          }
        },
        data: {
          totalPrice: data.totalPrice,
          supplayerId: data.supplayerId,
          purchasedOrderId:data.purchasedOrderId,
          offerItem: {
            create: data.items.map(item => ({
              productId: +item.productId,
              quantity: +item.quantity,
              unitPrice: +item.unitPrice
            }))
          }
        }
      });

      return res.status(201).json({
        success: true,
        message: "Supplier offer created successfully",
        data: newSupplierOffer,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  updateSupplierOffer: async (req, res, next) => {
    try {
      const supplierOfferId = parseInt(req.params.id, 10);
      if (isNaN(supplierOfferId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid supplier offer ID",
        });
      }

      const requiredField = ["totalPrice"];
      for (const field of requiredField) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }
      const data = supplierOfferSchem.updateSupplierOffer.parse(req.body);

      const updatedSupplierOffer = await prisma.supplayerOffer.update({
        where: { id: supplierOfferId },
        data: { totalPrice: data.totalPrice }
      });

      return res.status(200).json({
        success: true,
        message: "Supplier offer updated successfully",
        data: updatedSupplierOffer,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },
  updateSupplier: async (req, res, next) => {
    try {
      const supplierOfferId = parseInt(req.params.id, 10);
      if (isNaN(supplierOfferId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid supplier offer ID",
        });
      }
      const requiredField = ["supplayerId"];
      for (const field of requiredField) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }
      const data = supplierOfferSchem.updateSupplier.parse(req.body);



      const updatedSupplier = await prisma.supplayerOffer.update({
       where:{
        id:supplierOfferId
       },
       data:{
        supplayerId:data.supplayerId
       }
      });

      return res.status(200).json({
        success: true,
        message: "updated successfully",
        data: updatedSupplier,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  updateSupplierOfferItems: async (req, res, next) => {
    try {
      const supplierOfferItemId = parseInt(req.params.id, 10);
      if (isNaN(supplierOfferItemId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid supplier offer ID",
        });
      }

      const data = supplierOfferSchem.updateSupplierOfferItems.parse(req.body);

      const isProductExist = await prisma.product.findFirst({
        where: {
          id: +data.productId,
        },
      });
  
      if (!isProductExist) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      const isSupplierOfferItemsExist = await prisma.offerItem.findFirst({
        where: {
          id: +supplierOfferItemId,
        },
      });

      if (!isSupplierOfferItemsExist) {
        return res.status(404).json({
          success: false,
          message: "This supplier offer item is not found",
        });
      }

      const isSupplierOfferExist = await prisma.supplayerOffer.findFirst({
              where: {
                id: isSupplierOfferItemsExist.supplayerOfferId,
              },
              include: {
                _count: true,
                supplayer: true,
                purchasedOrder:true,
                offerItem: {
                  include: {
                    products: {
                      include: {
                        productAttributes: true
                      }
                    },
                    supplayerOffer: true
                  }
                }
              },
            });

            if (!isSupplierOfferExist) {
              return res.status(404).json({
                success: false,
                message: "This supplier offer is not found",
              });
            }

            const diffrenceInPrice=(isSupplierOfferItemsExist.unitPrice * isSupplierOfferItemsExist.quantity) - (data.unitPrice * data.quantity)
            const newTotalPrice= isSupplierOfferExist.totalPrice + diffrenceInPrice

    
      const updatedSupplierOfferItem = await prisma.offerItem.update({
        where: {
          id: +supplierOfferItemId,
          },
              data: {
                quantity: data.quantity,
                unitPrice: data.unitPrice,
                productId: data.productId
              }
      });

        const updatedSupplierOffer = await prisma.supplayerOffer.update({
        where: {
          id: isSupplierOfferItemsExist.supplayerOfferId,
        },
              data: {
               totalPrice:newTotalPrice
              },
              include:{
                offerItem:true
              }
      });

      return res.status(200).json({
        success: true,
        message: "Supplier offer items updated successfully",
        data: updatedSupplierOffer,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  deleteSupplierOffer: async (req, res, next) => {
    try {
      const supplierOfferId = parseInt(req.params.id, 10);
      if (isNaN(supplierOfferId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid supplier offer ID",
        });
      }
      const isSupplierOfferExist = await prisma.supplayerOffer.findFirst({
        where: {
          id: +supplierOfferId,

        },
      });

      if (!isSupplierOfferExist) {
        return res.status(404).json({
          success: false,
          message: "This supplier is not found",
        });
      }
      await prisma.offerItem.deleteMany({
        where: { supplayerOfferId: +supplierOfferId },
      });

      const deletedSupplierOffer = await prisma.supplayerOffer.delete({
        where: { id: supplierOfferId }
      });

      return res.status(200).json({
        success: true,
        message: "Supplier offer deleted successfully",
        data: deletedSupplierOffer,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  }
};

export default supplierOfferController;
