import prisma from "../../config/prisma.js"
import purchaseOrderSchema from "./purchaseOrderSchem.js";

const purchasedOrderController={
    getSinglePurchasedOrder:async (req,res,next)=>{
        try {
            const purchaseOrderId=parseInt(req.params.id, 10);
            if(isNaN(purchaseOrderId)){
                return res.status(400).json({
                    success: false,
                    message: "Invalid purchase order ID",
                  });
            }
            const purchaseOrder=await prisma.purchasedOrder.findFirst({
                where:{
                    id:purchaseOrderId
                },
                include:{
                    _count:true,
                    user:{
                        include:{
                            profile:true,
                        }
                    },
                    SupplayerOffer:true,
                    winner:{
                        include:{
                            supplayer:true,
                        }
                    },
                    items:{
                        include:{
                            purchasedRequest:{
                                include:{
                                    items:{
                                        include:{
                                            materialRequest:{
                                                include:{
                                                    purchasedOrderItem:{
                                                        include:{
                                                            products:{
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
                            }
                        }
                    }
                }
            })

            return res.status(200).json({
                success:true,
                message:`Fetch single purchased order ${purchaseOrderId}`,
                data:purchaseOrder
            })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:`Error-${error}`
            })
        }
    },
    getAllPurchasedOrder:async (req,res,next)=>{
        try {
            const purchaseOrder=await prisma.purchasedOrder.findMany({
                include:{
                    _count:true,
                    user:{
                        include:{
                            profile:true,
                        }
                    },
                    SupplayerOffer:true,
                    winner:{
                        include:{
                            supplayer:true,
                        }
                    },
                    items:{
                        include:{
                            purchasedRequest:{
                                include:{
                                    items:{
                                        include:{
                                            materialRequest:{
                                                include:{
                                                    purchasedOrderItem:{
                                                        include:{
                                                            products:{
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
                            }
                        }
                    }
                }
            })

            return res.status(200).json({
                success: true,
                message: "Fetched all purchase order",
                data: purchaseOrder,
              });
            
        } catch (error) {
           return res.status(500).json({
            success:false,
            message:`Error-${error}`
           }) 
        }
    },
    createPurchasedOrder:async (req,res,next)=>{
        try {
            const requiredFields = ["userId", "items"];
            for(const field of requiredFields){
                if(!req.body[field]){
                    return res.status(400).json({
                        success: false,
                        message: `${field} is required`,
                      });
                }
            }
            const data=purchaseOrderSchema.create.parse(req.body);

            const isUserExist=await prisma.users.findFirst({
                where: {
                    id: data.userId,
                  },
            })
            if (!isUserExist) {
                return res.status(404).json({
                  success: false,
                  message: "User not found",
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

              const newPurchaseOrder = await prisma.purchasedOrder.create({
                data: {
                  userId: data.userId,
                  items: {
                    create: data.items.map((item) => ({
                      productId: item.productId,
                      purchasOrderId: item.purchasOrderId,
                      quantityToBePurchased: item.quantityToBePurchased,
                      remark:item.remark
                    })),
                  },
                },
              });
              return res.status(201).json({
                success: true,
                message: "Purchase order created successfully",
                data: newPurchaseOrder,
              });
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:`Error-${error}`
            })
        }
    },
    updatePurchasedOrder:(req,res,next)=>{},
    deletePurchasedOrder:async (req,res,next)=>{
        try {
            const purchasedorderId=parseInt(req.params.id,10);
            if (isNaN(purchasedorderId)) {
                return res.status(400).json({
                  success: false,
                  message: "Invalid purchase order ID",
                });
              }

              const isPurchasedOrderExist=await prisma.purchasedOrder.findFirst({
                where:{
                    id:purchasedorderId
                }
              })
              if(!isPurchasedOrderExist){
                return res.status(404).json({
                    success:false,
                    message:"purchased order not found"
                })
              }

              await prisma.purceasedRequestedItem.deleteMany({
                where: { 
                    purchasedRequestId:purchasedorderId
                },
              })
        
              const deletedPurchaseOredr = await prisma.purchasedRequest.delete({
                where: { id: purchasedorderId },
              });
        
              return res.status(200).json({
                success: true,
                message: "Purchase order deleted successfully",
                data: deletedPurchaseOredr,
              });

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:`Error-${error}`
            })
        }
    }
}


export default purchasedOrderController;