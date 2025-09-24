import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AxiosInstance from '../Components/AxiosInstance';

export interface Branch {
  id: string;
  name: string;
  longitude: string;
  latitude: string;
  description: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

interface BranchState {
  branches: Branch[];
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  branches: [],
  loading: false,
  error: null,
};

// Async thunk to fetch branches from API
export const fetchBranches = createAsyncThunk(
  'branch/fetchBranches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('restaurant/branches/',{ withAuth: true }); // Replace with your endpoint
      
      console.log("branches")
      console.log(response.data);
      return response.data; // Must be array of branches
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to load branches');
    }
  }
);

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action: PayloadAction<Branch[]>) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default branchSlice.reducer;
