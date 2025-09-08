
// import { useDispatch, useSelector } from 'react-redux';
// import GuestNavBar from '../Components/GuestNavBar'
// import MenuCard from '../Components/MenuCard';
// import { useEffect } from 'react';
// import { fetchMenus } from '../Redux/MenuSlice';
// const MenuPage = () => {
  

//     const dispatch = useDispatch();
//     const menus = useSelector((state) => state.menu.menus);
//     const status = useSelector((state) => state.menu.status);
//     const error = useSelector((state) => state.menu.error);
//     useEffect(() => {
//       if(status === "idle"){
//         dispatch(fetchMenus());
//       }
      
//     }, [dispatch,status]);
//     if (status === "loading"){
//       return <div>Loading...</div>
//     }
//     if(status === "failed"){
//       return <div>Error: {error}</div>
//     }
    
//     return (
      
//       <div className="w-full h-full px-0 mx-0">
//         <GuestNavBar />
//         <div className="relative w-full h-screen bg-[url('/MenuHeader.png')] bg-cover bg-left lg:bg-center m-0 p-0 flex items-center justify-center">
          
//           {/* Semi-transparent overlay */}
//           <div className="absolute inset-0 bg-yellow bg-opacity-90"></div>
          
//           <div className="relative z-10 flex flex-col-reverse items-center justify-between w-full p-10 lg:flex-row">
            
            
  
//             <div className="w-full h-full mt-5 text-center lg:w-1/2 ">
//               <h1 className="text-base font-normal text-black font-fredoka sm:text-4xl">Discover Our Delicious Menu</h1>
//               <div className="w-full"><p className="text-xs font-thin text-black font-epilogue sm:text-3xl">
//               Savor delicious, freshly prepared dishes that are sure to satisfy every craving. 
//               </p></div>
              
             
//             </div>
//             <div className="flex items-center justify-center w-full h-full max-w-2xl lg:w-1/2 mt-7">
//               <img
//                 src="MenuChef.png"
//                 className="w-full h-auto max-h-[400px] md:max-h-[700px] max-w-[400px] md:max-w-[900px] object-cover"
//                 alt="Burger"
//               />
//             </div>
  
//           </div>
//         </div>
//         <div className="flex justify-center w-full h-auto mt-20 ">
           
//            <input
//  className="w-full px-3 py-1 m-4 text-center transition duration-200 border-2 rounded-md max-w-80 border-red // focus:outline-none focus:ring-2 focus:ring-red focus:border-red"
//             placeholder="Search"
// />
//        </div>
//        <div className="flex flex-wrap justify-center gap-3 p-4 sm:justify-between">
        
//          {menus.map((item) =>{
//            return(
            
//              <div className="w-1/2 sm:w-1/4 lg:w-1/5 " key = {item.menu_id}>
//                <MenuCard 
//            item={item}
//            />
//              </div>
             
//            )
//          })}
//        </div>
//       </div>
//     );
//   };
  
//   export default MenuPage;
  





import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuestNavBar from '../Components/GuestNavBar';
import MenuCard from '../Components/MenuCard';

import { Menu } from '../Components/MenuCard'; // Importing the correct Menu interface
import { AppDispatch, RootState } from '../Redux/Store';
import { fetchMenus } from '../Redux/MenuSlice';

const MenuPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const menus = useSelector((state: RootState) => state.menu.menus);
  const loading = useSelector((state: RootState) => state.menu.menusLoading);
  const error = useSelector((state: RootState) => state.menu.menusError);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full h-full px-0 mx-0">
      <GuestNavBar />

      {/* Header Section */}
      <div className="relative w-full h-screen bg-[url('/MenuHeader.png')] bg-cover bg-left lg:bg-center m-0 p-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-yellow bg-opacity-90"></div>

        <div className="relative z-10 flex flex-col-reverse items-center justify-between w-full p-10 lg:flex-row">
          <div className="w-full h-full mt-5 text-center lg:w-1/2">
            <h1 className="text-base font-normal text-black font-fredoka sm:text-4xl">
              Discover Our Delicious Menu
            </h1>
            <p className="w-full text-xs font-thin text-black font-epilogue sm:text-3xl">
              Savor delicious, freshly prepared dishes that are sure to satisfy every craving.
            </p>
          </div>

          <div className="flex items-center justify-center w-full h-full max-w-2xl lg:w-1/2 mt-7">
            <img
              src="MenuChef.png"
              className="w-full h-auto max-h-[400px] md:max-h-[700px] max-w-[400px] md:max-w-[900px] object-cover"
              alt="Chef"
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center w-full h-auto mt-20">
        <input
          className="w-full px-3 py-1 m-4 text-center transition duration-200 border-2 rounded-md max-w-80 border-red focus:outline-none focus:ring-2 focus:ring-red focus:border-red"
          placeholder="Search"
        />
      </div>

      {/* Menu Grid */}
      <div className="flex flex-wrap justify-center gap-3 p-4 sm:justify-between">
        {menus.map((item: Menu) => (
          <div className="w-1/2 sm:w-1/4 lg:w-1/5" key={item.id}>
            <MenuCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
