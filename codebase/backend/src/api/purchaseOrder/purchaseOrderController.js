import prisma from "../../config/prisma.js";
import purchaseOrderSchema from "./purchaseOrderSchem.js";

const purchasedOrderController = {
  getSinglePurchasedOrder: async (req, res, next) => {
    try {
      const purchaseOrderId = parseInt(req.params.id, 10);
      if (isNaN(purchaseOrderId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid purchase order ID",
        });
      }
      const purchaseOrder = await prisma.purchasedOrder.findFirst({
        where: {
          id: purchaseOrderId,
        },
        include: {
          _count: true,
          items: {
            include: {
              products: {
                include: { productAttributes: true, subcategory: true },
              },
              purchasedOrder: {
                include: {
                  user: {
                    include: {
                      department: true,
                    },
                  },
                },
              },
            },
          },
          // SupplayerOffer:true,
          user: true,
          // winner:true
        },
      });

      if (!purchaseOrder) {
        return res.status(404).json({
          success: false,
          message: "Purchase order not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: `Fetch single purchased order ${purchaseOrderId}`,
        data: purchaseOrder,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error-${error}`,
      });
    }
  },
  getAllPurchasedOrder: async (req, res, next) => {
    try {
      const purchaseOrder = await prisma.purchasedOrder.findMany({
        include: {
          _count: true,
          items: {
            include: {
              products: {
                include: { productAttributes: true, subcategory: true },
              },
              purchasedOrder: {
                include: {
                  user: {
                    include: {
                      department: true,
                    },
                  },
                },
              },
            },
          },
          // SupplayerOffer:true,
          user: true,
          // winner:true
        },
      });

      return res.status(200).json({
        success: true,
        message: "Fetched all purchase order",
        data: purchaseOrder,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error-${error}`,
      });
    }
  },

  // Correct createPurchasedOrder method
  // Correct createPurchasedOrder method
  createPurchasedOrder: async (req, res, next) => {
    try {
      const requiredFields = ["items"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }

      const data = purchaseOrderSchema.create.parse(req.body);

      // Check each item's validity
      for (let index = 0; index < data.items.length; index++) {
        const element = data.items[index];

        // Ensure the product exists
        const isProductExist = await prisma.product.findFirst({
          where: { id: element.productId },
        });
        if (!isProductExist) {
          return res.status(404).json({
            success: false,
            message: `Product not found`,
          });
        }

        // Ensure the MaterialRequest exists
        const isMaterialRequestExist = await prisma.materialRequest.findFirst({
          where: { id: element.purchasedRequestId },
        });
        if (!isMaterialRequestExist) {
          return res.status(404).json({
            success: false,
            message: `MaterialRequest with id ${element.purchasedRequestId} not found`,
          });
        }
      }

      // Step 1: Create the purchase order first
      const newPurchaseOrder = await prisma.purchasedOrder.create({
        data: {
          userId: req.user.id, // Ensure userId is present
        },
      });

      // Step 2: Loop through and create each item using create()
      const createdItems = [];
      for (let item of data.items) {
        const createdItem = await prisma.purchasedOrderItem.create({
          data: {
            productId: item.productId,
            quantityToBePurchased: item.quantityToBePurchased,
            remark: item.remark,
            purchasOrderId: newPurchaseOrder.id, // Link to the purchase order ID
          },
        });
        createdItems.push(createdItem);
      }

      return res.status(201).json({
        success: true,
        message: "Purchase order and items created successfully",
        data: {
          purchaseOrder: newPurchaseOrder,
          items: createdItems,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },

  // createPurchasedOrder: async (req, res, next) => {
  //   try {
  //     const requiredFields = ["items"];
  //     for(const field of requiredFields){
  //       if(!req.body[field]){
  //         return res.status(400).json({
  //           success: false,
  //           message: `${field} is required`,
  //         });
  //       }
  //     }

  //     const data = purchaseOrderSchema.create.parse(req.body);

  //     // Loop through each item to check if the product exists
  //     for (let index = 0; index < data.items.length; index++) {
  //       const element = data.items[index];

  //       // Check if the product exists
  //       const isProductExist = await prisma.product.findFirst({
  //         where: { id: element.productId }
  //       });
  //       if (!isProductExist) {
  //         return res.status(404).json({
  //           success: false,
  //           message: `Product not found`,
  //         });
  //       }

  //       // Check if the MaterialRequest exists
  //       const isMaterialRequestExist = await prisma.materialRequest.findFirst({
  //         where: { id: element.purchasedRequestId }
  //       });
  //       if (!isMaterialRequestExist) {
  //         return res.status(404).json({
  //           success: false,
  //           message: `MaterialRequest with id ${element.purchasedRequestId} not found`,
  //         });
  //       }
  //     }

  //     // If all items are valid, proceed to create the purchase order
  //     const newPurchaseOrder = await prisma.purchasedOrder.create({
  //       data: {
  //         userId: req.user.id, // Make sure to include userId
  //         items: {
  //           create: data.items.map(item => ({
  //             productId: item.productId,
  //             quantityToBePurchased: item.quantityToBePurchased,
  //             remark: item.remark,
  //             // Correctly connect purchasedRequestId
  //             purchasedRequest: {
  //               connect: {
  //                 id: item.purchasedRequestId
  //               }
  //             }
  //           }))
  //         }
  //       },
  //       include: {
  //         _count: true,
  //         items: true,
  //       }
  //     });

  //     return res.status(201).json({
  //       success: true,
  //       message: "Purchase order created successfully",
  //       data: newPurchaseOrder,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: `Error: ${error.message}`,
  //     });
  //   }
  // },

  updatePurchasedOrder: async (req, res, next) => {
    try {
      const purchaseOrderId = parseInt(req.params.id, 10);
      if (isNaN(purchaseOrderId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid purchase order ID",
        });
      }
      const updatedOrder = await prisma.purchasedOrder.update({
        where: { id: purchaseOrderId },
        data: req.body,
      });

      return res.status(200).json({
        success: true,
        message: "Purchase order updated successfully",
        data: updatedOrder,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },
  updatePurchasedOrderItems: async (req, res, next) => {
    try {
      const purchaseOrderItemId = parseInt(req.params.id, 10);
      if (isNaN(purchaseOrderItemId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid purchase order ID",
        });
      }

      // Parse and validate the request body
      const data = purchaseOrderSchema.updateItem.parse(req.body);

      // Check if the purchase order item exists
      const purchaseOrderItem = await prisma.purchasedOrderItem.findFirst({
        where: { id: purchaseOrderItemId },
      });
      if (!purchaseOrderItem) {
        return res.status(404).json({
          success: false,
          message: "Purchase order item not found",
        });
      }

      // Validate if the product exists
      const isProductExist = await prisma.product.findFirst({
        where: { id: data.productId },
      });
      if (!isProductExist) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Update the purchased order item
      const updatedItem = await prisma.purchasedOrderItem.update({
        where: { id: purchaseOrderItemId },
        data: {
          productId: data.productId,
          quantityToBePurchased: data.quantityToBePurchased,
          remark: data.remark,
          // Connect the purchasedRequestId if it exists
          purchasedRequest: {
            connect: {
              id: data.purchasedRequestId,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "Purchase order item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },

  // updatesupplier:async (req,res,next)=>{
  //     try {
  //         const purchaseOrderId = parseInt(req.params.id, 10);
  //         if (isNaN(purchaseOrderId)) {
  //           return res.status(400).json({
  //             success: false,
  //             message: "Invalid purchase order ID",
  //           });
  //         }

  //         const data = purchaseOrderSchema.updateSupplier.parse(req.body);

  //         const purchaseOrderItem = await prisma.purchasedOrderItem.findFirst({
  //           where: { id: purchaseOrderId },
  //         });
  //         if (!purchaseOrderItem) {
  //           return res.status(404).json({
  //             success: false,
  //             message: "Purchase order item not found",
  //           });
  //         }

  //         const supplier = await prisma.suppliers.findFirst({
  //           where: { id: data.suppliersId },
  //         });
  //         if (!supplier) {
  //           return res.status(404).json({
  //             success: false,
  //             message: "Supplier not found",
  //           });
  //         }

  //         const updatedSupplier = await prisma.purchasedOrderItem.update({
  //           where: { id: purchaseOrderId },
  //           data: { suppliersId: supplier.id },
  //         });

  //         return res.status(200).json({
  //           success: true,
  //           message: "Supplier updated successfully",
  //           data: updatedSupplier,
  //         });
  //       } catch (error) {
  //         return res.status(500).json({
  //           success: false,
  //           message: `Error: ${error.message}`,
  //         });
  //       }
  // },
  // updateWinner: async (req, res, next) => {
  //     try {
  //       const purchasedOrderId = parseInt(req.params.id, 10);
  //       if (isNaN(purchasedOrderId)) {
  //         return res.status(400).json({
  //           success: false,
  //           message: "Invalid purchase order ID",
  //         });
  //       }

  //       const data = purchaseOrderSchema.updateWinner.parse(req.body);

  //       // Check if the purchased order exists
  //       const isPurchasedOrderExist = await prisma.purchasedOrder.findFirst({
  //         where: {
  //           id: purchasedOrderId,
  //         },
  //       });

  //       if (!isPurchasedOrderExist) {
  //         return res.status(404).json({
  //           success: false,
  //           message: "Purchased order not found",
  //         });
  //       }

  //       // Check if the winner exists
  //       const isWinnerExist = await prisma.suppliers.findFirst({
  //         where: {
  //           id: data.winnerId,
  //         },
  //       });

  //       if (!isWinnerExist) {
  //         return res.status(404).json({
  //           success: false,
  //           message: "Winner not found",
  //         });
  //       }

  //       // Update the winner
  //       const updatedPurchaseOrder = await prisma.purchasedOrder.update({
  //         where: {
  //           id: purchasedOrderId,
  //         },
  //         data: {
  //           winnerId: data.winnerId,
  //         },
  //         include: {
  //           winner: {
  //             include: {
  //               supplayer: true,
  //             },
  //           },
  //         },
  //       });

  //       return res.status(200).json({
  //         success: true,
  //         message: "Successfully updated the winner",
  //         data: updatedPurchaseOrder,
  //       });
  //     } catch (error) {
  //       return res.status(500).json({
  //         success: false,
  //         message: `Error - ${error.message}`,
  //       });
  //     }
  // },
  deletePurchasedOrder: async (req, res, next) => {
    try {
      const purchaseOrderId = parseInt(req.params.id, 10);
      if (isNaN(purchaseOrderId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid purchase order ID",
        });
      }

      const purchaseOrder = await prisma.purchasedOrder.findFirst({
        where: { id: purchaseOrderId },
      });
      if (!purchaseOrder) {
        return res.status(404).json({
          success: false,
          message: "Purchase order not found",
        });
      }

      // Delete associated items
      await prisma.purchasedOrderItem.deleteMany({
        where: { purchasOrderId: purchaseOrderId },
      });

      const deletedPurchaseOrder = await prisma.purchasedOrder.delete({
        where: { id: purchaseOrderId },
      });

      return res.status(200).json({
        success: true,
        message: "Purchase order deleted successfully",
        data: deletedPurchaseOrder,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },
};

export default purchasedOrderController;
