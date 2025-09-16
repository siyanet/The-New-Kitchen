import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
// Async thunk for fetching waiters by location
export const fetchWaitersByLocation = createAsyncThunk(
  'waiters/fetchByLocation',
  async (locationId, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`/filterstaffbylocation/${locationId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const waitersSlice = createSlice({
  name: 'waiters',
  initialState: {
    filteredWaiters: [],        // Array to hold filtered waiter data
    filteredWaitersLoading: false, // Loading state for filtering waiters
    filteredWaitersError: null     // Error state for filtering waiters
  },
  reducers: {
    // Any additional synchronous actions can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaitersByLocation.pending, (state) => {
        state.filteredWaitersLoading = true;
        state.filteredWaitersError = null;
      })
      .addCase(fetchWaitersByLocation.fulfilled, (state, action) => {
        state.filteredWaitersLoading = false;
        state.filteredWaiters = action.payload;
      })
      .addCase(fetchWaitersByLocation.rejected, (state, action) => {
        state.filteredWaitersLoading = false;
        state.filteredWaitersError = action.payload || 'Failed to fetch waiters data';
      });
  }
});

export default waitersSlice.reducer;
