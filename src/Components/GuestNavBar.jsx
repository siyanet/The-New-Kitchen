
import { useState } from "react";
import Logo from "./logo";
import NavBars from "./NavBars";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartDetailVisible,setCartDetailVisible] = useState(false);
  const toggleCart = () => {
    setCartDetailVisible(!isCartDetailVisible);
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    
    <div className="fixed z-50 w-full bg-white shadow-md p-2">
      <div className="flex justify-between items-center h-10">
     
        <div className="w-1/4">
          <Logo />
          <h1>{cartItems.length}</h1>
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
            <Link to="/cart" className="relative px-2">
            <div className="hover:cursor-pointer">
            <i className="fas fa-shopping-cart text-black text-sm sm:text-base lg:text-xl "></i>
            <div className="absolute -top-4 -right-3 bg-red text-white rounded-full text-xs h-4 w-4 flex items-center justify-center p-3">{cartItems.length}</div>
            </div>
             
             
            </Link>
            <Link to=""><li className="p-1 -m-1 border-2 rounded-lg border-red">LogIn</li></Link>
          </ul>
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {menuOpen && (
        <div className="w-full md:hidden">
          <ul className="flex flex-col items-center bg-white border-t">
            <NavBars word="Hello" />
            <NavBars word="Menu" />
            <NavBars word="Reservation" />
            <NavBars word="Testimonials" />
            <NavBars word="About Us" />
            <li className="p-2">Login</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GuestNavBar;

