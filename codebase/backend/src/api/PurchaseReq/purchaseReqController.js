import prisma from "../../config/prisma.js";
import purchasedReqSchema from "./purchaseReqSchem.js";

const purchasedReqConntroller={
    getSinglepurchasedReq: async (req, res, next) => {
        try {
          const purchasedReqId = parseInt(req.params.id, 10);
          if (isNaN(purchasedReqId)) {
            return res.status(400).json({
              success: false,
              message: "Invalid purchase request ID",
            });
          }
          const purchasedReq = await prisma.purchasedRequest.findFirst({
            where: {
              id: +purchasedReqId,
            },
            include:{
              user:true,
              _count:true,
              items:{
                include:{
                  _count:true,
                  products:{
                    include:{
                      materialRequestItem:{
                        include:{
                          product:{
                            include:{
                              productAttributes:true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }  
          });
      
          if (!purchasedReq) {
            return res.status(404).json({
              success: false,
              message: "Purchase request not found",
            });
          }
      
          return res.status(200).json({
            success: true,
            data: purchasedReq,
          });
      
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
          });
        }
      },
      
    getAllpurchasedReq:async (req,res,next)=>{
        try {
            const purchaseReq=await prisma.purchasedRequest.findMany({
              include:{
                user:true,
                _count:true,
                items:{
                  include:{
                    products:{
                      include:{
                        materialRequestItem:{
                          include:{
                            product:{
                              include:{
                                productAttributes:true
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }  
            });
            return res.status(200).json({
                success: true,
                message: "Fetched all purchase requests",
                data: purchaseReq,
              });
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:`Error -${error.message}`
            })
        }
    },


    createpurchasedReq: async (req, res, next) => {
      try {
        const requiredFields = ["userId", "totalPrice", "items"];
        for (const field of requiredFields) {
          if (!req.body[field]) {
            return res.status(400).json({
              success: false,
              message: `${field} is required`,
            });
          }
        }
    
        const data = purchasedReqSchema.create.parse(req.body);
    
        const isUserExist = await prisma.users.findFirst({
          where: {
            id: data.userId,
            role: "LOGESTIC_SUPERVISER",
          },
        });
        if (!isUserExist) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
    
        // Check if the material request exists
        const isMaterialReqExist = await prisma.materialRequest.findFirst({
          where: {
            id: data.materialReqId,
          },
        });
        if (!isMaterialReqExist) {
          return res.status(400).json({
            success: false,
            message: "Material request not found",
          });
        }
    
        // Loop through the items to validate each product
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
    
        // Create the purchase request
        const newPurchaseReq = await prisma.purchasedRequest.create({
          data: {
            totalPrice: data.totalPrice,
            userId: data.userId,
            items: {
              create: data.items.map((item) => ({
                productId: item.productId,
                purchasedRequestId: item.purchasedRequestId,
                quantityToBePurchased: item.quantityToBePurchased,
                remark: item.remark,
                unitPrice: item.unitPrice,
              })),
            },
          },
        });
    
        return res.status(201).json({
          success: true,
          message: "Purchase request created successfully",
          data: newPurchaseReq,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
        });
      }
    },
    
    updatepurchasedReqItem: async (req, res, next) => {
      try {
        const purceasedRequestItemId = parseInt(req.params.id, 10);
        if (isNaN(purceasedRequestItemId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid purchase request item id",
          });
        }
    
        // Validate the request body
        const data = purchasedReqSchema.updateItems.parse(req.body);
    
        // Check if the product exists
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
    
        // Check if the purceasedRequestedItem exists
        // const isRequestItemExist = await prisma.purceasedRequestedItem.findUnique({
        //   where: {
        //     id: +purceasedRequestItemId,
        //   },
        // });
    
        // if (!isRequestItemExist) {
        //   return res.status(404).json({
        //     success: false,
        //     message: "Purchase request item not found",
        //   });
        // }
    
        // Update purchase request item
        const updatepurchasedReqItem = await prisma.purceasedRequestedItem.update({
          where: {
            id: +purceasedRequestItemId,
          },
          data: {
            productId: data.productId,
            remark: data.remark,
            quantityToBePurchased: data.quantityToBePurchased,
          },
        });
    
        return res.status(200).json({
          success: true,
          message: "Successfully updated purchase request item",
          data: updatepurchasedReqItem,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
        });
      }
    },
    


    deletepurchasedReq:async (req,res,next)=>{
        try {
            const purchaseReqId = parseInt(req.params.id, 10);
      if (isNaN(purchaseReqId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid purchase request ID",
        });
      }

      const ispurchaseReqExist = await prisma.purchasedRequest.findFirst({
        where: { id: purchaseReqId },
      });
      if (!ispurchaseReqExist) {
        return res.status(404).json({
          success: false,
          message: "purchase request not found",
        });
      }

      await prisma.purceasedRequestedItem.deleteMany({
        where: { purchasedRequestId: purchaseReqId },
      });
     
        const deletedPurchaseReq = await prisma.purchasedRequest.delete({
        where: { id: purchaseReqId },
      });

      return res.status(200).json({
        success: true,
        message: "Purchase request deleted successfully",
        data: deletedPurchaseReq,
      });
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
    },
}


export default purchasedReqConntroller