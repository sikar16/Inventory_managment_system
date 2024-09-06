import express from "express";
import productController from "./productController.js";
const productRouter = express.Router();

productRouter.get("/:id", productController.getSingleProduct);
productRouter.get("/", productController.getAllProduct);
productRouter.post("/", productController.createProduct);
productRouter.put("/attribute/:id", productController.updateProductAttribute);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
