import express from "express";
import supplierCategoryController from "./supplierCategoryController.js";
import { isAdmin } from "../../middleware/auth.js";
const supplierCategoryRouter = express.Router();
supplierCategoryRouter.get(
  "/:id",
  supplierCategoryController.getSinglesupplierCategory
);
supplierCategoryRouter.get(
  "/",

  supplierCategoryController.getAllsupplierCategory
);
supplierCategoryRouter.post(
  "/",
  [isAdmin],
  supplierCategoryController.createsupplierCategory
);
supplierCategoryRouter.put(
  "/:id",
  [isAdmin],
  supplierCategoryController.updatesupplierCategory
);
supplierCategoryRouter.delete(
  "/:id",
  [isAdmin],
  supplierCategoryController.deletesupplierCategory
);

export default supplierCategoryRouter;
