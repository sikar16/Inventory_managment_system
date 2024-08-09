import userSchema from "./userSchem.js";
import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js"
import jwt from "jsonwebtoken"
import {SECRET} from '../../config/secret.js'
const userController = {
  getSingleUser: async (req, res, next) => {
     try {
      const userId = parseInt(req.params.id, 10);

      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: "invalid user id",
        });
      }
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
        include:{
            profile:true,
            department:true,
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while fetching single user",
      });
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const take=req.query.take || 10
      const skip=req.query.skip || 0
      const users = await prisma.users.findMany({
        take:+take,
        skip:+skip,
        include:{
            profile:true
        }
      });
      return res.status(200).json({
        success: true,
        message: "fetching all users",
        data: users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `${error}`,
      });
    }
  },

  createUser: async (req, res, next) => {
    try {
     

      const data = userSchema.register.parse(req.body);

      const isUserExist = await prisma.users.findFirst({
        where: {
          email: data.email,
          
        },
      });

      if (isUserExist) {
        return res.status(400).json({
          success: false,
          message: "this email is already registered",
        });
      }
      const isPhoneExist = await prisma.profile.findFirst({
        where: {
          phone: data.phone,
          
        },
      });

      if (isPhoneExist) {
        return res.status(400).json({
          success: false,
          message: "this phone is already registered",
        });
      }

      const hashedPassword = await bcrypt.hashSync(data.password, 10);
      const newUser = await prisma.users.create({
        data: {
          activeStatus:"Active",
          email:data.email,
          role:data.role,
          password:{
            create:{
              password:data.password
            }
          },
         departmentId:data.departmentId,
         profile:{
          create:{
            firstName:data.firstName,
            lastName:data.lastName,
            middleName:data.middleName,
            gender:data.gender,
            phone:data.phone,
          }
         }
        },
      });
      const registeredUser=await prisma.users.findFirst({
        where:{
          id:newUser.id
        },
        include:{
          profile:true,
          department:true,
        }
      })
      return res.status(200).json({
        success: true,
        message: "user created successfully",
        data: registeredUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `${error}`,
      });
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: "invalid user id",
        });
      }
      const updatedUser = await prisma.users.update({
        where: {
          id: userId,
        },
        data: req.body,
      });
      return res.status(200).json({
        success: true,
        message: "user updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while updating user",
      });
    }
  },

  login: async (req, res, next) => {
    try {
      const data = userSchema.login.parse(req.body);
      const user = await prisma.users.findFirst({
        where: {
          email: data.email,
        },
        include:{
          profile:true,
          role:true
        }
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "no account in this email address",
        });
      }
      if (user.activeStatus !== "ACTIVE") {
        return res.status(404).json({
          success: false,
          message: `Your account is ${user.activeStatus}`,
        });
      }
      const userPassword=await prisma.password.findFirst({
        where:{
          userId:+user.id
        }
      })
      if (!bcrypt.compareSync(data.password, userPassword.password)) {
        return res.status(404).json({
          success: false,
          message: "password is incorrect",
        });
      }
      const payload={
        userid:user.id,
        role:user.role.name,
        firstName:user.profile.firstName
        
      }
      const token=jwt.sign(payload,SECRET)

      return res.status(200).json({
        success: true,
        message: "user logged in successfully",
        data: token,
      });
    } catch (error) {
      console.error("error occurred:", error);
      return res.status(500).json({
        success: false,
        message: "error while logging in",
      });
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: "invalid user id",
        });
      }
    const deleteUser=  await prisma.users.delete({
        where: {
          id: userId,
        },
      });
      return res.status(200).json({
        success: true,
        message: "user deleted successfully",
        data:deleteUser
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while deleting user",
      });
    }
  },
};

export default userController;