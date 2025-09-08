// import { useEffect } from "react";
// import GuestNavBar from "../Components/GuestNavBar";
// import ReviewComponent from "../Components/ReviewComponent";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchReviews } from "../Redux/ReviewSlice";


// const ReviewPage = () => {
//   const dispatch = useDispatch(); 
//     const {reviews,loading,error} = useSelector((state)=>state.reviews);
//     useEffect(()=>{
//         dispatch(fetchReviews());
//     },[dispatch]);
//     if (loading) return <p>Loading reviews...</p>;
//     if (error) return <p>Error fetching reviews: {error}</p>; 
//     // const reviews = [
//     //     {
//     //       comment: 'The food was fantastic, will definitely return!',
//     //       name: 'John Doe',
//     //       rate: 5
//     //     },
//     //     {
//     //       comment: 'Service was great but the food was just okay.',
//     //       name: 'Jane Smith',
//     //       rate: 3
//     //     },
//     //     {
//     //       comment: 'Had a lovely time, everything was perfect!',
//     //       name: 'Emily Johnson',
//     //       rate: 4
//     //     }
//     //   ];
//   return (
//     <div>
//         <GuestNavBar/>
//         <div className="flex flex-col w-full h-full gap-4 px-10 pt-20">
//         <p className="text-xl font-normal font-fredoka">Reviews</p>
//         {/* {reviews.map((review, index) => (
            
//         <ReviewComponent 
//           key={review.id} 
//           comment={review.note} 
//           name={review.name} 
//           rate={review.rate} 
//         />
//       ))} */}
//         <div className='m-3'>
//         {reviews && reviews.length ===0 &&
//         <p className='text-xl text-center font-nunito'>No Reviews</p>}
//         {reviews && reviews.length > 0 &&
//              (reviews.map((review) => (
        
            
//                 <ReviewComponent 
//                   key={review.id} 
//                   comment={review.note} 
//                   name={review.user} 
//                   rate={review.rate_number} 
//                 />
//               )))
        
//         }
//      </div>

//         </div>
      
//     </div>
//   )
// }

// export default ReviewPage


// pages/ReviewPage.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReviewComponent from '../components/ReviewComponent';
import { AppDispatch, RootState } from '../Redux/Store';
import { fetchRatings } from '../Redux/ReviewSlice';
import GuestNavBar from '../Components/GuestNavBar';

const ReviewPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ratings, loading, error } = useSelector((state: RootState) => state.ratings);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  return (
    <div>
       <GuestNavBar />
       <div className="w-full p-4 pt-20 mb-10 space-y-4 md:p-8">
       
      <h1 className="mb-4 text-xl font-bold md:text-2xl font-fredoka">Customer Reviews</h1>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"> */}
      <div>
        {ratings.map((rating) => (
          <ReviewComponent
            key={rating.id}
            comment={rating.comment}
            name={rating.customer.full_name}
            rate={rating.rating}
          />
        ))}
      </div>
    </div>
    </div>
   
  );
};

export default ReviewPage;
