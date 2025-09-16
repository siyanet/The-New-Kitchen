
import OwnerNavBar from '../OwnerComponets/OwnerNavBar'
import OwnerSideBar from '../OwnerComponets/OwnerSideBar'
import OwnerHeader from '../OwnerComponets/OwnerTitle'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviews } from '../Redux/ReviewSlice'
import ReviewComponent from '../Components/ReviewComponent'
import { useEffect } from 'react'

const OwnerReview = () => {
    const dispatch = useDispatch(); 
    const {reviews,loading,error} = useSelector((state)=>state.reviews);
    useEffect(()=>{
        dispatch(fetchReviews());
    },[dispatch]);
    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>Error fetching reviews: {error}</p>;
  return (
    <div>
    <OwnerNavBar />
    <OwnerSideBar />
    <div className='pl-28 pr-20'>
     <OwnerHeader name="Reviews" isAdd={false} />
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

export default OwnerReview
