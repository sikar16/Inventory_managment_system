import express from 'express'
import userRouter from '../api/user/userRouter.js';
const appRouter=express.Router()
appRouter.use("/user",userRouter)

export default appRouter;