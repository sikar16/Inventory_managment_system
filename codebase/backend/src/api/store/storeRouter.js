import express from "express";
import storeController from "./storeController.js";
import { isAdmin } from "../../middleware/auth.js";
const storeRouter = express.Router();

storeRouter.get("/:id", storeController.getSingleStore);
storeRouter.get("/", storeController.getAllStores);
storeRouter.post("/", [isAdmin], storeController.createStore);
storeRouter.put("/:id", [isAdmin], storeController.updateStore);
storeRouter.delete("/:id", [isAdmin], storeController.deleteStore);

export default storeRouter;
