


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartCard from './CartCard';
import RedButton from './RedButton';
import Confimation from './Confimation';
import { ToastContainer } from 'react-toastify';
import { notify } from './notify';
import { placeOrder } from '../Redux/orderSlice';
import { CartItem, clearCart } from '../Redux/cartSlice';
import { AppDispatch, RootState } from '../Redux/Store';
import { fetchBranches } from '../Redux/branchSlice';







interface CartDetailProps {
  onClose: () => void;
  staff_id?: number;
}

const CartDetail: React.FC<CartDetailProps> = ({ onClose, staff_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems as CartItem[]);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    const portionPrice = item.selectedPortion.discounted_price
      ? Number(item.selectedPortion.discounted_price)
      : Number(item.selectedPortion.price);
    const extrasPrice = item.selectedExtras.reduce((acc, extra) => acc + Number(extra.price), 0);
    return total + (portionPrice + extrasPrice) * item.quantity;
  }, 0);

  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
const branches = useSelector((state: RootState) => state.branch.branches);
const branchLoading = useSelector((state: RootState) => state.branch.loading);

useEffect(() => {
  dispatch(fetchBranches());
}, [dispatch]);


  const handleConfirm = () => {
    setIsModalOpen(true);
  };

  const handleOrderPlacement = () => {
  if (!selectedBranchId) {
    notify('Please select a branch.');
    return;
  }

  const orderPayload = {
    branch_id: selectedBranchId,
    items: cartItems.map(item => ({
      portion: item.selectedPortion.id,
      quantity: item.quantity,
      extras: item.selectedExtras.map(extra => extra.id)
    }))
  };

  dispatch(placeOrder(orderPayload)).then(() => {
    notify('Order placed successfully!');
    dispatch(clearCart());
    onClose();
  });
};




  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-10 bg-white rounded-lg shadow-lg">
        <ToastContainer position="top-right" className="mb-4" autoClose={1500} />

        <div className="flex justify-between p-5">
          <i onClick={onClose} className="text-2xl hover:cursor-pointer fas fa-close"></i>
          <h1 className="text-base font-normal text-black font-fredoka sm:text-lg md:text-xl">Your Cart</h1>
        </div>

        <div className="flex-grow h-full p-4 space-y-4 overflow-y-auto">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <CartCard key={item.menu.id} item={item} />
              ))}

              <div>
                <p className="mb-2 font-bold">Extras</p>
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      {item.selectedExtras.length > 0 && (
                        <ul className="pl-4 list-disc">
                          {item.selectedExtras.map((extra, idx) => (
                            <li key={idx}>
                              {extra.name} (${extra.price})
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
  <label className="block mb-2 text-sm font-medium text-gray-700">Select Branch</label>
  {branchLoading ? (
    <p>Loading branches...</p>
  ) : (
    <select
      className="w-full px-3 py-2 border rounded-md focus:outline-none"
      value={selectedBranchId || ''}
      onChange={(e) => setSelectedBranchId(e.target.value)}
    >
      <option value="" disabled>Select a branch</option>
      {branches.map((branch) => (
        <option key={branch.id} value={branch.id}>
          {branch.name}
        </option>
      ))}
    </select>
  )}
</div>


              <div className="p-4 text-black border-b-4 border-black">
                <div className="flex justify-between">
                  <p className="text-lg">Total Items: {totalItems}</p>
                  <p className="text-lg">Total Price: ${totalPrice.toFixed(2)}</p>
                </div>
              </div>

              <RedButton word="orderPlaced" onClick={handleConfirm} />
            </>
          ) : (
            <p className="flex flex-col justify-center h-full text-center text-black">Cart is empty.</p>
          )}
          

          <Confimation
            isOpen={isModalOpen}
            onConfirm={handleOrderPlacement}
            onCancel={handleCancel}
            message="Are you sure you want to order all items in the cart?"
          />
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
