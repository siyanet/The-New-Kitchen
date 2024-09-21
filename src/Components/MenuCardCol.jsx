import PropTypes from 'prop-types';
import ReviewStar from './ReviewStar';
import AddToCartButton from './AddToCartButton';

const MenuCardCol = ({item}) => {
  return (
    <div className=' w-full h-full'>
         <img src={item.imgsrc} className=' w-full rounded-tl-xl rounded-tr-xl  object-fit '></img>
         <div className='bg-white border-l-2 border-b-2 border-r-2 border-gray-100 group-hover:border-red p-4 shadow-lg transition-all duration-600 ease-in-out rounded-br-xl rounded-bl-xl group-hover:bg-red pt-6 pl-1  pb-3 '>
        <div className=''>  <ReviewStar rating={item.rating} peoplenum={item.peoplenum} />
        <p className='pt-2 group-hover:text-white font-semibold text-base text-black '>{item.name}</p>
        <div className='flex  pt-2 pb-2'>
          <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{item.disprice}</p>
          <p className ="line-through font-nunito  font-extrabold text-base pl-3 text-gray-100">{item.price}</p>
           </div>
        </div>
        <div className='pr-2 flex w-full justify-end pb-2'><AddToCartButton item={item}/></div>
      </div>

    </div>
  )
}

MenuCardCol.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    disprice: PropTypes.number,
    imgsrc: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    peoplenum: PropTypes.number.isRequired,
  }),
};

export default MenuCardCol;




