import express from "express"
import productCategoryController from "./productCategoryController.js"
const productCategoryRoute=express.Router()
productCategoryRoute.get("/:id",productCategoryController.getSigleproductCategory)
productCategoryRoute.get("",productCategoryController.getAllproductCategory)
productCategoryRoute.post("/",productCategoryController.creatproductCategory)
productCategoryRoute.put("/:id",productCategoryController.updateproductCategory)
productCategoryRoute.delete("/:id",productCategoryController.deleteproductCategory)
export default productCategoryRoute