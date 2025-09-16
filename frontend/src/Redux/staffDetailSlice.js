import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch staff details
export const fetchStaffDetails = createAsyncThunk("staff/fetchStaffDetails", async (staffId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/staff/${staffId}`);
    return response.data.staff;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Initial state
const initialState = {
  staffDetail: null,
  staffDetailStatus: "idle", // "idle" | "loading" | "succeeded" | "failed"
  staffDetailError: null,
};

// Slice
const staffDetailSlice = createSlice({
  name: "staffDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffDetails.pending, (state) => {
        state.staffDetailStatus = "loading";
        state.staffDetailError = null;
      })
      .addCase(fetchStaffDetails.fulfilled, (state, action) => {
        state.staffDetailStatus = "succeeded";
        state.staffDetail = action.payload;
      })
      .addCase(fetchStaffDetails.rejected, (state, action) => {
        state.staffDetailStatus = "failed";
        state.staffDetailError = action.payload;
      });
  },
});

export default staffDetailSlice.reducer;

