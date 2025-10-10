

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar';
import OwnerSideBar from '../OwnerComponets/OwnerSideBar';
import OwnerHeader from '../OwnerComponets/OwnerTitle';
;
import { AppDispatch, RootState } from '../Redux/Store';
import { fetchRatings } from '../Redux/ReviewSlice';
import ReviewComponent from '../Components/ReviewComponent.jsx';


const OwnerReview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ratings, loading, error } = useSelector((state: RootState) => state.ratings);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <OwnerNavBar />
      <OwnerSideBar />
      <div className="pl-48 pr-20">
        <OwnerHeader name="Reviews" onAdd={() => {}} isAdd={false} />

        <div className="m-3 space-y-4">
          {loading && <p className="text-gray-600">Loading reviews...</p>}
          {error && <p className="text-red-500">Error fetching reviews: {error}</p>}

          {!loading && !error && ratings.length === 0 && (
            <p className="text-xl text-center font-nunito">No Reviews</p>
          )}

          {!loading &&
            !error &&
            ratings.length > 0 &&
            ratings.map((review) => (
              <ReviewComponent
                key={review.id}
                comment={review.comment}
                name={review.customer.full_name}
                rate={review.rating}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerReview;
