import express from 'express';
import supplierOfferController from './supplierOfferController';

const supplierOfferRoute = express.Router();
supplierOfferRoute.get("/:id", supplierOfferController.getSingleSupplierOffer);
supplierOfferRoute.get("/", supplierOfferController.getAllSupplierOffers);
supplierOfferRoute.post("/", supplierOfferController.createSupplierOffer);
supplierOfferRoute.put("/supplier/:id", supplierOfferController.updateSupplierOffer);
supplierOfferRoute.put("/supplieroffer/:id", supplierOfferController.updateSupplier);
supplierOfferRoute.put("/item/:id", supplierOfferController.updateSupplierOfferItems);
supplierOfferRoute.delete("/:id", supplierOfferController.deleteSupplierOffer);

export default supplierOfferRoute;
