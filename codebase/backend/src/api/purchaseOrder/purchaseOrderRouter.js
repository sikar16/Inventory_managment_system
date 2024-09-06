import express from 'express'
import purchasedOrderController from './purchaseOrderController.js';
const purchasedOrderRouter=express.Router();

purchasedOrderRouter.get("/:id",purchasedOrderController.getSinglePurchasedOrder),
purchasedOrderRouter.get("/",purchasedOrderController.getAllPurchasedOrder),
purchasedOrderRouter.post("/",purchasedOrderController.createPurchasedOrder),
purchasedOrderRouter.put("/:id",purchasedOrderController.updatePurchasedOrder),
purchasedOrderRouter.delete("/:id",purchasedOrderController.deletePurchasedOrder)

export default purchasedOrderRouter
