import express from 'express'
import userRouter from '../api/user/userRouter.js';
import departmentRouter from '../api/department/departmentRouter.js';
import supplierRoute from '../api/supplier/supplierRouter.js';
const appRouter=express.Router()
appRouter.use("/user",userRouter)
appRouter.use("/department",departmentRouter)
appRouter.use("/supplier",supplierRoute)


export default appRouter;