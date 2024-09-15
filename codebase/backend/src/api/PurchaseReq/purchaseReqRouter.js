import express from 'express'
import purchasedReqConntroller from './purchaseReqController.js';
import { isLS,isFinance,isGM } from "../../middleware/auth.js";

const purchasedReqRouter=express.Router();

purchasedReqRouter.get("/:id",purchasedReqConntroller.getSinglepurchasedReq),
purchasedReqRouter.get("/",purchasedReqConntroller.getAllpurchasedReq),
purchasedReqRouter.post("/create",[isLS],purchasedReqConntroller.createpurchasedReq),
purchasedReqRouter.put("/item/:id",[isLS],purchasedReqConntroller.updatepurchasedReqItem),
// purchasedReqRouter.put("/finance/:id",[isLS],purchasedReqConntroller.updateFinace),
// purchasedReqRouter.put("/gm/:id",[isLS],purchasedReqConntroller.updateGm),
purchasedReqRouter.put("/approve/finance/:id",[isFinance],purchasedReqConntroller.approvePurchasedRequestByFinance),
purchasedReqRouter.put("/approve/gm/:id",[isGM],purchasedReqConntroller.approvePurchasedRequestByGM),
purchasedReqRouter.delete("/:id",[isLS],purchasedReqConntroller.deletepurchasedReq)

export default purchasedReqRouter