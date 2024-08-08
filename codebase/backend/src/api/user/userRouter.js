import express from 'express'
import userController from './userController.js'

const userRouter=express.Router()
userRouter.get("/:id",userController.getSingleUser)
userRouter.get("/",userController.getAllUsers)
userRouter.post("/register",userController.createUser)
userRouter.post("/login",userController.login)
userRouter.put("/:id",userController.updateUser)
userRouter.delete("/:id",userController.deleteUser)

export default userRouter; 