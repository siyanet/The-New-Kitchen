// orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearCart } from './cartSlice';
import { useDispatch } from 'react-redux';



// Define the initial state
const initialState = {
  orderItems: [], // Changed cartItems to orderItems for clarity
  // Add other initial states as needed
};

// Async thunk for placing an order
export const placeOrder = createAsyncThunk('order/placeOrder', async (orderData) => {
  const response = await axios.post('http://127.0.0.1:8000/api/orders', orderData); // Adjust the URL accordingly
  
  return response.data; // This will be the resolved value
});

// Create the order slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    
    // Add your reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        // Handle successful order placement
        console.log('Order placed successfully:', action.payload);
       // You can add logic to reset orderItems or update state as needed
      })
      .addCase(placeOrder.rejected, (state, action) => {
        // Handle order placement error
        console.error('Failed to place order:', action.error);
        // You can add logic to handle errors as needed
      });
  },
});

// Export actions and reducer

export default orderSlice.reducer;
