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
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch menu details by menuId
export const fetchMenuDetail = createAsyncThunk(
  'menuDetail/fetchMenuDetail',
  async (menuId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/menus/${menuId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Menu detail slice
const menuDetailSlice = createSlice({
  name: 'menuDetail',
  initialState: {
    item: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuDetail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMenuDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addCase(fetchMenuDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default menuDetailSlice.reducer;
