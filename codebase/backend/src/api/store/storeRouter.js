import express from 'express'
import storeController from './storeController.js'

const storeRouter=express.Router()

storeRouter.get("/:id",storeController.getSingleStore)
storeRouter.get("/",storeController.getAllStores)
storeRouter.post("/",storeController.createStore)
storeRouter.put("/:id",storeController.updateStore)
storeRouter.delete("/:id",storeController.deleteStore)

export default storeRouter;