// src/components/OrdersList.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
import { fetchOrders } from "../Redux/ownerOrderSlice";

import WaiterLayout from "./WaiterLayout";
import ChefOrderCard from "../Chef/ChefOrderCard";


const WaitersOrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, status, error } = useSelector((state: RootState) => state.ownerOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") return <p className="text-center">Loading orders...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;
  console.log("roders")
  console.log(orders)
  return (
    <WaiterLayout>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {orders.map((order,index) => (
        <ChefOrderCard key={order.id} order={order} index={ index + 1} />
      ))}
    </div>
        
    </WaiterLayout>
   
  );
};

export default WaitersOrdersPage;
