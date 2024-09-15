import prisma from "../../config/prisma";
import winnerSchem from "./winnerSchem";

const winnerController={
    getSinglewinner:async (req,res,next)=>{
        try {
            const winnerId=parseInt(req.params.id, 10)
            if (isNaN(winnerId)) {
                return res.status(400).json({
                  success: false,
                  message: "Invalid winner ID",
                });
              }
              const winner=await prisma.winner.findFirst({
                where:{
                    id:winnerId
                },
                include:{
                    supplayer:true,
                }
            })
            return res.status(200).json({
                success: true,
                message: "Fetched single winner",
                data: winner,
              });

            
        } catch (error) {
                return res.status(500).json({
                    success: false,
                message: `error ${error}`,
              });
        }
    },
    getAllwinners:async (req,res,next)=>{
        try {
            const winner=await prisma.winner.findMany({
                include:{
                    supplayer:true,
                }
            })
            return res.status(200).json({
                success: true,
                message: "Fetched all winner",
                data: winner,
              });
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `error ${error}`,
              });
        }
    },
    createWinner:async (req,res,next)=>{
        try {
            const requiredField=["supplayerId","purchasedOrderId"]
            for (const field of requiredField) {
                if (!req.body[field]) {
                  return res.status(403).json({
                    success: false,
                    message: `${field} is required`,
                  });
                }
              }

              const data=winnerSchem.create.parse(req.body)
              const issupplierExist=await prisma.winner.findFirst({
                where:{
                    id:data.supplayerId
                }
              })
              if (!issupplierExist) {
                return res.status(400).json({
                  success: false,
                  message: "supplier not found",
                });
              }
              

              const purchasedOrderExist=await prisma.purchasedOrder.findFirst({
                where:{
                    id:data.purchasedOrderId
                }
              })
              if (!purchasedOrderExist) {
                return res.status(400).json({
                  success: false,
                  message: "purchased order not found",
                });
              }

              const newWinner=await prisma.winner.create({
                include:{
                    purchasedOrder:true,
                    supplayer:true
                },
                data:{
                    userId:req.user.id,
                    purchasedOrderId:data.purchasedOrderId,
                    supplayerId:data.supplayerId
                }
              })

              return res.status(201).json({
                success: true,
                message: "winner created successfully",
                data: newWinner,
              });
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
    },
    updatesupplier:async (req,res,next)=>{
        try {
            const winnerId=parseInt(req.params.id,10)    
        if (isNaN(winnerId)) {
            return res.status(400).json({
            success: false,
            message: "invalid winnder id ",
            });
        }
        const requiredField=["supplayerId"]
        for (const field of requiredField) {
            if (!req.body[field]) {
              return res.status(403).json({
                success: false,
                message: `${field} is required`,
              });
            }
          }

          const data=winnerSchem.updatesupplier.parse(req.body);
          const iswinnerExist=await prisma.winner.findFirst({
            where:{
                id:winnerId,
                user:req.user.id
            }
          })
          if (!iswinnerExist) {
            return res.status(404).json({
              success: false,
              message: "winner not found",
            });
          }

          const updatesupplier=await prisma.winner.update({
            where:{
                id:+winnerId
            },
            data:{
                supplayerId:+data.supplayerId
            }
          })
          return res.status(201).json({
            success: true,
            message: "winner created successfully",
            data: updatesupplier,
          });
          
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
    },
    updatepurchedOrder:async (req,res,next)=>{
        try {
            const winnerId=parseInt(req.params.id,10)    
        if (isNaN(winnerId)) {
            return res.status(400).json({
            success: false,
            message: "invalid winnder id ",
            });
        }
        const requiredField=["purchasedOrderId"]
        for (const field of requiredField) {
            if (!req.body[field]) {
              return res.status(403).json({
                success: false,
                message: `${field} is required`,
              });
            }
          }

          const data=winnerSchem.updatepurchasedorder.parse(req.body);
          const iswinnerExist=await prisma.winner.findFirst({
            where:{
                id:winnerId,
                user:req.user.id
            }
          })
          if (!iswinnerExist) {
            return res.status(404).json({
              success: false,
              message: "winner not found",
            });
          }

          
          const purchasedOrderExist=await prisma.purchasedOrder.findFirst({
            where:{
                id:data.purchasedOrderId
            }
          })
          if (!purchasedOrderExist) {
            return res.status(400).json({
              success: false,
              message: "purchased order not found",
            });
          }

          const updatepurchsedOrder=await prisma.winner.update({
            where:{
                id:+winnerId
            },
            data:{
                purchasedOrderId:+data.purchasedOrderId
            }
          })
          return res.status(201).json({
            success: true,
            message: "winner created successfully",
            data: updatepurchsedOrder,
          });
          
          
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
    },
    deletewinner:async (req,res,next)=>{
        try {
            const winnerId=parseInt(req.params.id,10)    
            if (isNaN(winnerId)) {
                return res.status(400).json({
                success: false,
                message: "invalid winnder id ",
                });
            }

            const iswinnerExist=await prisma.winner.findFirst({
                where:{
                    id:winnerId,
                    user:req.user.id
                }
              })
              if (!iswinnerExist) {
                return res.status(404).json({
                  success: false,
                  message: "winner not found",
                });
              }

              const deletewinner=await prisma.winner.delete({
                where:{
                    id:winnerId
                }
              });
              return res.status(200).json({
                success:true,
                message:"winner delete succesfully",
                data:deletewinner

              })
              

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
    }
}


export default winnerController