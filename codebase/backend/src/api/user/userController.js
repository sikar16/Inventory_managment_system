import userSchema from "./userSchem.js";
import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config/secret.js";
import userSchem from "./userSchem.js";
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
        include: {
          profile: {
            include: {
              address: true,
            },
          },
        },
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
      const skip = parseInt(req.query.skip) || 0;
      const take = parseInt(req.query.take) || 10;
      const users = await prisma.users.findMany({
        take,
        skip,
        include: {
          profile: {
            include: {
              address: true,
            },
          },
          department: true,
        },
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
      // Check if the email is already registered
      const isUserExist = await prisma.users.findFirst({
        where: {
          email: data.email,
        },
      });

      if (isUserExist) {
        return res.status(400).json({
          success: false,
          message: "This email is already registered",
        });
      }

      // Check if the phone is already registered
      const isPhoneExist = await prisma.profile.findFirst({
        where: {
          phone: data.phone,
        },
      });

      if (isPhoneExist) {
        return res.status(400).json({
          success: false,
          message: "This phone is already registered",
        });
      }

      // Check if the department exists
      const department = await prisma.department.findFirst({
        where: { id: +data.departmentId },
      });

      if (!department) {
        return res.status(400).json({
          success: false,
          message: "Department not found",
        });
      }

      // Check if the address exists
      let addressId;
      const isAddressExist = await prisma.address.findFirst({
        where: {
          country: data.country,
          city: data.city,
          subCity: data.subCity,
          wereda: data.wereda,
        },
      });
      // if address exist
      if (isAddressExist) {
        addressId = isAddressExist.id;
      }
      // create new
      else {
        const newAddress = await prisma.address.create({
          data: {
            country: data.country,
            city: data.city,
            subCity: data.subCity,
            wereda: data.wereda,
          },
        });
        addressId = newAddress.id;
      }
      console.log(addressId);

      console.log(isAddressExist);

      // Hash the password
      const hashedPassword = await bcrypt.hashSync(data.password, 10);

      // Create the user
      const newUser = await prisma.users.create({
        include: {
          profile: true,
          department: true,
        },
        data: {
          activeStatus: "ACTIVE",
          email: data.email,
          role: "EMPLOYEE",
          departmentId: +data.departmentId,
          password: {
            create: {
              password: hashedPassword,
            },
          },
          profile: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
              middleName: data.middleName,
              gender: data.gender,
              phone: data.phone,
              addressId: addressId,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "User created successfully",
        data: newUser,
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
          message: "Invalid user ID",
        });
      }
      const data = userSchem.updateProfile.parse(req.body);
      //check if user exist with the id
      const user = await prisma.users.findFirst({
        where: {
          id: +userId,
        },
        include: {
          profile: {
            include: {
              address: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      //check if user exist with the id
      const department = await prisma.department.findFirst({
        where: {
          id: +data.departmentId,
        },
      });

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "department not found",
        });
      }
      // Check if the address exists
      let addressId;
      const isAddressExist = await prisma.address.findFirst({
        where: {
          country: data.country,
          city: data.city,
          subCity: data.subCity,
          wereda: data.wereda,
        },
      });
      // if address exist
      if (isAddressExist) {
        addressId = isAddressExist.id;
      }
      // create new
      else {
        const newAddress = await prisma.address.create({
          data: {
            country: data.country,
            city: data.city,
            subCity: data.subCity,
            wereda: data.wereda,
          },
        });
        addressId = newAddress.id;
      }
      const updatedUser = await prisma.users.update({
        where: {
          id: +userId,
        },
        data: {
          departmentId: +data.departmentId,
          profile: {
            update: {
              firstName: data.firstName,
              middleName: data.middleName,
              lastName: data.lastName,
              gender: data.gender,
              addressId: +addressId,
            },
          },
        },
        include: {
          profile: true,
          department: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: `Error- ${error}`,
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
        include: {
          profile: true,
        },
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
      const userPassword = await prisma.password.findFirst({
        where: {
          userId: +user.id,
        },
      });
      if (!bcrypt.compareSync(data.password, userPassword.password)) {
        return res.status(404).json({
          success: false,
          message: "password is incorrect",
        });
      }
      const payload = {
        userId: user.id,
        role: user.role,
        firstName: user.profile.firstName,
      };
      const token = jwt.sign(payload, SECRET);

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
      const user = await prisma.users.findFirst({
        where: {
          id: +userId,
        },
        include: {
          profile: {
            include: {
              address: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      // start deleting
      await prisma.password.delete({
        where: {
          userId: +userId,
        },
      });
      await prisma.profile.delete({
        where: {
          userId: +userId,
        },
      });
      const deleteUser = await prisma.users.delete({
        where: {
          id: +userId,
        },
      });
      return res.status(200).json({
        success: true,
        message: "user deleted successfully",
        data: deleteUser,
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

  assignRole: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID",
        });
      }
      const data = userSchem.assignRole.parse(req.body);
      //check if user exist with the id
      const user = await prisma.users.findFirst({
        where: {
          id: +userId,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const updatedUser = await prisma.users.update({
        where: {
          id: +userId,
        },
        data: {
          role: data.role,
        },
        include: {
          profile: true,
          department: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: `Error- ${error}`,
      });
    }
  },

  changeStatus: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID",
        });
      }
      const data = userSchem.changeStatus.parse(req.body);
      //check if user exist with the id
      const user = await prisma.users.findFirst({
        where: {
          id: +userId,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const updatedUser = await prisma.users.update({
        where: {
          id: +userId,
        },
        data: {
          activeStatus: data.activeStatus,
        },
        include: {
          profile: true,
          department: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: `User ${data.activeStatus} successfully`,
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: `Error- ${error}`,
      });
    }
  },

  changePassword: async (req, res, next) => {
    const user = req.user;
    const data = userSchem.changePassword.parse(req.body);
    //confirm and new password the same
    if (data.newPassword != data.confirmPassword) {
      return res.status(403).json({
        success: false,
        message: `password does not much`,
      });
    }
    // previes password check
    const dbPassword = await prisma.password.findFirst({
      where: {
        id: +user.id,
      },
    });

    if (!bcrypt.compareSync(data.oldPassword, dbPassword.password)) {
      return res.status(404).json({
        success: false,
        message: "old password is incorrect",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hashSync(data.newPassword, 10);
    // update
    const updatedPassword = await prisma.password.update({
      where: {
        id: +user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      success: true,
      message: "password changed sucessfully",
    });
  },

  changePhoneEmail: async (req, res, next) => {
    try {
      const user = req.user;
      const data = userSchema.changeEmailPhone.parse(req.body);
      // Check if the email is already registered
      const isUserExist = await prisma.users.findFirst({
        where: {
          email: data.email,
        },
      });

      if (isUserExist) {
        return res.status(400).json({
          success: false,
          message: "This email is already registered",
        });
      }

      // Check if the phone is already registered
      const isPhoneExist = await prisma.profile.findFirst({
        where: {
          phone: data.phone,
        },
      });

      if (isPhoneExist) {
        return res.status(400).json({
          success: false,
          message: "This phone is already registered",
        });
      }

      // update the user
      const updatedUser = await prisma.users.update({
        include: {
          profile: true,
          department: true,
        },
        data: {
          email: data.email,
          profile: {
            update: {
              phone: data.phone,
            },
          },
        },
        where: {
          id: +user.id,
        },
      });

      return res.status(200).json({
        success: true,
        message: "User email and phone updated sucessfully successfully",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `${error}`,
      });
    }
  },
};

export default userController;
