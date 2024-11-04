import PropTypes from "prop-types";
import ReviewStar from "./ReviewStar";
import { useState, useEffect } from "react";
import { fetchExtras } from '../Redux/ExtraSlice';
import { fetchMenuDetail } from "../Redux/MenuDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import CartAddedButton from "./cartAddedButton";
import RedButton from "./RedButton";
import YellowButton from "./YellowButton";


const MenuDetail = ({id,toggleDetailView}) => {
  const dispatch = useDispatch();
  const extras = useSelector((state) => state.extras.items);
const { item, status,error } = useSelector((state) => state.menuDetail);
  useEffect(() => {
    dispatch(fetchMenuDetail(id)); // Fetch the menu details using the menuId
  }, [dispatch, id]);

  useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchExtras());
    }
}, [dispatch, status]);
    const [selectedPortion, setSelectedPortion] = useState('');
  const [selectedExtras, setSelectedExtras] = useState(new Set());

  const handlePortionChange = (e) => {
    setSelectedPortion(e.target.value);
  };

  const handleExtraChange = (e) => {
    const updatedExtras = new Set(selectedExtras);
    if (e.target.checked) {
      updatedExtras.add(e.target.value);
    } else {
      updatedExtras.delete(e.target.value);
    }
    setSelectedExtras(updatedExtras);
  };



  const handleButtonClick = () => {
    // Logic for the button click, e.g., adding to cart can go here
    // ...

    // Reset the selected portion and extras
    setSelectedPortion(null);
    setSelectedExtras([]);
  };
 

  const filteredExtras = Array.from(selectedExtras).map(extraId => {
    const extra = extras.find(e => e.id === Number(extraId)); // Convert extraId to number
    return extra ? { id: extra.id, name: extra.name, price: extra.price } : null; // Return the extra object or null
}).filter(extra => extra !== null);


  // Add a check to ensure `item` exists before rendering
  if (!item) {
    return <div>No menu details available</div>;
  }
  if (status === 'loading') {
    return <div>Loading...</div>;
}
if (error === 'failed') {
    return <div>Error: {error}</div>;
}


  return (
    <div className="flex justify-center">
         <div className='flex w-full   flex-col'>
         <i onClick={toggleDetailView} className='fas fa-close mb-2 text-center text-4xl'/>
        
        
         <div className="flex w-full bg-purple-400 flex-col border-1 border-black shadow-lg rounded-md">
           <div className="w-full ">
           <img src={item.image} className="rounded-t-lg object-cover w-full max-h-[200px]" />
           </div>
           <div className="bg-white p-3 flex  flex-col gap-2 text-center">
            <p className="font-fredoka text-black font-normal text-base">{item.menu_name}</p>
           <p className="font-nunito font-light text-base ">{item.description}</p>
           <div className="flex justify-center">  <ReviewStar rating={item.average_rate} /></div>
           </div>
         </div>




         <div className="flex flex-col mt-5  shadow-md w-full bg-white rounded-lg border-2 border-black border-opacity-65 ">
            <div className="w-full"> <p className=" px-4 py-2 font-nunito font-bold text-xl text-left border-b-2 border-back">Portions</p></div>
          <div>
          {item.portions && item.portions.map((portion) => (
            <div key= {portion.portion_id} className="px-4 py-1"> 
              <label >
              <input
                type="radio"
                name="portion"
                value={portion.portion_id}
                checked={selectedPortion == portion.portion_id}
                onChange={handlePortionChange}
                className=""
              />
                        <span className="font-nunito font-black text-base">
                        {portion.portion}
                       
                       
                        <span className="text-red">-----</span>
                {portion.discounted_price ? (
                  <div className="inline-block px-2 text-red">
                   
                    ${portion.discounted_price}
                    <span className="line-through px-4 text-gray-100  ">${portion.price}</span> 
                  </div>
                ) : (
                  <span className=" px-4 text-red  ">${portion.price}</span> 
                )}
              
              </span>
            </label>
            </div>
          
          ))}
          </div>
         </div>



{extras?  <div className="flex flex-col border-2 mb-2 border-black border-opacity-65 shadow-md w-full bg-white rounded-lg mt-4">
        <div className="w-full">
          <p className="font-nunito font-bold text-lg text-left border-b-2 border-black p-4">Extras</p>
          <div>
            {
                 extras.map((extra,index) =>(
                    <div className="flex flex-col px-4 py-1" key={index}>

<label key = {index}>
                  <input
                    type="checkbox"
                    value={extra.id} // Assuming you have more than one extra, adapt as needed
                    onChange={handleExtraChange}
                    className="mr-2"
                  />
                  <span>{extra.name} (${extra.price})</span>
                </label>
                    </div>

                 
    
                ))

            }
           
            
          </div>
        </div>
      </div> : <div></div>}
         






<div className="flex justify-between">
  {selectedPortion? (                           
  <CartAddedButton
    item={{
      menu_id: item.menu_id,
      menu_name: item.menu_name,
      image: item.image,
      selectedPortion: selectedPortion
        ? {
            portion_id: selectedPortion,
            portion: item.portions.find(p => p.portion_id == selectedPortion)?.portion,
            price: item.portions.find(p => p.portion_id == selectedPortion)?.discounted_price || 
                   item.portions.find(p => p.portion_id == selectedPortion)?.price,
          }
        : null, // Set to null if no portion is selected
        selectedExtras: filteredExtras.length > 0 ? filteredExtras : []
    }}
  // Disable button if no portion is selected
  onClick = {handleButtonClick}
  />
  ) : ( <RedButton word={"Add To Cart"} />)}

  <YellowButton onClick={toggleDetailView} word={"Cancel"}/>
</div>




    </div>
    </div>
   
  );
}
MenuDetail.propTypes = {
  id: PropTypes.number,
  toggleDetailView: PropTypes.func.isRequired  
};

export default MenuDetail;
