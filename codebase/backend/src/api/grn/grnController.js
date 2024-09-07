import prisma from "../../config/prisma.js";
import grnSchem from "./grnSchem.js";

const grnController={
    getSingleGrn:async (req,res,next)=>{
        try {
            const grnId = parseInt(req.params.id, 10);
      if (isNaN(grnId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid GRN ID",
        });
      }

      const grn=await prisma.gRN.findFirst({
        where:{
            id:grnId
        },
        include:{
            _count:true,
            supplayer:true,
            grnItem:{
                include:{
                    grn:{
                        include:{
                            purchasedOrder:true
                        }
                    }
                }
            }
        }
      })
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
    getAllGrn:async (req,res,next)=>{
        try {
         const grn=await prisma.gRN.findMany({
            include:{
                _count:true,
                supplayer:true,
                grnItem:{
                    include:{
                        grn:{
                            include:{
                                purchasedOrder:true
                            }
                        }
                    }
                }
            }
        })   
        return res.status(200).json({
            success: true,
            message: "Fetched all GRN",
            data: grn,
          });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
        
    },
    createGrn:async (req,res,next)=>{
        try {
            const requiredField=["reciverId","supplayerId","purchasedOrderId"]
            for (const field of requiredField) {
                if (!req.body[field]) {
                  return res.status(403).json({
                    success: false,
                    message: `${field} is required`,
                  });
                }
              }
              const data=grnSchem.create.parse(req.body);
              const isreciverExist = await prisma.users.findFirst({
                where: {
                  id:+data.reciverId,
                },
              });
              if (!isreciverExist) {
                return res.status(400).json({
                  success: false,
                  message: "User not found",
                });
              }

              const isupplayerExist = await prisma.users.findFirst({
                where: {
                  id: +data.supplayerId,
                },
              });
              if (!isupplayerExist) {
                return res.status(400).json({
                  success: false,
                  message: "supplaier not found",
                });
              }

              for (let index = 0; index < data.grnItem.length; index++) {
                const element = data.grnItem[index];
                const isProductExist=await prisma.product.findFirst({
                    where:{
                        id:element.productId,
                    }
                })
                if(!isProductExist){
                    return res.status(404).json({
                        success: false,
                        message: "Product not found",
                      });
                }
              }

              const newGRN=await prisma.gRN.create({
                data:{
                    reciverId:+data.reciverId,
                    supplayerId:+data.supplayerId,
                    purchasedOrder:+data.purchasedOrderId,
                    grnItem:{
                        create:data.grnItem.map((item)=>({
                            productId:+item.productId,
                            quantity:+item.quantity,
                            remark:item.remark
                        }))
                    }
                }
              })
              return res.status(201).json({
                success: true,
                message: "GRN created successfully",
                data: newGRN,
              });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });
        }
    },
    updateGrn:(req,res,next)=>{},
    deleteGrn:(req,res,next)=>{},
}

export default grnController