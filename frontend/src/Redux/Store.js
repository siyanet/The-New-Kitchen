import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import menuReducer from "./MenuSlice";
import menuDetailReducer from "./MenuDetailSlice";
import extraReducer from "./ExtraSlice";
import orderReducer from "./orderSlice";
import categoryReducer from "./CategorySlice";
import discountReducer from "./DiscountSlice";
import userOrdersReducer from "./orderDetailSlice";

import userReducer from "./UserSlice";
import locationReducer from "./LocationSlice";
import tableReducer from "./tableSlice";
import staffReducer from "./staffSlice";
import reviewsReducer from "./ReviewSlice";
import chefQueueReducer from "./chefOrderSllice";
import staffDetailReducer from "./staffDetailSlice";
import waitersSlliceReducer from "./filterWaiter";
import pendingOrdersReducer from "./pendingOrders";


const store = configureStore({
    reducer:{
        cart: cartReducer,
        menu: menuReducer,
        menuDetail : menuDetailReducer,
        extras: extraReducer,
        order: orderReducer,
        category: categoryReducer,
        discount: discountReducer,
        orders: userOrdersReducer,
        user: userReducer,
        locations:locationReducer,
        tables:tableReducer,
        staff: staffReducer,
        reviews: reviewsReducer,
        chefQueue: chefQueueReducer,
        staffDetail: staffDetailReducer,
        filteredWaiters: waitersSlliceReducer,
        pendingOrders: pendingOrdersReducer,
    },
});
export default store;