
import { useState } from "react";
import Logo from "./logo";
import NavBars from "./NavBars";
import { Link } from "react-router-dom";

const GuestNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed z-50 w-full bg-white shadow-md p-2">
      <div className="flex justify-between items-center h-10">
     
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
        <div className="hidden md:block pt-3 w-8/12 md:w-4/6 lg:w-2/6 pr-3 pl-3">
          <ul className="flex list-none  justify-between gap-2 ">
            <NavBars word="Home" to={'/'} />
            <NavBars word="Menu" to={"/Menu"}/>
            <NavBars word="Reservation" to={"/"}/>
            <NavBars word="Testimonials" to={"/Review"} />
            <NavBars word="About Us" to={"/"}/>
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

