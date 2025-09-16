


import { useEffect, useState } from 'react';
import { fetchCategories } from '../Redux/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar';
import OwnerSideBar from '../OwnerComponets/OwnerSideBar';
import CategoryCard from '../OwnerComponets/CatagoryCard';
import CatagoryForm from '../OwnerComponets/CatagoryForm';
import OwnerHeader from '../OwnerComponets/OwnerTitle';

const OwnerCatagoryView = () => {
  const dispatch = useDispatch();

  // Get categories from Redux state
  const { category, loading, error } = useSelector((state) => state.category);
  

  const [isAddView, setIsAddView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);



  const handleAddView = () => {
    setSelectedCategory(null); // Reset selected category for adding
    setIsAddView(!isAddView);
  };

  const handleEditView = (category) => {
    setSelectedCategory(category); // Set the selected category for editing
    setIsAddView(true); // Show the form
  };

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
      <OwnerNavBar />
      <OwnerSideBar />
      <div className='pl-28 pr-20'>
       <OwnerHeader name="Categories" onAdd={handleAddView}/>

        {/* Check if categories are empty */}
        {category.length === 0 ? (
          <div className='mt-10 text-center text-lg text-gray-600'>No categories available</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-10 mt-5'>
            {category.map((item) => (
              <CategoryCard key={item.category_id} item={item} onEdit={() => handleEditView(item)}/>
            ))}
          </div>
        )}
      </div>

      {isAddView && (
        <CatagoryForm 
          onClick={handleAddView}
          categoryToEdit={selectedCategory} // Pass the selected category for editing
        />
      )}

     
    </div>
  );
};

export default OwnerCatagoryView;
