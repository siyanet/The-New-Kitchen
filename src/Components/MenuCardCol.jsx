import PropTypes from 'prop-types';
import CartComponet from './CartComponet'
import ReviewStar from './ReviewStar';

const MenuCardCol = ({name,price,disprice,image,rating,peoplenum}) => {
  return (
    <div className=' w-full h-full'>
         <img src={image} className=' w-full rounded-tl-xl rounded-tr-xl  object-fit '></img>
         <div className='bg-white border-l-2 border-b-2 border-r-2 border-gray-100 group-hover:border-red p-4 shadow-lg transition-all duration-600 ease-in-out rounded-br-xl rounded-bl-xl group-hover:bg-red pt-6 pl-1  pb-3 '>
        <div className=''>  <ReviewStar rating={rating} peoplenum={peoplenum} />
        <p className='pt-2 group-hover:text-white font-semibold text-base text-black '>{name}</p>
        <div className='flex  pt-2 pb-2'>
          <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{disprice}</p>
          <p className ="line-through font-nunito  font-extrabold text-base pl-3 text-gray-100">{price}</p>
           </div>
        </div>
        <div className='pr-2 flex w-full justify-end pb-2'><CartComponet /></div>
      </div>

    </div>
  )
}

MenuCardCol.propTypes ={
    name: PropTypes.string,
    price: PropTypes.number,
    disprice: PropTypes.number,
    image: PropTypes.string,
    rating: PropTypes.number,
    peoplenum: PropTypes.number,
  };

export default MenuCardCol;




