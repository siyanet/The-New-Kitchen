
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartDetail from "../Components/CartDetail";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/Store";
import { CartItem } from "../Redux/cartSlice";
import { fetchUser } from "../Redux/UserSlice";
import { getSubdomainFromPath } from "../Components/utitlites";
import Logout from "../Components/Logout";

interface WaiterLayoutProps {
  children: React.ReactNode;
}

const WaiterLayout: React.FC<WaiterLayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems as CartItem[]);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCartVisible = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const subdomain = getSubdomainFromPath();

  const handleOrdersClick = () => {
    if (subdomain) {
      navigate(`/thekitchenethio/${subdomain}/waiterOrders`);
    }
  };
  const handleHomeClick = () => {
    if (subdomain) {
      navigate(`/thekitchenethio/${subdomain}/waiterHomePage`);
    }
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <p className="text-xl text-center font-fredoka text-red">Welcome {user?.full_name}</p>
      <div className="flex justify-between">
        <Logout/>


           <div className="flex justify-end pr-8">
<div
          className="mx-4 text-lg font-fredoka text-red hover:cursor-pointer"
          onClick={handleHomeClick}
        >
          Home
        </div>
        
        <div
          className="mx-4 text-lg font-fredoka text-red hover:cursor-pointer"
          onClick={handleOrdersClick}
        >
          Orders
        </div>
          

        <div onClick={toggleCartVisible} className="relative w-10 px-2">
          <div className="relative hover:cursor-pointer">
            <i className="text-sm text-black fas fa-shopping-cart sm:text-base lg:text-xl"></i>
            <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -top-1 -right-2 bg-red">
              {totalQuantity}
            </div>
          </div>
        </div>
      </div>
        
      </div>

   

      <div className="mt-4">{children}</div>

      {isCartOpen && <CartDetail onClose={toggleCartVisible} staff_id={5} />}
    </div>
  );
};

export default WaiterLayout;
