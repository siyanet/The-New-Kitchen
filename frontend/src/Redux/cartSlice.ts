


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu, Portion } from "./MenuSlice";
import { Extra } from "./ExtraSlice";



export interface CartItem {
 menu: Menu;
  quantity: number;
  selectedPortion: Portion;
  selectedExtras: Extra[];
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { menu: {id:menu_id}, selectedPortion } = action.payload;

      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item.menu.id=== menu_id &&
          item.selectedPortion.id === selectedPortion.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(newItem);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(item => item.menu.id !== action.payload.id);
    },
    incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const itemIndex = state.cartItems.findIndex(item => item.menu.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const itemIndex = state.cartItems.findIndex(item => item.menu.id === action.payload.id);
      if (itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
