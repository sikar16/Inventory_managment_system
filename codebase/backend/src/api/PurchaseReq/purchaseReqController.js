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
      
          const purchasedReq = await prisma.purchasedRequest.findUnique({
            where: {
              id: purchasedReqId,
            },
            include: { 
              _count: true,
              user: {
                include: {
                  profile: true,
                },
              },
              items: {
                include: {
                  products: {
                    include: {
                      subcategory: {
                        include: {
                          category: true,
                        },
                      },
                    },
                  },
                },
              },
            },
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
                    _count: true,
                    user:{
                        include:{
                            profile:true
                        }
                    },
                    items:{
                        include:{
                            products:{
                                include:{
                                    subcategory:{
                                        include:{
                                            category:true 
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
                message: "Fetched all material requests",
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
            const requiredFields = ["productId", "purchasedReqId", "totalPrice", "unitPrice", "quantityToBePurchased"];
            for (const field of requiredFields) {
                if (!req.body[field]) {
                    return res.status(400).json({
                        success: false,
                        message: `${field} is required`,
                    });
                }
            }
    
            if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "items array is required and should not be empty",
                });
            }
    
            const data = purchasedReqSchema.create.parse(req.body);
            const isUserExist = await prisma.users.findUnique({
                where: {
                    id: data.userId,
                },
            });
            if (!isUserExist) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
    
            const isProductExist = await prisma.product.findUnique({
                where: {
                    id: data.productId,
                },
                include: {
                    productAttributes: {
                        include: {
                            templateAttribute: true,
                        },
                    },
                },
            });
            if (!isProductExist) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
                const newPurchaseReq = await prisma.purchasedRequest.create({
                data: {
                    totalPrice: data.totalPrice,
                    userId: data.userId,
                    purchasedReqId: data.purchasedReqId,
                    items: {
                        create: data.items.map(item => ({
                            remark: item.remark,
                            unitPrice: item.unitPrice,
                            quantityToBePurchased: item.quantityToBePurchased,
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
    
    
    updatepurchasedReq:(req,res,next)=>{},
    deletepurchasedReq:async (req,res,next)=>{
        try {
            const purchaseReqId = parseInt(req.params.id, 10);
      if (isNaN(purchaseReqId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid purchase request ID",
        });
      }

      const ispurchaseReqExist = await prisma.purchasedRequest.findUnique({
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