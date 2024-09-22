import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems: [],
    },
    reducers: {
        addToCart: (state,action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      
      if (itemIndex >= 0) {
        // Item already exists, increase quantity
        state.cartItems[itemIndex].quantity += 1;
      } else {
        // Item doesn't exist, add to cart with quantity 1
        const newItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(newItem);
      }
        },
        removeFromCart:(state,action) =>{
            state.cartItems=state.cartItems.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity:(state,action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (itemIndex >= 0){
                state.cartItems[itemIndex].quantity +=1;
            }
        },
        decrementQuantity:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if(itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1){
                state.cartItems[itemIndex].quantity -=1;
            }
        },
    },
});

export const {addToCart, removeFromCart,decrementQuantity,incrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;