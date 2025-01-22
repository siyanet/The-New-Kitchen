import MenuButton from "./MenuButton";
import CatagoriesSectionCard from './CatagoriesSectionCard'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../Redux/CategorySlice";
import { ClipLoader } from "react-spinners";

const CatagoriesSection = () => {

const dispatch = useDispatch();
const {state,category} = useSelector((state) =>state.category);

useEffect(() =>{
    dispatch(fetchCategories());

},[dispatch]);
if(state == "loading"){
    return (
        <ClipLoader/>
    );
}


  return (
    <div className='mt-20 w-full h-auto pl-3  pr-3 md:pr-6 md:pl-6'>
      <h1 className="font-extrabold w-full h-auto font-nunito text-xl md:text-lg text-center mb-7">Catagories</h1>
      {/* <div className='grid grid-rows-1 md:grid-rows-1 grid-cols-2 md:grid-cols-4 gap-20'> */}
      <div className="flex flex-wrap justify-around  gap-x-4 gap-y-8">
      {
        category.slice(0,6).map( (catagory) => (
            <div key={catagory.id} className='row-span-1 col-span-1 w-1/4 md:1/3 '> 
             <CatagoriesSectionCard  name = {catagory.category_name} menu={catagory.menu_count} imgsrc={catagory.category_image} id={catagory.id} />
            </div>
           

        ))
      }


      </div>
      <div className="mt-14 flex justify-center"><MenuButton to={"/Menu"} name="See Our Menu"/></div> 
      
    </div>
  );
}

export default CatagoriesSection
