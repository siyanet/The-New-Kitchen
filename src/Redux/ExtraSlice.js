// extraSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch extras
export const fetchExtras = createAsyncThunk(
  'extras/fetchExtras',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/extras');
      return response.data; // Assuming this returns an array of extras
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Extras slice
const extraSlice = createSlice({
  name: 'extras',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExtras.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchExtras.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchExtras.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default extraSlice.reducer;
