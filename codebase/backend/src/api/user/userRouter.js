import express from 'express'
import userController from './userController.js'
import {isAdmin, isAuth} from '../../middleware/auth.js'
const userRouter=express.Router()
userRouter.get("/:id",userController.getSingleUser)
userRouter.get("/",userController.getAllUsers)
userRouter.post("/register",userController.createUser)//[isAuth,isAdmin]
userRouter.put("/:id",userController.updateUser)
userRouter.delete("/:id",userController.deleteUser)

export default userRouter; 