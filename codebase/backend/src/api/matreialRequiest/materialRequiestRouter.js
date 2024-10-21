import express from "express";
import { isAdmin, isDH } from "../../middleware/auth.js";
import materialRequestController from "./materialRequiestController.js";
const materialRequestRoute = express.Router();
materialRequestRoute.get(
  "/departmenthead",
  materialRequestController.getAllMaterialRequestsByDepartmentHead
),
  materialRequestRoute.get(
    "/ls",
    materialRequestController.getAllMaterialRequestsByLs
  ),
  materialRequestRoute.get(
    "/my",
    materialRequestController.getAllMyMaterialRequests
  ),
  materialRequestRoute.get(
    "/:id",
    materialRequestController.getSingleaterialRequiest
  ),
  materialRequestRoute.get(
    "/",
    materialRequestController.getAllMaterialRequests
  ),
  materialRequestRoute.post(
    "/",
    materialRequestController.createMaterialRequest
  ),
  materialRequestRoute.put(
    "/item/:id",
    materialRequestController.updatematerialRequiestItem
  ),
  materialRequestRoute.put(
    "/departement/:id",
    materialRequestController.updatedDepartmentHead
  ),
  materialRequestRoute.put(
    "/approve/:id",
    [isDH],
    materialRequestController.approveMaterialRequiest
  ),
  materialRequestRoute.delete(
    "/:id",
    materialRequestController.deletematerialRequiest
  );
export default materialRequestRoute;
