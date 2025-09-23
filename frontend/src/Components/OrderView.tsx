// import { useState } from "react";

// import OrderItemCard from "./OrderItemCard";
// const formatDateTime = (dateString) => {
//   const date = new Date(dateString);
  
//   // Format the date
//   const formattedDate = date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   // Format the time
//   const formattedTime = date.toLocaleTimeString('en-US', {
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//   });

//   return `${formattedDate}, ${formattedTime}`;
// };

// const OrderView = ({order,role,handlePaymentClick}) => {
 
  
//   // const handlePaymentClick = () => {
//   //   if (order.id) {
//   //     initializePayment(order.id); // Pass customer details
//   //   }
//   // };
 
//   return (
//     <div className="p-5 border-4 border-yellow">
//       <p className="my-2 text-lg font-fredoka">{order.status}</p>
//    <div className="flex justify-between gap-5">
   
   
   
//     <div className="flex flex-wrap justify-between w-2/3 gap-2">
//       {order.items.map((item)=>(
//         <div key={item.id} className="w-1/3">
//           <OrderItemCard key= {item.id}item={item}/>
//         </div>
        
//       ))}


//     </div>


//     <div className="flex flex-col items-end justify-between w-1/3">
    
//     <div>
//     <p className="font-semibold text-black font-epilogue text-md "> {formatDateTime(order.created_at)}</p>
//       {/* <p>{order.created_at}</p> */}
    
//     </div>

//     <div>
//       <p className="py-2 font-bold font-epilogue text-md">ETB {order.total_price}</p>
//       {role ==="customer" && order.payment == null ?(
//         <button onClick={handlePaymentClick} className="p-2 font-bold text-white rounded-md bg-red font-epilogue">Pay Now</button>
//       ):
//       <p className="font-semibold font-epilogue">Paid</p>}
//     </div>


//    </div>
      
//     </div>
//     </div>
// // {order.payment.status}
// );
// }

// export default OrderView


import { FC } from "react";
import OrderItemCard from "./OrderItemCard";
import { Order } from "../Redux/orderSlice";

// interface OrderItem {
//   id: number;
//   service_name: string;
//   quantity: number;
//   price: number;
//   // Add more fields if needed
// }

// interface Payment {
//   id: number;
//   status: string;
//   method: string;
//   // Extend as needed
// }

// interface Order {
//   id: number;
//   status: string;
//   created_at: string;
//   total_price: number;
//   items: OrderItem[];
//   payment: Payment | null;
// }

interface OrderViewProps {
  order: Order;
   handlePaymentClick: (orderId: string) => void;
  
  role: "customer" | "admin" | string; // extend with more roles if needed
  
}

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};

const OrderView: FC<OrderViewProps> = ({ order, role, handlePaymentClick }) => {
  return (
    <div className="p-5 border-4 border-yellow">
      <p className="my-2 text-lg font-fredoka">{order.status}</p>

      <div className="flex justify-between gap-5">
        <div className="flex flex-wrap justify-between w-2/3 gap-2">
          {order.items.map((item) => (
            <div key={item.id} className="w-1/3">
              <OrderItemCard item={item} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-end justify-between w-1/3">
          <div>
            <p className="font-semibold text-black font-epilogue text-md">
              {formatDateTime(order.created_at)}
            </p>
          </div>

          <div>
            <p className="py-2 font-bold font-epilogue text-md">
              ETB {order.total_price}
            </p>
            {role === "customer" && !order.is_paid ? (
              <button
                onClick={() =>{handlePaymentClick(order.id)}}
                className="p-2 font-bold text-white rounded-md bg-red font-epilogue"
              >
                Pay Now
              </button>
            ) : (
              <p className="font-semibold font-epilogue">Paid</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
