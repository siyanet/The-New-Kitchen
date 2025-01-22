// src/redux/reviewsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Async thunk for fetching reviews
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async() => {
    const response = await axios.get(`http://127.0.0.1:8000/api/reviews`);
    return response.data; // Assuming the API response is an array of reviews
});

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearReviews: (state) => {
            state.reviews = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions and reducer
export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
