



import React, { FC } from "react";
import { OrderItem } from "../Redux/orderSlice";


interface OrderItemCardProps {
  item: OrderItem;
}

const OrderItemCard: FC<OrderItemCardProps> = ({ item }) => {


  return (
    <div className="flex w-full h-full max-h-32 parent hover:cursor-pointer group">
      <img
        src={item.menu.image}
        alt={item.menu.name}
        className="object-cover w-1/2 rounded-tl-xl rounded-bl-xl"
      />
      <div className="w-1/2 bg-white border-t-2 border-b-2 border-r-2 border-gray-100 shadow-lg group-hover:border-red rounded-tr-xl rounded-br-xl group-hover:bg-red">
        <div className="flex flex-col gap-3 p-3">
          <p className="text-sm font-semibold text-black group-hover:text-white">
            {item.portion_size}
          </p>
          <p className="text-sm font-semibold text-black group-hover:text-white">
            {item.menu.name}
          </p>
          <div className="flex">
            <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
              {item.portion_price}
            </p>
            <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
              {" "}
              X {item.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
