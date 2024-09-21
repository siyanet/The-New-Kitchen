
import PropTypes from 'prop-types';
import CartComponet from './CartComponet'
import ReviewStar from './ReviewStar';

const MenuCard = ({name, price,disprice,image,rating,peoplenum}) => {
   
  return (
    <div className={` flex h-full w-full max-h-48  parent group  `}>
      <img src={image} className='w-1/2 rounded-tl-xl rounded-bl-xl  object-fit '></img>
      <div className=' w-1/2  bg-white border-t-2 border-b-2 border-r-2 border-gray-100 group-hover:border-red  shadow-lg   rounded-tr-xl rounded-br-xl group-hover:bg-red   '>
        
        
        <div className=' '> 
           <ReviewStar rating={rating} peoplenum={peoplenum} />
        <p className=' group-hover:text-white font-semibold text-sm text-black '>{name}</p>
        <div className='flex  '>
          <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{disprice}</p>
          <p className ="line-through font-nunito  font-extrabold text-base  text-gray-100">{price}</p>
           </div>
        </div> 
        <div className='pr-1 flex w-full justify-end pb-1 align-bottom'><CartComponet /></div>
        
          
      </div>
     

        
    </div>
  )
}
MenuCard.propTypes ={
  name: PropTypes.string,
  price: PropTypes.number,
  disprice: PropTypes.number,
  image: PropTypes.string,
  rating: PropTypes.number,
  peoplenum: PropTypes.number,
};

export default MenuCard
