import GuestNavBar from "../Components/GuestNavBar";
import ReviewComponent from "../Components/ReviewComponent";


const ReviewPage = () => {
    const reviews = [
        {
          comment: 'The food was fantastic, will definitely return!',
          name: 'John Doe',
          rate: 5
        },
        {
          comment: 'Service was great but the food was just okay.',
          name: 'Jane Smith',
          rate: 3
        },
        {
          comment: 'Had a lovely time, everything was perfect!',
          name: 'Emily Johnson',
          rate: 4
        }
      ];
  return (
    <div>
        <GuestNavBar/>
        <div className="w-full h-full pt-20  px-10 flex flex-col  gap-4">
        <p className="font-fredoka font-normal text-xl">Reviews</p>
        {reviews.map((review, index) => (
            
        <ReviewComponent 
          key={index} 
          comment={review.comment} 
          name={review.name} 
          rate={review.rate} 
        />
      ))}

        </div>
      
    </div>
  )
}

export default ReviewPage
