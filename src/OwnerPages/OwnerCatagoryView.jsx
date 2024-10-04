// import {useEffect, useState} from 'react';
// import { fetchCategories } from '../Redux/CategorySlice';
// import { useDispatch, useSelector } from 'react-redux';
// import OwnerNavBar from '../OwnerComponets/OwnerNavBar'
// import OwnerSideBar from '../OwnerComponets/OwnerSideBar'
// import CategoryCard from '../OwnerComponets/CatagoryCard';
// import { Link } from 'react-router-dom';
// import AddCategoryForm from '../OwnerComponets/AddCatagoryForm';

// const OwnerCatagoryView = () => {
//     const dispatch = useDispatch();

//   // Get categories from Redux state
//   const { category, loading, error } = useSelector((state) => state.category);
// const [add,setAdd] = useState(false)
// const handleAddView = () =>{
//   setAdd(!add);
// }
//   // Fetch categories when the component is mounted
//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
  
//   return (
//     <div>
//          <OwnerNavBar/>
//          <OwnerSideBar/>
//          <div className='pl-28 pr-20'>
//             <div className="flex justify-between w-full"> <h1 className='font-fredoka font-normal text-2xl text-black'>Categories</h1>
//             <div className='rounded-full p-3 bg-black'>
            
//   <i onClick = {handleAddView}className='fas fa-add text-white text-lg' />

//             </div>
            
           
//             </div>
           
       
         
//          <div className="grid grid-cols-1 md:grid-cols-4  gap-10">
//       {category.map((item) => (
//         <CategoryCard key={item.category_id} item={item} />
//       ))}
//     </div>
//     </div>
//     {
//       add &&<AddCategoryForm onClick={handleAddView}/>
//     }
      
//     </div>
//   )
// }

// export default OwnerCatagoryView


import { useEffect, useState } from 'react';
import { fetchCategories } from '../Redux/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar';
import OwnerSideBar from '../OwnerComponets/OwnerSideBar';
import CategoryCard from '../OwnerComponets/CatagoryCard';
import AddCategoryForm from '../OwnerComponets/AddCatagoryForm';

const OwnerCatagoryView = () => {
  const dispatch = useDispatch();

  // Get categories from Redux state
  const { category, loading, error } = useSelector((state) => state.category);
  const [add, setAdd] = useState(false);

  const handleAddView = () => {
    setAdd(!add);
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
        <div className='flex justify-between w-full'>
          <h1 className='font-fredoka font-normal text-2xl text-black'>Categories</h1>
          <div className='rounded-full p-3 bg-black'>
            <i onClick={handleAddView} className='fas fa-add text-white text-lg' />
          </div>
        </div>

        {/* Check if categories are empty */}
        {category.length === 0 ? (
          <div className='mt-10 text-center text-lg text-gray-600'>No categories available</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-10 mt-5'>
            {category.map((item) => (
              <CategoryCard key={item.category_id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Add Category Form */}
      {add && <AddCategoryForm onClick={handleAddView} />}
    </div>
  );
};

export default OwnerCatagoryView;
