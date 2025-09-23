import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
// Async thunk to fetch pending orders
export const fetchPendingOrders = createAsyncThunk(
  'orders/fetchPendingOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('orderspending'); // Adjust endpoint as necessary
      return response.data.pending_orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const pendingOrdersSlice = createSlice({
  name: 'pendingOrders',
  initialState: {
    pendingOrders: [],
    pendingOrdersloading: false,
    pendingOrderserror: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingOrders.pending, (state) => {
        state.pendingOrdersloading = true;
        state.pendingOrderserror = null;
      })
      .addCase(fetchPendingOrders.fulfilled, (state, action) => {
        state.pendingOrdersloading = false;
        state.pendingOrders = action.payload;
      })
      .addCase(fetchPendingOrders.rejected, (state, action) => {
        state.pendingOrdersloading = false;
        state.pendingOrderserror = action.payload || 'Failed to load pending orders';
      });
  },
});

export default pendingOrdersSlice.reducer;
