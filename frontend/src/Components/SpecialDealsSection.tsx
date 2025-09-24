

// import { useDispatch, useSelector } from "react-redux";
// import MenuButton from "./MenuButton";
// import MenuCard from "./MenuCard";
// import MenuCardCol from "./MenuCardCol";
// import { useEffect } from "react";
// import { fetchDiscountedItems } from "../Redux/DiscountSlice";

// const SpecialDealsSection = () => {
//   const dispatch = useDispatch();
  
//   useEffect(() => {
//     dispatch(fetchDiscountedItems());
//   }, [dispatch]);
  
//   const { items, loading, error } = useSelector((state) => state.discount);


//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   const itemsToDisplay = Array.isArray(items) ? items.slice(0, 7) : [];

//   return (
//     <div className="w-full pt-4 pl-3 pr-3 mt-20 md:pr-6 md:pl-6 h-1/5 ">
//       <h1 className="text-xl font-extrabold text-center font-nunito md:text-lg mb-7">Special Deals</h1>
//       <div className="grid grid-cols-2 gap-4 grid-row-3 md:grid-cols-3">
//         {itemsToDisplay.map((item, index) => {
//           // Determine the class names based on the index
//           let classNames = "";  // Default classes
          
//           if (index === 1) {
//             classNames = " hidden sm:inline-block sm:row-span-3 sm:col-span-1";  // Add classes for the third item
//           }
//           else{
//             classNames = "row-span-1 col-span-1";

//           }

//           // Render the component with conditional class names
//           return (
//             <div key={item.id} className={classNames}>
//               {index == 1 ? (
//                 <MenuCardCol
//                 item={item}
//                 />
//               ) : (
//                 <MenuCard
//                 item={item}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>
//       <div className="mt-8 text-center"><MenuButton to={"/special-deals"} name="See More"/></div>
//     </div>
    
//   );
// };

// export default SpecialDealsSection;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDiscountedItems } from "../Redux/DiscountSlice";
import MenuCard from "./MenuCard";
import MenuCardCol from "./MenuCardCol";
import MenuButton from "./MenuButton";
import { AppDispatch, RootState } from "../Redux/Store";
import { getSubdomainFromPath } from "./utitlites";

const SpecialDealsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const subdomain = getSubdomainFromPath()
  const { discounts, discountLoading, discountError } = useSelector(
    (state: RootState) => state.discount
  );

  useEffect(() => {
    dispatch(fetchDiscountedItems());
  }, [dispatch]);

  if (discountLoading) return <div>Loading...</div>;
  if (discountError) return <div>Error: {discountError}</div>;

  // If discount is null or menu_item is not an array, fallback to empty array
  const itemsToDisplay = Array.isArray(discounts)
  ? discounts.map((d) => d.menu)
  : [];

    console.log("itemsto display");
    console.log(discounts);
    console.log(itemsToDisplay);

  return (
    <div className="w-full pt-4 pl-3 pr-3 mt-20 md:pr-6 md:pl-6 h-1/5">
      <h1 className="text-xl font-extrabold text-center font-nunito md:text-lg mb-7">
        Special Deals
      </h1>
      <div className="grid grid-cols-2 gap-4 grid-row-3 md:grid-cols-3">
        {itemsToDisplay.slice(0, 7).map((item, index) => {
          let classNames = "";

          if (index === 1) {
            classNames = " hidden sm:inline-block sm:row-span-3 sm:col-span-1";
          } else {
            classNames = "row-span-1 col-span-1";
          }

          return (
            <div key={item.id} className={classNames}>
              {index === 1 ? (
                <MenuCardCol item={item} />
              ) : (
                <MenuCard item={item} />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 text-center">
      
        <MenuButton to={`/thekitchenethio/${subdomain}/special-deals`} name="See More" />
      </div>
    </div>
  );
};

export default SpecialDealsSection;
