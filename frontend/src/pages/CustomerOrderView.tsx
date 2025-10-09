
import { useEffect, useState } from "react";

import OrderView from "../Components/OrderView";
import GuestNavBar from "../Components/GuestNavBar";
import PaymentForm from "../Components/PaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
import { fetchOrders } from "../Redux/orderSlice";
import AxiosInstance from "../Components/AxiosInstance";

const CustomerOrderView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state:RootState) => state.order);
  
  const [isPaymentForm, setPaymentForm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handlePaymentClick = async (orderId: string) => {
    setSelectedOrderId(orderId);
  try {
    const response = await AxiosInstance.post(`orders/payment/initiate/`,{order_id: orderId},{withAuth: true});
 console.log("eror")
 console.log(response.data)
    const checkoutUrl = response?.data?.data?.checkout_url;

    if (checkoutUrl) {
      window.location.href = checkoutUrl; // Redirect to payment
    } else {
      console.error("No checkout URL returned from API.");
      alert("Unable to initiate payment. Please try again.");
    }
  } catch (error) {
    console.error("Payment initiation failed:", error);
    alert("Payment request failed. Please try again.");
  }
};

  return (
    <div className="w-full h-full">
      <GuestNavBar />
      <div className="w-full pt-20 mb-10">
        <p className="ml-8 text-2xl text-black font-fredoka">Your Orders</p>
      </div>

      <div className="flex flex-col justify-between gap-4 p-10">
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : orders.length > 0 ? (
          <div>
            {orders.map((order) => (
              <div key={order.id}>
                <OrderView
                  role="customer"
                  order={order}
                  handlePaymentClick={() => handlePaymentClick(order.id)}
                />
              </div>
            ))}
            {isPaymentForm && selectedOrderId && (
              <PaymentForm
                order_id={selectedOrderId}
                onCancel={() => setPaymentForm(false)}
              />
            )}
          </div>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerOrderView;
