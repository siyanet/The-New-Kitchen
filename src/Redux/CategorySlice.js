// categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/categories');
  return response.data; // The response should contain the category data
});

// Initial state
const initialState = {
  category: [],
  loading: false,
  error: null
};

// Category slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.category = action.payload; // Update categories when data is fetched
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store error message
      });
  }
});

// Export the reducer to be used in the store
export default categorySlice.reducer;
