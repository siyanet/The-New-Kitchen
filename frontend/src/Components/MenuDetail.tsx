// import PropTypes from "prop-types";
// import ReviewStar from "./ReviewStar";
// import { useState, useEffect } from "react";
// import { fetchExtras } from '../Redux/ExtraSlice';
// import { fetchMenuDetail } from "../Redux/MenuDetailSlice";
// import { useDispatch, useSelector } from "react-redux";
// import CartAddedButton from "./cartAddedButton";
// import RedButton from "./RedButton";
// import YellowButton from "./YellowButton";


// const MenuDetail = ({id,toggleDetailView}) => {
//   const dispatch = useDispatch();
//   const extras = useSelector((state) => state.extras.items);
// const { item, status,error } = useSelector((state) => state.menuDetail);
//   useEffect(() => {
//     dispatch(fetchMenuDetail(id)); // Fetch the menu details using the menuId
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (status === 'idle') {
//         dispatch(fetchExtras());
//     }
// }, [dispatch, status]);
//     const [selectedPortion, setSelectedPortion] = useState('');
//   const [selectedExtras, setSelectedExtras] = useState(new Set());

//   const handlePortionChange = (e) => {
//     setSelectedPortion(e.target.value);
//   };

//   const handleExtraChange = (e) => {
//     const updatedExtras = new Set(selectedExtras);
//     if (e.target.checked) {
//       updatedExtras.add(e.target.value);
//     } else {
//       updatedExtras.delete(e.target.value);
//     }
//     setSelectedExtras(updatedExtras);
//   };



//   const handleButtonClick = () => {
//     // Logic for the button click, e.g., adding to cart can go here
//     // ...

//     // Reset the selected portion and extras
//     setSelectedPortion(null);
//     setSelectedExtras([]);
//   };
 

//   const filteredExtras = Array.from(selectedExtras).map(extraId => {
//     const extra = extras.find(e => e.id === Number(extraId)); // Convert extraId to number
//     return extra ? { id: extra.id, name: extra.name, price: extra.price } : null; // Return the extra object or null
// }).filter(extra => extra !== null);


//   // Add a check to ensure `item` exists before rendering
//   if (!item) {
//     return <div>No menu details available</div>;
//   }
//   if (status === 'loading') {
//     return <div>Loading...</div>;
// }
// if (error === 'failed') {
//     return <div>Error: {error}</div>;
// }


//   return (
//     <div className="flex justify-center">
//          <div className='flex flex-col w-full'>
//          <i onClick={toggleDetailView} className='mb-2 text-4xl text-center fas fa-close'/>
        
        
//          <div className="flex flex-col w-full bg-purple-400 border-black rounded-md shadow-lg border-1">
//            <div className="w-full ">
//            <img src={item.image} className="rounded-t-lg object-cover w-full max-h-[200px]" />
//            </div>
//            <div className="flex flex-col gap-2 p-3 text-center bg-white">
//             <p className="text-base font-normal text-black font-fredoka">{item.menu_name}</p>
//            <p className="text-base font-light font-nunito ">{item.description}</p>
//            <div className="flex justify-center">  <ReviewStar rating={item.average_rate} /></div>
//            </div>
//          </div>




//          <div className="flex flex-col w-full mt-5 bg-white border-2 border-black rounded-lg shadow-md border-opacity-65 ">
//             <div className="w-full"> <p className="px-4 py-2 text-xl font-bold text-left border-b-2 font-nunito border-back">Portions</p></div>
//           <div>
//           {item.portions && item.portions.map((portion) => (
//             <div key= {portion.portion_id} className="px-4 py-1"> 
//               <label >
//               <input
//                 type="radio"
//                 name="portion"
//                 value={portion.portion_id}
//                 checked={selectedPortion == portion.portion_id}
//                 onChange={handlePortionChange}
//                 className=""
//               />
//                         <span className="text-base font-black font-nunito">
//                         {portion.name}
                       
                       
//                         <span className="text-red">-----</span>
//                 {portion.discounted_price ? (
//                   <div className="inline-block px-2 text-red">
                   
//                     ${portion.discounted_price}
//                     <span className="px-4 text-gray-100 line-through ">${portion.price}</span> 
//                   </div>
//                 ) : (
//                   <span className="px-4 text-red">${portion.price}</span> 
//                 )}
              
//               </span>
//             </label>
//             </div>
          
//           ))}
//           </div>
//          </div>



// {extras.length > 0 &&(
//     <div className="flex flex-col w-full mt-4 mb-2 bg-white border-2 border-black rounded-lg shadow-md border-opacity-65">
//         <div className="w-full">
//           <p className="p-4 text-lg font-bold text-left border-b-2 border-black font-nunito">Extras</p>
//           <div>
//             {
//                  extras.map((extra,index) =>(
//                     <div className="flex flex-col px-4 py-1" key={index}>

// <label key = {index}>
//                   <input
//                     type="checkbox"
//                     value={extra.id} // Assuming you have more than one extra, adapt as needed
//                     onChange={handleExtraChange}
//                     className="mr-2"
//                   />
//                   <span>{extra.name} (${extra.price})</span>
//                 </label>
//                     </div>

                 
    
//                 ))

//             }
           
            
//           </div>
//         </div>
//       </div> )}
         






// <div className="flex justify-between mt-5">
//   {selectedPortion? (                           
//   <CartAddedButton
//     item={{
//       menu_id: item.menu_id,
//       menu_name: item.menu_name,
//       image: item.image,
//       selectedPortion: selectedPortion
//         ? {
//             portion_id: selectedPortion,
//             portion: item.portions.find(p => p.portion_id == selectedPortion)?.portion,
//             price: item.portions.find(p => p.portion_id == selectedPortion)?.discounted_price || 
//                    item.portions.find(p => p.portion_id == selectedPortion)?.price,
//           }
//         : null, // Set to null if no portion is selected
//         selectedExtras: filteredExtras.length > 0 ? filteredExtras : []
//     }}
//   // Disable button if no portion is selected
//   onClick = {handleButtonClick}
//   />
//   ) : ( <RedButton word={"Add To Cart"} />)}

//   <YellowButton onClick={toggleDetailView} word={"Cancel"}/>
// </div>




//     </div>
//     </div>
   
//   );
// }
// MenuDetail.propTypes = {
//   id: PropTypes.number,
//   toggleDetailView: PropTypes.func.isRequired  
// };

// export default MenuDetail;


// import PropTypes from "prop-types";
// import ReviewStar from "./ReviewStar";
// import { useState, useEffect, ChangeEvent } from "react";
// import { fetchExtras } from '../Redux/ExtraSlice';
// import { fetchMenuDetail } from "../Redux/MenuDetailSlice";
// import { useDispatch, useSelector } from "react-redux";

// import RedButton from "./RedButton";
// import YellowButton from "./YellowButton";
// import { AppDispatch, RootState } from "../Redux/Store";


// interface Portion {
//   portion_id: number;
//   portion: string;
//   name: string;
//   price: number;
//   discounted_price?: number;
// }

// interface Extra {
//   id: string;
//   name: string;
//   price: string;
// }

// interface MenuItem {
//   menu_id: number;
//   menu_name: string;
//   image: string;
//   description: string;
//   average_rate: number;
//   portions: Portion[];
// }

// interface MenuDetailProps {
//   id: number;
//   toggleDetailView: () => void;
// }

// const MenuDetail: React.FC<MenuDetailProps> = ({ id, toggleDetailView }) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const extras = useSelector((state: RootState) => state.extras.extras);
//   const { menu, status, error } = useSelector((state: RootState) => state.menuDetail);

//   useEffect(() => {
//     dispatch(fetchMenuDetail(id)); // Fetch the menu details using the menuId
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchExtras());
//     }
//   }, [dispatch, status]);

