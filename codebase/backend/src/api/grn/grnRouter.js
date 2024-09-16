import express from 'express'
import grnController from './grnController.js';
import { isFinance, isLS ,isStoreKeeper} from "../../middleware/auth.js";

const grnRoute=express.Router();

grnRoute.get("/:id",[isStoreKeeper],grnController.getSingleGrn),
grnRoute.get("/",[isStoreKeeper],grnController.getAllGrn),
grnRoute.post("/",[isStoreKeeper],grnController.createGrn),
grnRoute.put("/items/:id",[isStoreKeeper],grnController.updateGrnItems),
grnRoute.put("/supplier/:id",[isStoreKeeper],grnController.updateGrnsupplier),
grnRoute.put("/po/:id",[isStoreKeeper],grnController.updateGrnPurchasedOrder),
grnRoute.delete("/:id",[isStoreKeeper],grnController.deleteGrn)

export default grnRoute;