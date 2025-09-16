import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchMenus = createAsyncThunk('menu/fetchMenus', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/menus');
  return response.data;
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menus: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
