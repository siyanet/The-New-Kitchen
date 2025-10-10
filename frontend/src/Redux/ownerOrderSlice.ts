// src/features/order/orderSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
import { Menu } from './MenuSlice';
import { Branch } from './branchSlice';




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
}

interface OrderState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  status: 'idle',
  error: null
};



export const fetchOrders = createAsyncThunk<Order[]>(
  'orders/fetchOrders',
  async (_, thunkAPI) => {
    try {
      const response = await AxiosInstance.get('orders/orders/', { withAuth: true });
      console.log("owner");
      console.log(response.data);
      return response.data as Order[];
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || error.message || 'Failed to fetch orders'
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'ownerOrders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export default orderSlice.reducer;
