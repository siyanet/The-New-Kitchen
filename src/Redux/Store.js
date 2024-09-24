import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import menuReducer from "./MenuSlice";
import menuDetailReducer from "./MenuDetailSlice";
import extraReducer from "./ExtraSlice";
import orderReducer from "./orderSlice";
import categoryReducer from "./CategorySlice"


const store = configureStore({
    reducer:{
        cart: cartReducer,
        menu: menuReducer,
        menuDetail : menuDetailReducer,
        extras: extraReducer,
        order: orderReducer,
        category: categoryReducer,
    },
});
export default store;