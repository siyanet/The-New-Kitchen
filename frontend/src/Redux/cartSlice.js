import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems: [],
    },
    reducers: {
        clearCart: (state) => {
            state.cartItems = []; // Clear the cart items
          },
        addToCart: (state, action) => {
            const { menu_id, selectedPortion } = action.payload;
          
            // Check for existing item in the cart by menu_id and portion_id
            const itemIndex = state.cartItems.findIndex(item => 
              item.menu_id === menu_id && 
              item.selectedPortion?.portion_id === selectedPortion?.portion_id // Check if selectedPortion exists and matches
            );
          
            if (itemIndex >= 0) {
              // Item already exists with the same menu_id and portion_id, increase quantity
              state.cartItems[itemIndex].quantity += 1;
            } else {
              // Item doesn't exist, add to cart with quantity 1
              const newItem = { ...action.payload, quantity: 1 };
              state.cartItems.push(newItem);
            }
          },
        removeFromCart:(state,action) =>{
            state.cartItems=state.cartItems.filter(item => item.menu_id !== action.payload.id);
        },
        incrementQuantity:(state,action) => {
            const itemIndex = state.cartItems.findIndex(item => item.menu_id === action.payload.id)
            if (itemIndex >= 0){
                state.cartItems[itemIndex].quantity +=1;
            }
        },
        decrementQuantity:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item => item.menu_id === action.payload.id);
            if(itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1){
                state.cartItems[itemIndex].quantity -=1;
            }
        },
    },
});

export const {addToCart, clearCart, removeFromCart,decrementQuantity,incrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;