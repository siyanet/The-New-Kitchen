// import MenuButton from "./MenuButton";
// import CatagoriesSectionCard from './CatagoriesSectionCard'
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchCategories } from "../Redux/CategorySlice";
// import { ClipLoader } from "react-spinners";

// const CatagoriesSection = () => {

// const dispatch = useDispatch();
// const {state,category} = useSelector((state) =>state.category);

// useEffect(() =>{
//     dispatch(fetchCategories());

// },[dispatch]);
// if(state == "loading"){
//     return (
//         <ClipLoader/>
//     );
// }


//   return (
//     <div className='w-full h-auto pl-3 pr-3 mt-20 md:pr-6 md:pl-6'>
//       <h1 className="w-full h-auto text-xl font-extrabold text-center font-nunito md:text-lg mb-7">Catagories</h1>
//       {/* <div className='grid grid-cols-2 grid-rows-1 gap-20 md:grid-rows-1 md:grid-cols-4'> */}
//       <div className="flex flex-wrap justify-around gap-x-4 gap-y-8">
//       {
//         category.slice(0,6).map( (catagory) => (
//             <div key={catagory.id} className='w-1/4 col-span-1 row-span-1 md:1/3 '> 
//              <CatagoriesSectionCard  name = {catagory.category_name} menu={catagory.menu_count} imgsrc={catagory.category_image} id={catagory.id} />
//             </div>
           

//         ))
//       }


//       </div>
//       <div className="flex justify-center mt-14"><MenuButton to={"/Menu"} name="See Our Menu"/></div> 
      
//     </div>
//   );
// }

// export default CatagoriesSection


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
; // adjust import path as needed
import { fetchCategories } from "../Redux/CategorySlice";
import CatagoriesSectionCard from "./CatagoriesSectionCard";
import MenuButton from "./MenuButton";
import { ClipLoader } from "react-spinners";
import { AppDispatch, RootState } from "../Redux/Store";

const CatagoriesSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { category, categoryLoading, categoryError } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (categoryLoading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <ClipLoader />
      </div>
    );
  }

  if (categoryError) {
    return (
      <div className="mt-10 font-bold text-center text-red-500">
        {categoryError}
      </div>
    );
  }

  return (
    <div className="w-full h-auto pl-3 pr-3 mt-20 md:pr-6 md:pl-6">
      <h1 className="w-full h-auto text-xl font-extrabold text-center font-nunito md:text-lg mb-7">
        Categories
      </h1>
      <div className="flex flex-wrap justify-around gap-x-4 gap-y-8">
        {category.slice(0, 6).map((cat) => (
          <div
            key={cat.id}
            className="w-1/4 col-span-1 row-span-1 md:1/3"
          >
            <CatagoriesSectionCard
              name={cat.name}
              menu={cat.menu_count}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <MenuButton to={"/Menu"} name="See Our Menu" />
      </div>
    </div>
  );
};

export default CatagoriesSection;
