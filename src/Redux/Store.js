import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import menuReducer from "./MenuSlice";
import menuDetailReducer from "./MenuDetailSlice";
import extraReducer from "./ExtraSlice";


const store = configureStore({
    reducer:{
        cart: cartReducer,
        menu: menuReducer,
        menuDetail : menuDetailReducer,
        extras: extraReducer,
    },
});
export default store;