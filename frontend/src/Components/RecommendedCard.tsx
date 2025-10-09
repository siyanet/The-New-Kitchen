// import PropTypes from "prop-types";
// import AddToCartButton from "./AddToCartButton";
// const RecommendedCard = ({item}) => {
//   return (
//     <div className="relative z-10 w-full h-[450px]">
//        <div className="relative flex flex-col justify-between w-full h-full bg-white rounded-md">
//        <div className="relative w-full h-3/4">
//       {/* Base Image */}
//       <img src= {item.image} alt={item.name} className="object-cover w-full h-full rounded-t-lg " />

//       {/* Overlay Image */}
//       <img
//         src="/recommendedend.png"
//         alt="Overlay"
//         className="absolute bottom-0 right-0 object-cover"
//       />
//       <div   className="absolute transform -translate-x-1/2 hover:cursor-pointer bottom-1 lg:bottom-3 left-1/2 ">       
//           <div className="flex items-center justify-center w-12 h-12 p-1 border-2 border-dashed rounded-full shadow-sm border-yellow">
//             <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow">
//               <AddToCartButton item={item} recommended="true"/>
//             </div>
//           </div>
//                  </div>
//     </div>

//     <div className="flex flex-col justify-center p-2 text-center h-1/4">
//           <p className="text-sm font-bold text-red font-nunito">
//             {item.discount_price
//               ? `$${item.discount_price}`
//               : `$${item.price}`}
//           </p>
//           <p className="text-sm font-bold text-black font-nunito">{item.name}</p>
//         </div>
      
//       {/* <div className="p-2 text-center">
//           <p className="text-sm font-bold text-red font-nunito">{price}</p>
//           <p className="text-sm font-bold text-black font-nunito">{name}</p>
//         </div> */}
//       </div>
      
      
//     </div>
   
    
//   );
// };
// RecommendedCard.propTypes = {
//   item: PropTypes.shape({
//     menu_id: PropTypes.number.isRequired,            // Menu ID is required and of type number
//     name: PropTypes.string.isRequired,          // Menu name is required and of type string
//     image: PropTypes.string,                         // Image can be null or a string
//     average_rate: PropTypes.number,                  // Average rate can be a number or null
//     price: PropTypes.number,          // Normal portion price can be a number or null
//     status: PropTypes.string,             // Status is required
//     discount_percentage: PropTypes.number,           // Discount percentage can be a number or null
//     discount_price: PropTypes.number, // Discounted price can be a number or null
//   }).isRequired,                                     // The item prop is required                          // onClick is a function
// };

// export default RecommendedCard;



import AddToCartButton from "./AddToCartButton";
import { Menu ,Portion} from "../Redux/MenuSlice";

interface RecommendedCardProps {
  item: Menu;
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({ item }) => {
  const portion = item.portions?.[0]; 
  return (
    <div className="relative z-10 w-full h-[450px]">
      <div className="relative flex flex-col justify-between w-full h-full bg-white rounded-md">
        <div className="relative w-full h-3/4">
          {/* Base Image */}
          <img src={item.image} alt={item.name} className="object-cover w-full h-full rounded-t-lg " />

          {/* Overlay Image */}
          <img
            src="/recommendedend.png"
            alt="Overlay"
            className="absolute bottom-0 right-0 object-cover"
          />
          <div className="absolute transform -translate-x-1/2 hover:cursor-pointer bottom-1 lg:bottom-3 left-1/2 ">
            <div className="flex items-center justify-center w-12 h-12 p-1 border-2 border-dashed rounded-full shadow-sm border-yellow">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow">
                <AddToCartButton item={item} recommended="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-2 text-center h-1/4">
          <p className="text-sm font-bold text-red font-nunito">
            {/* {portion.discount_price
              ? `$${item.discount_price}`
              : `$${item.price}`} */}
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
          </p>
          <p className="text-sm font-bold text-black font-nunito">{item.name}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCard;




