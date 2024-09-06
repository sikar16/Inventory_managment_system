import express from "express";
import departmentController from "./departmentController.js";
import { isAdmin } from "../../middleware/auth.js";

const departmentRouter = express.Router();

departmentRouter.get("/:id", departmentController.getSingleDepartment);
departmentRouter.get("/", departmentController.getAllDepartments);
departmentRouter.post("/", [isAdmin], departmentController.createDepartment);
departmentRouter.put("/:id", [isAdmin], departmentController.updateDepartment);
departmentRouter.delete(
  "/:id",
  [isAdmin],
  departmentController.deleteDepartment
);

export default departmentRouter;
