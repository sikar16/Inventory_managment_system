import prisma from "../../config/prisma.js";
import grnSchem from "./grnSchem.js";

const grnController = {
  getSingleGrn: async (req, res, next) => {
    try {
      const grnId = parseInt(req.params.id, 10);
      if (isNaN(grnId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid GRN ID",
        });
      }

      const grn = await prisma.gRN.findFirst({
        where: { id: grnId },
        include: {
          _count: true,
          supplayer: true,
          grnItem: true,
        },
      });

      if (!grn) {
        return res.status(404).json({
          success: false,
          message: "GRN not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "GRN fetched successfully",
        data: grn,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  getAllGrn: async (req, res, next) => {
    try {
      const grns = await prisma.gRN.findMany({
        include: {
          _count: true,
          supplayer: true,
          grnItem: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Fetched all GRNs",
        data: grns,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error}`,
      });
    }
  },

  createGrn: async (req, res, next) => {
    try {
      // Validate required fields
      const requiredFields = ["supplayerId", "purchasedOrderId", "grnItem"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }

      // Parse request body using your schema
      const data = grnSchem.create.parse(req.body);
      // console.log('Parsed data:', data);

      // Check if the supplier exists
      const isSupplayerExist = await prisma.suppliers.findFirst({
        where: { id: +data.supplayerId },
      });
      if (!isSupplayerExist) {
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }

      // Check if the purchased order exists
      const purchasedOrderExist = await prisma.purchasedOrder.findFirst({
        where: { id: +data.purchasedOrderId },
      });
      if (!purchasedOrderExist) {
        return res.status(400).json({
          success: false,
          message: "Purchased order not found",
        });
      }

      // Validate each GRN item
      for (const item of data.grnItem) {
        const isProductExist = await prisma.product.findFirst({
          where: { id: +item.productId },
        });
        if (!isProductExist) {
          return res.status(404).json({
            success: false,
            message: `Product with ID ${item.productId} not found`,
          });
        }
      }

      // Create the GRN
      const newGRN = await prisma.gRN.create({
        data: {
          reciverId: +req.user.id,
          supplayerId: +data.supplayerId,
          purchasedOrderId: +data.purchasedOrderId,
          grnItem: {
            create: data.grnItem.map((item) => ({
              productId: +item.productId,
              quantity: +item.quantity,
              remark: item.remark,
            })),
          },
        },
      });

      return res.status(201).json({
        success: true,
        message: "GRN created successfully",
        data: newGRN,
      });
    } catch (error) {
      console.error("Error creating GRN:", error);
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  updateGrnItems: async (req, res, next) => {
    try {
      const grnitemsId = parseInt(req.params.id, 10);
      if (isNaN(grnitemsId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid GRN items ID",
        });
      }

      const data = grnSchem.updateitems.parse(req.body);

      const isgrnItemsExists = await prisma.gRNItem.findFirst({
        where: { id: grnitemsId },
      });
      if (!isgrnItemsExists) {
        return res.status(404).json({
          success: false,
          message: "GRN items not found",
        });
      }

      const isGrnExist = await prisma.gRN.findFirst({
        where: {
          id: isgrnItemsExists.grnId,
          reciverId: req.user.id,
        },
      });

      if (!isGrnExist) {
        return res.status(404).json({
          success: false,
          message: "GRN  not found",
        });
      }

      const updatedGRNitems = await prisma.gRNItem.update({
        where: { id: grnitemsId },
        data: {
          productId: data.productId,
          quantity: data.quantity,
          remark: data.remark,
        },
      });

      return res.status(200).json({
        success: true,
        message: "GRN items updated successfully",
        data: updatedGRNitems,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error}`,
      });
    }
  },
  updateGrnsupplier: async (req, res, next) => {
    try {
      const grnId = parseInt(req.params.id, 10);
      if (isNaN(grnId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid GRN ID",
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

      const data = grnSchem.updateSupplier.parse(req.body);

      // Define the supplayerId variable correctly
      const { supplayerId } = data;

      // Check if the supplier exists
      const isSupplierExist = await prisma.suppliers.findFirst({
        where: {
          id: +supplayerId,
        },
      });
      if (!isSupplierExist) {
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }

      // Check if the GRN exists
      const isGrnExist = await prisma.gRN.findFirst({
        where: {
          id: grnId,
          reciverId: req.user.id,
        },
      });
      if (!isGrnExist) {
        return res.status(404).json({
          success: false,
          message: "GRN not found",
        });
      }

      // Update the GRN
      const updatedGRN = await prisma.gRN.update({
        where: {
          id: grnId,
        },
        data: {
          supplayerId: +supplayerId,
        },
        include: {
          supplayer: true,
          _count: true,
          purchasedOrder: true,
          grnItem: {
            include: {
              grn: {
                include: {
                  grnItem: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "GRN items updated successfully",
        data: updatedGRN,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  updateGrnPurchasedOrder: async (req, res, next) => {
    try {
      const grnId = parseInt(req.params.id, 10);
      if (isNaN(grnId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid GRN ID",
        });
      }

      const requiredField = ["purchasedOrderId"];
      for (const field of requiredField) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }

      const data = grnSchem.updatePurchasedOrder.parse(req.body);

      const isPurchasedOrderExist = await prisma.purchasedOrder.findFirst({
        where: { id: data.purchasedOrderId },
      });
      if (!isPurchasedOrderExist) {
        return res.status(404).json({
          success: false,
          message: "purchased order not found",
        });
      }

      const isGrnExist = await prisma.gRN.findFirst({
        where: {
          id: grnId,
          reciverId: req.user.id,
        },
      });

      if (!isGrnExist) {
        return res.status(404).json({
          success: false,
          message: "GRN  not found",
        });
      }

      const updatedGRN = await prisma.gRN.update({
        where: { id: grnId },
        data: {
          purchasedOrderId: data.purchasedOrderId,
        },
        include: {
          supplayer: true,
          _count: true,
          purchasedOrder: true,
          grnItem: {
            include: {
              grn: {
                include: {
                  grnItem: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "GRN items updated successfully",
        data: updatedGRN,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error}`,
      });
    }
  },

  deleteGrn: async (req, res, next) => {
    try {
      const grnId = parseInt(req.params.id, 10);
      if (isNaN(grnId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid GRN ID",
        });
      }

      const grnExists = await prisma.gRN.findFirst({
        where: { id: grnId },
      });
      if (!grnExists) {
        return res.status(404).json({
          success: false,
          message: "GRN not found",
        });
      }
      await prisma.gRNItem.deleteMany({
        where: { grnId: +grnId },
      });
      const deletedGRN = await prisma.gRN.delete({
        where: { id: grnId },
      });

      return res.status(200).json({
        success: true,
        message: "GRN deleted successfully",
        data: deletedGRN,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error}`,
      });
    }
  },
};

export default grnController;
