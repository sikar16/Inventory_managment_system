import express from "express";
import productController from "./productController.js";
import { isAdmin } from "../../middleware/auth.js";

const productRouter = express.Router();

productRouter.get("/:id", productController.getSingleProduct);
productRouter.get("/", productController.getAllProduct);
productRouter.post("/", productController.createProduct);
productRouter.put("/attribute/:id", productController.updateProductAttribute);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", [isAdmin], productController.deleteProduct);

export default productRouter;
