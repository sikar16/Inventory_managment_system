import express from 'express'
import purchasedReqConntroller from './purchaseReqController.js';
const purchasedReqRouter=express.Router();

purchasedReqRouter.get("/:id",purchasedReqConntroller.getSinglepurchasedReq),
purchasedReqRouter.get("/",purchasedReqConntroller.getAllpurchasedReq),
purchasedReqRouter.post("/",purchasedReqConntroller.createpurchasedReq),
purchasedReqRouter.put("/:id",purchasedReqConntroller.updatepurchasedReq),
purchasedReqRouter.delete("/:id",purchasedReqConntroller.deletepurchasedReq)

export default purchasedReqRouter