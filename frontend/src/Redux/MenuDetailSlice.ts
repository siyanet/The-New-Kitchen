// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


// export const fetchMenuDetail = createAsyncThunk(
//   "menuDetail/fetchMenuDetail",
//   async (menuId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/menus/${menuId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const menuDetailSlice = createSlice({
//   name: "menuDetail",
//   initialState: {
//     item: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMenuDetail.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMenuDetail.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchMenuDetail.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default menuDetailSlice.reducer;



// export default menuSlice.reducer;










// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to fetch menu details by menuId
// export const fetchMenuDetail = createAsyncThunk(
//   'menuDetail/fetchMenuDetail',
//   async (menuId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/menus/${menuId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Menu detail slice
// const menuDetailSlice = createSlice({
//   name: 'menuDetail',
//   initialState: {
//     item: {},
//     status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMenuDetail.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchMenuDetail.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.item = action.payload;
//       })
//       .addCase(fetchMenuDetail.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export default menuDetailSlice.reducer;



import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
import { Menu } from './MenuSlice'; // Assuming your Menu interface is exported here

interface MenuDetailState {
  menuDetail: Menu | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuDetailState = {
  menuDetail: null,
  loading: false,
  error: null,
};

// Async thunk to fetch menu detail by id
export const fetchMenuDetail = createAsyncThunk<
  Menu,
  string, // menu id as argument
  { rejectValue: string }
>(
  'menuDetail/fetchMenuDetail',
  async (id, { rejectWithValue }) => {
    try {
      console.log("id");
      console.log(id);
      const response = await AxiosInstance.get<Menu>(`items/menus/${id}/`, { withAuth: true });
      console.log(response)
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to fetch menu detail';
      return rejectWithValue(errorMsg);
    }
  }
);

const menuDetailSlice = createSlice({
  name: 'menuDetail',
  initialState,
  reducers: {
    clearMenuDetail(state) {
      state.menuDetail = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuDetail.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.loading = false;
        state.menuDetail = action.payload;
      })
      .addCase(fetchMenuDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearMenuDetail } = menuDetailSlice.actions;
export default menuDetailSlice.reducer;
