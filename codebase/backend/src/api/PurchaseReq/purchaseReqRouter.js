import express from 'express'
import purchasedReqConntroller from './purchaseReqController.js';
const purchasedReqRouter=express.Router();

purchasedReqRouter.get("/:id",purchasedReqConntroller.getSinglepurchasedReq),
purchasedReqRouter.get("/",purchasedReqConntroller.getAllpurchasedReq),
purchasedReqRouter.post("/create",purchasedReqConntroller.createpurchasedReq),
purchasedReqRouter.put("/item/:id",purchasedReqConntroller.updatepurchasedReqItem),
purchasedReqRouter.delete("/:id",purchasedReqConntroller.deletepurchasedReq)

export default purchasedReqRouter