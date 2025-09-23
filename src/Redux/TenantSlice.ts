// store/slices/tenantSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';


// types.ts
export interface Tenant {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  phone_number: string;
  email: string;
  opening_time: string;
  closing_time: string;
  is_active: boolean;
  paid_until: string;
  on_trial: boolean;
  created_at: string;
  updated_at: string;
}


interface TenantState {
  tenant: Tenant | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TenantState = {
  tenant: null,
  status: 'idle',
  error: null,
};

// Async thunk to fetch tenant info
export const fetchTenantInfo = createAsyncThunk(
  'tenant/fetchTenantInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('tenant/tenant-info/',{withAuth: true});
      return response.data.tenant as Tenant;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || 'Failed to load tenant info');
    }
  }
);

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenantInfo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTenantInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tenant = action.payload;
      })
      .addCase(fetchTenantInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default tenantSlice.reducer;
