
// import { useState } from "react";
// import { Link } from "react-router-dom";
// const OwnerSideBar = () => {
//     const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
   
//         <div className="flex ">
//           {/* Sidebar */}
//           <div className={`fixed left-0 justify-between h-screen  bg-red text-white p-6 space-y-6 ${isOpen ? "block " : " hidden"} md:block`}>
//             <ul className="space-y-10 text-4xl">
//               <li>
//                 <Link to="/" className="flex items-center space-x-2">
//                   <i className="fas fa-home "></i> {/* Home Icon */}
                  
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/OwnerCategoryView" className="flex items-center space-x-2">
//                   <i className="fas fa-list"></i> {/* Category Icon */}
                
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/OwnerMenuview" className="flex items-center space-x-2">
//                   <i className="fas fa-utensils"></i> {/* Menu Icon */}
                 
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/table" className="flex items-center space-x-2">
//                   <i className="fas fa-chair"></i> {/* Table Icon */}
                
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/Order" className="flex items-center space-x-2">
//                   <i className="fas fa-shopping-cart"></i> {/* Order Icon */}
                
//                 </Link>
//               </li>

//               <li>
//                 <Link to="/staff" className="flex items-center space-x-2">
//                   <i className="fas fa-users"></i> {/* Order Icon */}
                
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/discount" className="flex items-center space-x-2">
//                   <i className="fas fa-percent"></i> {/* Order Icon */}
                
//                 </Link>
//               </li>

//               <li>
//                 <Link to="/Reviews" className="flex items-center space-x-2">
//                   <i className="fas fa-thumbs-up"></i> {/* Order Icon */}
                
//                 </Link>
//               </li>
//             </ul>
//           </div>
    
//           {/* Burger Menu for small screens */}
//           <div className="flex items-center p-4 md:hidden">
//             <button onClick={toggleMenu}>
//               <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-2xl text-red-600`}></i> {/* Burger Menu Icon */}
//             </button>
//           </div>
    
//           {/* Rest of your content */}
          
//         </div>
//       );
    
  
// }

// export default OwnerSideBar;



import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { getSubdomainFromPath } from "../Components/utitlites";

const OwnerSideBar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };
  const subdomain = getSubdomainFromPath();

  const navItems = [
    { path: "OwnerDashboard", icon: "fa-home", label: "Home" },
    { path: "OwnerCategoryView", icon: "fa-list", label: "Categories" },
    { path: "OwnerMenuview", icon: "fa-utensils", label: "Menu" },
      { path: "branch", icon: "fa-building", label: "Branch" },
  { path: "waiter", icon: "fa-user", label: "Waiter" },
  { path: "kitchen", icon: "fa-utensils", label: "Kitchen" },
    { path: "Order", icon: "fa-shopping-cart", label: "Orders" },
  
    { path: "discount", icon: "fa-percent", label: "Discounts" },
    { path: "Reviews", icon: "fa-thumbs-up", label: "Reviews" },
  ];

  const basePath = `/thekitchenethio/${subdomain}/`;
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed left-0 h-screen bg-red text-white p-6 space-y-6 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <ul className="space-y-10 text-4xl">
          {navItems.map(({ path, icon, label }) => (
            <li key={path}>
              <Link to={`${basePath}${path}`} className="flex items-center space-x-2">
                <i className={`fas ${icon}`}></i>
                <span className="hidden text-base md:inline">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Burger Menu for small screens */}
      <div className="flex items-center p-4 md:hidden">
        <button onClick={toggleMenu}>
          <i
            className={`fas ${
              isOpen ? "fa-times" : "fa-bars"
            } text-2xl text-red-600`}
          ></i>
        </button>
      </div>

      {/* Other content can go here */}
    </div>
  );
};

export default OwnerSideBar;
