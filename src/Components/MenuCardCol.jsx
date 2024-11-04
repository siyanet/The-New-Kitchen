import PropTypes from 'prop-types';
import ReviewStar from './ReviewStar';
import AddToCartButton from './AddToCartButton';

const MenuCardCol = ({item}) => {
  return (
    
    <div className=' w-full h-full'>
         <img src={item.image} className=' w-full rounded-tl-xl rounded-tr-xl  object-fit '></img>
         <div className='bg-white border-l-2 border-b-2 border-r-2 border-gray-100 group-hover:border-red p-4 shadow-lg transition-all duration-600 ease-in-out rounded-br-xl rounded-bl-xl group-hover:bg-red pt-6 pl-1  pb-3 '>
        <div className='p-4'>  <ReviewStar rating={item.average_rate}  />
        <p className='pt-2 group-hover:text-white font-semibold text-base text-black '>{item.menu_name}</p>

      
        <div className='flex  pt-2 pb-2 gap-4'>
        {item.discount_percentage ? ( <>
            <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{item.discounted_normal__portion_price} ETB</p>
            <p className ="line-through font-nunito  font-extrabold text-base  text-gray-100">{item.normal_portion_price}.00 ETB</p></> ):
          <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{item.normal_portion_price}.00 ETB</p>
           }
           </div>
        </div>
        <div className='pr-2 flex w-full justify-end pb-2'><AddToCartButton item={item}/></div>
      </div>

    </div>
  )
}

MenuCardCol.propTypes = {
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

export default MenuCardCol;




