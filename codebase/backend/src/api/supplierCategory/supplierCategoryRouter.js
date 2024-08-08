import express from "express"
import supplierCategoryController from "./supplierCategoryController.js";

const supplierCategoryRouter=express.Router();
supplierCategoryRouter.get("/:id",supplierCategoryController.getSinglesupplierCategory);
supplierCategoryRouter.get("/",supplierCategoryController.getAllsupplierCategory);
supplierCategoryRouter.post("/",supplierCategoryController.createsupplierCategory);
supplierCategoryRouter.put("/:id",supplierCategoryController.updatesupplierCategory);
supplierCategoryRouter.delete("/:id",supplierCategoryController.deletesupplierCategory);

export default supplierCategoryRouter
