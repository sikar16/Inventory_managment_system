import express from "express";
import productSubCategoryController from "./productSubCategoryController.js";
const productSubCategoryRoute = express.Router();

productSubCategoryRoute.get("/:id",productSubCategoryController.getSingleproductSubCategory);
productSubCategoryRoute.get("/",productSubCategoryController.getAllproductSubCategory);
productSubCategoryRoute.post("/",productSubCategoryController.createproductSubCategory);
productSubCategoryRoute.put("/:id",productSubCategoryController.updateproductSubCategory);
productSubCategoryRoute.delete("/:id",productSubCategoryController.deleteproductSubCategory);

export default productSubCategoryRoute;
