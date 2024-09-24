import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/user_service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { supplierApi } from "../services/supplier_service";
import { productCategoryApi } from "../services/productCategorySerivce";
import { productSubcategoryApi } from "../services/productSubcategory_service";
import { supplierCategoryApi } from "../services/supplierCategoryService";
import { productApi } from "../services/product_service";
import { templateApi } from "../services/template_service";
import { storeApi } from "../services/store_service";
import { departmentApi } from "../services/department_service";
import { materialReqApi } from "../services/materialReq_service";
import { purchasedReqApi } from "../services/purchasedReq_service";

export const store = configureStore({
  reducer: {
    // multiple reducers
    [userApi.reducerPath]: userApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [productCategoryApi.reducerPath]: productCategoryApi.reducer,
    [productSubcategoryApi.reducerPath]: productSubcategoryApi.reducer,
    [supplierCategoryApi.reducerPath]: supplierCategoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [materialReqApi.reducerPath]: materialReqApi.reducer,
    [purchasedReqApi.reducerPath]: purchasedReqApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(supplierApi.middleware)
      .concat(productCategoryApi.middleware)
      .concat(productSubcategoryApi.middleware)
      .concat(supplierCategoryApi.middleware)
      .concat(productApi.middleware)
      .concat(templateApi.middleware)
      .concat(storeApi.middleware)
      .concat(departmentApi.middleware)
      .concat(materialReqApi.middleware)
      .concat(purchasedReqApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
