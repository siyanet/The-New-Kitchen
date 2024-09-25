
import { useDispatch, useSelector } from "react-redux";
import RecommendedCard from "./RecommendedCard";
import { useEffect } from "react";
import { fetchMenus } from "../Redux/MenuSlice";

const RecommendedSection = () => {
    // const cardData = [
    //     {
    //       imgsrc: "/Recommended.png",
    //       price: "$29.99",
    //       name: "Product 1",
    //       onClick: () => { console.log("Clicked Product 1"); }
    //     },
    //     {
    //       imgsrc: "/Menuimg.png",
    //       price: "$39.99",
    //       name: "Product 2",
    //       onClick: () => { console.log("Clicked Product 2"); }
    //     },
    //     {
    //       imgsrc: "/Menuimg.png",
    //       price: "$49.99",
    //       name: "Product 3",
    //       onClick: () => { console.log("Clicked Product 3"); }
    //     },
    //     {
    //       imgsrc: "/Menuimg.png",
    //       price: "$59.99",
    //       name: "Product 4",
    //       onClick: () => { console.log("Clicked Product 4"); }
    //     },
    //     {
    //       imgsrc: "/Menuimg.png",
    //       price: "$69.99",
    //       name: "Product 5",
    //       onClick: () => { console.log("Clicked Product 5"); }
    //     }
    //   ];
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
    
       <div className="flex w-full h-auto mt-20 ">
         <img src = "/Recommendedimg.png" className="w-10 md:w-12 lg:w-14 min-h-[800px]"></img>
         <div className=" w-full">
            <p className="text-center font-nunito font-extrabold text-lg pb-7 text-black z-50">Recommended</p>
            <div className='grid grid-cols-2 justify-center md:grid-cols-5 gap-y-16 gap-4 pr-3'>
        {topRatedMenus.map((menu) => (
            <RecommendedCard key={menu.menu_id} item={menu}/>
        ))} 
    </div>
         </div>
         
    </div>
      
    
   
  );
}

export default RecommendedSection;
