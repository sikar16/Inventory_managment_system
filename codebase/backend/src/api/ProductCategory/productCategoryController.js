import prisma from "../../config/prisma.js";
import productCategorySchem from "./productCategorySchem.js";

const productCategoryController={
    getSigleproductCategory:async (req,res,next)=>{
        try {
            const productCategoryId=parseInt(req.params.id,10);
            if(isNaN(productCategoryId)){
                return res.status(400).json({
                    success:false,
                    message:"invalid product category id"
                })
            }

            const productCategory=await prisma.productCategory.findFirst({
                where:{
                    id:+productCategoryId,
                }
           
            })
            if(!productCategory){
                return res.status(404).json({
                    success: true,
                    message: "product category not found",
                })
            }
            return res.status(200).json({
                success: true,
                data: productCategory,
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error while fetching product category",
            });
        }
    },
    getAllproductCategory:async (req,res,next)=>{
        try {
            const productCategory=await prisma.productCategory.findMany({})
            return res.status(200).json({
                success:true,
                message:"fetch all product category",
                date:productCategory
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message: "Error while fetching product category",
            })
        }
        
    },
    creatproductCategory:async (req,res,next)=>{
        try {
            const requiredField=["name"]
            for(const field of requiredField){
                if(!req.body[field]){
                    return res.status(403).json({
                        success:false,
                        message:`${field} is required`
                    })
                }
            }

            const data=productCategorySchem.create.parse(req.body);
            const isproductategoryExist=await prisma.productCategory.findFirst({
                where:{
                    name:data.name
                }
            })
            if(isproductategoryExist){
                return res.status(400).json({
                    success:false,
                    message:"this product category is exist"
                })
            }

            const newProductCategory=await prisma.productCategory.create({
                data:{
                    name:data.name
                }
            })

            return res.status(200).json({
                success:false,
                message:"new product category created",
                data:newProductCategory
            })
            
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"error while creating product category"
            })
        }
    },
    updateproductCategory:async (req,res,next)=>{
        try {

            const productCategoryId=parseInt(req.params.id,10);
            if(isNaN(productCategoryId)){
                return res.status(400).json({
                    success:false,
                    message:"invalid product Category id "
                })
            }

            const updateproductCategory=await prisma.productCategory.update({
                where:{
                    id:+productCategoryId,
                },
                data:req.body
            })
            const data=productCategorySchem.update.parse(req.body)

            return res.status(200).json({
                success:true,
                message:"product category successfully updated",
                data:updateproductCategory
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"error while updating product category"
            })
        }
    },
    deleteproductCategory:async (req,res,next)=>{
        try {
            const productCategoryId=parseInt(req.params.id,10)
            if(isNaN(productCategoryId)){
                return res.status(400).json({
                    success:false,
                    message:"invalid product category id"
                })
            }
            const isproductCategoryExist=await prisma.productCategory.findFirst({
                where:{
                    id:+productCategoryId
                }
            })
            if (!isproductCategoryExist) {
                return res.status(400).json({
                    success: false,
                    message: "This product category is not exist",
                });
            }
            const deleteproductCategory=await prisma.productCategory.delete({
                where:{
                    id:+productCategoryId,
                }
            })

            return res.status(200).json({
                success:true,
                message:"product category deleted successfully" ,
                data:deleteproductCategory 
              })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while deleteing product category"            })
        }
    },
}

export default productCategoryController