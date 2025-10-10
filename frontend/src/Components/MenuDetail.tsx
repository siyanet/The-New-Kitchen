

import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExtras } from '../Redux/ExtraSlice';
import { fetchMenuDetail } from "../Redux/MenuDetailSlice";
import { AppDispatch, RootState } from "../Redux/Store";

import ReviewStar from "./ReviewStar";
import RedButton from "./RedButton";
import YellowButton from "./YellowButton";
import CartAddedButton from "./CartAddedButton";



interface Extra {
  id: string;
  name: string;
  price: string;
}



interface MenuDetailProps {
  id: string; // passed as string but slice thunk expects number
  toggleDetailView: () => void;
}

const MenuDetail: React.FC<MenuDetailProps> = ({ id, toggleDetailView }) => {
  const dispatch = useDispatch<AppDispatch>();
  const extras = useSelector((state: RootState) => state.extras.extras);
  const extrasStatus = useSelector((state: RootState) => state.extras.loading);
  const { menuDetail: menu, loading, error } = useSelector((state: RootState) => state.menuDetail);

  // Portion id is a number, so selectedPortion state should be number | null
  const [selectedPortion, setSelectedPortion] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  useEffect(() => {
    console.log("idsetned");
    console.log(id);
    dispatch(fetchMenuDetail(id)); // convert id string to number
  }, [dispatch, id]);

  useEffect(() => {
    
      dispatch(fetchExtras());
    
  }, [dispatch]);

  


  const handlePortionChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("value")
    console.log(e.target.value);
    setSelectedPortion(e.target.value);
   
  };

  const handleExtraChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedExtras = new Set(selectedExtras);
    if (e.target.checked) {
      updatedExtras.add(e.target.value);
    } else {
      updatedExtras.delete(e.target.value);
    }
    setSelectedExtras(updatedExtras);
  };

  const handleButtonClick = () => {
    setSelectedPortion(null);
    setSelectedExtras(new Set());
  };

  const filteredExtras: Extra[] = Array.from(selectedExtras).map(extraId => {
    const extra = extras.find(e => e.id === extraId);
    return extra ? { id: extra.id, name: extra.name, price: extra.price } : null;
  }).filter((extra): extra is Extra => extra !== null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!menu) return <div>No menu details available</div>;

const portion = menu.portions.find(p => String(p.id) === selectedPortion);

  
  return (
    <div className="flex justify-center">
      <div className='flex flex-col w-full'>
        <i onClick={toggleDetailView} className='mb-2 text-4xl text-center fas fa-close' />

        <div className="flex flex-col w-full bg-purple-400 border-black rounded-md shadow-lg border-1">
          <img src={menu.image} className="rounded-t-lg object-cover w-full max-h-[200px]" alt="menu" />
          <div className="flex flex-col gap-2 p-3 text-center bg-white">
            <p className="text-base font-normal text-black font-fredoka">{menu.name}</p>
            <p className="text-base font-light font-nunito">{menu.description}</p>
            <div className="flex justify-center">
              <ReviewStar rating={menu.average_rating} />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-5 bg-white border-2 border-black rounded-lg shadow-md border-opacity-65">
          <p className="px-4 py-2 text-xl font-bold text-left border-b-2 border-black font-nunito">Portions</p>
          {menu.portions.map((portion) => (
            <div key={portion.id} className="px-4 py-1">
              
              
              <label>
                <input
                  type="radio"
                  name="portion"
                  value={portion.id}
                  // checked= {true}
                  checked={selectedPortion === portion.id}
                  onChange={handlePortionChange}
                />
                <span className="ml-2 text-base font-black font-nunito">
                  {portion.size}
                  <span className="text-red"> — </span>
                  {portion.discounted_price ? (
                    <>
                      <span className="text-red">${portion.discounted_price}</span>
                      <span className="ml-2 text-gray-400 line-through">${portion.price}</span>
                    </>
                  ) : (
                    <span className="text-red">${portion.price}</span>
                  )}
                </span>
              </label>
            </div>
          ))}
        </div>

        {extras.length > 0 && (
          <div className="flex flex-col w-full mt-4 mb-2 bg-white border-2 border-black rounded-lg shadow-md border-opacity-65">
            <p className="p-4 text-lg font-bold text-left border-b-2 border-black font-nunito">Extras</p>
            {extras.map((extra) => (
              <div className="flex flex-col px-4 py-1" key={extra.id}>
                <label>
                  <input
                    type="checkbox"
                    value={extra.id}
                    onChange={handleExtraChange}
                    className="mr-2"
                  />
                  <span>{extra.name} (${extra.price})</span>
                </label>
              </div>
            ))}
          </div>
        )}

      


<div className="flex justify-between mt-5">
  {selectedPortion !== null && portion  ? (
    <CartAddedButton
      item={{
        menu: menu,
        selectedPortion: portion,
        quantity: 1,

        selectedExtras: filteredExtras,
      }}
      onClick={handleButtonClick}
    />
  ) : (
    <RedButton word="Add To Cart" />
  )}
  <YellowButton onClick={toggleDetailView} word="Cancel" />
</div>




        

        
      </div>
    </div>
  );
};

export default MenuDetail;
