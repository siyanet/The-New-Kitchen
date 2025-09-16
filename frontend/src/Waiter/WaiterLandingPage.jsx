import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/footer";
import Logo from "../Components/logo";
import { useEffect, useState } from "react";
import { fetchPendingOrders } from "../Redux/pendingOrders";
import { ClipLoader } from "react-spinners";
import { HeaderCell, StyledTable, TableCell, TableHeader, TableRow } from "../OwnerComponets/OwnerTableComponent";
import { Link } from "react-router-dom";
import { fetchWaitersByLocation } from "../Redux/filterWaiter";


const WaiterLandingPage = () => {
  const [waiterListView,setWaiterListView] = useState();
  const dispatch = useDispatch();
  const { pendingOrders, pendingOrdersloading, pendingOrderserror } = useSelector(state => state.pendingOrders); 
  const {filteredWaiters,filteredWaitersLoading,filteredWaitersError} = useSelector(state=> state.filteredWaiters);
 useEffect(()=>{
  dispatch(fetchPendingOrders());
  dispatch(fetchWaitersByLocation(1));
 },[dispatch]);
 const handleLogin = ()=>{
  setWaiterListView(true);
 }
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex justify-between shadow-md bg-white z-10 fixed top-0 w-full px-4">


        <div>
        <Logo/>
        </div>


        <div  className="mt-2 hover:cursor-pointer">
          <p className="font-fredoka text-xl" onClick={handleLogin}>Login</p>
          {waiterListView && (
            <div>
              <div className="absolute top-10 right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 font-epilogue">
                {filteredWaitersLoading && (
                  <div> <ClipLoader/></div>
                )}
                {filteredWaitersError && (
                  <div> {filteredWaitersError}</div>
                )}
                {filteredWaiters && !filteredWaitersLoading && filteredWaiters.length > 0 &&(
                    <ul>
                    {filteredWaiters.map((waiter) => (
                      <li key={waiter.id} className="text-blue-500 hover:underline">
                        <Link to={`/login?waiterId=${waiter.id}`}>
                          {waiter.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                 
                )}
             
              

            </div>
            </div>
          )}
        </div>

      </div>
        

          
      <div className="flex-grow mt-[70px] mb-[70px] overflow-y-auto px-10">
      <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
      <div>
          {pendingOrdersloading && (
            <ClipLoader/>
          )}
          {pendingOrderserror &&(
            <div> {pendingOrderserror}</div>
          )}
          {
            pendingOrders.length > 0? (
              <StyledTable> 
                <TableHeader>
                <tr>
                  <HeaderCell isFirst>Order ID</HeaderCell>
                  <HeaderCell >User</HeaderCell>
                  <HeaderCell>Created Time</HeaderCell>
                  <HeaderCell isLast>Status</HeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {pendingOrders.map((order, index) => (
                  <TableRow key={order.id} isEven={index % 2 != 0}>
                    <TableCell isFirst>{order.id}</TableCell>
                    <TableCell>{order.user ? order.user.name : 'N/A'}</TableCell>
                    <TableCell>{order.created_at}</TableCell>
                    <TableCell isLast>{order.status}</TableCell>
                  </TableRow>
                ))}
              </tbody>

              </StyledTable>
            ): (
            <div></div>
              )
            
          }
        </div>
      </div>

       <div className="fixed bottom-0 w-full h-[300px]">
        <Footer/>
       </div>
      
    </div>
  )
}

export default WaiterLandingPage;
