import { useState } from "react";

import OrderItemCard from "./OrderItemCard";
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  
  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format the time
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};

const OrderView = ({order,role,handlePaymentClick}) => {
 
  
  // const handlePaymentClick = () => {
  //   if (order.id) {
  //     initializePayment(order.id); // Pass customer details
  //   }
  // };
 
  return (
    <div className="  border-yellow border-4 p-5">
      <p className="font-fredoka text-lg my-2">{order.status}</p>
   <div className="flex justify-between gap-5">
   
   
   
    <div className="flex flex-wrap gap-2 justify-between w-2/3">
      {order.items.map((item)=>(
        <div key={item.id} className="w-1/3">
          <OrderItemCard key= {item.id}item={item}/>
        </div>
        
      ))}


    </div>


    <div className="flex flex-col justify-between w-1/3 items-end">
    
    <div>
    <p className="font-epilogue text-black font-semibold text-md "> {formatDateTime(order.created_at)}</p>
      {/* <p>{order.created_at}</p> */}
    
    </div>

    <div>
      <p className="font-epilogue text-md font-bold py-2">ETB {order.total_price}</p>
      {role ==="customer" && order.payment == null ?(
        <button onClick={handlePaymentClick} className="bg-red p-2 rounded-md text-white font-epilogue font-bold">Pay Now</button>
      ):
      <p className="font-epilogue font-semibold">Payment {order.payment.status}</p>}
    </div>


   </div>
      
    </div>
    </div>
  );
}

export default OrderView
