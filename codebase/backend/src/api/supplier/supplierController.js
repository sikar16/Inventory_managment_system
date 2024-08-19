import prisma from "../../config/prisma.js";

import supplierSchem from "./supplierSchem.js";

const supplierController = {
  getAllSupplier: async (req, res, next) => {
    try {
      const suppliers = await prisma.suppliers.findMany({
        include: {
          category: true,
        },
      });
      res.status(200).json({
        success: true,
        message: "load  suppliers",
        data: suppliers,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "error while feteching supplier",
      });
    }
  },
  getSingleSupplier: async (req, res, next) => {
    try {
      const supplierId = parseInt(req.params.id, 10);
      if (isNaN(supplierId)) {
        return res.status(400).json({
          success: false,
          message: "invalid user id",
        });
      }
      const supplier = await prisma.suppliers.findFirst({
        where: {
          id: +supplierId,
        },
        include: {
          category: true,
        },
      });

      if (!supplier) {
        return res.status(404).json({
          success: false,
          message: "supplier not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: supplier,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `error ${error}`,
      });
    }
  },
  createSupplier: async (req, res, next) => {
    try {
      const requiredField = [
        "email",
        "fullName",
        "country",
        "city",
        "phone",
        "subCity",
        "categoryId",
      ];
      for (const field of requiredField) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }
      const data = supplierSchem.createSupplier.parse(req.body);

      const isSupplierExist = await prisma.suppliers.findFirst({
        where: {
          email: data.email,
        },
      });

      if (isSupplierExist) {
        return res.status(400).json({
          success: false,
          message: "this email is already registered",
        });
      }
      const isSupplierCategoryExist = await prisma.supplierCategory.findFirst({
        where: {
          id: +data.categoryId,
        },
      });

      if (!isSupplierCategoryExist) {
        return res.status(400).json({
          success: false,
          message: "this supplier category is not exist",
        });
      }
      // check if the phone number exist befor
      const isPhoneExist = await prisma.suppliers.findFirst({
        where: {
          phone: data.phone,
        },
      });
      if (isPhoneExist) {
        return res.status(400).json({
          success: false,
          message: "the phone number is all ready exist",
        });
      }
      // check id the address exist
      let addressId;
      const isAdressExist = await prisma.address.findFirst({
        where: {
          country: data.country,
          city: data.city,
          subCity: data.subCity,
        },
      });
      if (isAdressExist) {
        addressId = isAdressExist.id;
      } else {
        const newAddress = await prisma.address.create({
          data: {
            country: data.country,
            city: data.city,
            subCity: data.subCity,
          },
        });
        addressId = newAddress.id;
      }

      const newSupplier = await prisma.suppliers.create({
        data: {
          email: data.email,
          fullName: data.fullName,
          phone: data.phone,
          categoryId: data.categoryId,
          addressId: +addressId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "supplier created successfully",
        data: newSupplier,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "error while creating supplier",
      });
    }
  },
  updateSupplier: async (req, res, next) => {
    try {
      const supplierId = parseInt(req.params.id, 10);
      if (isNaN(supplierId)) {
        return res.status(400).json({
          success: false,
          message: "invalid supplier id",
        });
      }

      const data = supplierSchem.updateSupplier.parse(req.body);
      //check if supplayer is exist
      const isSupplayerExist = await prisma.suppliers.findFirst({
        where: {
          id: +supplierId,
        },
      });
      if (!isSupplayerExist) {
        return res.status(400).json({
          success: false,
          message: "this supplier  is not exist",
        });
      }
      //check if the data sent is valid
      const isSupplierCategoryExist = await prisma.supplierCategory.findFirst({
        where: {
          id: +data.categoryId,
        },
      });

      if (!isSupplierCategoryExist) {
        return res.status(400).json({
          success: false,
          message: "this supplier category is not exist",
        });
      }
      // check if the phone number exist befor
      const isPhoneExist = await prisma.suppliers.findFirst({
        where: {
          phone: data.phone,
        },
      });
      if (isPhoneExist && isPhoneExist.phone != isSupplayerExist.phone) {
        return res.status(400).json({
          success: false,
          message: "the phone number is all ready exist",
        });
      }

      // check id the address exist
      let addressId;
      const isAdressExist = await prisma.address.findFirst({
        where: {
          country: data.country,
          city: data.city,
          subCity: data.subCity,
        },
      });
      if (isAdressExist) {
        addressId = isAdressExist.id;
      } else {
        const newAddress = await prisma.address.create({
          data: {
            country: data.country,
            city: data.city,
            subCity: data.subCity,
          },
        });
        addressId = newAddress.id;
      }

      const updatedSupplier = await prisma.suppliers.update({
        where: {
          id: +supplierId,
        },
        data: {
          categoryId: +data.categoryId,
          fullName: data.fullName,
          addressId: +addressId,
        },
      });
      return res.status(200).json({
        success: true,
        message: "supplier updated successfully",
        data: updatedSupplier,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "supplier not found",
        });
      }

      console.error(error);
      return res.status(500).json({
        success: false,
        message: `erroe: ${error}`,
      });
    }
  },
  deleteSupplier: async (req, res, next) => {
    try {
      const supplierId = parseInt(req.params.id, 10);
      if (isNaN(supplierId)) {
        return res.status(400).json({
          success: false,
          message: "invalid supplier id",
        });
      }

      const isSupplierExist = await prisma.suppliers.findFirst({
        where: {
          id: +supplierId,
        },
      });

      if (!isSupplierExist) {
        return res.status(400).json({
          success: false,
          message: "this supplier is not exist",
        });
      }

      const deletedSupplier = await prisma.suppliers.delete({
        where: {
          id: +supplierId,
        },
      });
      return res.status(200).json({
        success: true,
        message: "supplier delete successfully",
        data: deletedSupplier,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `error ${error}`,
      });
    }
  },
};

export default supplierController;
