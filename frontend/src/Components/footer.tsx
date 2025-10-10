

// const Footer = () => {
  
//     return (
//     <div className='mt-20 border-t-2 h-[300px] border-black pt-1  '>
//         <div className='flex justify-between w-full h-full '>
//             <div className='w-1/4 h-full'>
//                 <img src = "footerleft.png" className='w-full h-full object-fit'/>
//             </div>

//             <div className='w-full h-full '>
//                 <div className='flex flex-col justify-between w-full h-full'> 
                    
//                 <div className='flex justify-between h-full '>
//                     <div className='bg-red h-[180px]  p-3 w-full mx-5 rounded-lg mt-8  py-10  flex justify-center items-center '>
//                         <div className='w-full text-lg font-bold text-center text-white font-nunito '>
//                         <p>Tuesday-Sunday 12:00pm-23:00pm</p>
//                         <p>closed on Monday</p>
//                         <p>call us</p>
//                         <div className='flex flex-wrap justify-between gap-3 p-2'>

//                         <p>2517897478</p>
//                         <p>2519087865</p>
//                         <p>2517897478</p>
//                         <p>2519087865</p>
//                         </div>
                        
//                             </div>
//                     </div>

//                     {/* {category && (
//                     <div className='flex flex-col'>

//                     <p>Categories</p>
//                     {category.map((item)=>{
//                         <p key = {item.category_id}>{item.category_name}</p>
//                     })}
                 

//                 </div>
//                 )}   */}
//                 </div>
//                 <div className='flex justify-between w-full py-3 border-t-4 border-yellow mt-7'>
//                     <p className='font-fredoka text-red '>@2024 pizza hut</p>
//                     <p className='text-black font-fredoka'>Facebook</p>                </div>
//                       </div>
                
//             </div>


//         <div className='flex justify-end w-1/4 h-full'>
//             <img src="footerleft.png" className='w-full h-full'/>
//         </div>

//         </div>
      
//     </div>
//   )
// }

// export default Footer;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTenantInfo } from "../Redux/TenantSlice";
import { ClipLoader } from "react-spinners";
import { AppDispatch, RootState } from "../Redux/Store";

const Footer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tenant, status, error } = useSelector(
    (state: RootState) => state.tenant
  );

  useEffect(() => {
    dispatch(fetchTenantInfo());
  }, [dispatch]);

  if (status == "loading") {
    return (
      <div className="h-[300px] flex justify-center items-center">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[300px] text-red-500 text-center mt-10 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-20 border-t-2 h-[300px] border-black pt-1">
      <div className="flex justify-between w-full h-full">
        <div className="w-1/4 h-full">
          <img src="/footerleft.png" className="object-cover w-full h-full" />
        </div>

        <div className="w-full h-full">
          <div className="flex flex-col justify-between w-full h-full">
            <div className="flex justify-between h-full">
              <div className="bg-red h-[180px] p-3 w-full mx-5 rounded-lg mt-8 py-10 flex justify-center items-center">
                {tenant ? (
                  <div className="w-full text-lg font-bold text-center text-white font-nunito">
                    <p>
                      Open: {tenant.opening_time} - {tenant.closing_time}
                    </p>
                
                    <p>Call us</p>
                    <div className="flex flex-wrap justify-center gap-3 p-2">
                      {/* {tenant.phone_numbers.map((number, index) => (
                        <p key={index}>{number}</p>
                      ))} */}
                      <p>{tenant.phone_number}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-white">No tenant info</p>
                )}
              </div>
            </div>

            <div className="flex justify-between w-full py-3 border-t-4 border-yellow mt-7">
              <p className="font-fredoka text-red">
                @2024 {tenant?.name || "Business Name"}
              </p>
              <p className="text-black font-fredoka">Facebook</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end w-1/4 h-full">
          <img src="/footerleft.png" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Footer;

