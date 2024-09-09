import prisma from "../../config/prisma.js";
import materialRequiestSchem from "./materialRequiestSchem.js";

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
      const materialReq = await prisma.materialRequest.findFirst({
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
              department: true,
            },
          },
          items: {
            include: {
              _count: true,
              product: {
                include: {
                  productAttributes: true,
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
              department: true,
            },
          },
          items: {
            include: {
              _count: true,
              product: {
                include: {
                  productAttributes: true,
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
      const requiredField = ["departmentHeadId", "items"];
      for (const field of requiredField) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }
      // zod validation
      const data = materialRequiestSchem.create.parse(req.body);
      const isDepartmentHeadExist = await prisma.users.findFirst({
        where: {
          id: +data.departmentHeadId,
          role: "DEPARTMENT_HEAD",
        },
      });
      if (!isDepartmentHeadExist) {
        return res.status(400).json({
          success: false,
          message: "Department head not found",
        });
      }
      // product exist
      for (let index = 0; index < data.items.length; index++) {
        const item = data.items[index];
        const isProductExist = await prisma.product.findFirst({
          where: {
            id: +item.productId,
          },
        });
        if (!isProductExist) {
          return res.status(404).json({
            success: false,
            message: "Product not found",
          });
        }
      }
      // create

      const newMaterialRequest = await prisma.materialRequest.create({
        include: {
          items: {
            include: {
              product: {
                include: {
                  productAttributes: true,
                },
              },
            },
          },
        },
        data: {
          departmentHeadId: +data.departmentHeadId,
          requesterId: +req.user.id,
          items: {
            create: data.items.map((item) => ({
              productId: +item.productId,
              quantityRequested: +item.quantityRequested,
              remark: item.remark,
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

  updatedDepartmentHead: async (req, res, next) => {
    try {
      const materialReqId = parseInt(req.params.id, 10);

      if (isNaN(materialReqId)) {
        return res.status(400).json({
          success: false,
          message: "invalid material requiest id ",
        });
      }

      const requiredField = ["departmentHeadId"];
      for (const field of requiredField) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }

      const data = materialRequiestSchem.updateDepartmentHead.parse(req.body);
      const isMaterialReqExist = await prisma.materialRequest.findFirst({
        where: {
          id: +materialReqId,
          requesterId: +req.user.id,
        },
      });

      if (!isMaterialReqExist) {
        return res.status(404).json({
          success: false,
          message: "This materail request is not found",
        });
      }

      const isDepartmentHeadExist = await prisma.users.findFirst({
        where: {
          id: +data.departmentHeadId,
          role: "DEPARTMENT_HEAD",
        },
      });
      if (!isDepartmentHeadExist) {
        return res.status(400).json({
          success: false,
          message: "Department head not found",
        });
      }
      const updatematerialRequiest = await prisma.materialRequest.update({
        where: {
          id: +materialReqId,
        },
        data: {
          departmentHeadId: +data.departmentHeadId,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  productAttributes: true,
                },
              },
            },
          },
        },
      });
      return res.status(200).json({
        success: true,
        message: "updated successfully",
        data: updatematerialRequiest,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error.message}`,
      });
    }
  },

  updatematerialRequiestItem: async (req, res, next) => {
    try {
      const materialReqItemId = parseInt(req.params.id, 10);
      if (isNaN(materialReqItemId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid material request item  ID",
        });
      }
      const data = materialRequiestSchem.updateMeterialReqItem.parse(req.body);
      const isMaterialReqItemExist = await prisma.materialRequestItem.findFirst(
        {
          where: {
            id: +materialReqItemId,
          },
        }
      );
      if (!isMaterialReqItemExist) {
        return res.status(404).json({
          success: false,
          message: "Material Req Item  not found",
        });
      }
      const isMaterialReqExist = await prisma.materialRequest.findFirst({
        where: {
          id: +isMaterialReqItemExist.materialRequestId,
          requesterId: +req.user.id,

        },
      });

      if (!isMaterialReqExist) {
        return res.status(404).json({
          success: false,
          message: "This materail request is not found",
        });
      }

      const isProductExist = await prisma.product.findFirst({
        where: {
          id: +data.productId,
        },
      });
      if (!isProductExist) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const updatematerialRequiestItem =
        await prisma.materialRequestItem.update({
          where: {
            id: +materialReqItemId,
          },
          data: {
            productId: +data.productId,
            remark: data.remark,
            quantityRequested: data.quantityRequested,
          },
        });

      return res.status(200).json({
        success: true,
        message: "successfully update material request item",
        data: updatematerialRequiestItem,
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

      const isMaterialReqExist = await prisma.materialRequest.findFirst({
        where: { id: +materialReqId, requesterId: +req.user.id },
      });
      if (!isMaterialReqExist) {
        return res.status(404).json({
          success: false,
          message: "Material request not found",
        });
      }

      await prisma.materialRequestItem.deleteMany({
        where: { materialRequestId: +materialReqId },
      });

      const deletedMaterialReq = await prisma.materialRequest.delete({
        where: { id: +materialReqId },
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

  approveMaterialRequiest: async (req, res, next) => {
    try {
      const materialReqId = parseInt(req.params.id, 10);
      if (isNaN(materialReqId)) {
        return res.status(400).json({
          success: false,
          message: "invalid material requiest id ",
        });
      }
      const requiredField = ["logisticSuperViserId", "isApproviedByDH"];
      for (const field of requiredField) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }
      // zod validation
      const data = materialRequiestSchem.approveMeterialReqItem.parse(req.body);
      const isMaterialReqExist = await prisma.materialRequest.findFirst({
        where: {
          id: +materialReqId,
          departmentHeadId: +req.user.id,
        },
      });

      if (!isMaterialReqExist) {
        return res.status(404).json({
          success: false,
          message: "This materail request is not found",
        });
      }
      // check if the logestic supervisor
      const isLogesticSuperviserExist = await prisma.users.findFirst({
        where: {
          id: +data.logisticSuperViserId,
          role: "LOGESTIC_SUPERVISER",
        },
      });
      if (!isLogesticSuperviserExist) {
        return res.status(400).json({
          success: false,
          message: "LOGESTIC_SUPERVISER not found",
        });
      }
      // update
      const updatematerialRequiest = await prisma.materialRequest.update({
        where: {
          id: +materialReqId,
        },
        data: {
          logisticSuperViserId: data.logisticSuperViserId,
          isApproviedByDH: data.isApproviedByDH,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  productAttributes: true,
                },
              },
            },
          },
        },
      });

      return res.status(201).json({
        success: true,
        message: "Material request approved successfully",
        data: updatematerialRequiest,
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
