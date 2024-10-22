import express from "express";
import purchasedReqController from "./purchaseReqController.js";
import { isLS, isFinance, isGM } from "../../middleware/auth.js";

const purchasedReqRouter = express.Router();
purchasedReqRouter.get(
  "/manager",
  purchasedReqController.getAllpurchasedReqByManager
),
  purchasedReqRouter.get("/:id", purchasedReqController.getSinglepurchasedReq),
  purchasedReqRouter.get("/", purchasedReqController.getAllpurchasedReq),
  purchasedReqRouter.post(
    "/create",
    [isLS],
    purchasedReqController.createpurchasedReq
  ),
  purchasedReqRouter.put(
    "/item/:id",
    [isLS],
    purchasedReqController.updatepurchasedReqItem
  ),
  // purchasedReqRouter.put("/finance/:id",[isLS],purchasedReqConntroller.updateFinace),
  // purchasedReqRouter.put("/gm/:id",[isLS],purchasedReqConntroller.updateGm),
  purchasedReqRouter.put(
    "/approve/finance/:id",
    [isFinance],
    purchasedReqController.approvePurchasedRequestByFinance
  ),
  purchasedReqRouter.put(
    "/approve/gm/:id",
    [isGM],
    purchasedReqController.approvePurchasedRequestByGM
  ),
  purchasedReqRouter.delete(
    "/:id",
    [isLS],
    purchasedReqController.deletepurchasedReq
  );

export default purchasedReqRouter;
