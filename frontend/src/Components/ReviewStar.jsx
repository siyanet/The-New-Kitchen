
import PropTypes from 'prop-types';

const ReviewStar = ({rating,}) => {
    const totalStars = 5;
  return (
    <div className='flex flex-wrap sm:flex-nowrap '>
        {Array.from({ length: totalStars }, (_, index) => {
        const starColor = index < rating ? 'text-yellow' : 'text-gray-100 group-hover:text-white';
        return (
            
          <i
            key={index}
            className={`fas fa-star ${starColor} text-xs lg:text-lg text-center sm:text-right`}
          ></i>
          
        );
      })}
     

      
    </div>
  );
};
ReviewStar.propTypes= {
    rating: PropTypes.number,
   
}
export default ReviewStar
