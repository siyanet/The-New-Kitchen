
import { useState } from "react";
import { Link } from "react-router-dom";
const OwnerSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
   
        <div className="flex ">
          {/* Sidebar */}
          <div className={`fixed justify-between left-0 h-screen  bg-red text-white p-6 space-y-6 ${isOpen ? "block" : "hidden"} md:block`}>
            <ul className="space-y-10 text-4xl">
              <li>
                <Link to="/" className="flex items-center space-x-2">
                  <i className="fas fa-home "></i> {/* Home Icon */}
                  
                </Link>
              </li>
              <li>
                <Link to="/OwnerCategoryView" className="flex items-center space-x-2">
                  <i className="fas fa-list"></i> {/* Category Icon */}
                
                </Link>
              </li>
              <li>
                <Link to="/OwnerMenuview" className="flex items-center space-x-2">
                  <i className="fas fa-utensils"></i> {/* Menu Icon */}
                 
                </Link>
              </li>
              <li>
                <Link to="/table" className="flex items-center space-x-2">
                  <i className="fas fa-chair"></i> {/* Table Icon */}
                
                </Link>
              </li>
              <li>
                <Link to="/Order" className="flex items-center space-x-2">
                  <i className="fas fa-shopping-cart"></i> {/* Order Icon */}
                
                </Link>
              </li>
            </ul>
          </div>
    
          {/* Burger Menu for small screens */}
          <div className="md:hidden flex items-center p-4">
            <button onClick={toggleMenu}>
              <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-2xl text-red-600`}></i> {/* Burger Menu Icon */}
            </button>
          </div>
    
          {/* Rest of your content */}
          
        </div>
      );
    
  
}

export default OwnerSideBar;
