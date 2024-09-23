
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import RedButton from './RedButton';
import PropTypes from 'prop-types';
const CartAddedButton = ({item,onClick}) => {
  console.log("items"); 
  console.log(item);
     const dispatch  = useDispatch();
     const handleAddToCart = () =>{
      if (!item.selectedPortion) {
        return alert("Please select a portion.");
      }
          
          dispatch(addToCart(item));
          onClick();
        };
  return (
    <RedButton item={item} onClick={handleAddToCart} word ={"Add To Cart"}/>
  
  );
}






CartAddedButton.propTypes = {
  item: PropTypes.shape({
    menu_id: PropTypes.number.isRequired, // ID of the menu item
    menu_name: PropTypes.string.isRequired, // Menu name is required
    image: PropTypes.string, // Image can be a string or null
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
    ).isRequired ,
    onClick: PropTypes.func.isRequired // Extras should be an array of strings
  }).isRequired, // Item object is required
};

export default CartAddedButton;
