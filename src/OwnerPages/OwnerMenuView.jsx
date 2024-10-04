

// import { useDispatch, useSelector } from 'react-redux';
// import MenuCard from '../Components/MenuCard';
// import { useEffect, useState } from 'react';
// import { fetchMenus } from '../Redux/MenuSlice';
// import OwnerNavBar from '../OwnerComponets/OwnerNavBar';
// import OwnerSideBar from '../OwnerComponets/OwnerSideBar';
// import AddMenuForm from '../OwnerComponets/AddMenuForm';


// const OwnerMenuView = () => {
//   const dispatch = useDispatch();
//   const menus = useSelector((state) => state.menu.menus);
//   const status = useSelector((state) => state.menu.status);
//   const error = useSelector((state) => state.menu.error);

//   // State to toggle AddMenuForm visibility
//   const [showAddMenuForm, setShowAddMenuForm] = useState(false);

//   // Fetch menus when the component is mounted or when the status is idle
//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchMenus());
//     }
//   }, [dispatch, status]);

//   // Handle loading and error states
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }
//   if (status === "failed") {
//     return <div>Error: {error}</div>;
//   }

//   // Toggle form visibility
//   const handleAddMenuClick = () => {
//     setShowAddMenuForm((prev) => !prev);
//   };

//   return (
    
//     <div className=''>
//       <OwnerNavBar />
//       <OwnerSideBar />

//       <div className='pl-28 pr-20'>
//         <div className="flex justify-between w-full">
//           <h1>Menu</h1>
//           <div 
//             className='rounded-full p-3 bg-black cursor-pointer'
//             onClick={handleAddMenuClick} // Add click handler
//           >
//             <i className='fas fa-add text-white text-lg' />
//           </div>
//         </div>

//         {/* Conditionally render AddMenuForm */}
//         {showAddMenuForm && (
//           <div className='my-4'>
//             <AddMenuForm /> {/* This is where your AddMenuForm will be displayed */}
//           </div>
//         )}

//         {/* Menu cards */}
//         <div className="flex flex-wrap justify-center sm:justify-between p-4 gap-3">
//           {menus.map((item) => {
//             return (
//               <div className="w-1/2 sm:w-1/4 lg:w-1/5" key={item.menu_id}>
//                 <MenuCard item={item} />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerMenuView;


import { useDispatch, useSelector } from 'react-redux';
import MenuCard from '../Components/MenuCard';
import { useEffect, useState } from 'react';
import { fetchMenus } from '../Redux/MenuSlice';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar';
import OwnerSideBar from '../OwnerComponets/OwnerSideBar';
import AddMenuForm from '../OwnerComponets/AddMenuForm';

const OwnerMenuView = () => {
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menu.menus);
  const status = useSelector((state) => state.menu.status);
  const error = useSelector((state) => state.menu.error);

  // State to toggle AddMenuForm visibility
  const [showAddMenuForm, setShowAddMenuForm] = useState(false);

  // Fetch menus when the component is mounted or when the status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenus());
    }
  }, [dispatch, status]);

  // Handle loading and error states
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Toggle form visibility
  const handleAddMenuClick = () => {
    setShowAddMenuForm((prev) => !prev);
  };

  return (
    <div>
      <OwnerNavBar />
      <OwnerSideBar />

      <div className="pl-28 pr-20">
        <div className="flex justify-between w-full">
          <h1 className='font-fredoka font-normal text-2xl text-black'>Menu</h1>
          <div
            className="rounded-full p-3 bg-black cursor-pointer"
            onClick={handleAddMenuClick} // Add click handler
          >
            <i className="fas fa-add text-white text-lg" />
          </div>
        </div>

        {/* Conditionally render AddMenuForm */}
        {showAddMenuForm && (
          <div className="my-4">
            <AddMenuForm onClick={handleAddMenuClick} /> {/* This is where your AddMenuForm will be displayed */}
          </div>
        )}

        {/* Check if menus are empty */}
        {menus.length === 0 ? (
          <div className="text-center text-gray-600 my-10">
            No menus available.
          </div>
        ) : (
          <div className="flex flex-wrap justify-center sm:justify-between p-4 gap-3">
            {menus.map((item) => (
              <div className="w-1/2 sm:w-1/4 lg:w-1/5" key={item.menu_id}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerMenuView;
