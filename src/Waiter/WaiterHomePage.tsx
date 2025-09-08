// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMenus } from "../Redux/MenuSlice";
// import { fetchCategories } from "../Redux/CategorySlice";
// import CategoryCard from "../OwnerComponets/CatagoryCard";
// import MenuCard from "../Components/MenuCard";
// import CartDetail from "../Components/CartDetail";
// import { Link } from "react-router-dom";


// const WaiterHomePage = () => {
//   const [selectedCategory,setSelectedCategory] = useState(null);
//   const [isCartOpen,setIsCartOpen] = useState(false);
//   const {category,loading} = useSelector((state)=> state.category);
//   const {menus,status} = useSelector((state)=>state.menu);
//   const menuError = useSelector((state)=>state.menu.error);
//   const categoryError = useSelector((state)=>state.category.error);
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const {user,isAuthenticated} = useSelector((state) => state.user);
//   const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


//   useEffect(()=>{
// dispatch(fetchCategories());
// dispatch(fetchMenus());
//   },[dispatch]);
  

//   const handleCategorySelect =(category)=>{
//     setSelectedCategory(category);
//   }
//   const filteredMenus = selectedCategory
//   ? menus.filter((menu) => menu.category_id === selectedCategory.category_id)
//   : [];
//   const toggleCartVisible = ()=>{
//     setIsCartOpen(!isCartOpen);
//   }
  


//   return (
//     <div className="w-full h-full">
//              <p className="text-xl text-center font-fredoka text-red">wellcome {user.name}</p>
//              <div className="flex justify-end pr-8">
//              <Link className="mx-4 text-lg font-fredoka text-red" to={"/waiterOrders"}> Orders</Link>
//              <div onClick={toggleCartVisible} className="relative w-10 px-2 ">
//   <div className="relative hover:cursor-pointer">
//     <i className="text-sm text-black fas fa-shopping-cart sm:text-base lg:text-xl"></i>
//     <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -top-1 -right-2 bg-red">
//       {totalQuantity}
//     </div>
//   </div>
// </div>

//              </div>
           
           

   


//        {(loading || status === "loading") && 
//        <p>loading ...</p>
//        }
//        {
//         (menuError || categoryError &&(
//           <div className="w-full h-full">
//             <p className="text-center"> error fetching category and menu</p>
//           </div>
//         ))
//        }
//          {  category && category.length === 0 && !loading &&
//       (
//         <div className=""> <p className="text-center"> No Category Available</p></div>
//       )
// }
    
//     {category && category.length > 0 &&(
  
//  <div className='flex flex-col h-screen gap-10'>

// <div className="flex-1 p-4 pb-24 overflow-y-auto border-b-8 h-1/2 border-yellow ">
// <p className="m-5 text-2xl text-center font-fredoka">Categories</p>
// <div className="flex flex-wrap justify-between p-5 gap-7">
//         {category.map((item) => (
//           <div key={item.category_id} className ="w-1/4" onClick={() => handleCategorySelect(item)}>
           
//             <CategoryCard item={item} isEditable= {false} isActivable= {false} />
            
           
//           </div>
//         ))}
//         </div>
//       </div>
//  <div className="flex-1 overflow-y-auto h-1/2 ">
//  <p className="m-5 text-2xl text-center font-fredoka">Menus</p>
// <div className="flex flex-wrap justify-between p-10 gap-7">
//  {filteredMenus.length > 0 ? (
 
//       filteredMenus.map((menu) =>(
//         <div className="w-1/4" key={menu.menu_id}>
//           <MenuCard  item={menu} />
//           </div>
//       ))
       
        
//         ) : (
//           <p className="text-center text-gray-500">Select a category to view menus</p>
//         )}
//         </div>
        
//  </div>
   

 
// </div>

// )}

// {isCartOpen && <CartDetail onClose={toggleCartVisible} staff_id={5}/>}




//     </div>
//   )
// }

// export default WaiterHomePage





// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMenus, Menu } from "../Redux/MenuSlice";
// import { Category, fetchCategories } from "../Redux/CategorySlice";
// import CategoryCard from "../OwnerComponets/CatagoryCard";
// import MenuCard from "../Components/MenuCard";
// import CartDetail from "../Components/CartDetail";
// import { Link, useNavigate } from "react-router-dom";
// import { AppDispatch, RootState } from "../Redux/Store";
// import { CartItem } from "../Redux/cartSlice";
// import { fetchUser } from "../Redux/UserSlice";
// import { getSubdomainFromPath } from "../Components/utitlites";
// import { getCurrentSubdomain } from "../utils/urlHelpers";
// // import { RootState, AppDispatch } from "../Redux/store"; // Adjust this path to your actual store file

// // Type definitions (you should move these to a types.ts file if reused)
// // interface Category {
// //   category_id: number;
// //   name: string;
// //   [key: string]: any;
// // }

// // interface Menu {
// //   menu_id: number;
// //   category_id: number;
// //   name: string;
// //   [key: string]: any;
// // }

// // interface CartItem {
// //   id: number;
// //   quantity: number;
// //   [key: string]: any;
// // }

// // interface User {
// //   name: string;
// //   [key: string]: any;
// // }

// const WaiterHomePage: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const dispatch: AppDispatch = useDispatch();

