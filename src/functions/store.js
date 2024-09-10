import { configureStore } from "@reduxjs/toolkit";
import countSlice from "../features/ecom/countSlice";
import cartSlice from "../features/ecom/cartSlice";
import loginSlice from "../features/ecom/loginSlice";

export const store = configureStore({
    reducer:{
        count:countSlice,
        login:loginSlice,
        cart:cartSlice
    }
})