// src/redux/chefQueueSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';

// Async thunk for fetching orders
export const fetchChefQueueOrders = createAsyncThunk('chefQueue/fetchOrders', async () => {
  const response = await AxiosInstance.get('/chef-queue'); // Adjust the endpoint
  console.log("respone");
  console.log(response);
  console.log("cheforders");
  console.log(response.data.queued_orders);
  
  return response.data.queued_orders; // Assuming response.data contains the orders array
});

// Create slice
const chefQueueSlice = createSlice({
  name: 'chefQueue',
  initialState: {
    chefOrders: [],
    chefOrderLoading: false,
    chefOrderError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChefQueueOrders.pending, (state) => {
        state.chefOrderLoading = true;
        state.chefOrderError = null;
      })
      .addCase(fetchChefQueueOrders.fulfilled, (state, action) => {
        
        state.chefOrderLoading = false;
        state.chefOrders = action.payload; // Assuming payload is the orders array
      })
      .addCase(fetchChefQueueOrders.rejected, (state, action) => {
        state.chefOrderLoading = true;
        state.chefOrderError = action.error.message;
      });
  },
});

// Export actions and reducer
export default chefQueueSlice.reducer;
