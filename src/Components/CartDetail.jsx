
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CartCard from './CartCard';
const CartDetail = ({onClose}) => { 
    const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux store
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items
    const totalPrice = cartItems.reduce((total, item) => total + item.selectedPortion.price * item.quantity, 0); // Calculate total price
  console.log("cartItems");
    console.log(cartItems);
  return (
    <div className='fixed right-0 top-0 w-full sm:w-1/2 h-full bg-white shadow-lg overflow-y-auto'>
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

        
        <div className="p-4 border-b-4 border-black text-black bottom-0">
              <div className="flex justify-between">
                <p className="text-lg">Total Items: {totalItems}</p>
                <p className="text-lg">Total Price: ${totalPrice.toFixed(2)}</p>
              </div>
            </div>
        </> 
          
        ) : (
          <p className="text-center flex h-full flex-col justify-center text-black"> Cart is empty.</p>
        )}
      </div>


      
        
      
    </div>
  );
}
CartDetail.propTypes = {
    onClose: PropTypes.func,
};

export default CartDetail;
