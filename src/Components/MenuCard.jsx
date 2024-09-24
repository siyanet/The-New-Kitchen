
import PropTypes from 'prop-types';

import ReviewStar from './ReviewStar';
import AddToCartButton from './AddToCartButton';

const MenuCard = ({item}) => {
  console.log(item)

  
   
  return (
    <div className={` flex h-full w-full max-h-48  parent group  `}>
      <img src={item.image} className='w-1/2 rounded-tl-xl rounded-bl-xl  object-fit '></img>
      <div className=' w-1/2  bg-white border-t-2 border-b-2 border-r-2 border-gray-100 group-hover:border-red  shadow-lg   rounded-tr-xl rounded-br-xl group-hover:bg-red   '>
        
        
        <div className=' '> 
           <ReviewStar rating={item.average_rate}/>
        <p className=' group-hover:text-white font-semibold text-sm text-black '>{item.menu_name}</p>
        <div className='flex  '>
          {item.discount_percentage ? ( <>
            <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{item.discount_normal_Portion_price}</p>
            <p className ="line-through font-nunito  font-extrabold text-base  text-gray-100">{item.normal_portion_price}</p></> ):
          <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{item.normal_portion_price}</p>
           }
         
           </div>

        </div> 
        <div className='pr-1 flex w-full justify-end pb-1 align-bottom'><AddToCartButton item={item}/></div>
        
          
      </div>
     

        
    </div>
  )
}
MenuCard.propTypes = {
  item: PropTypes.shape({
    menu_id: PropTypes.number.isRequired,            // Menu ID is required and of type number
    menu_name: PropTypes.string.isRequired,           // Menu name is required and of type string
    image: PropTypes.string,                           // Image can be null or a string
    average_rate: PropTypes.number,                   // Average rate can be a number (can also be null)
    normal_portion_price: PropTypes.number,           // Normal portion price can be a number (can also be null)
    status: PropTypes.string.isRequired,
    discount_percentage: PropTypes.number,
    discount_normal_Portion_price: PropTypes.number,
    
  }),
};

export default MenuCard;
