
import { useDispatch, useSelector } from "react-redux";
import RecommendedCard from "./RecommendedCard";
import { useEffect } from "react";
import { fetchMenus } from "../Redux/MenuSlice";

const RecommendedSection = () => {
    const dispatch = useDispatch();
    

  const { menus, status, error } = useSelector((state) => state.menu);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenus()); // Fetch menus on initial render
    }
  }, [dispatch, status]);

  const topRatedMenus = menus
  .filter((menu) => menu.average_rate !== null)  // Ensure there's a rating
  .sort((a, b) => b.average_rate - a.average_rate)  // Sort by average_rate in descending order
  .slice(0, 5);  // Get the top 5 rated menus

if (status === 'loading') return <div>Loading...</div>;
if (status === 'failed') return <div>Error: {error}</div>;
  return (
    
       <div className="flex w-full h[500px]   mt-20 py-5 ">
         <img src = "/Recommendedimg.png" className="w-10 md:w-12 lg:w-14 h-full"></img>
         <div className=" w-full h-full">
            <p className="text-center font-nunito font-extrabold text-lg pb-7 text-black z-50">Recommended</p>
            <div className='grid grid-cols-2 w-full h-full justify-center md:grid-cols-5 gap-y-16 gap-4 pr-3'>
        {topRatedMenus.map((menu) => (
            <RecommendedCard key={menu.menu_id} item={menu}/>
        ))} 
    </div>
         </div>
         
    </div>
      
    
   
  );
}

export default RecommendedSection;
