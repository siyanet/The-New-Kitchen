

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
import { Menu } from './MenuSlice'; // Assuming your Menu interface is exported here

interface MenuDetailState {
  menuDetail: Menu | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuDetailState = {
  menuDetail: null,
  loading: false,
  error: null,
};

// Async thunk to fetch menu detail by id
export const fetchMenuDetail = createAsyncThunk<
  Menu,
  string, // menu id as argument
  { rejectValue: string }
>(
  'menuDetail/fetchMenuDetail',
  async (id, { rejectWithValue }) => {
    try {
      console.log("id");
      console.log(id);
      const response = await AxiosInstance.get<Menu>(`items/menus/${id}/`, { withAuth: true });
      console.log(response)
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to fetch menu detail';
      return rejectWithValue(errorMsg);
    }
  }
);

const menuDetailSlice = createSlice({
  name: 'menuDetail',
  initialState,
  reducers: {
    clearMenuDetail(state) {
      state.menuDetail = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuDetail.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.loading = false;
        state.menuDetail = action.payload;
      })
      .addCase(fetchMenuDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearMenuDetail } = menuDetailSlice.actions;
export default menuDetailSlice.reducer;
