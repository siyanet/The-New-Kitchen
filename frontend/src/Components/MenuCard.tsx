
// import PropTypes from 'prop-types';

// import ReviewStar from './ReviewStar';
// import AddToCartButton from './AddToCartButton';

// const MenuCard = ({item}) => {
 
  
   
//   return (
//     <div className={` flex h-full w-full max-h-48  parent group  `}>
//     <img    src={item.image && item.image.includes('http://127.0.0.1:8000/storage') 
//     ? item.image 
//     : `http://127.0.0.1:8000/storage/${item.image || ''}`  } className='w-1/2 rounded-tl-xl rounded-bl-xl object-fit '></img>
//       <div className='w-1/2 bg-white border-t-2 border-b-2 border-r-2 border-gray-100 shadow-lg group-hover:border-red rounded-tr-xl rounded-br-xl group-hover:bg-red'>
        
        
//         <div className='flex flex-col gap-3 p-3 '> 
//            {/* <ReviewStar rating={item.average_rate}/> */}
//         <p className='text-sm font-semibold text-black group-hover:text-white'>{item.menu_name}</p>
//         <div className='flex gap-2'>
//           {item.discount_percentage ? ( <>
//             <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">{item.discounted_normal__portion_price} ETB</p>
//             <p className ="text-base font-extrabold text-gray-100 line-through font-nunito">{item.normal_portion_price}.00 ETB</p></> ):
//           <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">{item.normal_portion_price}.00 ETB</p>
//            }
         
//            </div>

//         </div> 
//         <div className='flex justify-end w-full pb-1 pr-1 align-bottom'><AddToCartButton item={item}/></div>
        
          
//       </div>
     

        
//     </div>
//   )
// }
// MenuCard.propTypes = {
//   item: PropTypes.shape({
//     menu_id: PropTypes.number.isRequired,            // Menu ID is required and of type number
//     menu_name: PropTypes.string.isRequired,           // Menu name is required and of type string
//     image: PropTypes.string,                           // Image can be null or a string
//     average_rate: PropTypes.number,                   // Average rate can be a number (can also be null)
//     normal_portion_price: PropTypes.number,           // Normal portion price can be a number (can also be null)
//     status: PropTypes.string.isRequired,
//     discount_percentage: PropTypes.number,
//     discount_normal_Portion_price: PropTypes.number,
    
//   }),
// };

// export default MenuCard;


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
