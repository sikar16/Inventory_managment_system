import prisma from "../../config/prisma.js";
import productSchema from "./productSchem.js";

const productController = {
  getSingleProduct: async (req, res, next) => {
    try {
      const productId = parseInt(req.params.id, 10);
      if (isNaN(productId)) {
        return res.status(404).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const product = await prisma.product.findFirst({
        where: {
          id: productId,
        },
        include: {
          productAttributes: {
            include: {
              templateAttribute: true,
            },
          },
        },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching product",
      });
    }
  },

  getAllProduct: async (req, res, next) => {
    try {
      const products = await prisma.product.findMany({
        include: {
          subcategory: {
            include: {
              category: true,
            },
          },
          productAttributes: {
            include: {
              templateAttribute: {},
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "Fetching all products",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching all products",
      });
    }
  },

  createProduct: async (req, res, next) => {
    try {
      const data = productSchema.create.parse(req.body);

      const isSubcategoryIdExist = await prisma.productSubCategory.findFirst({
        where: {
          id: +data.subcategoryId,
        },
      });

      if (!isSubcategoryIdExist) {
        return res.status(404).json({
          success: false,
          message: "Subcategory not found",
        });
      }

      for (let i = 0; i < req.body.items.length; i++) {
        const isTemplateAttributeExist =
          await prisma.templateAttribute.findFirst({
            where: {
              id: +data.items[i].templateAttributeId,
            },
          });

        if (!isTemplateAttributeExist) {
          return res.status(404).json({
            success: false,
            message: "Template attribute not found",
          });
        }
      }

      const newProduct = await prisma.product.create({
        data: {
          name: data.name,
          subcategoryId: +data.subcategoryId,
        },
      });

      for (let i = 0; i < req.body.items.length; i++) {
        const newproductAttribute = await prisma.productAttribute.create({
          data: {
            productId: +newProduct.id,
            templateAttributeId: data.items[i].templateAttributeId,
            value: data.items[i].value,
          },
        });
      }

      const products = await prisma.product.findFirst({
        where: {
          id: +newProduct.id,
        },
        include: {
          productAttributes: {
            include: {
              templateAttribute: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "Product created successfully",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error :- ${error}`,
      });
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const data = productSchema.updateProduct.parse(req.body);
      const productId = parseInt(req.params.id, 10);
      if (isNaN(productId)) {
        return res.status(404).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const isProductExist = await prisma.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!isProductExist) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const isProductSubcategoryExist =
        await prisma.productSubCategory.findFirst({
          where: {
            id: +data.subcategoryId,
          },
        });

      if (!isProductSubcategoryExist) {
        return res.status(404).json({
          success: false,
          message: "Product subcategory not found",
        });
      }

      const updateProduct = await prisma.product.update({
        where: {
          id: +productId,
        },
        data: {
          name: data.name,
          subcategoryId: +data.subcategoryId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updateProduct,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while updating product",
      });
    }
  },

  updateProductAttribute: async (req, res, next) => {
    try {
      const data = productSchema.updateProductAttribute.parse(req.body);
      const productAttributeId = parseInt(req.params.id, 10);
      if (isNaN(productAttributeId)) {
        return res.status(404).json({
          success: false,
          message: "Invalid product attribute ID",
        });
      }

      const isProductAttributeExist = await prisma.productAttribute.findFirst({
        where: {
          id: productAttributeId,
        },
      });

      if (!isProductAttributeExist) {
        return res.status(404).json({
          success: false,
          message: "Product attribute not found",
        });
      }

      const isTemplateAttributeExist = await prisma.templateAttribute.findFirst(
        {
          where: {
            id: +data.templateAttributeId,
          },
        }
      );

      if (!isTemplateAttributeExist) {
        return res.status(404).json({
          success: false,
          message: "Template attribute not found",
        });
      }

      const updateProductAttribute = await prisma.productAttribute.update({
        where: {
          id: +productAttributeId,
        },
        data: {
          value: data.value,
          templateAttributeId: +data.templateAttributeId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Product attribute updated successfully",
        data: updateProductAttribute,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while updating product attribute",
      });
    }
  },

  // deleteProduct: async (req, res, next) => {
  //   try {
  //     const productId = parseInt(req.params.id, 10);
  //     if (isNaN(productId)) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Invalid product ID",
  //       });
  //     }

  //     const isProductExist = await prisma.product.findFirst({
  //       where: {
  //         id: productId,
  //       },
  //     });

  //     if (!isProductExist) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Product not found",
  //       });
  //     }

  //     await prisma.product.delete({
  //       where: {
  //         id: productId,
  //       },
  //     });

  //     return res.status(200).json({
  //       success: true,
  //       message: "Product deleted successfully",
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "Error deleting product",
  //     });
  //   }
  // },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = parseInt(req.params.id, 10);
      if (isNaN(productId)) {
        return res.status(404).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const isProductExist = await prisma.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!isProductExist) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      await prisma.product.delete({
        where: {
          id: productId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error); // Log the actual error
      return res.status(500).json({
        success: false,
        message: "Error deleting product",
        error: error.message, // Optional: include error message in response for debugging
      });
    }
  },
};

export default productController;
