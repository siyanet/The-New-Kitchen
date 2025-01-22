// src/features/locations/locationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';

// Async thunk to fetch locations
export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    const response = await AxiosInstance.get('/location'); // Replace with your actual API endpoint
    return response.data;
  }
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: [],
    locationStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    locationError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.locationStatus = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locationStatus = 'succeeded';
        // Add the fetched locations to the array
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.locationStatus = 'failed';
        state.locationError = action.error.message;
      });
  },
});

export default locationsSlice.reducer;
