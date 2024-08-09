import prisma from "../../config/prisma.js"

import supplierSchem from "./supplierSchem.js"

const supplierController={
    getAllSupplier:async (req,res,next)=>{
       try{
        const suppliers=await prisma.suppliers.findMany({
            include:{
                category: true,
            }
        })
        res.status(200).json({
            success:true,
            message:'load  suppliers',
            data:suppliers
        })

       }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error while feteching supplier"
        })
       }
    },
    getSingleSupplier:async (req,res,next)=>{
        try {
            const supplierId=parseInt(req.params.id,10)
            if(isNaN(supplierId)){
                return res.status(400).json({
                success: false,
                message: "invalid user id",
            });
            }
            const supplier=await prisma.suppliers.findUnique({
                where:{
                    id:+supplierId
                },
                include:{
                    supplierCategory:true,
                }
            })

            if(!supplier){
                return res.status(404).json({
                    success: false,
                    message: "supplier not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: supplier,
                });
        } catch (error) {
            console.log(error)
        return res.status(500).json({
            success:false,
            message:"error while feteching supplier"
        })
        }
    },
    createSupplier:async (req,res,next)=>{
        try {
            const requiredField=["email","fullName","country","city","phone","subCity","categoryId"]
            for(const field of requiredField){
                if(!req.body[field]){
                return res.status(403).json({
                    success: false,
                    message: `${field} is required`,
                    });
                }
            }

            const data=supplierSchem.createSupplier.parse(req.body);

            const isSupplierExist=await prisma.suppliers.findFirst({
                where:{
                    email:data.email,
                }
            })
            
            if (isSupplierExist) {
            return res.status(400).json({
                success: false,
                message: "this email is already registered",
            });
            }
            const isSupplierCategoryExist=await prisma.supplierCategory.findFirst({
                where:{
                    id:+data.categoryId,
                }
            })
            
            if (!isSupplierCategoryExist) {
            return res.status(400).json({
                success: false,
                message: "this supplier category is not exist",
            });
            }

            const newSupplier=await prisma.suppliers.create({
                data:{
                    email:data.email,
                    fullName:data.fullName,
                    phone:data.phone,
                    country:data.country,
                    city:data.city,
                    subCity:data.subCity,
                    categoryId:data.categoryId
                }
            })

            return res.status(200).json({
            success: true,
            message: "supplier created successfully",
            data: newSupplier,
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
              success: false,
              message: "error while creating supplier",
            }); 
        }
    },
    updateSupplier:async (req,res,next)=>{
        try {
            const supplierId = parseInt(req.params.id, 10);
            if (isNaN(supplierId)) {
              return res.status(400).json({
                success: false,
                message: "invalid supplier id",
              });
            }

            const data=supplierSchem.updateSupplier.parse(req.body)
            const isSupplierCategoryExist=await prisma.supplierCategory.findFirst({
                where:{
                    id:+data.categoryId,
                }
            })
            
            if (!isSupplierCategoryExist) {
            return res.status(400).json({
                success: false,
                message: "this supplier category is not exist",
            });
            }

            const isSupplierExist=await prisma.suppliers.findFirst({
                where:{
                    id:+supplierId,
                }
            })
            
            if (!isSupplierExist) {
            return res.status(400).json({
                success: false,
                message: "this supplier is not exist",
            });
            }


            const updatedSupplier = await prisma.suppliers.update({
              where: {
                id: +supplierId,
              },
              data:{
                categoryId:+data.categoryId,
                fullName:data.fullname,
                country:data.country,
                city:data.city,
                phone:data.phone,
              },
            });
            return res.status(200).json({
              success: true,
              message: "supplier updated successfully",
              data: updatedSupplier,
            });
          } catch (error) {
            if (error.code === "P2025") {
              return res.status(404).json({
                success: false,
                message: "supplier not found",
              });
            }
      
            console.error(error);
            return res.status(500).json({
              success: false,
              message: "error while updating supplier",
            });
          }
      
    },
    deleteSupplier:async (req,res,next)=>{
        try {
            const supplierId = parseInt(req.params.id, 10);
            if (isNaN(supplierId)) {
              return res.status(400).json({
                success: false,
                message: "invalid supplier id",
              });
            }


            const isSupplierExist=await prisma.suppliers.findFirst({
                where:{
                    id:+supplierId,
                }
            })
            
            if (!isSupplierExist) {
            return res.status(400).json({
                success: false,
                message: "this supplier is not exist",
            });
            }


            const deletedSupplier = await prisma.suppliers.delete({
              where: {
                id: +supplierId,
              },
            });
            return res.status(200).json({
              success: true,
              message: "supplier delete successfully",
              data: deletedSupplier,
            });
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: `error ${error}`,
            });
          } 
    },
}

export default supplierController;