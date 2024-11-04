import { useEffect, useState } from "react";



const ChefOrderCard = ({ order }) => {
  const [elapsedTime, setElapsedTime] = useState("");

  const [status, setStatus] = useState(order.status);
  useEffect(() => {
    // Function to calculate the time difference
    const calculateElapsedTime = () => {
      const orderTime = new Date(order.created_at);
      const now = new Date();
      const diffInSeconds = Math.floor((now - orderTime) / 1000);

      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setElapsedTime(
        `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${
          seconds > 0 ? `${seconds}s` : ""
        }`
      );
    };

    // Initial calculation and update every second
    calculateElapsedTime();
    const interval = setInterval(calculateElapsedTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [order.created_at]); 

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      // Send API request to update status
      const response = await fetch(`/api/orders/${order.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      // Optionally, revert status if API request fails
      setStatus(order.status);
    }
  };

  const statusBgColor = {
    confirmed: "bg-yellow",
    inProgress : "bg-red",
    Completed: "bg-green-200",
    Cancelled: "bg-red",
  };


    return (
      <div className=" shadow-xl pb-5  drop-shadow-lg rounded-lg">
     
     
      <div className={`${statusBgColor[order.status]} rounded-t-lg p-3 font-fredoka`}> 
        {/* <div className="bg-red"> */}
         <p className="text-center">{elapsedTime}</p>
        <div className="flex justify-between gap-3 items-center mb-2">
          <div>
            <p>{order.status}</p>
          </div>
          <div className="bg-red text-white w-10 h-10 flex justify-center items-center rounded-full">
            {order.id}
          </div>
        </div>
        </div>


        <div className="p-5">
          <div className="flex justify-between gap-5 mb-2">
            <p className="font-epilogue text-base">Ordered at: {new Date(order.created_at).toLocaleString()}</p>
            
             <select
            value={status}
            onChange={handleStatusChange}
            className="border-2 border-black shadow-md  rounded-lg p-2"
            
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          </div>
          {order.items && order.items.length > 0 ? ( // Check if items exist
            order.items.map((item) => (
              <div key={item.id} className="flex justify-between font-nunito text-lg text-black">
                <div>
                  <p>
                    {item.quantity} X {item.menu.name}
                  </p>
                </div>
                <div>
                  {/* {item.menu.note} - Uncomment if you need to display notes */}
                </div>
              </div>
            ))
          ) : (
            <p>No items in this order.</p> // Message if no items
          )}
        </div>
      </div>
    );
  };
  
  export default ChefOrderCard;
  