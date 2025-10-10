

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
