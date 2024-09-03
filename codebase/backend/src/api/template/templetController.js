import prisma from "../../config/prisma.js";
import templeteSchem from "./templeteSchem.js";

const templateController = {
  getSigletemplete: async (req, res, next) => {
    try {
      const templeteId = parseInt(req.params.id, 10);
      if (isNaN(templeteId)) {
        return res.status(400).json({
          success: false,
          message: "invalid templete id",
        });
      }

      const templete = await prisma.template.findFirst({
        where: {
          id: +templeteId,
        },
        include: {
          attributes: true,
          _count: true,
        },
      });
      if (!templete) {
        return res.status(404).json({
          success: true,
          message: "templete not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: templete,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error while fetching templete",
      });
    }
  },
  getAlltemplete: async (req, res, next) => {
    try {
      const skip = parseInt(req.query.skip) || 0;
      const take = parseInt(req.query.take) || 10;

      const templete = await prisma.template.findMany({
        take,
        skip,
        include: {
          // attributes: true,
          // _count: true,
          
        },
      });
      return res.status(200).json({
        success: true,
        message: "fetch all templete",
        date: templete,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error while fetching templete",
      });
    }
  },
  creattemplete: async (req, res, next) => {
    try {
      const data = templeteSchem.create.parse(req.body);
      // check template exist befor
      const isTemplateExist = await prisma.template.findFirst({
        where: {
          name: data.name,
        },
      });
      if (isTemplateExist) {
        return res.status(403).json({
          success: false,
          message: "template already exist",
        });
      }

      //create template
      const newTemplate = await prisma.template.create({
        data: {
          name: data.name,
        },
      });
      //   iterate and create template attribute
      for (let i = 0; i < data.attributes.length; i++) {
        const newtemplateAttribute = await prisma.templateAttribute.create({
          data: {
            templateId: +newTemplate.id,
            name: data.attributes[i].name,
            dataType: data.attributes[i].dataType,
          },
        });
      }

      const template = await prisma.template.findFirst({
        where: {
          id: +newTemplate.id,
        },
        include: {
          attributes: true,
          _count: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: "template created successfully",
        data: template,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `${error}`,
      });
    }
  },
  updatetemplete: async (req, res, next) => {
    try {
      const data = templeteSchem.updateTemplate.parse(req.body);
      const templateId = parseInt(req.params.id, 10);
      if (isNaN(templateId)) {
        return res.status(404).json({
          success: false,
          message: "Invalid template ID",
        });
      }

      const isTemplateExist = await prisma.template.findFirst({
        where: {
          id: +templateId,
        },
      });

      if (!isTemplateExist) {
        return res.status(404).json({
          success: false,
          message: "template not found",
        });
      }
      const isTemplateNameExist = await prisma.template.findFirst({
        where: {
          name: data.name,
        },
      });

      if (isTemplateNameExist) {
        return res.status(404).json({
          success: false,
          message: "template name is alewady in use found",
        });
      }
      const updateTemplate = await prisma.template.update({
        where: {
          id: +templateId,
        },
        data: {
          name: data.name,
        },
      });

      return res.status(200).json({
        success: true,
        message: "template updated successfully",
        data: updateTemplate,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while updating template",
      });
    }
  },
  updateTemplateAttribute: async (req, res, next) => {
    try {
      const data = templeteSchem.updateTemplateAttribute.parse(req.body);
      const templateAttributeId = parseInt(req.params.id, 10);
      if (isNaN(templateAttributeId)) {
        return res.status(404).json({
          success: false,
          message: "Invalid template attribute ID",
        });
      }

      const isTemplateAttributeExist = await prisma.templateAttribute.findFirst(
        {
          where: {
            id: +templateAttributeId,
          },
        }
      );

      if (!isTemplateAttributeExist) {
        return res.status(404).json({
          success: false,
          message: "template attribute not found",
        });
      }

      const updateTemplateAttribute = await prisma.templateAttribute.update({
        where: {
          id: +templateAttributeId,
        },
        data: {
          name: data.name,
          dataType: data.dataType,
        },
      });

      return res.status(200).json({
        success: true,
        message: "template attribute updated successfully",
        data: updateTemplateAttribute,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while updating product attribute",
      });
    }
  },
  deletetemplete: async (req, res, next) => {
    try {
      const templeteId = parseInt(req.params.id, 10);
      if (isNaN(templeteId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid template ID",
        });
      }

      const istempleteExist = await prisma.template.findFirst({
        where: {
          id: +templeteId,
        },
      });

      if (!istempleteExist) {
        return res.status(404).json({
          success: false,
          message: "Template not found",
        });
      }

      await prisma.templateAttribute.deleteMany({
        where: {
          templateId: templeteId,
        },
      });

      const deletetemplete = await prisma.template.delete({
        where: {
          id: +templeteId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Template and its attributes deleted successfully",
        data: deletetemplete,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error while deleting template",
      });
    }
  },
};

export default templateController;
