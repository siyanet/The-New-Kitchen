// // orderSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// // import { clearCart } from './cartSlice';
// // import { useDispatch } from 'react-redux';
// import AxiosInstance from '../Components/AxiosInstance';



// // Define the initial state
// const initialState = {
//   orderItems: [], // Changed cartItems to orderItems for clarity
//   // Add other initial states as needed
// };

// // Async thunk for placing an order
// // export const placeOrder = createAsyncThunk('order/placeOrder', async (orderData) => {
// //   const response = await AxiosInstance.post('/orders', orderData,{withAuth}); // Adjust the URL accordingly
  
// //   return response.data; // This will be the resolved value
// // });


// interface OrderItemPayload {
//   portion: string;
//   quantity: number;
//   extras: string[];
// }

// interface OrderPayload {
//   branch_id: string;
//   items: OrderItemPayload[];
// }

// export const placeOrder = createAsyncThunk(
//   'order/placeOrder',
//   async (orderData: OrderPayload, { rejectWithValue }) => {
//     try {
//       console.log("ordersitems");
//       console.log(orderData);
//       const response = await AxiosInstance.post('orders/orders/', orderData, {
//         withAuth: true,
//       });
//       return response.data;
//     } catch (error: any) {
//       console.log(error);
//       console.log(error.data)
//       return rejectWithValue(error.response?.data || 'An error occurred');
//     }
//   }
// );



// // Create the order slice
// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
    
//     // Add your reducers here
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(placeOrder.fulfilled, (state, action) => {
//         // Handle successful order placement
//         console.log('Order placed successfully:', action.payload);
//        // You can add logic to reset orderItems or update state as needed
//       })
//       .addCase(placeOrder.rejected, (state, action) => {
//         // Handle order placement error
//         console.error('Failed to place order:', action.error);
//         // You can add logic to handle errors as needed
//       });
//   },
// });

// // Export actions and reducer

// export default orderSlice.reducer;











import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
import { Branch } from './branchSlice';
import { Menu } from './MenuSlice';

// Interfaces for order structure


export interface OrderItem {
  id: string;
  portion: string;
  extras: string[];
  menu: Menu;
  portion_size: string;
  portion_price: number;
  quantity: number;
  extras_name: string[];

}

export interface Order {
  id: string;
  total_price: number;
  customer: string | null;
  branch: Branch;
  waiter: string | null;
  status: string;
  is_paid: boolean;
  created_at: string;
  items: OrderItem[];
  customer_name: string|null;
  waiter_name: string|null;
}

// Order state interface
interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Thunk for placing an order
interface OrderItemPayload {
  portion: string;
  quantity: number;
  extras: string[];
}

interface OrderPayload {
  branch_id: string;
  items: OrderItemPayload[];
}

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData: OrderPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('orders/orders/', orderData, {
        withAuth: true,
      });
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      console.log("error")
      console.log(error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('orders/orders/', {
        withAuth: true,
      });
      console.log("orders")
      console.log(response.data)
      return response.data as Order[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch orders');
    }
  }
);

// Slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeOrder.fulfilled, (state, action) => {
        console.log('Order placed:', action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        console.error('Order placement failed:', action.payload);
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
