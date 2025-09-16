import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuDetail } from '../Redux/MenuDetailSlice';
import { ClipLoader } from 'react-spinners';
import ReviewStar from '../Components/ReviewStar';

const OwnerMenuDetail = ({id,toggleDetailView}) => {
    const dispatch = useDispatch();
    
  const { item, status,error } = useSelector((state) => state.menuDetail);
    useEffect(() => {
      dispatch(fetchMenuDetail(id)); // Fetch the menu details using the menuId
    }, [dispatch, id]);
  
   

    if (!item) {
        return <div>No menu details available</div>;
      }
      if (status === 'loading') {
        <ClipLoader/>
    }
    if (error === 'failed') {
        return <div>Error: {error}</div>;
    }

    return(

        <div className="flex justify-center">
         <div className='flex w-full   flex-col'>
         <i onClick={toggleDetailView} className='fas fa-close mb-2 text-center text-4xl'/>
        
        
         <div className="flex w-full bg-purple-400 flex-col border-1 border-black shadow-lg rounded-md">
           <div className="w-full ">
           <img src={item.image} className="rounded-t-lg object-cover w-full max-h-[200px]" />
           </div>
           <div className="bg-white p-3 flex  flex-col gap-2 text-center">
            <p className="font-fredoka text-black font-normal text-base">{item.menu_name}</p>
           <p className="font-nunito font-light text-base ">{item.description}</p>
           <div className="flex justify-center">  <ReviewStar rating={item.average_rate} /></div>
           </div>
         </div>




         <div className="flex flex-col mt-5  shadow-md w-full bg-white rounded-lg border-2 border-gray-100 mb-3 border-opacity-65 ">
            <div className="w-full"> <p className=" px-4 py-2 font-nunito font-bold text-xl text-center border-b-2 border-back">Portions</p></div>
          
            {item.portions && item.portions.map((portion) => (
            <div key= {portion.portion_id} className="text-center"> 
              <label >

              <span className="font-nunito font-black text-base">
                        {portion.portion}
                       
                       
                        <span className="text-red">-----</span>
                {portion.discounted_price ? (
                  <div className="inline-block px-2 text-red">
                   
                    ${portion.discounted_price}
                    <span className="line-through px-4 text-gray-100  ">${portion.price}</span> 
                  </div>
                ) : (
                  <span className=" px-4 text-red  ">${portion.price}</span> 
                )}
              
              </span>
            </label>
            </div>
          
          ))}
          
          </div> 
          </div>
          </div>
    //       {item.portions && item.portions.map((portion) => (
    //            <span className="font-nunito font-black text-base">
    //            {portion.portion}
              
              
    //            <span className="text-red">-----</span>
    //    {portion.discounted_price ? (
    //      <div className="inline-block px-2 text-red">
          
    //        ${portion.discounted_price}
    //        <span className="line-through px-4 text-gray-100  ">${portion.price}</span>  
    //       </div>
    //    ) : (
    //      <span className=" px-4 text-red  ">${portion.price}</span> 
    //    )}
    //     </span>
    //         </label>
    //         </div>
    //         </div>
    //         </div> 
          


    );
}

export default OwnerMenuDetail
