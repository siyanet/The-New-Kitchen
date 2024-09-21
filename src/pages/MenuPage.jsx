
import GuestNavBar from '../Components/GuestNavBar'
import MenuCard from '../Components/MenuCard';
const MenuPage = () => {
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
        <GuestNavBar />
        <div className="relative w-full h-screen bg-[url('/MenuHeader.png')] bg-cover bg-left lg:bg-center m-0 p-0 flex items-center justify-center">
          
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0  bg-yellow bg-opacity-90"></div>
          
          <div className="relative flex flex-col-reverse  lg:flex-row justify-between items-center  w-full z-10 p-10">
            
            
  
            <div className="h-full w-full lg:w-1/2  mt-5 text-center ">
              <h1 className="font-fredoka font-normal text-base sm:text-4xl  text-black">Discover Our Delicious Menu</h1>
              <div className="w-full"><p className="font-epilogue font-thin text-xs sm:text-3xl text-black">
              Savor delicious, freshly prepared dishes that are sure to satisfy every craving. 
              </p></div>
              
             
            </div>
            <div className="w-full lg:w-1/2 max-w-2xl h-full  flex justify-center mt-7 items-center">
              <img
                src="MenuChef.png"
                className="w-full h-auto max-h-[400px] md:max-h-[700px] max-w-[400px] md:max-w-[900px] object-cover"
                alt="Burger"
              />
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
           item={item}
           />
             </div>
             
           )
         })}
       </div>
      </div>
    );
  };
  
  export default MenuPage;
  