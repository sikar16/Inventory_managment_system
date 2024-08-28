import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/user_service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { supplierApi } from "../services/supplier_service";
import { productCategoryApi } from "../services/productCategorySerivce";

export const store = configureStore({
  reducer: {
    // multiple reducers
    [userApi.reducerPath]: userApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [productCategoryApi.reducerPath]: productCategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(supplierApi.middleware)
      .concat(productCategoryApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
