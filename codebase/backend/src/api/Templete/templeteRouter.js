import express from "express"
import templateController from "./templetController.js"
const templateRouter=express.Router()
templateRouter.get("/:id",templateController.getSigletemplete),
templateRouter.get("/",templateController.getAlltemplete),
templateRouter.post("/",templateController.creattemplete),
templateRouter.put("/:id",templateController.updatetemplete),
templateRouter.delete("/:id",templateController.deletetemplete)
export default templateRouter