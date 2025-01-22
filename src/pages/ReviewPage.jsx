import { useEffect } from "react";
import GuestNavBar from "../Components/GuestNavBar";
import ReviewComponent from "../Components/ReviewComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../Redux/ReviewSlice";


const ReviewPage = () => {
  const dispatch = useDispatch(); 
    const {reviews,loading,error} = useSelector((state)=>state.reviews);
    useEffect(()=>{
        dispatch(fetchReviews());
    },[dispatch]);
    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>Error fetching reviews: {error}</p>; 
    // const reviews = [
    //     {
    //       comment: 'The food was fantastic, will definitely return!',
    //       name: 'John Doe',
    //       rate: 5
    //     },
    //     {
    //       comment: 'Service was great but the food was just okay.',
    //       name: 'Jane Smith',
    //       rate: 3
    //     },
    //     {
    //       comment: 'Had a lovely time, everything was perfect!',
    //       name: 'Emily Johnson',
    //       rate: 4
    //     }
    //   ];
  return (
    <div>
        <GuestNavBar/>
        <div className="w-full h-full pt-20  px-10 flex flex-col  gap-4">
        <p className="font-fredoka font-normal text-xl">Reviews</p>
        {/* {reviews.map((review, index) => (
            
        <ReviewComponent 
          key={review.id} 
          comment={review.note} 
          name={review.name} 
          rate={review.rate} 
        />
      ))} */}
        <div className='m-3'>
        {reviews && reviews.length ===0 &&
        <p className='font-nunito text-xl text-center'>No Reviews</p>}
        {reviews && reviews.length > 0 &&
             (reviews.map((review) => (
        
            
                <ReviewComponent 
                  key={review.id} 
                  comment={review.note} 
                  name={review.user} 
                  rate={review.rate_number} 
                />
              )))
        
        }
     </div>

        </div>
      
    </div>
  )
}

export default ReviewPage
