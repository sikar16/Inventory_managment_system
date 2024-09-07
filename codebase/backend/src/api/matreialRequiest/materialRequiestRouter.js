import express from "express";
import { isAdmin, isDH } from "../../middleware/auth.js";
import materialRequiestController from "./materialRequiestController.js";
const materialRequiestRoute = express.Router();

materialRequiestRoute.get(
  "/:id",
  materialRequiestController.getSinglematerialRequiest
),
  materialRequiestRoute.get(
    "/",
    materialRequiestController.getAllMaterialRequests
  ),
  materialRequiestRoute.post(
    "/",
    materialRequiestController.createMaterialRequest
  ),
  materialRequiestRoute.put(
    "/item/:id",
    materialRequiestController.updatematerialRequiestItem
  ),
  materialRequiestRoute.put(
    "/departement/:id",
    materialRequiestController.updatedDepartmentHead
  ),
  materialRequiestRoute.put(
    "/approve/:id",
    [isDH],
    materialRequiestController.approveMaterialRequiest
  ),
  materialRequiestRoute.delete(
    "/:id",
    materialRequiestController.deletematerialRequiest
  );
export default materialRequiestRoute;
