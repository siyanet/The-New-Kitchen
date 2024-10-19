
import { useState } from "react";
import Logo from "./logo";
import NavBars from "./NavBars";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartDetail from "./CartDetail";

const GuestNavBar = () => {
  console.log("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartDetailVisible,setCartDetailVisible] = useState(false);
  const toggleCartDetail = () => {
    setCartDetailVisible(!isCartDetailVisible);
  };


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {user,isAuthenticated} = useSelector((state) => state.user);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
console.log("user");
console.log(user);

  return (
    
    <div className="fixed z-50 w-full  shadow-md ">
      <div className="flex justify-between bg-white py-3 px-6 items-center h-14">
     
        <div className="w-1/4">
          <Logo />
          
        </div>

        {/* Burger Icon for Small Screens */}
        <div className="block md:hidden pr-3">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? (
              <i className="fas fa-times text-2xl"></i> // Font Awesome close icon
            ) : (
              <i className="fas fa-bars text-2xl"></i> // Font Awesome burger icon
            )}
          </button>
        </div>

        {/* NavBar for Larger Screens */}
        <div className="hidden md:block pt-3 w-8/12  md:w-4/6 lg:w-3/6 pr-3 pl-3">
          <ul className="flex list-none  justify-between gap-2 ">
            <NavBars word="Home" to={'/'} />
            <NavBars word="Menu" to={"/Menu"}/>
            <NavBars word="Reservation" to={"/"}/>
            <NavBars word="Testimonials" to={"/Review"} />
            <NavBars word="About Us" to={"/"}/>
            <div onClick={toggleCartDetail} className=" underline-hover relative px-2">
  <div className="hover:cursor-pointer">
    <i className="fas fa-shopping-cart text-black text-sm sm:text-base lg:text-xl"></i>
    <div className="absolute -top-4 -right-3 bg-red text-white rounded-full text-xs h-4 w-4 flex items-center justify-center p-3">
      {totalQuantity}
    </div>
  </div>
</div>
{isAuthenticated ?(
  <div className="flex items-center">
  
  <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-fredoka ">
    {user?.data.name.charAt(0).toUpperCase()}
  
    
  </div>
  <span className="ml-2">{user.name}</span>
</div>
): 
(
  <Link to="/AuthPage"><li className="underline-hover p-1 -m-1  rounded-lg ">LogIn</li></Link>



)}




           
         
         
         
          </ul>
        </div>

      </div>

     
      {menuOpen && (
  <div className="flex flex-col w-full justify-end md:hidden">
    <ul className="flex w-1/3 flex-col py-3 gap-3 rounded-b-lg justify-between bg-white text-center border-t ml-auto">
      <NavBars word="Home" to={'/'} />
      <NavBars word="Menu" to={"/Menu"} />
      <NavBars word="Reservation" to={"/"} />
      <NavBars word="Testimonials" to={"/Review"} />
      <NavBars word="About Us" to={"/"} />

      {/* Cart Icon with Number */}
      <div onClick={toggleCartDetail} className="relative underline-hover px-2">
        <div className="hover:cursor-pointer relative inline-block">
          <i className="fas fa-shopping-cart text-black text-sm sm:text-base lg:text-xl"></i>
          {/* Cart number positioned correctly with the cart icon */}
          <div className="absolute -top-2 -right-2 bg-red text-white rounded-full text-xs h-4 w-4 flex items-center justify-center">
            {totalQuantity}
          </div>
        </div>
      </div>

      {/* Centered Login Button */}
      {isAuthenticated ?(
  <div className="flex items-center justify-center">
  
  <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center  ">
    {user?.data.name.charAt(0).toUpperCase()}
  
    
  </div>
  <span className="ml-2">{user.name}</span>
</div>
): 
(
  // <Link to="/AuthPage"><li className="underline-hover p-1 -m-1  rounded-lg ">LogIn</li></Link>

  <Link to="/AuthPage">
        <li className="p-1 w-auto mx-auto underline-hover rounded-lg  text-center">
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

