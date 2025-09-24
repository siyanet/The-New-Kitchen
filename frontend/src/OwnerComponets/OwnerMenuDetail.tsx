// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMenuDetail } from '../Redux/MenuDetailSlice';
// import { ClipLoader } from 'react-spinners';
// import ReviewStar from '../Components/ReviewStar';

// const OwnerMenuDetail = ({id,toggleDetailView}) => {
//     const dispatch = useDispatch();
    
//   const { item, status,error } = useSelector((state) => state.menuDetail);
//     useEffect(() => {
//       dispatch(fetchMenuDetail(id)); // Fetch the menu details using the menuId
//     }, [dispatch, id]);
  
   

//     if (!item) {
//         return <div>No menu details available</div>;
//       }
//       if (status === 'loading') {
//         <ClipLoader/>
//     }
//     if (error === 'failed') {
//         return <div>Error: {error}</div>;
//     }

//     return(

//         <div className="flex justify-center">
//          <div className='flex flex-col w-full'>
//          <i onClick={toggleDetailView} className='mb-2 text-4xl text-center fas fa-close'/>
        
        
//          <div className="flex flex-col w-full bg-purple-400 border-black rounded-md shadow-lg border-1">
//            <div className="w-full ">
//            <img src={item.image} className="rounded-t-lg object-cover w-full max-h-[200px]" />
//            </div>
//            <div className="flex flex-col gap-2 p-3 text-center bg-white">
//             <p className="text-base font-normal text-black font-fredoka">{item.menu_name}</p>
//            <p className="text-base font-light font-nunito ">{item.description}</p>
//            <div className="flex justify-center">  <ReviewStar rating={item.average_rate} /></div>
//            </div>
//          </div>




//          <div className="flex flex-col w-full mt-5 mb-3 bg-white border-2 border-gray-100 rounded-lg shadow-md border-opacity-65 ">
//             <div className="w-full"> <p className="px-4 py-2 text-xl font-bold text-center border-b-2 font-nunito border-back">Portions</p></div>
          
//             {item.portions && item.portions.map((portion) => (
//             <div key= {portion.portion_id} className="text-center"> 
//               <label >

//               <span className="text-base font-black font-nunito">
//                         {portion.portion}
                       
                       
//                         <span className="text-red">-----</span>
//                 {portion.discounted_price ? (
//                   <div className="inline-block px-2 text-red">
                   
//                     ${portion.discounted_price}
//                     <span className="px-4 text-gray-100 line-through ">${portion.price}</span> 
//                   </div>
//                 ) : (
//                   <span className="px-4 text-red">${portion.price}</span> 
//                 )}
              
//               </span>
//             </label>
//             </div>
          
//           ))}
          
//           </div> 
//           </div>
//           </div>
 
          


//     );
// }

// export default OwnerMenuDetail






   //       {item.portions && item.portions.map((portion) => (
    //            <span className="text-base font-black font-nunito">
    //            {portion.portion}
              
              
    //            <span className="text-red">-----</span>
    //    {portion.discounted_price ? (
    //      <div className="inline-block px-2 text-red">
          
    //        ${portion.discounted_price}
    //        <span className="px-4 text-gray-100 line-through ">${portion.price}</span>  
    //       </div>
    //    ) : (
    //      <span className="px-4 text-red">${portion.price}</span> 
    //    )}
    //     </span>
    //         </label>
    //         </div>
    //         </div>
    //         </div> 

















    import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuDetail } from '../Redux/MenuDetailSlice';
import { ClipLoader } from 'react-spinners';
import ReviewStar from '../Components/ReviewStar';
import { AppDispatch, RootState } from '../Redux/Store';

const OwnerMenuDetail = ({ id, toggleDetailView }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { menuDetail, loading, error } = useSelector((state:RootState) => state.menuDetail);

  useEffect(() => {
    dispatch(fetchMenuDetail(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <ClipLoader size={35} color="#D97706" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!menuDetail) {
    return <div className="text-center">No menu details available</div>;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full max-w-lg p-2">
        <i onClick={toggleDetailView} className="self-end mb-2 text-3xl text-gray-600 cursor-pointer fas fa-close" />

        <div className="flex flex-col overflow-hidden bg-purple-100 rounded-md shadow-lg">
          <img
            src={menuDetail.image || '/placeholder.jpg'}
            alt={menuDetail.name}
            className="object-cover w-full h-48"
          />

          <div className="flex flex-col items-center gap-2 px-4 py-3 bg-white">
            <p className="text-xl font-bold text-black font-fredoka">{menuDetail.name}</p>
            <p className="text-sm text-gray-700 font-nunito">{menuDetail.description}</p>
            <ReviewStar rating={menuDetail.average_rating} />
          </div>
        </div>

        <div className="mt-4 bg-white border border-gray-200 rounded-md shadow-sm">
          <h3 className="px-4 py-2 text-lg font-bold text-center text-gray-800 border-b font-nunito">Portions</h3>

          {menuDetail.portions && menuDetail.portions.length > 0 ? (
            menuDetail.portions.map((portion) => (
              <div key={portion.id} className="px-4 py-2 text-center">
                <span className="font-semibold text-gray-800">{portion.size}</span>
                <span className="mx-2 text-red-500">—</span>
                {portion.discounted_price ? (
                  <>
                    <span className="font-bold text-red-600">${portion.discounted_price}</span>
                    <span className="ml-2 text-gray-400 line-through">${portion.price}</span>
                  </>
                ) : (
                  <span className="font-bold text-red-600">${portion.price}</span>
                )}
              </div>
            ))
          ) : (
            <p className="py-4 text-sm text-center text-gray-500">No portion information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerMenuDetail;
