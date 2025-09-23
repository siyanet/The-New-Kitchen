// src/features/waiter/waiterSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
import { User } from './UserSlice';
import { Branch } from './branchSlice';

// ------------------------
// Interfaces
// ------------------------

export interface Staff {
  id: string;
  user: User;
  branch: Branch;
  permissions: string[];
  user_detail: User;
  created_at: string;
  updated_at: string;
}

export interface Waiter {
  id: string;
  staff: Staff;
  qr_image: string;
  qr_token: string;
  created_at: string;
  updated_at: string;
}

interface WaiterState {
  waiters: Waiter[];          // Now handles multiple waiters
  loading: boolean;
  error: string | null;
}

// ------------------------
// Initial State
// ------------------------

const initialState: WaiterState = {
  waiters: [],
  loading: false,
  error: null,
};

// ------------------------
// Async Thunk: Fetch All Waiters
// ------------------------

export const fetchWaiters = createAsyncThunk<Waiter[]>(
  'waiter/fetchWaiters',
  async (_, thunkAPI) => {
    const response = await AxiosInstance.get<Waiter[]>('staffs/waiters/', {withAuth: true});
    return response.data;
  }
);

// ------------------------
// Slice
// ------------------------

const waiterSlice = createSlice({
  name: 'waiter',
  initialState,
  reducers: {
    clearWaiters: (state) => {
      state.waiters = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaiters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaiters.fulfilled, (state, action: PayloadAction<Waiter[]>) => {
        state.waiters = action.payload;
        state.loading = false;
      })
      .addCase(fetchWaiters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch waiters';
      });
  },
});

export const { clearWaiters } = waiterSlice.actions;
export default waiterSlice.reducer;
