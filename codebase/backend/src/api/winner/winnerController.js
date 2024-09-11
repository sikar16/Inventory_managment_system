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
    updatesupplier:(req,res,next)=>{
        try {
            const winnderId=parseInt(req.params.id,10)    
        if (isNaN(winnderId)) {
            return res.status(400).json({
            success: false,
            message: "invalid winnder id ",
            });
        }
        const requiredField=["supplayerId"]
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
    },
    updateitems:(req,res,next)=>{
        try {
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
    },
    deletewinner:(req,res,next)=>{
        try {
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
    }
}


export default winnerController