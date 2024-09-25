import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch the discounts from the backend
export const fetchDiscountedItems = createAsyncThunk(
  'discount/fetchDiscountedItems',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/discounts'); // Replace with your actual API endpoint
    return response.data;  // The array of discount items
  }
);

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountedItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiscountedItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiscountedItems.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default discountSlice.reducer;
