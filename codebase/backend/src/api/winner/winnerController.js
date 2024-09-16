import prisma from "../../config/prisma.js";
import winnerSchem from "./winnerSchem.js";

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
              if (issupplierExist) {
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
    updatesupplier: async (req, res, next) => {
      try {
          const winnerId = parseInt(req.params.id, 10);
          if (isNaN(winnerId)) {
              return res.status(400).json({
                  success: false,
                  message: "Invalid winner ID",
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
  
          const data = winnerSchem.updatesupplier.parse(req.body);
  
          // Use correct filter syntax for related fields
          const isWinnerExist = await prisma.winner.findFirst({
              where: {
                  id: winnerId,
                  user: { id: req.user.id } // Correct syntax for filtering by related field
              }
          });
  
          if (!isWinnerExist) {
              return res.status(404).json({
                  success: false,
                  message: "Winner not found",
              });
          }
  
          // Update the winner record
          const updatedSupplier = await prisma.winner.update({
              where: {
                  id: winnerId
              },
              data: {
                  supplayerId: +data.supplayerId
              }
          });
  
          return res.status(200).json({
              success: true,
              message: "Winner updated successfully",
              data: updatedSupplier,
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              message: `Error - ${error.message}`,
          });
      }
  }
  ,
  updatepurchasedOrder: async (req, res, next) => {
    try {
        const winnerId = parseInt(req.params.id, 10);
        if (isNaN(winnerId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid winner ID",
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

        const data = winnerSchem.updatepurchasedorder.parse(req.body);

        // Use correct filter syntax for related fields
        const isWinnerExist = await prisma.winner.findFirst({
            where: {
                id: winnerId,
                user: { id: req.user.id } // Correct syntax for filtering by related field
            }
        });

        if (!isWinnerExist) {
            return res.status(404).json({
                success: false,
                message: "Winner not found",
            });
        }

        const purchasedOrderExist = await prisma.purchasedOrder.findFirst({
            where: {
                id: data.purchasedOrderId
            }
        });

        if (!purchasedOrderExist) {
            return res.status(400).json({
                success: false,
                message: "Purchased order not found",
            });
        }

        // Update the winner record
        const updatedWinner = await prisma.winner.update({
            where: {
                id: winnerId
            },
            data: {
                purchasedOrderId: data.purchasedOrderId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Winner updated successfully",
            data: updatedWinner,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
},
deletewinner: async (req, res, next) => {
  try {
      const winnerId = parseInt(req.params.id, 10);
      if (isNaN(winnerId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid winner ID",
          });
      }

      const isWinnerExist = await prisma.winner.findFirst({
          where: {
              id: winnerId,
              user: { id: req.user.id } // Correct filter for related user
          }
      });

      if (!isWinnerExist) {
          return res.status(404).json({
              success: false,
              message: "Winner not found",
          });
      }

      const deletedWinner = await prisma.winner.delete({
          where: {
              id: winnerId
          }
      });

      return res.status(200).json({
          success: true,
          message: "Winner deleted successfully",
          data: deletedWinner
      });

  } catch (error) {
      return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
      });
  }
}

}


export default winnerController