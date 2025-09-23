// // extraSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch extras
// export const fetchExtras = createAsyncThunk(
//   'extras/fetchExtras',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/extras');
//       return response.data; // Assuming this returns an array of extras
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Extras slice
// const extraSlice = createSlice({
//   name: 'extras',
//   initialState: {
//     items: [],
//     status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchExtras.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchExtras.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(fetchExtras.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export default extraSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';

export interface Extra {
  id: string;
  name: string;
  price: string; // price as string
}

interface ExtrasState {
  extras: Extra[];
  loading: boolean;
  error: string | null;
}

const initialState: ExtrasState = {
  extras: [],
  loading: false,
  error: null,
};

// Async thunk to fetch extras list (assuming endpoint is /extras/)
export const fetchExtras = createAsyncThunk<
  Extra[],
  void,
  { rejectValue: string }
>(
  'extras/fetchExtras',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get<Extra[]>('items/extras/', { withAuth: true });
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to fetch extras';
      return rejectWithValue(errorMsg);
    }
  }
);

const extrasSlice = createSlice({
  name: 'extras',
  initialState,
  reducers: {
    clearExtras(state) {
      state.extras = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExtras.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExtras.fulfilled, (state, action: PayloadAction<Extra[]>) => {
        state.loading = false;
        state.extras = action.payload;
      })
      .addCase(fetchExtras.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearExtras } = extrasSlice.actions;
export default extrasSlice.reducer;
