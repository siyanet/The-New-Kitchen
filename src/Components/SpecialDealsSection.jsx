

import MenuButton from "./MenuButton";
import MenuCard from "./MenuCard";
import MenuCardCol from "./MenuCardCol";

const SpecialDealsSection = () => {
  const Menu = [
    {
      id: 1,
      imgsrc: "/Menuimg.png",
      name: "nunija recipe",
      rating: 3,
      price: 18.00,
      disprice: 10.00,
      peoplenum: 3,
    },
    {
      id: 2,
      imgsrc: "/Menuimg.png",
      name: "nunija recipe",
      rating: 2,
      price: 18.00,
      disprice: 10.00,
      peoplenum: 2,
    },
    {
      id: 3,
      imgsrc: "/Menuimg.png",
      name: "nunija recipe",
      rating: 3,
      price: 18.00,
      disprice: 10.00,
      peoplenum: 3,
    },
    {
      id: 4,
      imgsrc: "/Menuimg.png",
      name: "nunija recipe",
      rating: 3,
      price: 18.00,
      disprice: 10.00,
      peoplenum: 3,
    },
    {
      id: 5,
      imgsrc: "/Menuimg.png",
      name: "nunija recipe",
      rating: 3,
      price: 18.00,
      disprice: 10.00,
      peoplenum: 3,
    },
    {
      id: 6,
      imgsrc: "/Menuimg.png",
      name: "nunija recipe",
      rating: 3,
      price: 18.00,
      disprice: 10.00,
      peoplenum: 3,
    },
    {
      id: 7,
      imgsrc: "/Menuimg.png",
      name: "nunija recipe",
      rating: 3,
      price: 18.00,
      disprice: 10.00,
      peoplenum: 3,
    },
  ];
 

  return (
    <div className="pt-4 pl-3  pr-3 md:pr-6 md:pl-6  mt-20 w-full h-1/5 ">
      <h1 className="font-extrabold font-nunito text-xl md:text-lg text-center mb-7">Special Deals</h1>
      <div className="grid grid-row-3 grid-cols-2 md:grid-cols-3 gap-4">
        {Menu.map((item, index) => {
          // Determine the class names based on the index
          let classNames = "";  // Default classes
          
          if (index === 1) {
            classNames = " hidden sm:inline-block sm:row-span-3 sm:col-span-1";  // Add classes for the third item
          }
          else{
            classNames = "row-span-1 col-span-1";

          }

          // Render the component with conditional class names
          return (
            <div key={item.id} className={classNames}>
              {index == 1 ? (
                <MenuCardCol
                item={item}
                />
              ) : (
                <MenuCard
                item={item}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 text-center"><MenuButton to={"/special-deals"} name="See More"/></div>
    </div>
    
  );
};

export default SpecialDealsSection;
