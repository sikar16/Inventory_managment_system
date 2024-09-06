import express from "express";
import { isAdmin } from "../../middleware/auth.js";
import productSubCategoryController from "./productSubCategoryController.js";
const productSubCategoryRoute = express.Router();

productSubCategoryRoute.get(
  "/:id",
  productSubCategoryController.getSingleproductSubCategory
);
productSubCategoryRoute.get(
  "/",
  productSubCategoryController.getAllproductSubCategory
);
productSubCategoryRoute.post(
  "/",
  [isAdmin],
  productSubCategoryController.createproductSubCategory
);
productSubCategoryRoute.put(
  "/:id",
  [isAdmin],
  productSubCategoryController.updateproductSubCategory
);
productSubCategoryRoute.delete(
  "/:id",
  [isAdmin],
  productSubCategoryController.deleteproductSubCategory
);

export default productSubCategoryRoute;
