// // src/redux/reviewsSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';


// // Async thunk for fetching reviews
// export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async() => {
//     const response = await axios.get(`http://127.0.0.1:8000/api/reviews`);
//     return response.data; // Assuming the API response is an array of reviews
// });

// const reviewsSlice = createSlice({
//     name: 'reviews',
//     initialState: {
//         reviews: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         clearReviews: (state) => {
//             state.reviews = [];
//             state.loading = false;
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchReviews.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchReviews.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.reviews = action.payload;
//             })
//             .addCase(fetchReviews.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// // Export actions and reducer
// export const { clearReviews } = reviewsSlice.actions;
// export default reviewsSlice.reducer;


// redux/slices/ratingsSlice.ts

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
