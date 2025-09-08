// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AxiosInstance from '../Components/AxiosInstance';
//  // Axios instance with interceptor

// // Thunk to fetch user data
// export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
//   try {
//     const response = await  AxiosInstance.get('/user'); // Replace with your actual API endpoint
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user: null, // Stores the user data
//     isAuthenticated: false, // Tracks if the user is logged in
//     status: 'idle', // Tracks loading status
//     error: null, // Stores any error
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('pizzaHutToken'); // Remove token on logout
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.isAuthenticated = true; // Set to true since we fetched user data successfully
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//         state.isAuthenticated = false; // If fetching failed, user is considered not authenticated
//       });
//   },
// });

// export const { logout } = userSlice.actions;

// export default userSlice.reducer;


// features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';


// types.ts
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: string; // or use a union if roles are fixed
}

// src/features/user/userSlice.ts

interface UserState {
  user: User | null;
  userLoading: boolean;
  userError: string | null;
}

const initialState: UserState = {
  user: null,
  userLoading: false,
  userError: null,
};

// Thunk to fetch authenticated user
export const fetchUser = createAsyncThunk<User>(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await AxiosInstance.get('auth/users/me/', {
        withAuth: true, // Custom flag to attach token via interceptor
      });
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch authenticated user';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.userError = null;
      state.userLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
