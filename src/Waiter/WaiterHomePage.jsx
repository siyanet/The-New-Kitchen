import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus } from "../Redux/MenuSlice";
import { fetchCategories } from "../Redux/CategorySlice";
import CategoryCard from "../OwnerComponets/CatagoryCard";
import MenuCard from "../Components/MenuCard";
import CartDetail from "../Components/CartDetail";


const WaiterHomePage = () => {
  const [selectedCategory,setSelectedCategory] = useState(null);
  const [isCartOpen,setIsCartOpen] = useState(false);
  const {category,loading} = useSelector((state)=> state.category);
  const {menus,status} = useSelector((state)=>state.menu);
  const menuError = useSelector((state)=>state.menu.error);
  const categoryError = useSelector((state)=>state.category.error);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {user,isAuthenticated} = useSelector((state) => state.user);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  useEffect(()=>{
dispatch(fetchCategories());
dispatch(fetchMenus());
  },[dispatch]);
  

  const handleCategorySelect =(category)=>{
    setSelectedCategory(category);
  }
  const filteredMenus = selectedCategory
  ? menus.filter((menu) => menu.category_id === selectedCategory.category_id)
  : [];
  const toggleCartVisible = ()=>{
    setIsCartOpen(!isCartOpen);
  }
  


  return (
    <div className="w-full h-full">
             <p className="text-center font-fredoka text-xl text-red">wellcome {user.name}</p>
             <div className="flex justify-end pr-8">
             <div onClick={toggleCartVisible} className="  w-10 relative  px-2">
  <div className="hover:cursor-pointer relative">
    <i className="fas fa-shopping-cart text-black text-sm sm:text-base lg:text-xl"></i>
    <div className="absolute -top-1 -right-2 bg-red text-white rounded-full text-xs h-4 w-4 flex items-center justify-center">
      {totalQuantity}
    </div>
  </div>
</div>
             </div>
           

   


       {(loading || status === "loading") && 
       <p>loading ...</p>
       }
       {
        (menuError || categoryError &&(
          <div className="w-full h-full">
            <p className="text-center"> error fetching category and menu</p>
          </div>
        ))
       }
         {  category && category.length === 0 && !loading &&
      (
        <div className=""> <p className="text-center"> No Category Available</p></div>
      )
}
    
    {category && category.length > 0 &&(
  
 <div className='flex flex-col h-screen gap-10'>

<div className="flex-1 h-1/2 overflow-y-auto p-4 border-b-8 border-yellow pb-24 ">
<p className="text-center font-fredoka m-5 text-2xl">Categories</p>
<div className="flex gap-7 flex-wrap p-5 justify-between">
        {category.map((item) => (
          <div key={item.category_id} className ="w-1/4" onClick={() => handleCategorySelect(item)}>
           
            <CategoryCard item={item} isEditable= {false} isActivable= {false} />
            
           
          </div>
        ))}
        </div>
      </div>
 <div className="flex-1 h-1/2 overflow-y-auto ">
 <p className="text-center font-fredoka m-5 text-2xl">Menus</p>
<div className="flex gap-7 flex-wrap p-10 justify-between">
 {filteredMenus.length > 0 ? (
 
      filteredMenus.map((menu) =>(
        <div className="w-1/4" key={menu.menu_id}>
          <MenuCard  item={menu} />
          </div>
      ))
       
        
        ) : (
          <p className="text-center text-gray-500">Select a category to view menus</p>
        )}
        </div>
        
 </div>
   

 
</div>

)}

{isCartOpen && <CartDetail onClose={toggleCartVisible}/>}




    </div>
  )
}

export default WaiterHomePage
