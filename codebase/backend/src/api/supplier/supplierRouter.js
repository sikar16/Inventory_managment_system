import express from "express"
import supplierController from "./supplierController.js"
const supplierRoute=express.Router()
supplierRoute.get("/:id",supplierController.getSingleSupplier)
supplierRoute.get("/",supplierController.getAllSupplier)
supplierRoute.post("/",supplierController.createSupplier)
supplierRoute.put("/:id",supplierController.updateSupplier)
supplierRoute.delete("/:id",supplierController.deleteSupplier)

export default supplierRoute