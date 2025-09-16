import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';

// Async thunk for fetching tables
export const fetchTables = createAsyncThunk(
  'tables/fetchTables', // Action type
  async (_, thunkAPI) => {
    try {
      const response = await AxiosInstance.get('/tables');
      // Replace with your API endpoint
      return response.data.tables; // Return only the tables array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch tables');
    }
  }
);

// Initial state
const initialState = {
  tables: [],
  loading: false,
  error: null,
};

// Table slice
const tableSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tableSlice.reducer;
