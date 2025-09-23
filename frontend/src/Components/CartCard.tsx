
// import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
// import { incrementQuantity} from '../Redux/cartSlice';
// import { decrementQuantity } from '../Redux/cartSlice';
// import {  removeFromCart } from '../Redux/cartSlice';
// const CartCard = ({item}) => {

//     const dispatch = useDispatch();
//     const handleIncrement = () => {
//         dispatch(incrementQuantity({ id: item.menu_id }));
//       };
    
//       // Function to handle decrementing quantity
//       const handleDecrement = () => {
//         if (item.quantity > 1) {
//           dispatch(decrementQuantity({ id: item.menu_id }));
//         }
//       };
    
//       // Function to handle removing the item from the cart
//       const handleRemove = () => {
//         dispatch(removeFromCart({ id: item.menu_id }));
//       };
//   return (
//     <div className='flex w-full rounded-md bg-red'>
//         <div className='w-1/3'> <img src={item.image} className='object-cover w-full h-full'/></div>
//         <div className="flex justify-between w-full h-full p-4 ">
           
           
//             <div className="flex flex-col ">
//                 <h1 className='text-base font-bold text-center text-white font-epilogue'>{item.menu_name }</h1>
//                 <p className='text-base font-light text-center font-nunito'>{item.selectedPortion.portion}</p>
//                 <div className="flex justify-between px-3 bg-white rounded-md">
//                     <i onClick={handleDecrement} className='p-1 text-base border-r-2 fas fa-minus text-red border-yellow'/>
//                     <p className='px-1 text-sm font-normal border-r-2 font-fredoka sm:text-base md:text-lg border-yellow'>{item.quantity}</p>
//                     <i onClick={handleIncrement} className='p-1 text-base fas fa-plus text-red'/>
//                 </div>
//             </div>


//             <div className="flex flex-col justify-between ">
//                 <div className="p-1 border-white rounded-full border-1 "></div>
//                 <i onClick={handleRemove} className='text-base text-white fas fa-close '/>
//                 <p className='text-base text-white font-epilogue '>{item.selectedPortion.price * item.quantity}</p>
//             </div>
//         </div>
      
//     </div>
//   )
// }
// CartCard.propTypes = {
//   item: PropTypes.shape({
//     menu_id: PropTypes.number.isRequired, // ID of the menu item
//     menu_name: PropTypes.string.isRequired, // Menu name is required
//     image: PropTypes.string, 
//     quantity: PropTypes.number,// Image can be a string or null
//     selectedPortion: PropTypes.shape({
//       portion_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Portion ID can be string or number
//       portion: PropTypes.string.isRequired, // Portion name
//       price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired // Price can be a string or number
//     }).isRequired, // selectedPortion object is required
//     selectedExtras: PropTypes.arrayOf(
//       PropTypes.shape({
//         extra_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Extra ID can be string or number
//         extra_name: PropTypes.string.isRequired, // Extra name
//         extra_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired // Extra price
//       })
//     ).isRequired  // Extras should be an array of strings
//   }).isRequired,
//   };
// export default CartCard;


// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { incrementQuantity, decrementQuantity, removeFromCart } from '../Redux/cartSlice';

// // Define types for the Portion, Extra, and CartItem:
// interface Portion {
//   portion_id: string | number;
//   portion: string;
//   price: string | number;
// }

// interface Extra {
//   extra_id: string | number;
//   extra_name: string;
//   extra_price: string | number;
// }

// interface CartItem {
//   menu_id: number;
//   menu_name: string;
//   image?: string;
//   quantity: number;
//   selectedPortion: Portion;
//   selectedExtras: Extra[];
// }

// interface CartCardProps {
//   item: CartItem;
// }

// const CartCard: React.FC<CartCardProps> = ({ item }) => {
//   const dispatch = useDispatch();

//   const handleIncrement = () => {
//     dispatch(incrementQuantity({ id: item.menu_id }));
//   };

//   const handleDecrement = () => {
//     if (item.quantity > 1) {
//       dispatch(decrementQuantity({ id: item.menu_id }));
//     }
//   };

//   const handleRemove = () => {
//     dispatch(removeFromCart({ id: item.menu_id }));
//   };

//   return (
//     <div className='flex w-full rounded-md bg-red'>
//       <div className='w-1/3'>
//         <img src={item.image} alt={item.menu_name} className='object-cover w-full h-full' />
//       </div>
//       <div className="flex justify-between w-full h-full p-4">
//         <div className="flex flex-col">
//           <h1 className='text-base font-bold text-center text-white font-epilogue'>{item.menu_name}</h1>
//           <p className='text-base font-light text-center font-nunito'>{item.selectedPortion.portion}</p>
//           <div className="flex justify-between px-3 bg-white rounded-md">
//             <i
//               onClick={handleDecrement}
//               className='p-1 text-base border-r-2 fas fa-minus text-red border-yellow'
//               role="button"
//               tabIndex={0}
//               aria-label="decrement quantity"
//               onKeyDown={(e) => e.key === 'Enter' && handleDecrement()}
//             />
//             <p className='px-1 text-sm font-normal border-r-2 font-fredoka sm:text-base md:text-lg border-yellow'>{item.quantity}</p>
//             <i
//               onClick={handleIncrement}
//               className='p-1 text-base fas fa-plus text-red'
//               role="button"
//               tabIndex={0}
//               aria-label="increment quantity"
//               onKeyDown={(e) => e.key === 'Enter' && handleIncrement()}
//             />
//           </div>
//         </div>

//         <div className="flex flex-col justify-between">
//           <div className="p-1 border-white rounded-full border-1"></div>
//           <i
//             onClick={handleRemove}
//             className='text-base text-white fas fa-close'
//             role="button"
//             tabIndex={0}
//             aria-label="remove from cart"
//             onKeyDown={(e) => e.key === 'Enter' && handleRemove()}
//           />
//           <p className='text-base text-white font-epilogue'>{Number(item.selectedPortion.price) * item.quantity}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartCard;


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
