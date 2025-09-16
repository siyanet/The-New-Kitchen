
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';
import CartCard from './CartCard';
import RedButton from './RedButton';
import { placeOrder } from '../Redux/orderSlice';
import { clearCart } from '../Redux/cartSlice';

import { notify } from './notify';
import Confimation from './Confimation';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
const CartDetail = ({onClose,staff_id}) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux store
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items
    const totalPrice = cartItems.reduce((total, item) => total + item.selectedPortion.price * item.quantity, 0); // Calculate total price
    const dispatch = useDispatch();
   

    const handleConfirm = async () => {
      setIsModalOpen(true); // Show modal on order placement click
    };
    const handleOrderPlacement = async () => {
      setIsModalOpen(false);
     
      const orderData = {
          items: cartItems.map(item => ({
              menu_id: item.menu_id,
              portion_id: item.selectedPortion.portion_id, // Assuming you have selected portion ID
              quantity: item.quantity,
              note: item.note || '', // Assuming you have notes in the cart items
          })) // Flattening extras from all cart items
      };
      if(staff_id){
        orderData.staff_id = staff_id;
        orderData.table_id = 2;
      }
      console.log(orderData);
      try{
        await  dispatch(placeOrder(orderData));

        dispatch(clearCart());
        notify("Order Placed Successfully!","success");
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      catch(error){
        notify("Failed to Place Order please try again","error");
      }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close modal without placing order
  };


  return (
    // <div className='fixed right-0 top-0 w-full sm:w-1/2 h-full bg-white shadow-lg overflow-y-auto'>

<div className="fixed inset-0 flex  justify-end bg-black bg-opacity-50 z-50">
<div className="bg-white rounded-lg shadow-lg p-10 max-w-lg w-full">
      <ToastContainer position="top-right" className="mb-4" autoClose={1500} /> 
        <div className="flex justify-between p-5">
            <i onClick= {onClose} className='hover:cursor-pointer fas fa-close text-2xl'></i>
            <h1 className='text-black font-fredoka font-normal text-base sm:text-lg md:text-xl'>Your Cart</h1>
        </div>

        <div className="flex-grow overflow-y-auto h-full p-4 space-y-4">
        {cartItems.length > 0 ? (
        <>{cartItems.map((item) => <CartCard key={item.menu_id} item={item} />)}

<div>
  <p> Extras</p>
  <ul>
    {cartItems.map((item, index) => (
      <li key={index}>
        {item.selectedExtras && item.selectedExtras.length > 0 ? (
          <ul>
            {item.selectedExtras.map((extra, idx) => (
              <li key={idx}>
                {extra.name} (${extra.price}) {/* Access name and price of the extra */}
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </li>
    ))}
  </ul>
</div>

        
        <div className="p-4 border-b-4  border-black text-black bottom-0">
              <div className="flex justify-between">
                <p className="text-lg">Total Items: {totalItems}</p>
                <p className="text-lg">Total Price: ${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <RedButton word ={"orderPlaced"} onClick={handleConfirm}/>
        </> 
          
        ) : (
          <p className="text-center flex h-full flex-col justify-center text-black"> Cart is empty.</p>
        )}



<Confimation 
        isOpen={isModalOpen} 
        onConfirm={handleOrderPlacement} 
        onCancel={handleCancel} 
        message={"Are you sure you want to order all Items in the Cart ?"}
      /> 
      </div>


      
        </div>
      
    </div>
  );
}
CartDetail.propTypes = {
    onClose: PropTypes.func,
};

export default CartDetail;
