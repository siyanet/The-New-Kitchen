// // import { useDispatch } from "react-redux";
// // import { addToCart } from '../Redux/cartSlice';
// import { useState } from "react";
// import MenuDetail from './MenuDetail';
// import PropTypes from 'prop-types';
// const AddToCartButton = ({item,recommended}) => {
 
 
//   const [isDetailVisible, setDetailVisible] = useState(false);
  
  


  



//   const toggleDetailView = () => {
//     setDetailVisible(!isDetailVisible);
//   };
//   return (
//     <>
//     <div onClick={toggleDetailView} className="hover:cursor-pointer ">
//     {recommended ? (
//           <i className="text-lg text-black fas fa-cart-plus"></i> // Larger icon for discounted items
//         ) : (
//           <div className="p-1 bg-gray-300 rounded-full group-hover:bg-white sm:p-3 md:p-3">
//       <i className="text-sm text-black fas fa-cart-plus sm:text-base lg:text-lg"></i>
//       </div> // Normal icon size for non-discounted items
//         )}
      
        

//     </div>

// {isDetailVisible && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="p-4 bg-white rounded-lg shadow-lg">
//       <MenuDetail id={item.menu_id} toggleDetailView={toggleDetailView}/>
      
//     </div>
//   </div>
// )}
//     </>
    
//   );
// };
// AddToCartButton.propTypes = {
//   item: PropTypes.shape({
//     menu_id: PropTypes.number.isRequired,
//     menu_name: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     selectedPortion: PropTypes.shape({
//       portion_id: PropTypes.number.isRequired,
//       portion: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//     }),
//     selectedExtras: PropTypes.arrayOf(PropTypes.string),
//   }),
//   recommended: PropTypes.string
// };

// export default AddToCartButton;






import { useState } from "react";
import MenuDetail from './MenuDetail';
import { Menu } from "../Redux/MenuSlice";



interface AddToCartButtonProps {
  item: Menu;
  recommended?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item, recommended }) => {
  const [isDetailVisible, setDetailVisible] = useState(false);

  const toggleDetailView = () => {
    setDetailVisible(!isDetailVisible);
  };

  return (
    <>
      <div onClick={toggleDetailView} className="hover:cursor-pointer">
        {recommended ? (
          <i className="text-lg text-black fas fa-cart-plus"></i>
        ) : (
          <div className="p-1 bg-gray-300 rounded-full group-hover:bg-white sm:p-3 md:p-3">
            <i className="text-sm text-black fas fa-cart-plus sm:text-base lg:text-lg"></i>
          </div>
        )}
      </div>

      {isDetailVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <MenuDetail id={item.id} toggleDetailView={toggleDetailView} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCartButton;
