
import PropTypes from 'prop-types';

import ReviewStar from './ReviewStar';
import AddToCartButton from './AddToCartButton';

const MenuCard = ({item}) => {
  
   
  return (
    <div className={` flex h-full w-full max-h-48  parent group  `}>
      <img src={item.imgsrc} className='w-1/2 rounded-tl-xl rounded-bl-xl  object-fit '></img>
      <div className=' w-1/2  bg-white border-t-2 border-b-2 border-r-2 border-gray-100 group-hover:border-red  shadow-lg   rounded-tr-xl rounded-br-xl group-hover:bg-red   '>
        
        
        <div className=' '> 
           <ReviewStar rating={item.rating} peoplenum={item.peoplenum} />
        <p className=' group-hover:text-white font-semibold text-sm text-black '>{item.name}</p>
        <div className='flex  '>
          <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{item.disprice}</p>
          <p className ="line-through font-nunito  font-extrabold text-base  text-gray-100">{item.price}</p>
           </div>
        </div> 
        <div className='pr-1 flex w-full justify-end pb-1 align-bottom'><AddToCartButton item={item}/></div>
        
          
      </div>
     

        
    </div>
  )
}
MenuCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    disprice: PropTypes.number,
    imgsrc: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    peoplenum: PropTypes.number.isRequired,
  }),
};

export default MenuCard;
