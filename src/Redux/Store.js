import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import menuReducer from "./MenuSlice";


const store = configureStore({
    reducer:{
        cart: cartReducer,
        menu: menuReducer,
    },
});
export default store;