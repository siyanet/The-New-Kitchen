import {useEffect} from 'react';
import { fetchCategories } from '../Redux/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar'
import OwnerSideBar from '../OwnerComponets/OwnerSideBar'
import CategoryCard from '../OwnerComponets/CatagoryCard';
import { Link } from 'react-router-dom';

const OwnerCatagoryView = () => {
    const dispatch = useDispatch();

  // Get categories from Redux state
  const { category, loading, error } = useSelector((state) => state.category);

  // Fetch categories when the component is mounted
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
         <OwnerNavBar/>
         <OwnerSideBar/>
         <div className=''>
            <div className="flex justify-between w-full"> <h1>Categories</h1>
            <div className='rounded-full p-3 bg-black'>
            <Link to="/AddCategoryForm">
  <i className='fas fa-add text-white text-lg' />
</Link>
            </div>
            
           
            </div>
           
       
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {category.map((item) => (
        <CategoryCard key={item.category_id} item={item} />
      ))}
    </div>
    </div>
      
    </div>
  )
}

export default OwnerCatagoryView
