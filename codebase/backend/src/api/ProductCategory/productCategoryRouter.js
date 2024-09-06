import express from "express";
import productCategoryController from "./productCategoryController.js";
import { isAdmin } from "../../middleware/auth.js";
const productCategoryRoute = express.Router();
productCategoryRoute.get(
  "/:id",
  productCategoryController.getSigleproductCategory
);
productCategoryRoute.get("", productCategoryController.getAllproductCategory);
productCategoryRoute.post(
  "/",
  [isAdmin],
  productCategoryController.creatproductCategory
);
productCategoryRoute.put(
  "/:id",
  [isAdmin],
  productCategoryController.updateproductCategory
);
productCategoryRoute.delete(
  "/:id",
  [isAdmin],
  productCategoryController.deleteproductCategory
);
export default productCategoryRoute;
