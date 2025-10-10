

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "../Redux/cartSlice";
import RedButton from "./RedButton";

import { Menu, Portion } from "../Redux/MenuSlice";
// import { Extra } from "../Redux/ExtraSlice";



interface CartAddedButtonProps {
  item: CartItem;
  onClick: () => void;
}

const CartAddedButton: React.FC<CartAddedButtonProps> = ({ item, onClick }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!item.selectedPortion) {
      alert("Please select a portion.");
      return;
    }
    dispatch(addToCart(item));
    onClick();
  };

  // return <RedButton item={item} onClick={handleAddToCart} word="Add To Cart" />;
  return <RedButton  onClick={handleAddToCart} word="Add To Cart" />;
};

export default CartAddedButton;
