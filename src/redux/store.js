import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category.slice";
import productSlice from "./product.slice";
import goodSlice from "./good.slice";
import companySlice from "./company.slice";
import userSlice from "./user.slice";


export const store = configureStore({
    reducer: {
        product : productSlice,
        category : categorySlice,
        good : goodSlice,
        company : companySlice,
        user : userSlice,
    }
})