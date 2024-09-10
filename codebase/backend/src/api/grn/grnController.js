import prisma from "../../config/prisma.js";
import grnSchem from "./grnSchem.js";

const grnController = {
    getSingleGrn: async (req, res, next) => {
        try {
            const grnId = parseInt(req.params.id, 10);
            if (isNaN(grnId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid GRN ID",
                });
            }

            const grn = await prisma.gRN.findFirst({
                where: { id: grnId },
                include: {
                    _count: true,
                    supplayer: true,
                    grnItem: {
                        include: {
                            product: true,
                        }
                    }
                }
            });

            if (!grn) {
                return res.status(404).json({
                    success: false,
                    message: "GRN not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "GRN fetched successfully",
                data: grn,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
            });
        }
    },

    getAllGrn: async (req, res, next) => {
        try {
            const grns = await prisma.gRN.findMany({
                include: {
                    _count: true,
                    supplayer: true,
                    grnItem: {
                        include: {
                            product: true, 
                        }
                    }
                }
            });

            return res.status(200).json({
                success: true,
                message: "Fetched all GRNs",
                data: grns,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error}`,
            });
        }
    },

    createGrn: async (req, res, next) => {
        try {
            const { error, data } = grnSchem.create.safeParse(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: `Error - ${error}`,
                });
            }

            const requiredFields = ["supplayerId", "purchasedOrderId"];
            for (const field of requiredFields) {
                if (!data[field]) {
                    return res.status(403).json({
                        success: false,
                        message: `${field} is required`,
                    });
                }
            }

            const isSupplayerExist = await prisma.supplayer.findFirst({
                where: { id: +data.supplayerId },
            });
            if (!isSupplayerExist) {
                return res.status(404).json({
                    success: false,
                    message: "Supplayer not found",
                });
            }
            for (const item of data.grnItem) {
                const isProductExist = await prisma.product.findFirst({
                    where: { id: item.productId },
                });
                if (!isProductExist) {
                    return res.status(404).json({
                        success: false,
                        message: `Product with ID ${item.productId} not found`,
                    });
                }
            }

            const newGRN = await prisma.gRN.create({
                data: {
                    reciverId: +req.user.id,
                    supplayerId: +data.supplayerId,
                    purchasedOrderId: +data.purchasedOrderId,
                    grnItem: {
                        create: data.grnItem.map(item => ({
                            productId: +item.productId,
                            quantity: +item.quantity,
                            remark: item.remark,
                        })),
                    },
                }
            });

            return res.status(201).json({
                success: true,
                message: "GRN created successfully",
                data: newGRN,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error}`,
            });
        }
    },

    updateGrn: async (req, res, next) => {
        try {
            const grnId = parseInt(req.params.id, 10);
            if (isNaN(grnId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid GRN ID",
                });
            }

            const data = grnSchem.update.parse(req.body);
            // if (error) {
            //     return res.status(400).json({
            //         success: false,
            //         message: `Error - ${error}`,
            //     });
            // }

            const grnExists = await prisma.gRN.findFirst({
                where: { id: grnId },
            });
            if (!grnExists) {
                return res.status(404).json({
                    success: false,
                    message: "GRN not found",
                });
            }

            const updatedGRN = await prisma.gRN.update({
                where: { id: grnId },
                data: {
                    grnItem: {
                        updateMany: {
                            where: { productId: data.productId },
                            data: {
                                quantity: data.quantity,
                                remark: data.remark,
                            },
                        },
                    },
                },
            });

            return res.status(200).json({
                success: true,
                message: "GRN updated successfully",
                data: updatedGRN,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error}`,
            });
        }
    },

    deleteGrn: async (req, res, next) => {
        try {
            const grnId = parseInt(req.params.id, 10);
            if (isNaN(grnId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid GRN ID",
                });
            }

            const grnExists = await prisma.gRN.findFirst({
                where: { id: grnId },
            });
            if (!grnExists) {
                return res.status(404).json({
                    success: false,
                    message: "GRN not found",
                });
            }

            const deletedGRN = await prisma.gRN.delete({
                where: { id: grnId },
            });

            return res.status(200).json({
                success: true,
                message: "GRN deleted successfully",
                data: deletedGRN,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error}`,
            });
        }
    },
};

export default grnController;
