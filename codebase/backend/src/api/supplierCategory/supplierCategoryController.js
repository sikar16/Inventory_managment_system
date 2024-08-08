import prisma from "../../config/prisma.js";
import supplierCategorySchem from "./supplierCategorySchme.js";

const supplierCategoryController = {
    getSinglesupplierCategory: async (req, res, next) => {
        try {
            const categoryId = parseInt(req.params.id, 10);
            if (isNaN(categoryId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category id",
                });
            }

            const supplierCategory = await prisma.supplierCategory.findUnique({
                where: {
                    id: categoryId,
                },
            });

            if (!supplierCategory) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: supplierCategory,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error while fetching supplier category",
            });
        }
    },

    getAllsupplierCategory: async (req, res, next) => {
        try {
            const supplierCategorys = await prisma.supplierCategory.findMany({});
            return res.status(200).json({
                success: true,
                message: "Fetching all supplier categories",
                data: supplierCategorys,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error while fetching supplier categories",
            });
        }
    },

    createsupplierCategory: async (req, res, next) => {
        try {
            const requiredField = ["name"];
            for (const field of requiredField) {
                if (!req.body[field]) {
                    return res.status(403).json({
                        success: false,
                        message: `${field} is required`,
                    });
                }
            }

            const data = supplierCategorySchem.createsupplierCategory.parse(req.body);

            const issupplierCategoryExist = await prisma.supplierCategory.findFirst({
                where: {
                    name: data.name,
                },
            });

            if (issupplierCategoryExist) {
                return res.status(400).json({
                    success: false,
                    message: "This category name is already registered",
                });
            }

            const newsupplierCategory = await prisma.supplierCategory.create({
                data: {
                    name: data.name,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Supplier category created successfully",
                data: newsupplierCategory,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error while creating supplier category",
            });
        }
    },

    updatesupplierCategory: async (req, res, next) => {
        try {
            const categoryId = parseInt(req.params.id, 10);
            if (isNaN(categoryId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category id",
                });
            }

            const updatecategory = await prisma.supplierCategory.update({
                where: {
                    id: categoryId,
                },
                data: req.body,
            });

            return res.status(200).json({
                success: true,
                message: "Category updated successfully",
                data: updatecategory,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error while updating supplier category",
            });
        }
    },

    deletesupplierCategory: async (req, res, next) => {
        try {
            const categoryId = parseInt(req.params.id, 10);
            if (isNaN(categoryId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category id",
                });
            }

            const deletecategory = await prisma.supplierCategory.delete({
                where: {
                    id: categoryId,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Category deleted successfully",
                data: deletecategory,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error while deleting supplier category",
            });
        }
    },
};

export default supplierCategoryController;
