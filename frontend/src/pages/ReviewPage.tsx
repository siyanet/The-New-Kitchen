

// pages/ReviewPage.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { AppDispatch, RootState } from '../Redux/Store';
import { fetchRatings } from '../Redux/ReviewSlice';
import GuestNavBar from '../Components/GuestNavBar';
import ReviewComponent from '../Components/ReviewComponent';

const ReviewPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ratings, loading, error } = useSelector((state: RootState) => state.ratings);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  return (
    // <div>
    //    <GuestNavBar />
    //    <div className="w-full p-4 pt-20 mb-10 space-y-4 md:p-8">
      <div className="w-full h-full">
      <GuestNavBar />
      <div className="w-full pt-20 mb-10 px-7">
       
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