//   const [selectedPortion, setSelectedPortion] = useState<number | null>(null);
//   const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

//   const handlePortionChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSelectedPortion(Number(e.target.value));
//   };

//   const handleExtraChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const updatedExtras = new Set(selectedExtras);
//     if (e.target.checked) {
//       updatedExtras.add(e.target.value);
//     } else {
//       updatedExtras.delete(e.target.value);
//     }
//     setSelectedExtras(updatedExtras);
//   };

//   const handleButtonClick = () => {
//     // Logic for the button click, e.g., adding to cart can go here
//     // Reset the selected portion and extras
//     setSelectedPortion(null);
//     setSelectedExtras(new Set());
//   };

//   const filteredExtras = Array.from(selectedExtras).map(extraId => {
//     const extra = extras.find(e => e.id === extraId);
//     return extra ? { id: extra.id, name: extra.name, price: extra.price } : null;
//   }).filter((extra): extra is Extra => extra !== null);

//   if (!menu) {
//     return <div>No menu details available</div>;
//   }
//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }
//   if (error === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="flex justify-center">
//       <div className='flex flex-col w-full'>
//         <i onClick={toggleDetailView} className='mb-2 text-4xl text-center fas fa-close' />

//         <div className="flex flex-col w-full bg-purple-400 border-black rounded-md shadow-lg border-1">
//           <div className="w-full">
//             <img src={menu.image} className="rounded-t-lg object-cover w-full max-h-[200px]" />
//           </div>
//           <div className="flex flex-col gap-2 p-3 text-center bg-white">
//             <p className="text-base font-normal text-black font-fredoka">{menu.name}</p>
//             <p className="text-base font-light font-nunito">{menu.description}</p>
//             <div className="flex justify-center">
//               <ReviewStar rating={menu.average_rate} />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col w-full mt-5 bg-white border-2 border-black rounded-lg shadow-md border-opacity-65">
//           <div className="w-full">
//             <p className="px-4 py-2 text-xl font-bold text-left border-b-2 font-nunito border-back">Portions</p>
//           </div>
//           <div>
//             {menu.portions && menu.portions.map((portion) => (
//               <div key={portion.id} className="px-4 py-1">
//                 <label>
//                   <input
//                     type="radio"
//                     name="portion"
//                     value={portion.portion_id}
//                     checked={selectedPortion === portion.portion_id}
//                     onChange={handlePortionChange}
//                     className=""
//                   />
//                   <span className="text-base font-black font-nunito">
//                     {portion.name}
//                     <span className="text-red">-----</span>
//                     {portion.discounted_price ? (
//                       <div className="inline-block px-2 text-red">
//                         ${portion.discounted_price}
//                         <span className="px-4 text-gray-100 line-through">${portion.price}</span>
//                       </div>
//                     ) : (
//                       <span className="px-4 text-red">${portion.price}</span>
//                     )}
//                   </span>
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {extras.length > 0 && (
//           <div className="flex flex-col w-full mt-4 mb-2 bg-white border-2 border-black rounded-lg shadow-md border-opacity-65">
//             <div className="w-full">
//               <p className="p-4 text-lg font-bold text-left border-b-2 border-black font-nunito">Extras</p>
//               <div>
//                 {extras.map((extra, index) => (
//                   <div className="flex flex-col px-4 py-1" key={index}>
//                     <label>
//                       <input
//                         type="checkbox"
//                         value={extra.id}
//                         onChange={handleExtraChange}
//                         className="mr-2"
//                       />
//                       <span>{extra.name} (${extra.price})</span>
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-between mt-5">
//           {/* {selectedPortion ? (
//             <CartAddedButton
//               item={{
//                 menu_id: item.menu_id,
//                 menu_name: item.menu_name,
//                 image: item.image,
//                 selectedPortion: selectedPortion
//                   ? {
//                     portion_id: selectedPortion,
//                     portion: item.portions.find(p => p.portion_id === selectedPortion)?.portion || '',
//                     price: item.portions.find(p => p.portion_id === selectedPortion)?.discounted_price ||
//                       item.portions.find(p => p.portion_id === selectedPortion)?.price || 0,
//                   }
//                   : null,
//                 selectedExtras: filteredExtras.length > 0 ? filteredExtras : []
//               }}
//               onClick={handleButtonClick}
//             />
//           ) : (
//             <RedButton word={"Add To Cart"} />
//           )} */}

//           {selectedPortion ? (
//   <CartAddedButton
//     item={{
//       menu_id: item.menu_id,
//       menu_name: item.menu_name,
//       image: item.image,
//       selectedPortion: {
//         id: selectedPortion,
//         portion: item.portions.find(p => p.portion_id == selectedPortion)?.portion || "",
//         price: item.portions.find(p => p.portion_id == selectedPortion)?.discounted_price || 
//                item.portions.find(p => p.portion_id == selectedPortion)?.price || 0,
//       },
//       selectedExtras: filteredExtras.length > 0 ? filteredExtras : []
//     }}
//     onClick={handleButtonClick}
//   />
// ) : (
//   <RedButton word={"Add To Cart"} />
// )}


//           <YellowButton onClick={toggleDetailView} word={"Cancel"} />
//         </div>
//       </div>
//     </div>
//   );
// };

// MenuDetail.propTypes = {
//   id: PropTypes.number,
//   toggleDetailView: PropTypes.func.isRequired,
// };

// export default MenuDetail;

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

        {/* <div className="flex justify-between mt-5">
          {selectedPortion !== null ? (
            <CartAddedButton
              item={{
                menu_id: menu.id,
                menu_name: menu.name,
                image: menu.image,
                selectedPortion: {
                  id: selectedPortion,
                  size: menu.portions.find(p => p.id === selectedPortion)?.size || "",
                  price: parseFloat(
                    menu.portions.find(p => p.id === selectedPortion)?.discounted_price ||
                    menu.portions.find(p => p.id === selectedPortion)?.price ||
                    "0"
                  )
                },
                selectedExtras: filteredExtras
              }}
              onClick={handleButtonClick}
            />
          ) : (
            <RedButton word={"Add To Cart"} />
          )}
          <YellowButton onClick={toggleDetailView} word={"Cancel"} />
        </div> */}


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
