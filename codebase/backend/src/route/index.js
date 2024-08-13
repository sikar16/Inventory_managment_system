import express from 'express'
import userRouter from '../api/user/userRouter.js';
import departmentRouter from '../api/department/departmentRouter.js';
import supplierRoute from '../api/supplier/supplierRouter.js';
import supplierCategoryRouter from '../api/supplierCategory/supplierCategoryRouter.js';
import storeRouter from '../api/store/storeRouter.js';
const appRouter=express.Router()
appRouter.use("/user",userRouter)
appRouter.use("/department",departmentRouter)
appRouter.use("/supplier",supplierRoute)
appRouter.use("/category",supplierCategoryRouter)
appRouter.use("/store",storeRouter)


export default appRouter;