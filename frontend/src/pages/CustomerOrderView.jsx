
import OrderView from "../Components/OrderView"
import { useEffect, useState } from "react";
import AxiosInstance from "../Components/AxiosInstance";
import GuestNavBar from "../Components/GuestNavBar";
import PaymentForm from "../Components/PaymentForm"; 

const CustomerOrderView = () => {
  const [userOrders, setUserOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaymentForm,setPaymentForm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Fetch user orders when the component mounts
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await AxiosInstance("/orders");
        if (response.status === 200) {
          setUserOrders(response.data.orders);
          // Assuming the data structure matches this
        } else {
          setError("Failed to fetch orders. Please try again.");
        }
          // Assuming the data is returned as response.data
      } catch (err) {
        setError(err.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const handlePaymentClick = (orderId) => {
    setSelectedOrderId(orderId);
    setPaymentForm(!isPaymentForm);
  };
   
  return (
    <div className="w-full h-full">
      <GuestNavBar/>
      <div className=" pt-20 mb-10 w-full"><p className="font-fredoka text-black ml-8 text-2xl">Your Orders</p></div>
      <div className="flex justify-between gap-4 flex-col p-10">
      {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) :
        userOrders.length > 0 ? (
          <div>
            {userOrders.map((order) => (
              <div key={order.id}>
                <OrderView
                  role="customer"
                  order={order}
                  handlePaymentClick={() => handlePaymentClick(order.id)}
                />
              </div>
            ))}
            {isPaymentForm && selectedOrderId && (
              <PaymentForm order_id={selectedOrderId} onCancel = {()=>{setPaymentForm(false)}}/>
            )}
          </div>
        ): (
          <p>No orders available.</p> 
        )}
        
      </div>
     
    </div>
   
  )
}

export default CustomerOrderView