//   const { category, categoryLoading } = useSelector((state: RootState) => state.category);
//   const { menus, menusLoading, menusError: menuError } = useSelector((state: RootState) => state.menu);
//   const { error: categoryError } = useSelector((state: RootState) => state.category);
//   const cartItems = useSelector((state: RootState) => state.cart.cartItems as CartItem[]);
//   const { user } = useSelector((state: RootState) => state.user );

//   const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchMenus());
//     dispatch(fetchUser());
//   }, [dispatch]);

//   const handleCategorySelect = (category: Category) => {
//     setSelectedCategory(category);
//   };
//   const navigate = useNavigate();
// const subdomain = getSubdomainFromPath();

// const handleOrdersClick = () => {
//   if (subdomain) {
//     navigate(`/thekitchenethio/${subdomain}/waiterOrders`);
//   }
// };

//   const filteredMenus = selectedCategory
//     ? menus.filter((menu: Menu) => menu.category === selectedCategory.id)
//     : [];

//   const toggleCartVisible = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   console.log("categories")
//   console.log(category)
 

//   return (
//     <div className="w-full h-full">
//       <p className="text-xl text-center font-fredoka text-red">Welcome {user?.full_name}</p>

//       <div className="flex justify-end pr-8">
// {/*    
//         <Link className="mx-4 text-lg font-fredoka text-red" to={`/thekitchenethio/${subdomain}/waiterOrders`}>Orders</Link>
//            */}

//           <div
//   className="mx-4 text-lg font-fredoka text-red hover:cursor-pointer"
//   onClick={handleOrdersClick}
// >
//   Orders
// </div>
//         <div onClick={toggleCartVisible} className="relative w-10 px-2">
//           <div className="relative hover:cursor-pointer">
//             <i className="text-sm text-black fas fa-shopping-cart sm:text-base lg:text-xl"></i>
//             <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -top-1 -right-2 bg-red">
//               {totalQuantity}
//             </div>
//           </div>
//         </div>
//       </div>

//       {(categoryLoading || menusLoading === true) && <p className="text-center">Loading...</p>}

//       {(menuError || categoryError) && (
//         <div className="w-full h-full">
//           <p className="text-center">Error fetching category and menu</p>
//         </div>
//       )}

//       {category && category.length === 0 && !categoryLoading && (
//         <div><p className="text-center">No Category Available</p></div>
//       )}

//       {category && category.length > 0 && (
//         <div className="flex flex-col h-screen gap-10">
//           <div className="flex-1 p-4 pb-24 overflow-y-auto border-b-8 h-1/2 border-yellow">
//             <p className="m-5 text-2xl text-center font-fredoka">Categories</p>
//             <div className="flex flex-wrap justify-between p-5 gap-7">
//               {category.map((item: Category) => (
//                 <div key={item.id} className="w-1/4" onClick={() => handleCategorySelect(item)}>
//                   <CategoryCard item={item} isEditable={false} isActivable={false} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto h-1/2">
//             <p className="m-5 text-2xl text-center font-fredoka">Menus</p>
//             <div className="flex flex-wrap justify-between p-10 gap-7">
//               {filteredMenus.length > 0 ? (
//                 filteredMenus.map((menu: Menu) => (
//                   <div className="w-1/4" key={menu.id}>
//                     <MenuCard item={menu} />
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">Select a category to view menus</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {isCartOpen && <CartDetail onClose={toggleCartVisible} staff_id={5} />}
//     </div>
//   );
// };

// export default WaiterHomePage;









import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus, Menu } from "../Redux/MenuSlice";
import { Category, fetchCategories } from "../Redux/CategorySlice";
import CategoryCard from "../OwnerComponets/CatagoryCard";
import MenuCard from "../Components/MenuCard";
import { AppDispatch, RootState } from "../Redux/Store";
import WaiterLayout from "../Waiter/WaiterLayout";


const WaiterHomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const { category, categoryLoading, error: categoryError } = useSelector(
    (state: RootState) => state.category
  );
  const { menus, menusLoading, menusError: menuError } = useSelector(
    (state: RootState) => state.menu
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const filteredMenus = selectedCategory
    ? menus.filter((menu: Menu) => menu.category === selectedCategory.id)
    : [];

  return (
    <WaiterLayout>
      {(categoryLoading || menusLoading) && <p className="text-center">Loading...</p>}

      {(menuError || categoryError) && (
        <div className="w-full h-full">
          <p className="text-center">Error fetching category and menu</p>
        </div>
      )}

      {category && category.length === 0 && !categoryLoading && (
        <div><p className="text-center">No Category Available</p></div>
      )}

      {category && category.length > 0 && (
        <div className="flex flex-col h-screen gap-10">
          <div className="flex-1 p-4 pb-24 overflow-y-auto border-b-8 h-1/2 border-yellow">
            <p className="m-5 text-2xl text-center font-fredoka">Categories</p>
            <div className="flex flex-wrap justify-between p-5 gap-7">
              {category.map((item: Category) => (
                <div key={item.id} className="w-1/4" onClick={() => handleCategorySelect(item)}>
                  <CategoryCard item={item} isEditable={false} isActivable={false} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto h-1/2">
            <p className="m-5 text-2xl text-center font-fredoka">Menus</p>
            <div className="flex flex-wrap justify-between p-10 gap-7">
              {filteredMenus.length > 0 ? (
                filteredMenus.map((menu: Menu) => (
                  <div className="w-1/4" key={menu.id}>
                    <MenuCard item={menu} />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Select a category to view menus</p>
              )}
            </div>
          </div>
        </div>
      )}
    </WaiterLayout>
  );
};

export default WaiterHomePage;
