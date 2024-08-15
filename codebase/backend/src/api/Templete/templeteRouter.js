import express from "express"
import templeteController from "./templetController.js"
const templeteRoute=express.Router()
templeteRoute.get("/:id",templeteController.getSigletemplete)
templeteRoute.get("",templeteController.getAlltemplete)
templeteRoute.post("/",templeteController.creattemplete)
templeteRoute.put("/:id",templeteController.updatetemplete)
templeteRoute.delete("/:id",templeteController.deletetemplete)
export default templeteRoute