
// import { useDispatch, useSelector } from "react-redux";
// import RecommendedCard from "./RecommendedCard";
// import { useEffect } from "react";
// import { fetchMenus } from "../Redux/MenuSlice";

// const RecommendedSection = () => {
//     const dispatch = useDispatch();
    

//   const { menus, menusLoading, menusError } = useSelector((state) => state.menu);
//   useEffect(() => {
//     if (menusLoading === 'idle') {
//       dispatch(fetchMenus()); // Fetch menus on initial render
//     }
//   }, [dispatch, menusLoading]);

//   const topRatedMenus = menus
//   .filter((menu) => menu.average_rate !== null)  // Ensure there's a rating
//   .sort((a, b) => b.average_rate - a.average_rate)  // Sort by average_rate in descending order
//   .slice(0, 5);  // Get the top 5 rated menus

// if (menusLoading) return <div>Loading...</div>;
// if (menusError) return <div>Error: {menusError}</div>;
//   return (
    
//        <div className="flex w-full h[500px]   mt-20 py-5 ">
//          <img src = "/Recommendedimg.png" className="w-10 h-full md:w-12 lg:w-14"></img>
//          <div className="w-full h-full ">
//             <p className="z-50 text-lg font-extrabold text-center text-black font-nunito pb-7">Recommended</p>
//             <div className='grid justify-center w-full h-full grid-cols-2 gap-4 pr-3 md:grid-cols-5 gap-y-16'>
//         {topRatedMenus.map((menu) => (
//             <RecommendedCard key={menu.menu_id} item={menu}/>
//         ))} 
//     </div>
//          </div>
         
//     </div>
      
    
   
//   );
// }

// export default RecommendedSection;

import { useDispatch, useSelector } from "react-redux";
import RecommendedCard from "./RecommendedCard";
import { useEffect } from "react";
import { fetchMenus, Menu } from "../Redux/MenuSlice";
import { AppDispatch, RootState } from "../Redux/Store";


const RecommendedSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { menus, menusLoading, menusError } = useSelector(
    (state: RootState) => state.menu
  );

  useEffect(() => {
    if (!menus.length) {
      dispatch(fetchMenus());
    }
  }, [dispatch, menus.length]);

  const topRatedMenus = menus
    .filter((menu: Menu) => menu.average_rating !== null)
    .sort((a: Menu, b: Menu) => b.average_rating - a.average_rating)
    .slice(0, 5);

  if (menusLoading) return <div>Loading...</div>;
  if (menusError) return <div>Error: {menusError}</div>;

  return (
    <div className="flex w-full h[500px] mt-20 py-5">
      <img src="/Recommendedimg.png" className="w-10 h-full md:w-12 lg:w-14" alt="Recommended" />
      <div className="w-full h-full ">
        <p className="z-50 text-lg font-extrabold text-center text-black font-nunito pb-7">Recommended</p>
        <div className='grid justify-center w-full h-full grid-cols-2 gap-4 pr-3 md:grid-cols-5 gap-y-16'>
          {topRatedMenus.map((menu: Menu) => (
            <RecommendedCard key={menu.id} item={menu} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;