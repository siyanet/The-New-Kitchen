
import { useDispatch, useSelector } from 'react-redux';
import MenuCard from '../Components/MenuCard';
import { useEffect } from 'react';
import { fetchMenus } from '../Redux/MenuSlice';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar'
import OwnerSideBar from '../OwnerComponets/OwnerSideBar'
const OwnerMenuView = () => {
    
    const dispatch = useDispatch();
    const menus = useSelector((state) => state.menu.menus);
    const status = useSelector((state) => state.menu.status);
    const error = useSelector((state) => state.menu.error);
    useEffect(() => {
        if(status === "idle"){
          dispatch(fetchMenus());
        }
        
      }, [dispatch,status]);
      if (status === "loading"){
        return <div>Loading...</div>
      }
      if(status === "failed"){
        return <div>Error: {error}</div>
      }
  return (
    <div className=''>
         <OwnerNavBar/>
         <OwnerSideBar/>
         <div className='ml-32'>
         <h1>Menus</h1>
        <div className="flex flex-wrap justify-center sm:justify-between  p-4 gap-3">
        
        {menus.map((item) =>{
          return(
           
            <div className="w-1/2 sm:w-1/4 lg:w-1/5  " key = {item.menu_id}>
              <MenuCard 
          item={item}
          />
            </div>
            
          )
        })}
      </div>



         </div>
        
      
    </div>
  )
}

export default OwnerMenuView
