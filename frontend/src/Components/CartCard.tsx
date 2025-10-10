


import React from 'react';
import { useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  CartItem,
} from '../Redux/cartSlice';

// Define TypeScript types for props





interface CartCardProps {
  item: CartItem;
}

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity({ id: item.menu.id }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity({ id: item.menu.id }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ id: item.menu.id }));
  };

  // Calculate price using discounted price if available
  const portionPrice = item.selectedPortion.discounted_price
    ? item.selectedPortion.discounted_price
    : item.selectedPortion.price;

  // Sum extras prices
  // const extrasPrice = item.selectedExtras.reduce(
  //   (acc, extra) => acc + Number(extra.extra_price),
  //   0
  // );

  // Total price
  const totalPrice = (portionPrice ) * item.quantity;

  return (
    <div className="flex w-full rounded-md bg-red">
      <div className="w-1/3">
        <img
          src={item.menu.image}
          alt={item.menu.name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex justify-between w-full h-full p-4">
        <div className="flex flex-col">
          <h1 className="text-base font-bold text-center text-white font-epilogue">
            {item.menu.name}
          </h1>
          <p className="text-base font-light text-center font-nunito">
            {item.selectedPortion.size}
          </p>

          <div className="flex justify-between px-3 bg-white rounded-md">
            <i
              onClick={handleDecrement}
              className="p-1 text-base border-r-2 cursor-pointer fas fa-minus text-red border-yellow"
            />
            <p className="px-1 text-sm font-normal border-r-2 font-fredoka sm:text-base md:text-lg border-yellow">
              {item.quantity}
            </p>
            <i
              onClick={handleIncrement}
              className="p-1 text-base cursor-pointer fas fa-plus text-red"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="p-1 border-white rounded-full border-1"></div>
          <i
            onClick={handleRemove}
            className="text-base text-white cursor-pointer fas fa-close"
          />
          <p className="text-base text-white font-epilogue">
            {totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
