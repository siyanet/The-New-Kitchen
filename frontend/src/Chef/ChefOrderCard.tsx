




import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notify } from "../Components/notify";
import AxiosInstance from "../Components/AxiosInstance";
import { fetchOrders, Order } from "../Redux/ownerOrderSlice";
import { AppDispatch } from "../Redux/Store";

interface Props {
  order: Order;
  index: number;
}

const ChefOrderCard = ({ order, index }: Props) => {
  const [elapsedTime, setElapsedTime] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    const calculateElapsedTime = () => {
      const orderTime = new Date(order.created_at);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - orderTime.getTime()) / 1000);
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;
      setElapsedTime(`${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`);
    };

    calculateElapsedTime();
    const interval = setInterval(calculateElapsedTime, 1000);
    return () => clearInterval(interval);
  }, [order.created_at]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    console.log("status")
    console.log("newStatus:", newStatus);

    try {
      const response = await AxiosInstance.patch(`orders/orders/${order.id}/`, { status: newStatus }, { withAuth: true });
      console.log("ordrrespons")
      console.log(response.data)
      if (response.status !== 200) throw new Error("Failed to update status");
      notify("Status updated successfully", "success");
      dispatch(fetchOrders());
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error updating status";
      console.log(error);
      notify(errorMessage, "error");
      setStatus(order.status);
    }
  };


  const statusBgColor: Record<string, string> = {
    pending: "bg-gray-300",
    confirmed: "bg-yellow",
    completed: "bg-green-200",
    cancelled: "bg-red",
    served: "bg-green-300",
    picked_up: "bg-blue-200",
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "served", label: "Served" },
    { value: "picked_up", label: "Picked Up" },
  ];

  return (
    <div className="pb-5 rounded-lg shadow-xl drop-shadow-lg">
      <div className={`${statusBgColor[order.status]} rounded-t-lg p-3 font-fredoka`}>
        <p className="text-center">{elapsedTime}</p>
        <div className="flex items-center justify-between mb-2">
          <p className="capitalize">{status.replace("_", " ")}</p>
          <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-red">
            {index}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between gap-5 mb-2">
          <p className="text-base font-epilogue">Ordered at: {new Date(order.created_at).toLocaleString()}</p>
          <select
            value={status}
            onChange={handleStatusChange}
            className="p-2 border-2 border-black rounded-lg shadow-md"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {order.items?.length > 0 ? (
          order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-lg text-black font-nunito">
              <p>{item.quantity} x {item.menu.name}</p>
            </div>
          ))
        ) : (
          <p>No items in this order.</p>
        )}
      </div>
    </div>
  );
};

export default ChefOrderCard;
