import { useState } from "react";
import AddMenuForm from "./AddMenuForm"
import ReviewStar from "../Components/ReviewStar";
import MenuDetail from "../Components/MenuDetail";
import OwnerMenuDetail from "./OwnerMenuDetail";


const OwnerMenuCard = ({item,isAdd,isEdit,isRemove,onAdd,onEdit,onRemove}) => {
 
     
  const [isDetailVisible, setDetailVisible] = useState(false); 
  
  


  



  const toggleDetailView = () => {
    setDetailVisible(!isDetailVisible);
  };
  return (
    <div onClick = {toggleDetailView}  className={` flex h-full w-full max-h-48  parent hover:cursor-pointer group  `}>
    <img    src={item.image && item.image.includes('http://127.0.0.1:8000/storage') 
    ? item.image 
    : `http://127.0.0.1:8000/storage/${item.image || ''}`  } className='w-1/2 rounded-tl-xl rounded-bl-xl  object-fit '></img>
      <div className=' w-1/2  bg-white border-t-2 border-b-2 border-r-2 border-gray-100 group-hover:border-red  shadow-lg   rounded-tr-xl rounded-br-xl group-hover:bg-red  '>
        
        
        <div className='flex flex-col md:gap-3  h-full w-full justify-center items-center'> 
           <ReviewStar rating={item.average_rate}/>
        <p className=' group-hover:text-white font-semibold text-sm text-black '>{item.menu_name}</p>
        <div className='flex  '>
          {item.discount_percentage ? ( <div className="flex  gap-2">
            <p className="text-red  group-hover:text-white font-nunito font-extrabold text-base">{item.discounted_normal__portion_price}</p>
            <p className ="line-through font-nunito  font-extrabold text-base  text-gray-100">{item.normal_portion_price}.00</p></div> ):
          <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{item.normal_portion_price}.00</p>
           }
         
           </div>
           <div className="flex justify-end gap-1 w-full ">
           {isEdit && ( <div onClick={ (e) => {e.stopPropagation(); onEdit();}} className='pr-1 flex  pb-1 align-bottom'><i className="fas fa-edit text-black"></i></div>)}
            {isAdd && ( <div onClick={ (e) => {e.stopPropagation(); onAdd();}} className='pr-1 flex  pb-1 align-bottom'><i className="fas fa-add text-black"></i></div>)}
            {isRemove && ( <div onClick={ (e) => {e.stopPropagation(); onRemove();}}  className='pr-1 flex  pb-1 align-bottom'><i className="fas fa-trash text-black"></i></div>)}
           </div>
           
          
        </div> 
        
        {/*  */}
        
          
      </div>
      {isDetailVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-4">
      <OwnerMenuDetail  id={item.menu_id} toggleDetailView={toggleDetailView}/>
      
    </div>
  </div>
)}
     

        
    </div>
  )
}

export default OwnerMenuCard
