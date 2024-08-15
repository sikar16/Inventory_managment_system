import prisma from "../../config/prisma.js"
import productSubCategorySchem from './productSubCategorySchem.js'
const productSubCategoryController={
    getSingleproductSubCategory:async (req,res,next)=>{
        try {
            const productSubCategoryId=parseInt(req.params.id,10)
            if(isNaN(productSubCategoryId)){
                return res.status(400).json({
                    success:false,
                    message:"invalid product SubCategory id"
                })
            }

            const productSubCategory=await prisma.productSubCategory.findFirst({
                where:{
                    id:+productSubCategoryId
                }
            })
            if(!productSubCategory){
                return res.status(404).json({
                    success:false,
                    message:"product SubCategory is not found"
                })
            }
            
            return res.status(200).json({
                success:true,
                data:productSubCategory
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"error while fetching product SubCategory"
            })
        }
    },
    getAllproductSubCategory:async (req,res,next)=>{
        try {

            const productSubCategory=await prisma.productSubCategory.findMany({})
            return res.status(200).json({
                success: true,
                message: "Fetching all product subCategory",
                data: productSubCategory,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"error while fetching product SubCategory"
            })
        }
    },
    createproductSubCategory:async (req,res,next)=>{
        try {
            console.log( req.body);
            const requiredField = ["name", "categoryId"];
            for (const field of requiredField) {
                if (!req.body[field]) {
                    return res.status(403).json({
                        success: false,
                        message: `${field} is required`
                    });
                }
            }
            const data = productSubCategorySchem.create.parse(req.body);
            console.log(data);

            const isproductSubCategoryExist = await prisma.productSubCategory.findFirst({
                where: {
                    name: data.name,
                    categoryId: data.categoryId
                }
            });
    
            if (isproductSubCategoryExist) {
                return res.status(400).json({
                    success: false,
                    message: "This sub category already exists"
                });
            }
    
            const newproductSubCategory = await prisma.productSubCategory.create({
                data: {
                    name: data.name,
                    categoryId: data.categoryId
                }
            });
    
            return res.status(200).json({
                success: true,
                message: "Product SubCategory successfully created",
                data: newproductSubCategory
            });
    
        }catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"error while creating product SubCategory"
            })
        }
    },
    updateproductSubCategory:async (req,res,next)=>{
        try {
            const productSubCategoryId=parseInt(req.params.id,10)
            if(isNaN(productSubCategoryId)){
                return res.status(400).json({
                    success:false,
                    message:"invalid product SubCategory id"
                })
            }

            const updatecategory=await prisma.productSubCategory.update({
                where:{
                    id:+productSubCategoryId
                },
                data:req.body
            })

            const data=productSubCategorySchem.create.parse(req.body)
            return res.status(200).json({
                success:true,
                message:"product SubCategory update successfully",
                data:updatecategory
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"error while updating product SubCategory"
            })
        }
    },
    deleteproductSubCategory:async (req,res,next)=>{
    try {
        const productSubCategoryId=parseInt(req.params.id,10)
        if(isNaN(productSubCategoryId)){
            return res.status(400).json({
                success:false,
                message:"invalid product SubCategory id"
            })
        }
        const isproductSubCategoryExist=await prisma.productSubCategory.findFirst({
            where:{
                id:+productSubCategoryId
            }
        })
        if (!isproductSubCategoryExist) {
            return res.status(400).json({
                success: false,
                message: "this product sub category is not exist",
            });
        }
        const deleteproductSubCategory=await prisma.productSubCategory.delete({
            where:{
                id:+productSubCategoryId
            }
        })
        return res.status(200).json({
            success: true,
            message: "produc subcategory deleted successfully",
            data: deleteproductSubCategory,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error while deleting product subcategory"
        })
    }        
        },
}
export default productSubCategoryController