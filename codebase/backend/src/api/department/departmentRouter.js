import express from 'express';
import departmentController from './departmentController.js';

const departmentRouter = express.Router();

departmentRouter.get("/:id", departmentController.getSingleDepartment);
departmentRouter.get("/", departmentController.getAllDepartments);
departmentRouter.post("/", departmentController.createDepartment);
departmentRouter.put("/:id", departmentController.updateDepartment);
departmentRouter.delete("/:id", departmentController.deleteDepartment);

export default departmentRouter;
