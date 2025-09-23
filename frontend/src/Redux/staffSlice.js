import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';


// Async thunk to fetch staff data
export const fetchStaff = createAsyncThunk(
  'staff/fetchStaff',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance('/staff'); // Adjust API endpoint as needed
      return response.data.staff;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    staffs: [],
    staffLoading: false,
    staffError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.staffLoading = true;
        state.staffError = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.staffs = action.payload;
        state.staffLoading = false;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.staffLoading = false;
        state.staffError = action.payload || 'Failed to load staff data';
      });
  },
});

export default staffSlice.reducer;
