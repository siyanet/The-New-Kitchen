import PropTypes from "prop-types";
import AddToCartButton from "./AddToCartButton";
const RecommendedCard = ({item}) => {
  return (
    <div className="relative z-10 w-full h-[450px]">
       <div className="relative w-full h-full rounded-md  bg-white flex flex-col justify-between">
       <div className="relative h-3/4 w-full">
      {/* Base Image */}
      <img src= {item.image} alt={item.menu_name} className=" rounded-t-lg w-full h-full object-cover" />

      {/* Overlay Image */}
      <img
        src="recommendedend.png"
        alt="Overlay"
        className="absolute bottom-0 right-0  object-cover"
      />
      <div   className="hover:cursor-pointer absolute bottom-1  lg:bottom-3 left-1/2 transform -translate-x-1/2 ">       
          <div className="w-12 h-12 border-yellow border-dashed   border-2 p-1 rounded-full flex items-center justify-center shadow-sm">
            <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center">
              <AddToCartButton item={item} recommended="true"/>
            </div>
          </div>
                 </div>
    </div>

    <div className="p-2 text-center h-1/4 flex flex-col justify-center">
          <p className="text-red font-nunito font-bold text-sm">
            {item.discount_normal_Portion_price
              ? `$${item.discount_normal_Portion_price}`
              : `$${item.normal_portion_price}`}
          </p>
          <p className="text-black font-nunito font-bold text-sm">{item.menu_name}</p>
        </div>
      
      {/* <div className="p-2 text-center">
          <p className="text-red font-nunito font-bold text-sm">{price}</p>
          <p className="text-black font-nunito font-bold text-sm">{name}</p>
        </div> */}
      </div>
      
      
    </div>
   
    
  );
};
RecommendedCard.propTypes = {
  item: PropTypes.shape({
    menu_id: PropTypes.number.isRequired,            // Menu ID is required and of type number
    menu_name: PropTypes.string.isRequired,          // Menu name is required and of type string
    image: PropTypes.string,                         // Image can be null or a string
    average_rate: PropTypes.number,                  // Average rate can be a number or null
    normal_portion_price: PropTypes.number,          // Normal portion price can be a number or null
    status: PropTypes.string,             // Status is required
    discount_percentage: PropTypes.number,           // Discount percentage can be a number or null
    discount_normal_Portion_price: PropTypes.number, // Discounted price can be a number or null
  }).isRequired,                                     // The item prop is required                          // onClick is a function
};

export default RecommendedCard;





