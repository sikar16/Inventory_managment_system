import express from 'express'
import grnController from './grnController.js';
import { isFinance, isLS } from "../../middleware/auth.js";

const grnRoute=express.Router();

grnRoute.get("/:id",[isLS,isFinance],grnController.getSingleGrn),
grnRoute.get("/",[isLS,isFinance],grnController.getAllGrn),
grnRoute.post("/",[isLS],grnController.createGrn),
grnRoute.put("/:id",[isLS],grnController.updateGrn),
grnRoute.delete("/:id",[isLS],grnController.deleteGrn)

export default grnRoute;