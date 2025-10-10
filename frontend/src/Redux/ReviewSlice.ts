

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AxiosInstance from "../Components/AxiosInstance";
import { User } from "./UserSlice";
import { Menu } from "./MenuSlice";

export interface Rating {
  id: string;
  customer: User;
  menu: Menu;
  rating: number;
  comment: string;
  created_at: string;
}

interface RatingState {
  ratings: Rating[];
  loading: boolean;
  error: string | null;
}

const initialState: RatingState = {
  ratings: [],
  loading: false,
  error: null,
};

// Async thunk to fetch ratings
export const fetchRatings = createAsyncThunk<Rating[]>(
  "ratings/fetchRatings",
  async (_, thunkAPI) => {
    try {
      const response = await AxiosInstance.get<Rating[]>("orders/ratings/",{withAuth:true});
      return response.data as Rating[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.detail || "Failed to fetch ratings");
    }
  }
);

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatings.fulfilled, (state, action: PayloadAction<Rating[]>) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(fetchRatings.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ratingsSlice.reducer;
