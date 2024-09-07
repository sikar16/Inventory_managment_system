import express from 'express'
import grnController from './grnController.js';

const grnRoute=express.Router();

grnRoute.get("/:id",grnController.getSingleGrn),
grnRoute.get("/",grnController.getAllGrn),
grnRoute.post("/",grnController.createGrn),
grnRoute.put("/:id",grnController.updateGrn),
grnRoute.delete("/:id",grnController.deleteGrn)

export default grnRoute;