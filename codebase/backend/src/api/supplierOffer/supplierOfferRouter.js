import express from 'express'
import supplierOfferController from './supplierOfferController';

const supplierOfferRoute=express.Router()

supplierOfferRoute.get("/:id",supplierOfferController.getSinglesupplierOffer),
supplierOfferRoute.get("/",supplierOfferController.getAllsupplierOffer),
supplierOfferRoute.post("/",supplierOfferController.createsupplierOffer),
supplierOfferRoute.put("/supplier/:id",supplierOfferController.updatesupplier),
supplierOfferRoute.put("/supplieroffer/:id",supplierOfferController.updatesupplierOffer),
supplierOfferRoute.put("/item/:id",supplierOfferController.updatesupplierOfferItem),
supplierOfferRoute.delete("/:id",supplierOfferController.deletesupplierOffer)

export default supplierOfferRoute;
