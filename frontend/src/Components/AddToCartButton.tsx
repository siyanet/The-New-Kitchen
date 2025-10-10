



import { useState } from "react";
import MenuDetail from './MenuDetail';
import { Menu } from "../Redux/MenuSlice";



interface AddToCartButtonProps {
  item: Menu;
  recommended?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item, recommended }) => {
  const [isDetailVisible, setDetailVisible] = useState(false);

  const toggleDetailView = () => {
    setDetailVisible(!isDetailVisible);
  };

  return (
    <>
      <div onClick={toggleDetailView} className="hover:cursor-pointer">
        {recommended ? (
          <i className="text-lg text-black fas fa-cart-plus"></i>
        ) : (
          <div className="p-1 bg-gray-300 rounded-full group-hover:bg-white sm:p-3 md:p-3">
            <i className="text-sm text-black fas fa-cart-plus sm:text-base lg:text-lg"></i>
          </div>
        )}
      </div>

      {isDetailVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <MenuDetail id={item.id} toggleDetailView={toggleDetailView} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCartButton;
