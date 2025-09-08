// import PropTypes from 'prop-types';
// import ReviewStar from './ReviewStar';
// import AddToCartButton from './AddToCartButton';

// const MenuCardCol = ({item}) => {
//   return (
    
//     <div className='w-full h-full '>
//          <img src={item.image} className='w-full rounded-tl-xl rounded-tr-xl object-fit'></img>
//          <div className='p-4 pt-6 pb-3 pl-1 transition-all ease-in-out bg-white border-b-2 border-l-2 border-r-2 border-gray-100 shadow-lg group-hover:border-red duration-600 rounded-br-xl rounded-bl-xl group-hover:bg-red '>
//         <div className='p-4'>  <ReviewStar rating={item.average_rate}  />
//         <p className='pt-2 text-base font-semibold text-black group-hover:text-white '>{item.menu_name}</p>

      
//         <div className='flex gap-4 pt-2 pb-2'>
//         {item.discount_percentage ? ( <>
//             <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">{item.discounted_normal__portion_price} ETB</p>
//             <p className ="text-base font-extrabold text-gray-100 line-through font-nunito">{item.normal_portion_price}.00 ETB</p></> ):
//           <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">{item.normal_portion_price}.00 ETB</p>
//            }
//            </div>
//         </div>
//         <div className='flex justify-end w-full pb-2 pr-2'><AddToCartButton item={item}/></div>
//       </div>

//     </div>
//   )
// }

// MenuCardCol.propTypes = {
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

// export default MenuCardCol;




import React from 'react';
import ReviewStar from './ReviewStar';
import AddToCartButton from './AddToCartButton';
import { Menu } from '../Redux/MenuSlice';





interface MenuCardColProps {
  item: Menu;
}

const MenuCardCol: React.FC<MenuCardColProps> = ({ item }) => {
  const normalPortion = item.portions[0]; // You can choose logic to pick specific size if needed

  return (
    <div className='w-full h-full'>
      <img src={item.image} className='object-cover w-full rounded-tl-xl rounded-tr-xl' alt={item.name} />

      <div className='p-4 pt-6 pb-3 pl-1 transition-all ease-in-out bg-white border-b-2 border-l-2 border-r-2 border-gray-100 shadow-lg group-hover:border-red duration-600 rounded-br-xl rounded-bl-xl group-hover:bg-red'>
        <div className='p-4'>
          <ReviewStar rating={item.average_rating} />
          <p className='pt-2 text-base font-semibold text-black group-hover:text-white'>
            {item.name}
          </p>

          <div className='flex gap-4 pt-2 pb-2'>
            {normalPortion?.discounted_price ? (
              <>
                <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
                  {normalPortion.discounted_price} ETB
                </p>
                <p className="text-base font-extrabold text-gray-100 line-through font-nunito">
                  {normalPortion.price} ETB
                </p>
              </>
            ) : (
              <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
                {normalPortion?.price} ETB
              </p>
            )}
          </div>
        </div>
        <div className='flex justify-end w-full pb-2 pr-2'>
          <AddToCartButton item={item} />
        </div>
      </div>
    </div>
  );
};

export default MenuCardCol;
