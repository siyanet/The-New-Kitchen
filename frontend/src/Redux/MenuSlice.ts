import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';


// ----------------------
// Types
// ----------------------

export interface Portion {
  id: string;
  size: 'small' | 'medium' | 'large';
  price: number;
  discounted_price: number | null;
}

export interface Menu {
  id: string;
  category: string; // or string if it's a string
  name: string;
  description: string;
  image: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  average_rating: number;
  portions: Portion[];
}

interface MenusState {
  menus: Menu[];
  menusLoading: boolean;
  menusError: string | null;
}

// ----------------------
// Initial State
// ----------------------

const initialState: MenusState = {
  menus: [],
  menusLoading: false,
  menusError: null,
};

// ----------------------
// Async Thunk
// ----------------------

export const fetchMenus = createAsyncThunk<Menu[]>(
  'menus/fetchMenus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get<Menu[]>('items/menus/'); // update endpoint if needed
     
      return response.data;
    } catch (err: any) {
      const message =
        err.response?.data?.detail ||
        err.message ||
        'Something went wrong while fetching menus';
      return rejectWithValue(message);
    }
  }
);

// ----------------------
// Slice
// ----------------------

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.menusLoading = true;
        state.menusError = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action: PayloadAction<Menu[]>) => {
        state.menus = action.payload;
        state.menusLoading = false;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.menusLoading = false;
        state.menusError = action.payload as string;
      });
  },
});

export default menusSlice.reducer;


