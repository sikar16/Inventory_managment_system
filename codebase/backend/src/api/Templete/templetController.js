import prisma from "../../config/prisma.js";
import templeteSchem from "./templeteSchem.js";

const templateController={


    getSigletemplete:async (req,res,next)=>{
        try {
            const templeteId=parseInt(req.params.id,10);
            if(isNaN(templeteId)){
                return res.status(400).json({
                    success:false,
                    message:"invalid templete id"
                })
            }

            const templete=await prisma.template.findFirst({
                where:{
                 id:+templeteId,
                },
                include:{
                    attributes:true
                }
           
            })
            if(!templete){
                return res.status(404).json({
                    success: true,
                    message: "templete not found",
                })
            }
            return res.status(200).json({
                success: true,
                data: templete,
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error while fetching templete",
            });
        }
    },
    getAlltemplete:async (req,res,next)=>{
        try {
            const templete=await prisma.template.findMany({
                include:{
                 attributes:true
                }
            })
            return res.status(200).json({
                success:true,
                message:"fetch all templete",
                date:templete
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message: "Error while fetching templete",
            })
        }
        
    },
    creattemplete: async (req, res, next) => {
    try{
    const data=templeteSchem.create.parse(req.body)
        for(let i=0;i<req.body.attributes.length;i++){
            const isTemplateAttributeExist = await prisma.templateAttribute.findFirst({
                where: {
                  id: +data.items[i].templateAttributeId,
                },
              });
        
        if (!isTemplateAttributeExist) {
            return res.status(404).json({
              success: false,
              message: "Template attribute not found",
            });
          }
        }
       const newTemplate=await prisma.template.create({
        data:{
            name:data.name,
        }
       })

       for (let i = 0; i < req.body.attributes.length; i++) {
            const newtemplateAttribute=await prisma.templateAttribute.create({
                data:{
                    templateId:+newTemplate.id,
                    name:data.attributes[i].name,
                    dataType:data.attributes[i].dataType
                }
            })
       }

       const template=await prisma.template.findFirst({
        where:{
            id:+newTemplate.id
        },
        include:{
            templateAttribute:true
        }
       })
       return res.status(200).json({
        success: true,
        message: "template created successfully",
        data: template,
      });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `${error}`,
          });
    }
    },
    updatetemplete:async (req,res,next)=>{
        try {

            const templeteId=parseInt(req.params.id,10);
            if(isNaN(templeteId)){
                return res.status(400).json({
                    success:false,
                    message:"invalid templete id "
                })
            }
        const data=templeteSchem.update.parse(req.body)
            const istempleteexist=await prisma.template.findFirst({
                where:{
                    id:+templeteId
                }
            })

            if(!istempleteexist){
                return res.status(404).json({
                    success: false,
                    message: "template not found"
                });
            }


            const updatetemplete=await prisma.template.update({
                where:{
                    id:+templeteId,
                },
                data:{
                    name:data.name,
                    attributes:{
                        update:data.attributes?.map(attribute=>({
                            where: { id: attribute.id }, 
                                data: {
                                name: attribute.name,
                                dataType: attribute.dataType
                            }
                        })) 
                    }
                }
            })

            return res.status(200).json({
                success:true,
                message:"templete successfully updated",
                data:updatetemplete
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"error while updating templete"
            })
        }
    },
    deletetemplete: async (req, res, next) => {
        try {
            const templeteId = parseInt(req.params.id, 10);
            if (isNaN(templeteId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid template ID"
                });
            }
    
            const istempleteExist = await prisma.template.findFirst({
                where: {
                    id: templeteId
                }
            });
    
            if (!istempleteExist) {
                return res.status(404).json({
                    success: false,
                    message: "Template not found"
                });
            }
    
            await prisma.templateAttribute.deleteMany({
                where: {
                    templateId: templeteId
                }
            });
    
            const deletetemplete = await prisma.template.delete({
                where: {
                    id: templeteId,
                }
            });
    
            return res.status(200).json({
                success: true,
                message: "Template and its attributes deleted successfully",
                data: deletetemplete  
            });
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error while deleting template"
            });
        }
    },
    

}

export default templateController