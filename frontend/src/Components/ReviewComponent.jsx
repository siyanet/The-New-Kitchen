
import ReviewStar from './ReviewStar'

import PropTypes from 'prop-types'


const ReviewComponent = ({comment,name,rate}) => {
  return (
    <div className='w-full h-full border-2 p-4 md:border-4 border-yellow rounded-lg'>
        <div className='flex flex-col justify-between h-full w-full'>
            <p className='font-epilogue font-normal sm:text-sm md:text-base text-gray-500 '>{comment}</p>
            <div><ReviewStar rating={rate}/></div>
            <p className='font-fredoka font-normal sm:text-sm md:text-base text-black'>{name}</p>
            

            
        </div>
      
    </div>
  );

}
ReviewComponent.propTypes = {
    comment: PropTypes.string,
    name: PropTypes.string,
    rate: PropTypes.number
}

export default ReviewComponent
