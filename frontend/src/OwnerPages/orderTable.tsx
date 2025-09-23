// // src/components/OrdersTable.js

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrdersDetails} from '../Redux/orderDetailSlice';
// import OwnerNavBar from './OwnerNavBar';
// import OwnerSideBar from './OwnerSideBar';


// const OrdersTable = () => {
//     const dispatch = useDispatch();
//     const orders = useSelector((state) => state.orders.orders)
//     const orderStatus = useSelector((state) => state.orders.status);

//     useEffect(() => {
//         if (orderStatus === 'idle') {
//             dispatch(fetchOrdersDetails());
//         }
//     }, [orderStatus, dispatch]);

//     if (orderStatus === 'loading') {
//         return <div>Loading...</div>;
//     }

//     if (orderStatus === 'failed') {
//         return <div>Error fetching orders.</div>;
//     }

//     return (
//         <div className="">
            
//              <OwnerNavBar/>
//              <OwnerSideBar/>
//              <div className="pr-20 overflow-x-auto pl-28">
//             <table className="min-w-full border border-collapse border-gray-300">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2 border border-gray-300">Order ID</th>
//                         <th className="px-4 py-2 border border-gray-300">Created At</th>
//                         <th className="px-4 py-2 border border-gray-300">Status</th>
//                         <th className="px-4 py-2 border border-gray-300">Menu ID</th>
//                         <th className="px-4 py-2 border border-gray-300">Menu Name</th>
//                         <th className="px-4 py-2 border border-gray-300">Image</th>
//                         <th className="px-4 py-2 border border-gray-300">Quantity</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map((order) =>
//                         order.items.map((item) => (
//                             <tr key={item.menu_id}>
//                                 <td className="px-4 py-2 border border-gray-300">{order.order_id}</td>
//                                 <td className="px-4 py-2 border border-gray-300">{order.created_at}</td>
//                                 <td className="px-4 py-2 border border-gray-300">{order.status}</td>
//                                 <td className="px-4 py-2 border border-gray-300">{item.menu_id}</td>
//                                 <td className="px-4 py-2 border border-gray-300">{item.menu_name}</td>
//                                 <td className="px-4 py-2 border border-gray-300">
//                                     <img src={item.image} alt={item.menu_name} className="h-16" />
//                                 </td>
//                                 <td className="px-4 py-2 border border-gray-300">{item.quantity}</td>
//                             </tr>
//                         ))
//                     )}
//                 </tbody>
//             </table>
//         </div>
//         </div>
       
//     );
// };

// export default OrdersTable;


// src/components/OrdersTable.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrdersDetails } from '../Redux/orderDetailSlice';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar';
import OwnerSideBar from '../OwnerComponets/OwnerSideBar';
import { AppDispatch, RootState } from '../Redux/Store';
import { fetchOrders } from '../Redux/ownerOrderSlice';
import { Order } from '../Redux/orderSlice';




const OrdersTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

   const { orders, status, error } = useSelector((state:RootState) => state.ownerOrders);

  
  useEffect(() => {

      dispatch(fetchOrders());
    
  }, [ dispatch]);

  if (status === 'loading') return <p>Loading orders...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
   console.log("ordesrs")
   console.log(orders)
  return (
    <div>
      <OwnerNavBar />
      <OwnerSideBar />
      <div className="pr-20 overflow-x-auto pl-44">
       <h1 className='mb-5 text-lg font-bold font-fredoka'>Orders</h1>
       <table className="min-w-full bg-white border border-gray-300">
  <thead className="text-white bg-red">
    <tr>
      <th className="px-4 py-2 border">Menu Names</th>
      <th className="px-4 py-2 border">Customer</th>
      <th className="px-4 py-2 border">Waiter</th>
      <th className="px-4 py-2 border">Created At</th>
      <th className="px-4 py-2 border">Quantity</th>
      <th className="px-4 py-2 border">Total Price</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order: Order) => (
      <tr key={order.id} className="text-center">
        <td className="px-4 py-2 border">
          {order.items.map((item) => item.menu.name).join(", ")}
        </td>
        <td className="px-4 py-2 border">{order.customer_name || "-"}</td>
        <td className="px-4 py-2 border">{order.waiter_name || "—"}</td>
        <td className="px-4 py-2 border">
          {new Date(order.created_at).toLocaleString()}
        </td>
        <td className="px-4 py-2 border">
          {order.items.reduce((sum, item) => sum + item.quantity, 0)}
        </td>
        <td className="px-4 py-2 border">{order.total_price} ETB</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default OrdersTable;
