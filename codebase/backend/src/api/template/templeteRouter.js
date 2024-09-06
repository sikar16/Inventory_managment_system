import express from "express";
import templateController from "./templetController.js";
import { isAdmin } from "../../middleware/auth.js";
const templateRouter = express.Router();
templateRouter.get("/:id", templateController.getSigletemplete),
  templateRouter.get("/", templateController.getAlltemplete),
  templateRouter.post("/", [isAdmin], templateController.creattemplete),
  templateRouter.put("/:id", [isAdmin], templateController.updatetemplete),
  templateRouter.put(
    "/attribute/:id",
    [isAdmin],
    templateController.updateTemplateAttribute
  ),
  templateRouter.delete("/:id", [isAdmin], templateController.deletetemplete);
export default templateRouter;
