import PropTypes from "prop-types";
import ReviewStar from "./ReviewStar";

const MenuDetail = ({item,extra}) => {
    const [selectedPortion, setSelectedPortion] = useState('');
  const [selectedExtras, setSelectedExtras] = useState(new Set());

  const handlePortionChange = (e) => {
    setSelectedPortion(e.target.value);
  };

  const handleExtraChange = (e) => {
    const updatedExtras = new Set(selectedExtras);
    if (e.target.checked) {
      updatedExtras.add(e.target.value);
    } else {
      updatedExtras.delete(e.target.value);
    }
    setSelectedExtras(updatedExtras);
  };

  return (
    <div className='flex w-full md:w-1/2 right-1/2 left-1/2 flex-col'>
         <i className='fas fa-close text-center text-xl'/>
        
        
         <div className="flex w-full flex-col border-1 border-black shadow-lg rounded-md">
           <div className="w-full ">
           <img src={item.menu_image} className="rounded-t-lg object-cover" />
           </div>
           <div className="bg-white p-3 text-center">
            <p className="font-fredoka text-black font-normal text-base">{item.menu_name}</p>
           <p className="font-nunito font-light text-base ">{item.description}</p>
           <ReviewStar rating={item.average_rate} />
           </div>
         </div>
         <div className="flex shadow-md w-full bg-white rounded-lg ">
            <div className="w-full"> <p className="font-nunito font-bold text-lg text-left border-b-2 border-back">Portions</p></div>
          
          
          
          <div>
          {item.portions.map((portion) => (
            <label key={portion.portion}>
              <input
                type="radio"
                name="portion"
                value={portion.portion}
                checked={selectedPortion === portion.portion}
                onChange={handlePortionChange}
                className="mr-2"
              />
                        <span>
                {portion.discounted_price ? (
                  <>
                    <span className="line-through">${portion.original_price}</span> 
                    ${portion.discounted_price}
                  </>
                ) : (
                  `$${portion.original_price}`
                )}
                {` (${portion.portion})`}
              </span>
            </label>
          ))}
          </div>




         </div>
      
    </div>
  );
}
MenuDetail.propTypes = {
    item: PropTypes.shape({
        menu_name: PropTypes.string.isRequired, // Menu name is required and of type string
        menu_image: PropTypes.string, // Menu image can be null or a string
        description: PropTypes.string.isRequired, // Description is required and of type string
        location: PropTypes.string.isRequired, // Location is required and of type string
        category: PropTypes.string.isRequired, // Category is required and of type string
        average_rate: PropTypes.number.isRequired, // Average rate is required and of type number
        discount_percentage: PropTypes.number, // Discount percentage is required and of type number
        portions: PropTypes.arrayOf(
          PropTypes.shape({
            portion: PropTypes.string.isRequired, // Portion name is required and of type string
            original_price: PropTypes.string.isRequired, // Original price is required and of type string
            discounted_price: PropTypes.number // Discounted price is required and of type number
          })
        ).isRequired 
        // Portions is an array of required objects
      }).isRequired,
      extra: PropTypes.shape({
        name: PropTypes.string.isRequired,            // Name of the extra, required and of type string
        price: PropTypes.string.isRequired,           // Price of the extra, required and of type string
        updated_at: PropTypes.string.isRequired,      // Timestamp of the last update, required and of type string
        created_at: PropTypes.string.isRequired,      // Timestamp of creation, required and of type string
        id: PropTypes.number.isRequired 

      }).isRequired // The discount object itself is required


    



    
};

export default MenuDetail;
