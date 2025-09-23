// src/features/ordersDetailSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';

// Async thunk to fetch orders (You may replace the URL with your actual endpoint)
export const fetchOrdersDetails = createAsyncThunk('ordersDetail/fetchOrdersDetails', async () => {
    const response = await AxiosInstance("/orders");// Update with your actual endpoint
    const data = await response.json();
    return data;
});

const ordersDetailSlice = createSlice({
    name: 'ordersDetail',
    initialState: {
        orders: [], // Array to hold the fetched orders
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null, // To hold error messages
    },
    reducers: {}, // You can add reducers here if needed
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersDetails.pending, (state) => {
                state.status = 'loading'; // Set loading state
            })
            .addCase(fetchOrdersDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set succeeded state
                state.orders = action.payload; // Update orders with fetched data
            })
            .addCase(fetchOrdersDetails.rejected, (state, action) => {
                state.status = 'failed'; // Set failed state
                state.error = action.error.message; // Store error message
            });
    },
});

// Export the async thunk
// export { fetchOrdersDetails };

// Export the selector to access orders
// export const selectOrders = (state) => state.ordersDetail.orders; // Update the state path to reflect the new slice name

// Export the reducer
export default ordersDetailSlice.reducer;
