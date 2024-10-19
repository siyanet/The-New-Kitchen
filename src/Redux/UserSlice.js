import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
 // Axios instance with interceptor

// Thunk to fetch user data
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await  AxiosInstance.get('/user'); // Replace with your actual API endpoint
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Stores the user data
    isAuthenticated: false, // Tracks if the user is logged in
    status: 'idle', // Tracks loading status
    error: null, // Stores any error
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('pizzaHutToken'); // Remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true; // Set to true since we fetched user data successfully
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false; // If fetching failed, user is considered not authenticated
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
