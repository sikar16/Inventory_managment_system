import express from "express";
import purchasedOrderController from "./purchaseOrderController.js";
import { isLS } from "../../middleware/auth.js";

const purchasedOrderRouter = express.Router();

purchasedOrderRouter.get(
  "/:id",
  purchasedOrderController.getSinglePurchasedOrder
),
  purchasedOrderRouter.get(
    "/",
    [isLS],
    purchasedOrderController.getAllPurchasedOrder
  ),
  purchasedOrderRouter.post(
    "/",
    [isLS],
    purchasedOrderController.createPurchasedOrder
  ),
  // purchasedOrderRouter.put("/:id",[isLS],purchasedOrderController.updatePurchasedOrder),
  purchasedOrderRouter.put(
    "/items/:id",
    [isLS],
    purchasedOrderController.updatePurchasedOrderItems
  ),
  // purchasedOrderRouter.put("/supplier/:id",[isLS],purchasedOrderController.updatesupplier),
  // purchasedOrderRouter.put("/winner/:id",[isLS],purchasedOrderController.updateWinner),
  purchasedOrderRouter.delete(
    "/:id",
    [isLS],
    purchasedOrderController.deletePurchasedOrder
  );

export default purchasedOrderRouter;
