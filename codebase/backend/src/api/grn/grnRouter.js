import express from 'express'
import grnController from './grnController.js';
import { isAnyRole } from "../../middleware/auth.js"; // Import the new middleware
import { CompanyRole } from "@prisma/client"; // Import CompanyRole

const grnRoute = express.Router();

// Allow access if the user is either STORE_KEEPER, FINANCE, or LOGISTIC_SUPERVISOR
grnRoute.get("/:id", isAnyRole(CompanyRole.STORE_KEEPER, CompanyRole.FINANCE, CompanyRole.LOGESTIC_SUPERVISER), grnController.getSingleGrn);
grnRoute.get("/", isAnyRole(CompanyRole.STORE_KEEPER, CompanyRole.FINANCE, CompanyRole.LOGESTIC_SUPERVISER), grnController.getAllGrn);
grnRoute.post("/", isAnyRole(CompanyRole.STORE_KEEPER), grnController.createGrn);
grnRoute.put("/items/:id", isAnyRole(CompanyRole.STORE_KEEPER), grnController.updateGrnItems);
grnRoute.put("/supplier/:id", isAnyRole(CompanyRole.STORE_KEEPER), grnController.updateGrnsupplier);
grnRoute.put("/po/:id", isAnyRole(CompanyRole.STORE_KEEPER), grnController.updateGrnPurchasedOrder);
grnRoute.delete("/:id", isAnyRole(CompanyRole.STORE_KEEPER), grnController.deleteGrn);

export default grnRoute;
