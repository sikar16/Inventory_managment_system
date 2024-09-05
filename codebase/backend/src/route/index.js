import express from "express";
import userRouter from "../api/user/userRouter.js";
import departmentRouter from "../api/department/departmentRouter.js";
import supplierRoute from "../api/supplier/supplierRouter.js";
import supplierCategoryRouter from "../api/supplierCategory/supplierCategoryRouter.js";
import storeRouter from "../api/store/storeRouter.js";
import productCategoryRoute from "../api/ProductCategory/productCategoryRouter.js";
import productSubCategoryRoute from "../api/ProductSubCategory/productSubCategoryRouter.js";
import temeplateRouter from "../api/template/templeteRouter.js";
import productRouter from "../api/Product/producRouter.js";
import materialRequiestRoute from "../api/matreialRequiest/materialRequiestRouter.js";
import purchasedReqRouter from "../api/PurchaseReq/purchaseReqRouter.js";
const appRouter = express.Router();
appRouter.use("/user", userRouter);
appRouter.use("/department", departmentRouter);
appRouter.use("/supplier", supplierRoute);
appRouter.use("/supplierCategory", supplierCategoryRouter);
appRouter.use("/store", storeRouter);
appRouter.use("/productCategory", productCategoryRoute);
appRouter.use("/productSubCategory", productSubCategoryRoute);
appRouter.use("/temeplate", temeplateRouter);
appRouter.use("/product", productRouter);
appRouter.use("/materialReq", materialRequiestRoute);
appRouter.use("/purchasedReq", purchasedReqRouter);


export default appRouter;
