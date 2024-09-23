
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { incrementQuantity} from '../Redux/cartSlice';
import { decrementQuantity } from '../Redux/cartSlice';
import {  removeFromCart } from '../Redux/cartSlice';
const CartCard = ({item}) => {
  console.log(item)
    const dispatch = useDispatch();
    const handleIncrement = () => {
        dispatch(incrementQuantity({ id: item.menu_id }));
      };
    
      // Function to handle decrementing quantity
      const handleDecrement = () => {
        if (item.quantity > 1) {
          dispatch(decrementQuantity({ id: item.menu_id }));
        }
      };
    
      // Function to handle removing the item from the cart
      const handleRemove = () => {
        dispatch(removeFromCart({ id: item.menu_id }));
      };
  return (
    <div className='w-full  rounded-md flex bg-red'>
        <div className='w-1/3'> <img src={item.image} className='w-full h-full object-cover'/></div>
        <div className="flex justify-between w-full h-full p-4 ">
           
           
            <div className="flex flex-col  ">
                <h1 className='font-epilogue text-center font-bold text-base text-white'>{item.menu_name }</h1>
                <p className='font-nunito text-center font-light text-base'>{item.selectedPortion.portion}</p>
                <div className="flex rounded-md justify-between px-3 bg-white">
                    <i onClick={handleDecrement} className='fas fa-minus text-base border-r-2 p-1 text-red border-yellow'/>
                    <p className='font-fredoka font-normal text-sm sm:text-base md:text-lg px-1 border-r-2 border-yellow'>{item.quantity}</p>
                    <i onClick={handleIncrement} className=' p-1 fas fa-plus text-red text-base'/>
                </div>
            </div>


            <div className="flex flex-col justify-between  ">
                <div className="rounded-full p-1 border-1 border-white  "></div>
                <i onClick={handleRemove} className='fas fa-close text-white text-base '/>
                <p className='text-white text-base font-epilogue '>{item.selectedPortion.price * item.quantity}</p>
            </div>
        </div>
      
    </div>
  )
}
CartCard.propTypes = {
  item: PropTypes.shape({
    menu_id: PropTypes.number.isRequired, // ID of the menu item
    menu_name: PropTypes.string.isRequired, // Menu name is required
    image: PropTypes.string, 
    quantity: PropTypes.number,// Image can be a string or null
    selectedPortion: PropTypes.shape({
      portion_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Portion ID can be string or number
      portion: PropTypes.string.isRequired, // Portion name
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired // Price can be a string or number
    }).isRequired, // selectedPortion object is required
    selectedExtras: PropTypes.arrayOf(
      PropTypes.shape({
        extra_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Extra ID can be string or number
        extra_name: PropTypes.string.isRequired, // Extra name
        extra_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired // Extra price
      })
    ).isRequired  // Extras should be an array of strings
  }).isRequired,
  };
export default CartCard;
