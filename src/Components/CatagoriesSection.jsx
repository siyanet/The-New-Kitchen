import MenuButton from "./MenuButton";
import CatagoriesSectionCard from './CatagoriesSectionCard'

const CatagoriesSection = () => {
    const catagories = [{
        id: 1,
        name: "catagoryone",
        listPrice: 20,
        imgsrc: "/Menuimg.png"

    },
    {
        id: 2,
        name: "catagoryone",
        listPrice: 20,
        imgsrc: "/Menuimg.png"

    },
    {
        id: 3,
        name: "catagoryone",
        listPrice: 20,
        imgsrc: "/Menuimg.png"

    },
    {
        id: 4,
        name: "catagoryone",
        listPrice: 20,
        imgsrc: "/Menuimg.png"

    },
    {
        id: 5,
        name: "catagoryone",
        listPrice: 20,
        imgsrc: "/Menuimg.png"

    },
    {
        id: 6,
        name: "catagoryone",
        listPrice: 20,
        imgsrc: "/Menuimg.png"

    },
    {
        id: 7,
        name: "catagoryone",
        listPrice: 20,
        imgsrc: "/Menuimg.png"

    },
    {
        id: 8,
        name: "catagoryone",
        listPrice: 20,
        imgsrc: "/Menuimg.png"

    },
];
  return (
    <div className='mt-20 w-full h-auto pl-3  pr-3 md:pr-6 md:pl-6'>
      <h1 className="font-extrabold w-full h-auto font-nunito text-xl md:text-lg text-center mb-7">Catagories</h1>
      <div className='grid grid-rows-4 md:grid-rows-2 grid-cols-2 md:grid-cols-4 gap-20'>
      {
        catagories.map( (catagory,index) => (
            <div key={index} className='row-span-1 col-span-1 '> 
             <CatagoriesSectionCard  name = {catagory.name} listPrice={catagory.listPrice} imgsrc={catagory.imgsrc} id={catagory.id} />
            </div>
           

        ))
      }


      </div>
      <div className="mt-14 flex justify-center"><MenuButton onClick={onclick} name="See Our Menu"/></div> 
      
    </div>
  );
}

export default CatagoriesSection
