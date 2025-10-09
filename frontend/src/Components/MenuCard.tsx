


import React from 'react';
import ReviewStar from './ReviewStar';
import AddToCartButton from './AddToCartButton';
import { Menu, Portion } from '../Redux/MenuSlice';




interface MenuCardProps {
  item: Menu;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const portion = item.portions?.[0]; // Show small or first portion by default

  const imageUrl = item.image?.startsWith('http')
    ? item.image
    : `http://127.0.0.1:8000/storage/${item.image}`;

  return (
    <div className="flex w-full h-full max-h-48 parent group">
      <img
        src={imageUrl}
        alt={item.name}
        className="object-cover w-1/2 rounded-tl-xl rounded-bl-xl"
      />
      <div className="w-1/2 bg-white border-t-2 border-b-2 border-r-2 border-gray-100 shadow-lg group-hover:border-red rounded-tr-xl rounded-br-xl group-hover:bg-red">
        <div className="flex flex-col gap-3 p-3">
          <ReviewStar rating={item.average_rating} />
          <p className="text-sm font-semibold text-black group-hover:text-white">
            {item.name}
          </p>
          <div className="flex gap-2">
            {portion && portion.discounted_price ? (
              <>
                <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
                  {portion.discounted_price} ETB
                </p>
                <p className="text-base font-extrabold text-gray-100 line-through font-nunito">
                  {portion.price} ETB
                </p>
              </>
            ) : portion ? (
              <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
                {portion.price} ETB
              </p>
            ) : (
              <p className="text-sm text-gray-400">No pricing available</p>
            )}
          </div>
        </div>
        <div className="flex justify-end w-full pb-1 pr-1">
          <AddToCartButton item={item} />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
