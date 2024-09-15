import express from "express";
import { isLS } from "../../middleware/auth.js";
import winnerController from "./winnerController.js";

const departmentRouter = express.Router();

departmentRouter.get("/:id",[isLS], winnerController.getSinglewinner);
departmentRouter.get("/", [isLS],winnerController.getAllwinners);
departmentRouter.post("/", [isLS], winnerController.createWinner);
departmentRouter.put("/supplier/:id", [isLS], winnerController.updatesupplier);
departmentRouter.put("/items/:id", [isLS], winnerController.updatepurchedOrder);
departmentRouter.delete("/:id",[isLS],winnerController.deletewinner);

export default departmentRouter;
