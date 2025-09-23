// import { useState } from "react";
// import AddMenuForm from "./AddMenuForm"
// import ReviewStar from "../Components/ReviewStar";
// import MenuDetail from "../Components/MenuDetail";
// import OwnerMenuDetail from "./OwnerMenuDetail";


// const OwnerMenuCard = ({item,isAdd,isEdit,isRemove,onAdd,onEdit,onRemove}) => {
 
     
//   const [isDetailVisible, setDetailVisible] = useState(false); 
  
  


  



//   const toggleDetailView = () => {
//     setDetailVisible(!isDetailVisible);
//   };
//   return (
//     <div onClick = {toggleDetailView}  className={` flex h-full w-full max-h-48  parent hover:cursor-pointer group  `}>
//     <img    src={item.image && item.image.includes('http://127.0.0.1:8000/storage') 
//     ? item.image 
//     : `http://127.0.0.1:8000/storage/${item.image || ''}`  } className='w-1/2 rounded-tl-xl rounded-bl-xl object-fit '></img>
//       <div className='w-1/2 bg-white border-t-2 border-b-2 border-r-2 border-gray-100 shadow-lg group-hover:border-red rounded-tr-xl rounded-br-xl group-hover:bg-red'>
        
        
//         <div className='flex flex-col items-center justify-center w-full h-full md:gap-3'> 
//            <ReviewStar rating={item.average_rate}/>
//         <p className='text-sm font-semibold text-black group-hover:text-white'>{item.menu_name}</p>
//         <div className='flex '>
//           {item.discount_percentage ? ( <div className="flex gap-2">
//             <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">{item.discounted_normal__portion_price}</p>
//             <p className ="text-base font-extrabold text-gray-100 line-through font-nunito">{item.normal_portion_price}.00</p></div> ):
//           <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">{item.normal_portion_price}.00</p>
//            }
         
//            </div>
//            <div className="flex justify-end w-full gap-1 ">
//            {isEdit && ( <div onClick={ (e) => {e.stopPropagation(); onEdit();}} className='flex pb-1 pr-1 align-bottom'><i className="text-black fas fa-edit"></i></div>)}
//             {isAdd && ( <div onClick={ (e) => {e.stopPropagation(); onAdd();}} className='flex pb-1 pr-1 align-bottom'><i className="text-black fas fa-add"></i></div>)}
//             {isRemove && ( <div onClick={ (e) => {e.stopPropagation(); onRemove();}}  className='flex pb-1 pr-1 align-bottom'><i className="text-black fas fa-trash"></i></div>)}
//            </div>
           
          
//         </div> 
        
//         {/*  */}
        
          
//       </div>
//       {isDetailVisible && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="p-4 bg-white rounded-lg shadow-lg">
//       <OwnerMenuDetail  id={item.menu_id} toggleDetailView={toggleDetailView}/>
      
//     </div>
//   </div>
// )}
     

        
//     </div>
//   )
// }

// export default OwnerMenuCard




import { useState } from "react";
import ReviewStar from "../Components/ReviewStar";
import OwnerMenuDetail from "./OwnerMenuDetail";
import { Menu } from "../Redux/MenuSlice";


interface OwnerMenuCardProps {
  item: Menu;
  isAdd?: boolean;
  isEdit?: boolean;
  isRemove?: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
}

const OwnerMenuCard = ({ item, isAdd, isEdit, isRemove, onAdd, onEdit, onRemove }: OwnerMenuCardProps) => {
  const [isDetailVisible, setDetailVisible] = useState(false);

  const toggleDetailView = () => {
    setDetailVisible((prev) => !prev);
  };
  console.log("disoc")
  console.log(item)


  const normalPortion = item.portions.find((portion) => portion.size === "medium");
  const hasDiscount = normalPortion?.discounted_price 
  console.log("object")
  return (
    <>
      <div
        onClick={toggleDetailView}
        className="flex w-full h-full max-h-48 hover:cursor-pointer group"
      >
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-1/2 rounded-tl-xl rounded-bl-xl"
        />

        <div className="w-1/2 bg-white border-t-2 border-b-2 border-r-2 border-gray-100 shadow-lg rounded-tr-xl rounded-br-xl group-hover:bg-red">
          <div className="flex flex-col items-center justify-center w-full h-full md:gap-3">
            <ReviewStar rating={item.average_rating} />
            <p className="text-sm font-semibold text-black group-hover:text-white">{item.name}</p>

            <div className="flex gap-2">
              {hasDiscount ? (
                <>
                  <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
                    {normalPortion?.discounted_price}
                  </p>
                  <p className="text-base font-extrabold text-gray-100 line-through font-nunito">
                    {normalPortion?.price}
                  </p>
                </>
              ) : (
                <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
                  {normalPortion?.price}
                </p>
              )}
            </div>

            <div className="flex justify-end w-full gap-1 px-2">
              {isEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.();
                  }}
                >
                  <i className="text-black fas fa-edit" />
                </button>
              )}
              {isAdd && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd?.();
                  }}
                >
                  <i className="text-black fas fa-plus" />
                </button>
              )}
              {isRemove && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.();
                  }}
                >
                  <i className="text-black fas fa-trash" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isDetailVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <OwnerMenuDetail id={item.id} toggleDetailView={toggleDetailView} />
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerMenuCard;






