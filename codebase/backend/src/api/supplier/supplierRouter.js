import express from "express";
import { isAdmin } from "../../middleware/auth.js";
import supplierController from "./supplierController.js";
const supplierRoute = express.Router();
supplierRoute.get("/:id", supplierController.getSingleSupplier);
supplierRoute.get("/", supplierController.getAllSupplier);
supplierRoute.post("/", [isAdmin], supplierController.createSupplier);
supplierRoute.put("/:id", [isAdmin], supplierController.updateSupplier);
supplierRoute.delete("/:id", [isAdmin], supplierController.deleteSupplier);

export default supplierRoute;
