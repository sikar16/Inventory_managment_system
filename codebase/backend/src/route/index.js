import express from 'express'
import userRouter from '../api/user/userRouter.js';
import departmentRouter from '../api/department/departmentRouter.js';
import supplierRoute from '../api/supplier/supplierRouter.js';
import supplierCategoryRouter from '../api/supplierCategory/supplierCategoryRouter.js';
import storeRouter from '../api/store/storeRouter.js';
import productCategoryRoute from '../api/ProductCategory/productCategoryRouter.js';
import productSubCategoryRoute from '../api/ProductSubCategory/ProductSubCategoryRouter.js';
import templeteRoute from '../api/Templete/templeteRouter.js'
const appRouter=express.Router()
appRouter.use("/user",userRouter)
appRouter.use("/department",departmentRouter)
appRouter.use("/supplier",supplierRoute)
appRouter.use("/supplierCategory",supplierCategoryRouter)
appRouter.use("/store",storeRouter)
appRouter.use("/productCategory",productCategoryRoute)
appRouter.use("/productSubCategory",productSubCategoryRoute)
appRouter.use("/temeplate",templeteRoute)



export default appRouter;