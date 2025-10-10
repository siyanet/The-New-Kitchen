

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
import { Menu } from './MenuSlice';

export interface Discount {
  id: string;
  percentage: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  menu: Menu;
}

interface DiscountState {
  discounts: Discount[];
  discountLoading: boolean;
  discountError: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  discountLoading: false,
  discountError: null,
};

// Corrected async thunk to return an array of discounts
export const fetchDiscountedItems = createAsyncThunk<Discount[], void, { rejectValue: string }>(
  'discount/fetchDiscounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get<Discount[]>('items/discounts/', { withAuth: true });
      console.log("discount items");
      console.log(response);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to fetch discounts';
      return rejectWithValue(errorMsg);
    }
  }
);

const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountedItems.pending, (state) => {
        state.discountLoading = true;
        state.discountError = null;
      })
      .addCase(fetchDiscountedItems.fulfilled, (state, action: PayloadAction<Discount[]>) => {
        state.discountLoading = false;
        state.discounts = action.payload;
      })
      .addCase(fetchDiscountedItems.rejected, (state, action) => {
        state.discountLoading = false;
        state.discountError = action.payload || 'Unknown error';
      });
  },
});

export default discountSlice.reducer;
