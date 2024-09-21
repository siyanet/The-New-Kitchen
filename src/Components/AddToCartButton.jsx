import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/cartSlice';

import PropTypes from 'prop-types';
const AddToCartButton = ({item}) => {
  const dispatch  = useDispatch();
  
  
  const handleAddToCart = (e) =>{
    e.preventDefault();
    console.log("Adding item to cart:", item);
    dispatch(addToCart(item));
  };
  return (
    <div onClick={(e) => handleAddToCart(e)} className="hover:cursor-pointer group-hover:bg-white rounded-full bg-gray-300 p-1 sm:p-3 md:p-3">
        <i className="fas fa-cart-plus text-black text-sm sm:text-base lg:text-lg"></i>

    </div>
  );
};
AddToCartButton.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    disprice: PropTypes.number,
    imgsrc: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    peoplenum: PropTypes.number.isRequired,
  }),
};

export default AddToCartButton;
