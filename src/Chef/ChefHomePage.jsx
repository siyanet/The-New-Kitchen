import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChefQueueOrders } from '../Redux/chefOrderSllice';
import { ClipLoader } from 'react-spinners';
import ChefOrderCard from './ChefOrderCard';

const ChefHomePage = () => {
    const dispatch = useDispatch();
    const {chefOrders,chefOrderLoading,chefOrderError} = useSelector((state)=> state.chefQueue);

    useEffect(()=>{
        dispatch(fetchChefQueueOrders());
    },[dispatch])
    return (
      <div className='w-full h-full my-20'>
        <div className='w-full h-full flex justify-center '>
        <p className='text-center text-red font-fredoka text-4xl'> Pizza</p>
        <p className='text-center text-yellow font-fredoka text-4xl'> Hut</p>
        </div>
        
        <p className='text-center font-fredoka text-xl'>List of Orders</p>
        <div className='flex justify-between w-full h-full items-center m-10'>
         
       
         {chefOrderLoading ==="loading" && (
           <div className='h-full w-full flex justify-center items-center'>
             <ClipLoader color="#222" loading={true} size={50} />
           </div>
         )}
     
         {/* Orders display */}
         { chefOrders && chefOrders.length > 0 ? (
           <div className='flex w-full h-full flex-wrap justify-between'>
             
             {chefOrders.map((order) => (
               <ChefOrderCard order={order} key={order.id} />
             ))}
           </div>
         ) : (
           <div className='text-center'>
             <p>No orders available.</p>
           </div>
         )}
         {chefOrderError && (
           <div className='text-center'>
             <p>error fetching orders</p></div>
         )}
       </div>


      </div>
      
      );


}

export default ChefHomePage
