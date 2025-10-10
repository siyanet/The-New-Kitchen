
import { useEffect, useState } from "react";
import Logo from "./logo";
import NavBars from "./NavBars";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartDetail from "./CartDetail";
// import { logout } from "../Redux/UserSlice";
// import {getCurrentSubdomain} from "../utils/urlHelpers";
import { fetchUser } from "../Redux/UserSlice";

import Logout from "./Logout";
import { getSubdomainFromPath } from "./utitlites";

const GuestNavBar = () => {
 
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartDetailVisible,setCartDetailVisible] = useState(false);
  const toggleCartDetail = () => {
    setCartDetailVisible(!isCartDetailVisible);
  };

// const handleLogout = () => {
//   dispatch(clearUser());
//   navigate("/");
// }
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const subdomain = getSubdomainFromPath();
  const cartItems = useSelector((state) => state.cart.cartItems);
const { user } = useSelector((state) => state.user);
const isAuthenticated = !!user;
useEffect(() => {
  dispatch(fetchUser());
}, [dispatch]);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  

  return (
    
    <div className="fixed z-50 w-full shadow-md ">
      <div className="flex items-center justify-between px-6 py-3 bg-white h-14">
     
        <div className="w-1/4">
          <Logo />
          
        </div>

        {/* Burger Icon for Small Screens */}
        <div className="block pr-3 md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? (
              <i className="text-2xl fas fa-times"></i> // Font Awesome close icon
            ) : (
              <i className="text-2xl fas fa-bars"></i> // Font Awesome burger icon
            )}
          </button>
        </div>

        {/* NavBar for Larger Screens */}
        <div className="hidden w-8/12 pt-3 pl-3 pr-3 md:block md:w-4/6 lg:w-3/6">
          <ul className="flex justify-between gap-2 list-none ">
            <NavBars word="Home" to={`/thekitchenethio/${subdomain}/`} />
            <NavBars word="Menu" to={`/thekitchenethio/${subdomain}/Menu`}/>
            <NavBars word="Special Deals" to={`/thekitchenethio/${subdomain}/special-deals`}/>
            <NavBars word="Testimonials" to={`/thekitchenethio/${subdomain}/Review`} />
            <div onClick={toggleCartDetail} className="relative px-2 underline-hover">
  <div className="hover:cursor-pointer">
    <i className="text-sm text-black fas fa-shopping-cart sm:text-base lg:text-xl"></i>
    <div className="absolute flex items-center justify-center w-4 h-4 p-3 text-xs text-white rounded-full -top-4 -right-3 bg-red">
      {totalQuantity}
    </div>
  </div>
</div>


{isAuthenticated ? (
        <div className="relative">
          <div className="flex items-center space-x-2 " >
            {/* User's Initial in a Green Circle */}
            <div className="flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full font-fredoka">
              {user?.full_name?.charAt(0).toUpperCase()}
            </div>
            {/* User's Name */}
            {/* <span className="ml-2">{user?.data.name}</span> */}
            <span className="cursor-pointer" onClick={toggleDropdown}> {isDropdownOpen? <i className="fas fa-caret-up"/> : <i className="fas fa-caret-down"/>}</span>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 z-50 w-40 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-10 font-epilogue">
              <Link to={`/thekitchenethio/${subdomain}/CustomerOrderView`} className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red">
                Orders
              </Link>
              <button
                onClick={() => {
               
                  setIsDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:text-white hover:bg-red font-epilogue"
              >
                <Logout/>
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to={`/thekitchenethio/${subdomain}/AuthPage`}>
      <li className="p-1 -m-1 rounded-lg underline-hover">Log In </li>
    </Link>
      )}




           
         
         
         
          </ul>
        </div>

      </div>

     
      {menuOpen && (
  <div className="flex flex-col justify-end w-full md:hidden">
    <ul className="flex flex-col justify-between w-1/3 gap-3 py-3 ml-auto text-center bg-white border-t rounded-b-lg">
      {/* <NavBars word="Home" to={'/'} />
      <NavBars word="Menu" to={"/Menu"} />
  
      <NavBars word="Testimonials" to={"/Review"} /> */}
        <NavBars word="Home" to={`/thekitchenethio/${subdomain}/`} />
            <NavBars word="Menu" to={`/thekitchenethio/${subdomain}/Menu`}/>
            <NavBars word="Special Deals" to={`/thekitchenethio/${subdomain}/special-deals`}/>
            <NavBars word="Testimonials" to={`/thekitchenethio/${subdomain}/Review`} />
   

      {/* Cart Icon with Number */}
      <div onClick={toggleCartDetail} className="relative px-2 underline-hover">
        <div className="relative inline-block hover:cursor-pointer">
          <i className="text-sm text-black fas fa-shopping-cart sm:text-base lg:text-xl"></i>
          {/* Cart number positioned correctly with the cart icon */}
          <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -top-2 -right-2 bg-red">
            {totalQuantity}
          </div>
        </div>
      </div>
      <NavBars word = "Orders" to={`/thekitchenethio/${subdomain}/CustomerOrderView`} />

      {/* Centered Login Button */}
      {isAuthenticated ?(
  <div className="flex-col items-center justify-center">
   <Logout/>
  
  <div className="flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full ">
   {user?.full_name?.charAt(0).toUpperCase()}

    
  </div>
  <span className="ml-2">{user.full_name}</span>
</div>
): 
(
  // <Link to="/AuthPage"><li className="p-1 -m-1 rounded-lg underline-hover ">LogIn</li></Link>

  <Link to={`/thekitchenethio/${subdomain}/AuthPage`}>
        <li className="w-auto p-1 mx-auto text-center rounded-lg underline-hover">
          LogIn
        </li>
      </Link>



)}



      
    </ul>
  </div>
)}


{isCartDetailVisible && <CartDetail onClose={toggleCartDetail} />}
    </div>
  );
};

export default GuestNavBar;

