import prisma from "../../config/prisma.js";
import productSchema from "./productSchem.js";

const productController={
    getSingleProduct:(req,res,next)=>{},
    getAllProduct:async (req,res,next)=>{
        try {
            const product=await prisma.product.findMany({
                include:{
                    productAttributes:{
                        include:{
                            templateAttribute:true
                        }
                    }
                }
            })

            return res.status(200).json({
                success:true,
                message:"fetching all product",
                data:product
            })

            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"error fetching all product"
            })
        }
    },
    createProduct:async (req,res,next)=>{
    try {
    const data=productSchema.create.parse(req.body) 

    const issubcategoyidExist=await prisma.productSubCategory.findFirst({
        where:{
            id:+data.subcategoryId
        }
    })

    if(!issubcategoyidExist){
        return res.status(404).json({
            success:false,
            message:"subcategory is not found"
        })
    }
    for(let i=0; i<req.body.items.length;i++){
        const istemplateattributExist=await prisma.templateAttribute.findFirst({
            where:{
                id:+data.items[i].templateAttributeId
            }
        })
    
        if(!istemplateattributExist){
            return res.status(404).json({
                success:false,
                message:"template is not found"
            })
        }
    }

    const newproduct=await prisma.product.create({
        data:{
            name:data.name,
            subcategoryId:+data.subcategoryId,
        }
    }) 



    for(let i=0; i<req.body.items.length;i++){
        const newProductAttribute=await prisma.productAttribute.create({
           data:{
            productId:+newproduct.id,
            templateAttributeId:data.items[i].templateAttributeId,
            value:data.items[i].value
           }
        })
    }
   const products=await prisma.product.findFirst({
    where:{
        id:+newproduct.id,
    },
    include:{
        productAttributes:{
            include:{
                templateAttribute:true,
            }
        }
    }
   })
   return res.status(200).json({
    success:true,
    message:"successfully create product",
    data:products
   })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"error creating product"
    })
   }
},
    updateProduct:async (req,res,next)=>{
        try {
        const data=productSchema.updateProduct.parse(req.body) 
        const productid=parseInt(req.params.id, 10)
        if(isNaN(productid)){
            return res.status(404).json({
                success:false,
                message:"invalid id"
            })
        }
        const isproductExist=await prisma.product.findFirst({
            where:{
                id:productid,
            }
        })

        if(!isproductExist){
            return res.status(404).json({
                success:false,
                message:"product not exist"
            })
        }

        const isproductsubcategoryExist=await prisma.productSubCategory.findFirst({
            where:{
                id:+data.subcategoryId
            }
        })

        if(!isproductsubcategoryExist){
            return res.status(404).json({
                success:false,
                message:"product subcategory not exist"
            })
        }

        const updateProduct=await prisma.product.update({
            where:{
                id:+productid,
                
            },
            data:{
                name:data.name,
                subcategoryId:+data.subcategoryId
            }
        })
        return res.status(200).json({
            success:true,
            message:"product updated successfully",
            data:updateProduct
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error while updating product"
        })   
    }

    },
    updateProductAttribute:async (req,res,next)=>{
        try {
        const data=productSchema.updateProductAttribute.parse(req.body) 
        const productattributeid=parseInt(req.params.id, 10)
        if(isNaN(productattributeid)){
            return res.status(404).json({
                success:false,
                message:"invalid id"
            })
        }
        const isproductAttributExist=await prisma.productAttribute.findFirst({
            where:{
                id:productattributeid,
            }
        })

        if(!isproductAttributExist){
            return res.status(404).json({
                success:false,
                message:"product attribute not found"
            })
        }
        const istemplateAttributExist=await prisma.templateAttribute.findFirst({
            where:{
                id:+data.templateAttributeId
            }
        })

        if(!istemplateAttributExist){
            return res.status(404).json({
                success:false,
                message:"template attribut not found"
            })
        }

        const updateProductAttribute=await prisma.productAttribute.update({
            where:{
                id:+productattributeid,
                
            },
            data:{
                value:data.value,
                templateAttributeId:+data.templateAttributeId
            }
        })
        return res.status(200).json({
            success:true,
            message:"product attribute updated successfully",
            data:updateProductAttribute
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error while update product attribute"
        }) 
    }
    },
    deleteProduct:(req,res,next)=>{},
}

export default productController