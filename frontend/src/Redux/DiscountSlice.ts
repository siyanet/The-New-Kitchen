// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AxiosInstance from '../Components/AxiosInstance';

// // Async action to fetch the discounts from the backend
// export const fetchDiscountedItems = createAsyncThunk(
//   'discount/fetchDiscountedItems',
//   async () => {
//     const response = await AxiosInstance.get('discounts'); // Replace with your actual API endpoint
//     return response.data;  // The array of discount items
//   }
// );

// const discountSlice = createSlice({
//   name: 'discount',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDiscountedItems.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDiscountedItems.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchDiscountedItems.rejected, (state, action) => {
//         state.error = action.error.message;
//         state.loading = false;
//       });
//   },
// });

// export default discountSlice.reducer;


// features/discount/discountSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import AxiosInstance from '../Components/AxiosInstance';
// import { Menu } from './MenuSlice';



// export interface Discount {
//   id: string;
//   percentage: string;
//   start_date: string;
//   end_date: string;
//   created_at: string;
//   updated_at: string;
//   menu_item: Menu;
// }

// interface DiscountState {
//   discount: Discount[] | null;
//   discountLoading: boolean;
//   discountError: string | null;
// }

// const initialState: DiscountState = {
//   discount: null,
//   discountLoading: false,
//   discountError: null,
// };

// // Async thunk to fetch current discount
// export const fetchDiscountedItems = createAsyncThunk<Discount, void, { rejectValue: string }>(
//   'discount/fetchDiscount',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await AxiosInstance.get<Discount[]>('items/discounts/', { withAuth: true });
//       return response.data;
//     } catch (err: any) {
//       const errorMsg = err.response?.data?.detail || 'Failed to fetch discount';
//       return rejectWithValue(errorMsg);
//     }
//   }
// );

// const discountSlice = createSlice({
//   name: 'discount',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDiscountedItems.pending, (state) => {
//         state.discountLoading = true;
//         state.discountError = null;
//       })
//       .addCase(fetchDiscountedItems.fulfilled, (state, action:PayloadAction<Discount[]>) => {
//         state.discountLoading = false;
//         state.discount = action.payload as Discount[];
//       })
//       .addCase(fetchDiscountedItems.rejected, (state, action) => {
//         state.discountLoading = false;
//         state.discountError = action.payload || 'Unknown error';
//       });
//   },
// });

// export default discountSlice.reducer;



import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../Components/AxiosInstance';
import { Menu } from './MenuSlice';

export interface Discount {
  id: string;
  percentage: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  menu: Menu;
}

interface DiscountState {
  discounts: Discount[];
  discountLoading: boolean;
  discountError: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  discountLoading: false,
  discountError: null,
};

// Corrected async thunk to return an array of discounts
export const fetchDiscountedItems = createAsyncThunk<Discount[], void, { rejectValue: string }>(
  'discount/fetchDiscounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get<Discount[]>('items/discounts/', { withAuth: true });
      console.log("discount items");
      console.log(response);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to fetch discounts';
      return rejectWithValue(errorMsg);
    }
  }
);

const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountedItems.pending, (state) => {
        state.discountLoading = true;
        state.discountError = null;
      })
      .addCase(fetchDiscountedItems.fulfilled, (state, action: PayloadAction<Discount[]>) => {
        state.discountLoading = false;
        state.discounts = action.payload;
      })
      .addCase(fetchDiscountedItems.rejected, (state, action) => {
        state.discountLoading = false;
        state.discountError = action.payload || 'Unknown error';
      });
  },
});

export default discountSlice.reducer;
