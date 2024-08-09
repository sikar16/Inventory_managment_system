import prisma from "../../config/prisma.js";
import departmentSchema from "./departmentSchem.js";

const departmentController = {
  getSingleDepartment: async (req, res, next) => {
    try {
      const departmentId = parseInt(req.params.id, 10);
      if (isNaN(departmentId)) {
        return res.status(400).json({
          success: false,
          message: "invalid department id",
        });
      }

      const department = await prisma.department.findFirst({
        where: {
          id: departmentId,
        },
      });

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "department not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: department,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while fetching single department",
      });
    }
  },

  getAllDepartments: async (req, res, next) => {
    try {
      const departments = await prisma.department.findMany({});

      return res.status(200).json({
        success: true,
        message: "fetching all departments",
        data: departments,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "error while fetching departments",
      });
    }
  },

  createDepartment: async (req, res, next) => {
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


      const data = departmentSchema.createDepartment.parse(req.body);
      const isdepartmentExist=await prisma.department.findFirst({
      where:{
      name:data.name
      }
   })
      if(isdepartmentExist){
        return res.status(400).json({
          success:false,
          message:"department is already exist "
      })
      }

      const newDepartment = await prisma.department.create({
        data: {
          name: data.name,
        },
      });

      return res.status(200).json({
        success: true,
        message: "department created successfully",
        data: newDepartment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:`creating error ${error}`,
      });
    }
  },

  updateDepartment: async (req, res, next) => {
    try {
      const departmentId = parseInt(req.params.id, 10);
      if (isNaN(departmentId)) {
        return res.status(400).json({
          success: false,
          message: "invalid department id",
        });
      }

      const data = departmentSchema.updateDepartment.parse(req.body);

      const updatedDepartment = await prisma.department.update({
        where: {
          id: departmentId,
        },
        data: {
          name: data.name,
        },
      });

      return res.status(200).json({
        success: true,
        message: "department updated successfully",
        data: updatedDepartment,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while updating department",
      });
    }
  },

  deleteDepartment: async (req, res, next) => {
    try {
      const departmentId = parseInt(req.params.id, 10);
      if (isNaN(departmentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid department id",
        });
      }

      const department = await prisma.department.findFirst({
        where: {
          id: departmentId,
        },
      });

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "department not found",
        });
      }

    const deleteDepartment=  await prisma.department.delete({
        where: {
          id: departmentId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Department deleted successfully",
        data:deleteDepartment
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while deleting department",
      });
    }
  },
};

export default departmentController;
