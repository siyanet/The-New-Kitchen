import GuestNavBar from "../Components/GuestNavBar"
import MenuCard from "../Components/MenuCard"


const SpecialDealsPage = () => {
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
    {
      id: 8,
      imgsrc: "/Menuimg.png",
      name: "nunija recipe",
      rating: 3,
      price: 18.00,
      disprice: 10.00,
      peoplenum: 3,
    },
  ];
    return (
      <div className="w-full h-full mx-0 px-0">
        <GuestNavBar/>
        <div className="w-full bg-[url('/wave-haike.svg')] bg-cover bg-left lg:bg-center h-screen m-0 p-0 flex items-center justify-center">
          <div className="flex flex-col lg:flex-row justify-between  items-center w-full ">
            <div className="w-full lg:w-1/2 max-w-2xl h-full flex justify-center items-center">
              <img src="BurgerImage.png" className="w-full h-auto max-h-[400px] md:max-h-[700] max-w-[400px] md:max-w-[900] object-fit" alt="Burger" />
            </div>
  
            <div className="h-full w-full lg:w-1/2 pl-6 text-center  ">
              <h1 className="font-fredoka font-normal text-lg lg:text-xl text-white lg:text-red">Special Deals</h1>
              <h2 className="font-epilogue font-semibold text-lg text-white lg:text-black">Don&apos;t miss out on our exclusive offer</h2>
              <p className="font-epilogue font-normal text-base text-gray-100 lg:text-black">Enjoy great savings on your favorite dishes and services. Grab these limited-time deals before they&apos;re gone!</p>
            </div>

          </div>
        </div>
        <div className="w-full h-auto flex justify-center mt-20 ">
           
            <input
  className="w-full max-w-80 m-4 border-2 border-red text-center py-1 px-3 rounded-md 
             focus:outline-none focus:ring-2 focus:ring-red
             focus:border-red transition duration-200"
             placeholder="Search"
/>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-between  p-4 gap-3">
         
          {Menu.map((item,index) =>{
            return(
              <div className="w-1/2 sm:w-1/4 lg:w-1/5  " key = {index}>
                <MenuCard 
              name={item.name}
              price={item.price}
              disprice={item.disprice}
              rating={item.rating}
              image={item.imgsrc}
              peoplenum={item.peoplenum}
            />
              </div>
              
            )
          })}
        </div>
      </div>
    );
}

export default SpecialDealsPage;

  

            