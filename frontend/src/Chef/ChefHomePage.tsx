import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChefQueueOrders } from '../Redux/chefOrderSllice';
import { ClipLoader } from 'react-spinners';
import ChefOrderCard from './ChefOrderCard';
import { AppDispatch, RootState } from '../Redux/Store';
import { fetchOrders } from '../Redux/orderSlice';


const ChefHomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders, status, error } = useSelector((state: RootState) => state.ownerOrders);
  
    useEffect(() => {
      dispatch(fetchOrders());
    }, [dispatch]);
  
   
    return (
      <div className='w-full h-full my-20'>
        <div className='flex justify-center w-full h-full '>
        <p className='text-4xl text-center text-red font-fredoka'> Pizza</p>
        <p className='text-4xl text-center text-yellow font-fredoka'> Hut</p>
        </div>
        
        <p className='text-xl text-center font-fredoka'>List of Orders</p>
        <div className='flex items-center justify-between w-full h-full m-10'>
         
       
         {status ==="loading" && (
           <div className='flex items-center justify-center w-full h-full'>
             <ClipLoader color="#222" loading={true} size={50} />
           </div>
         )}
     
         {/* Orders display */}
         { orders && orders.length > 0 ? (
           <div className='flex flex-wrap justify-center w-full h-full gap-5 p-5 mr-10 md:justify-between'>
             
             {orders.map((order,index) => (
               <ChefOrderCard order={order} key={order.id} index = {index} />
             ))}
           </div>
         ) : (
           <div className='text-center'>
             <p>No orders available.</p>
           </div>
         )}
         {error && (
           <div className='text-center'>
             <p>error fetching orders</p></div>
         )}
       </div>


      </div>
      
      );


}

export default ChefHomePage
