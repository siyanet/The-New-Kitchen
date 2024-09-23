// import { useDispatch } from "react-redux";
// import { addToCart } from '../Redux/cartSlice';
import { useState } from "react";
import MenuDetail from './MenuDetail';
import PropTypes from 'prop-types';
const AddToCartButton = ({item}) => {
 
 
  const [isDetailVisible, setDetailVisible] = useState(false);
  
  


  



  const toggleDetailView = () => {
    setDetailVisible(!isDetailVisible);
  };
  return (
    <>
    <div onClick={toggleDetailView} className="hover:cursor-pointer group-hover:bg-white rounded-full bg-gray-300 p-1 sm:p-3 md:p-3">
        <i className="fas fa-cart-plus text-black text-sm sm:text-base lg:text-lg"></i>

    </div>

{isDetailVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-4">
      <MenuDetail id={item.menu_id} toggleDetailView={toggleDetailView}/>
      
    </div>
  </div>
)}
    </>
    
  );
};
AddToCartButton.propTypes = {
  item: PropTypes.shape({
    menu_id: PropTypes.number.isRequired,
    menu_name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    selectedPortion: PropTypes.shape({
      portion_id: PropTypes.number.isRequired,
      portion: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
    selectedExtras: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default AddToCartButton;
