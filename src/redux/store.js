import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./product/category.slice";
import productSlice from "./product/product.slice";
import goodSlice from "./product/good.slice";
import companySlice from "./product/company.slice";


export const store = configureStore({
    reducer: {
        product : productSlice,
        category : categorySlice,
        good : goodSlice,
        company : companySlice
    }
})