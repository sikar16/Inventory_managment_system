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
              _count:true,
              totalPrice:true,
              items:{
                include:{
                  products:{
                    include:{
                      materialRequestItem:true
                    }
                  },
                  quantityToBePurchased:true,
                  remark:true,
                  unitPrice:true
                }
              }, 
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
            message: "Purchase request fetched successfully",
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
                _count:true,
                totalPrice:true,
                items:{
                  include:{
                    products:{
                      include:{
                        materialRequestItem:true
                      }
                    },
                    quantityToBePurchased:true,
                    remark:true,
                    unitPrice:true
                  }
                }, 
              }
              // include:{
              //   user:true,
              //   _count:true,
              //   items:{
              //     include:{
              //       products:{
              //         include:{
              //           materialRequestItem:{
              //             include:{
              //               product:{
              //                 include:{
              //                   productAttributes:true
              //                 }
              //               }
              //             }
              //           }
              //         }
              //       }
              //     }
              //   }
              // }  
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
        const requiredFields = ["totalPrice", "items"];
        for (const field of requiredFields) {
          if (!req.body[field]) {
            return res.status(400).json({
              success: false,
              message: `${field} is required`,
            });
          }
        }
    
        const data = purchasedReqSchema.create.parse(req.body);

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
            userId:+req.user.id,
            items: {
              create: data.items.map((item) => ({
                productId: +item.productId,
                quantityToBePurchased: item.quantityToBePurchased,
                remark: item.remark,
                unitPrice: item.unitPrice,
              })),
            },
          },
          include:{
            items:true,
          }
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

    // Check if the purceasedRequestedItem exists
        const isPurchsedReqItemsExist = await prisma.purceasedRequestedItem.findFirst({
          where: {
            id: +purceasedRequestItemId,
          },
        });
    
        if (!isPurchsedReqItemsExist) {
          return res.status(404).json({
            success: false,
            message: "Purchase request item not found",
          });
        }

        const ispurchaseReqExist=await prisma.purchasedRequest.findFirst({
          where:{
            id:+isPurchsedReqItemsExist.purchasedRequestId,
            userId:+req.user.id
          }
        })
        if(!ispurchaseReqExist){
          return res.status(404).json({
            success: false,
            message: "This purchased request is not found",
          });
        }



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
    
        // Update purchase request item
        const updatepurchasedReqItem = await prisma.purceasedRequestedItem.update({
          where: {
            id: +purceasedRequestItemId,
          },
          data: {
            productId: data.productId,
            remark: data.remark,
            quantityToBePurchased: data.quantityToBePurchased,
            unitPrice:data.unitPrice
          },
        });

        const diffrenceInPrice=(isPurchsedReqItemsExist.unitPrice * isPurchsedReqItemsExist.quantityToBePurchased) - (data.unitPrice * data.quantityToBePurchased)
        const newTotalPrice= ispurchaseReqExist.totalPrice + diffrenceInPrice

        const updatepurchasedReq=await prisma.purchasedRequest.update({
          where:{
            id:ispurchaseReqExist.id
          },
          data:{
            totalPrice:newTotalPrice
          },
          include:{
            items:true
          }
        })
    
        return res.status(200).json({
          success: true,
          message: "Successfully updated purchase request item",
          data: updatepurchasedReq,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
        });
      }
    },
    // updateFinace: async (req, res, next) => {
    //   try {
    //     const purceasedRequestId = parseInt(req.params.id, 10);
    //     if (isNaN(purceasedRequestId)) {
    //       return res.status(400).json({
    //         success: false,
    //         message: "Invalid purchase request  id",
    //       });
    //     }

      
    
    //     // Validate the request body
    //     const data = purchasedReqSchema.updateFinace.parse(req.body);

    // // Check if the purceasedRequestedItem exists
    //     const isPurchsedReqExist = await prisma.purchasedRequest.findFirst({
    //       where: {
    //         id: +purceasedRequestId,

    //       },
    //     });
    
    //     if (!isPurchsedReqExist) {
    //       return res.status(404).json({
    //         success: false,
    //         message: "Purchase request not found",
    //       });
    //     }

    //     // Check if the product exists
    //     const isFinanceExist = await prisma.users.findFirst({
    //       where: {
    //         id: +data.financeId,
    //         role:"FINANCE"
    //       },
    //     });
    
    //     if (!isFinanceExist) {
    //       return res.status(404).json({
    //         success: false,
    //         message: "finance not found",
    //       });
    //     }
    
        
    
    //     // Update purchase request item
    //     const updatepurchasedReq = await prisma.purchasedRequest.update({
    //       where: {
    //         id: +purceasedRequestId,
    //       },
    //       data: {
    //         userId:+data.financeId
    //       },
    //       include:{
    //         items:{
    //           include:{
    //             products:{
    //               include:{
    //                 materialRequestItem:{
    //                   include:{
    //                     productAttributes:true
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     });
    
    //     return res.status(200).json({
    //       success: true,
    //       message: "Successfully updated purchase request item",
    //       data: updatepurchasedReq,
    //     });
    //   } catch (error) {
    //     return res.status(500).json({
    //       success: false,
    //       message: `Error - ${error.message}`,
    //     });
    //   }
    // },
    // updateGm: async (req, res, next) => {
    //   try {
    //     const purceasedRequestId = parseInt(req.params.id, 10);
    //     if (isNaN(purceasedRequestId)) {
    //       return res.status(400).json({
    //         success: false,
    //         message: "Invalid purchase request  id",
    //       });
    //     }

    //     const requiredField = ["gmId"];
    //     for (const field of requiredField) {
    //       if (!req.body[field]) {
    //         return res.status(403).json({
    //           success: false,
    //           message: `${field} is required`,
    //         });
    //       }
    //     }
    
    //     // Validate the request body
    //     const data = purchasedReqSchema.updateGm.parse(req.body);

    // // Check if the purceasedRequestedItem exists
    //     const isPurchsedReqExist = await prisma.purchasedRequest.findFirst({
    //       where: {
    //         id:+purceasedRequestId

    //       },
    //     });
    
    //     if (!isPurchsedReqExist) {
    //       return res.status(404).json({
    //         success: false,
    //         message: "Purchase request not found",
    //       });
    //     }

    //     // Check if the product exists
    //     const isGmExist = await prisma.users.findFirst({
    //       where: {
    //         id: +data.gmid,
    //         role:"GENERAL_MANAGER"
    //       },
    //     });
    
    //     if (!isGmExist) {
    //       return res.status(404).json({
    //         success: false,
    //         message: "General manager not found",
    //       });
    //     }
    
        
    
    //     // Update purchase request item
    //     const updatepurchasedReq = await prisma.purchasedRequest.update({
    //       where: {
    //         id: +purceasedRequestId,
    //       },
    //       data: {
    //         userId:+data.gmid,
    //       },
    //       include:{
    //         items:{
    //           include:{
    //             products:{
    //               include:{
    //                 materialRequestItem:{
    //                   include:{
    //                     productAttributes:true
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     });
    
    //     return res.status(200).json({
    //       success: true,
    //       message: "Successfully updated purchase request item",
    //       data: updatepurchasedReq,
    //     });
    //   } catch (error) {
    //     return res.status(500).json({
    //       success: false,
    //       message: `Error - ${error.message}`,
    //     });
    //   }
    // },

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
        where: {
           id: purchaseReqId,
          userId:+req.user.id
         },
      });
      if (!ispurchaseReqExist) {
        return res.status(404).json({
          success: false,
          message: "purchase request not found",
        });
      }

      await prisma.purceasedRequestedItem.deleteMany({
        where: { purchasedRequestId: +purchaseReqId },
      });
     
        const deletedPurchaseReq = await prisma.purchasedRequest.delete({
        where: { id: +purchaseReqId },
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
    approvePurchasedRequestByFinance:async (req,res,next)=>{
      try {
        const purchasedReqId = parseInt(req.params.id, 10);
        if (isNaN(purchasedReqId)) {
          return res.status(400).json({
            success: false,
            message: "invalid purchased requiest id ",
          });
        }
      // zod validation
        const data = purchasedReqSchema.approvePurchasedReqFinace.parse(req.body);
        const isPurchasedReqExist = await prisma.purchasedRequest.findFirst({
          where: {
            id: +purchasedReqId, 
            // financeId: +req.user.id,
          },
        });
  
        if (!isPurchasedReqExist) {
          return res.status(404).json({
            success: false,
            message: "This purchased request is not found",
          });
        }
     
        // update
        const updatepurchasefRequiest = await prisma.purchasedRequest.update({
          where: {
            id: +purchasedReqId,
          },
          data: {
            isApproviedByFinance:data.isApproviedByFinance
          },
          include: {
            items: {
              include: {
                product: {
                  include: {
                    productAttributes: true,
                  },
                },
              },
            },
          },
        });
  
        return res.status(201).json({
          success: true,
          message: "purchased request approved successfully",
          data: updatepurchasefRequiest,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
        });
      }
    },
    approvePurchasedRequestByGM:async (req,res,next)=>{
      try {
        const purchasedReqId = parseInt(req.params.id, 10);
        if (isNaN(purchasedReqId)) {
          return res.status(400).json({
            success: false,
            message: "invalid purchased requiest id ",
          });
        }
    
        // zod validation
        const data = purchasedReqSchema.approvePurchasedReqGm.parse(req.body);
        const isPurchasedReqExist = await prisma.purchasedRequest.findFirst({
          where: {
            id: +purchasedReqId,
          },
        });
  
        if (!isPurchasedReqExist) {
          return res.status(404).json({
            success: false,
            message: "This purchased request is not found",
          });
        }
    
        // update
        const updatepurchasefRequiest = await prisma.purchasedRequest.update({
          where: {
            id: +purchasedReqId,
          },
          data: {
            isApproviedByGM:data.isApproviedByGM
          },
          include: {
            items: {
              include: {
                product: {
                  include: {
                    productAttributes: true,
                  },
                },
              },
            },
          },
        });
  
        return res.status(201).json({
          success: true,
          message: "purchased request approved successfully",
          data: updatepurchasefRequiest,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
        });
      }
    }



}


export default purchasedReqConntroller