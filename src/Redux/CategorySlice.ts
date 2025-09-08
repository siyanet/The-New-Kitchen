import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
import { RootState } from './Store';


export interface Category {
  id: string;
  name: string;
  menu_count: number;
}

interface CategoryState {
  category: Category[];
  categoryLoading: boolean;
  categoryError: string | null;
}

const initialState: CategoryState = {
  category: [],
  categoryLoading: false,
  categoryError: null,
};

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('items/categories/',{withAuth: true});
      return response.data as Category[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch categories');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload as string;
      });
  },
});

export const selectCategoryState = (state: RootState) => state.category;

export default categorySlice.reducer;
