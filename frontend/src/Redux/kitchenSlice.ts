import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { User } from './UserSlice';
import { Branch } from './branchSlice';
import { Category } from './CategorySlice';
import AxiosInstance from '../Components/AxiosInstance';

// Types

interface Staff {
  id: string;
  user: User;
  branch: Branch;
  permissions: string[];
  user_detail: User;
  created_at: string;
  updated_at: string;
}



export interface Kitchen {
  id: string;
  staff: Staff;
  categories: string[];
  categories_detail: Category[];
  created_at: string;
  updated_at: string;
}

interface KitchenState {
  kitchens: Kitchen[];
  loading: boolean;
  error: string | null;
}

const initialState: KitchenState = {
  kitchens: [],
  loading: false,
  error: null,
};

// Async thunk
export const fetchKitchens = createAsyncThunk(
  'kitchens/fetchKitchens',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('staffs/kitchens/',{withAuth:true});
    
      return response.data as Kitchen[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch kitchens');
    }
  }
);

// Slice
const kitchenSlice = createSlice({
  name: 'kitchens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKitchens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKitchens.fulfilled, (state, action) => {
        state.loading = false;
        state.kitchens = action.payload;
      })
      .addCase(fetchKitchens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default kitchenSlice.reducer;
