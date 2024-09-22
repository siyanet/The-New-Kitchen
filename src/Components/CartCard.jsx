
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { incrementQuantity} from '../Redux/cartSlice';
import { decrementQuantity } from '../Redux/cartSlice';
import {  removeFromCart } from '../Redux/cartSlice';
const CartCard = ({item}) => {
    const dispatch = useDispatch();
    const handleIncrement = () => {
        dispatch(incrementQuantity({ id: item.id }));
      };
    
      // Function to handle decrementing quantity
      const handleDecrement = () => {
        if (item.quantity > 1) {
          dispatch(decrementQuantity({ id: item.id }));
        }
      };
    
      // Function to handle removing the item from the cart
      const handleRemove = () => {
        dispatch(removeFromCart({ id: item.id }));
      };
  return (
    <div className='w-full h-full rounded-md flex bg-red'>
        <div className='w-1/3'> <img src={item.imgsrc} className='w-full h-full object-cover'/></div>
        <div className="flex justify-between w-full h-full p-4 ">
           
           
            <div className="flex flex-col  ">
                <h1 className='font-epilogue text-center font-bold text-base text-white'>{item.name }</h1>
                <p className='font-nunito text-center font-light text-base'>Mediuim</p>
                <div className="flex rounded-md justify-between px-3 bg-white">
                    <i onClick={handleDecrement} className='fas fa-minus text-base border-r-2 p-1 text-red border-yellow'/>
                    <p className='font-fredoka font-normal text-sm sm:text-base md:text-lg px-1 border-r-2 border-yellow'>{item.quantity}</p>
                    <i onClick={handleIncrement} className=' p-1 fas fa-plus text-red text-base'/>
                </div>
            </div>


            <div className="flex flex-col justify-between  ">
                <div className="rounded-full p-1 border-1 border-white  "></div>
                <i onClick={handleRemove} className='fas fa-close text-white text-base '/>
                <p className='text-white text-base font-epilogue '>{item.price * item.quantity}</p>
            </div>
        </div>
      
    </div>
  )
}
CartCard.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      disprice: PropTypes.number,
      quantity: PropTypes.number.isRequired,
      imgsrc: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      peoplenum: PropTypes.number.isRequired,
    }),};
export default CartCard;
