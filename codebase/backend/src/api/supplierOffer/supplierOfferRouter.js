import express from 'express';
import supplierOfferController from './supplierOfferController.js';
import { isLS } from "../../middleware/auth.js";

const supplierOfferRoute = express.Router();
supplierOfferRoute.get("/:id", [isLS],supplierOfferController.getSingleSupplierOffer);
supplierOfferRoute.get("/", [isLS],supplierOfferController.getAllSupplierOffers);
supplierOfferRoute.post("/", [isLS],supplierOfferController.createSupplierOffer);
supplierOfferRoute.put("/supplieroffer/:id", [isLS],supplierOfferController.updateSupplierOffer);
supplierOfferRoute.put("/supplier/:id", [isLS],supplierOfferController.updateSupplier);
supplierOfferRoute.put("/item/:id", [isLS],supplierOfferController.updateSupplierOfferItems);
supplierOfferRoute.delete("/:id", [isLS],supplierOfferController.deleteSupplierOffer);

export default supplierOfferRoute;
