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
import ratingsReducer from "./ReviewSlice";
import chefQueueReducer from "./chefOrderSllice";
import staffDetailReducer from "./staffDetailSlice";
import waitersSlliceReducer from "./filterWaiter";
import pendingOrdersReducer from "./pendingOrders";
import tenantReducer from "./TenantSlice";
import branchReducer from "./branchSlice";
import ownerOrdersReducer from "./ownerOrderSlice";
import kitchensReducer from "./kitchenSlice";
import waitersReducer from "./waiterSlice";


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
        ratings: ratingsReducer,
        chefQueue: chefQueueReducer,
        staffDetail: staffDetailReducer,
        filteredWaiters: waitersSlliceReducer,
        pendingOrders: pendingOrdersReducer,
        tenant: tenantReducer,
        branch: branchReducer,
        ownerOrders: ownerOrdersReducer,
        kitchens: kitchensReducer,
        waiters: waitersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;