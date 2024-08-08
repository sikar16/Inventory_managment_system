import userSchema from "./userSchem.js";
import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js"

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
            profile:true
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
      const users = await prisma.users.findMany({
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
        message: "error while fetching users",
      });
    }
  },

  createUser: async (req, res, next) => {
    try {
      const requiredFields = ["email", "firstName", "lastName", "role"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }

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

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await prisma.users.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          gender: data.gender,
        },
      });
      return res.status(200).json({
        success: true,
        message: "user created successfully",
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "error while creating user",
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
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
      if (user.activeStatus !== "ACTIVE") {
        return res.status(404).json({
          success: false,
          message: "Your account is inactive",
        });
      }
      if (!bcrypt.compareSync(data.password, user.password)) {
        return res.status(404).json({
          success: false,
          message: "password is incorrect",
        });
      }
      return res.status(200).json({
        success: true,
        message: "user logged in successfully",
        data: user,
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