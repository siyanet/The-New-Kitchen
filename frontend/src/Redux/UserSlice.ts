
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
