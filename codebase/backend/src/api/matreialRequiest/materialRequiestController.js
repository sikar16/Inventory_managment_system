import prisma from "../../config/prisma";
import materialRequiestSchem from "./materialRequiestSchem";

const materialRequiestController = {
  getSinglematerialRequiest: async (req, res, next) => {
    try {
      const materialReqId = parseInt(req.params.id, 10);
      if (isNaN(materialReqId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid material request ID",
        });
      }

      const materialReq = await prisma.materialRequest.findUnique({
        where: {
          id: materialReqId,
        },
        include: {
          _count: true,
          employee: {
            include: {
              profile: true,
            },
          },
          departmentHead: {
            include: {
              profile: true,
            },
          },
          logisticSupervisor: {
            include: {
              profile: true,
            },
          },
          items: {
            include: {
              products: {
                include: {
                  productAttributes: {
                    include: {
                      templateAttribute: {
                        include: {
                          template: {
                            include: {
                              attributes: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  subcategory: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!materialReq) {
        return res.status(404).json({
          success: false,
          message: "Material request not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Material request fetched successfully",
        data: materialReq,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  getAllMaterialRequests: async (req, res, next) => {
    try {
      const materialReqs = await prisma.materialRequest.findMany({
        include: {
          _count: true,
          employee: {
            include: {
              profile: true,
            },
          },
          departmentHead: {
            include: {
              profile: true,
            },
          },
          logisticSupervisor: {
            include: {
              profile: true,
            },
          },
          items: {
            include: {
              products: {
                include: {
                  productAttributes: {
                    include: {
                      templateAttribute: {
                        include: {
                          template: {
                            include: {
                              attributes: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  subcategory: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "Fetched all material requests",
        data: materialReqs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  createMaterialRequest: async (req, res, next) => {
    try {
      const requiredField = [
        "categoryId",
        "subCategoryid",
        "quantity",
        "desireDate",
        "remark",
      ];
      for (const field of requiredField) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }

      const data = materialRequiestSchem.create.parse(req.body);

      const isUserExist = await prisma.users.findFirst({
        where: {
          id: data.requesterId,
        },
      });
      if (!isUserExist) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      const isDepartmentHeadExist = await prisma.users.findFirst({
        where: {
          id: data.departmentHeadId,
        },
      });
      if (!isDepartmentHeadExist) {
        return res.status(400).json({
          success: false,
          message: "Department head not found",
        });
      }

      const isProductExist = await prisma.product.findFirst({
        where: {
          id: data.productId,
        },
        include: {
          productAttributes: {
            include: {
              templateAttribute: true,
            },
          },
        },
      });
      if (!isProductExist) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const isProductCategoryExist = await prisma.productCategory.findFirst({
        where: {
          id: +data.categoryId,
        },
      });
      if (!isProductCategoryExist) {
        return res.status(400).json({
          success: false,
          message: "Category does not exist",
        });
      }

      const isProductSubCategoryExist =
        await prisma.productSubCategory.findFirst({
          where: {
            name: data.name,
            categoryId: +data.categoryId,
          },
        });
      if (!isProductSubCategoryExist) {
        return res.status(400).json({
          success: false,
          message: "Subcategory does not exist",
        });
      }

      const newMaterialRequest = await prisma.materialRequest.create({
        data: {
          requesterId: data.requesterId,
          departmentHeadId: data.departmentHeadId,
          reason: data.reason,
          requestedDate: new Date(),
          items: {
            create: data.items.map((item) => ({
              productId: item.productId,
              quantityRequested: item.quantityRequested,
              remark: item.remark,
              attributes: {
                create: item.attributes.map((attr) => ({
                  templateAttributeId: attr.templateAttributeId,
                  value: attr.value,
                })),
              },
            })),
          },
        },
      });

      return res.status(201).json({
        success: true,
        message: "Material request created successfully",
        data: newMaterialRequest,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  updatematerialRequiest: async (req, res, next) => {
    try {
      const materialReqId = parseInt(req.params.id, 10);
      if (isNaN(materialReqId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid material request ID",
        });
      }

      const data = materialRequiestSchem.update.parse(req.body);

      const isMaterialReqExist = await prisma.materialRequest.findUnique({
        where: {
          id: materialReqId,
        },
      });
      if (!isMaterialReqExist) {
        return res.status(404).json({
          success: false,
          message: "Material request not found",
        });
      }

      const updatedMaterialReq = await prisma.materialRequest.update({
        where: {
          id: materialReqId,
        },
        data: {
          requesterId: data.requesterId,
          departmentHeadId: data.departmentHeadId,
          reason: data.reason,
          items: {
            deleteMany: {}, // Clear existing items
            create: data.items.map((item) => ({
              productId: item.productId,
              quantityRequested: item.quantityRequested,
              remark: item.remark,
              attributes: {
                create: item.attributes.map((attr) => ({
                  templateAttributeId: attr.templateAttributeId,
                  value: attr.value,
                })),
              },
            })),
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "Material request updated successfully",
        data: updatedMaterialReq,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  deletematerialRequiest: async (req, res, next) => {
    try {
      const materialReqId = parseInt(req.params.id, 10);
      if (isNaN(materialReqId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid material request ID",
        });
      }

      const isMaterialReqExist = await prisma.materialRequest.findUnique({
        where: {
          id: materialReqId,
        },
      });
      if (!isMaterialReqExist) {
        return res.status(404).json({
          success: false,
          message: "Material request not found",
        });
      }

      const deletedMaterialReq = await prisma.materialRequest.delete({
        where: {
          id: materialReqId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Material request deleted successfully",
        data: deletedMaterialReq,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },
};

export default materialRequiestController;
