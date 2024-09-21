
import RecommendedCard from "./RecommendedCard";

const RecommendedSection = () => {
    const cardData = [
        {
          imgsrc: "/Recommended.png",
          price: "$29.99",
          name: "Product 1",
          onClick: () => { console.log("Clicked Product 1"); }
        },
        {
          imgsrc: "/Menuimg.png",
          price: "$39.99",
          name: "Product 2",
          onClick: () => { console.log("Clicked Product 2"); }
        },
        {
          imgsrc: "/Menuimg.png",
          price: "$49.99",
          name: "Product 3",
          onClick: () => { console.log("Clicked Product 3"); }
        },
        {
          imgsrc: "/Menuimg.png",
          price: "$59.99",
          name: "Product 4",
          onClick: () => { console.log("Clicked Product 4"); }
        },
        {
          imgsrc: "/Menuimg.png",
          price: "$69.99",
          name: "Product 5",
          onClick: () => { console.log("Clicked Product 5"); }
        }
      ];
  return (
    
       <div className="flex w-full h-auto mt-20 ">
         <img src = "/Recommendedimg.png" className="w-10 md:w-12 lg:w-14 "></img>
         <div className=" w-full">
            <p className="text-center font-nunito font-extrabold text-lg pb-7 text-black z-50">Recommended</p>
            <div className='grid grid-cols-2 justify-center md:grid-cols-5 gap-y-16 gap-4 pr-3'>
        {cardData.map((card,index) => (
            <RecommendedCard key={index} imgsrc = {card.imgsrc} price = {card.price} name = {card.name} onClick = {card.onClick}/>
        ))} 
    </div>
         </div>
         
    </div>
      
    
   
  );
}

export default RecommendedSection;
