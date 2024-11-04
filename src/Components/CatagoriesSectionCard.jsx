
import PropTypes from "prop-types";
const CatagoriesSectionCard = ({imgsrc,name,menu}) => {
 console.log("categories");
  console.log(imgsrc);
     
  const onClick = () => {}
    return (
      
    <div onClick = { () => {onClick}} className=" w-full h-full border-b-4 border-red hover:border-none  hover:cursor-pointer parent group">   
      <div  className="">
        <div className=" group-hover:bg-red">
            <div className=" p-3 rounded-full flex justify-center">
            <img src={imgsrc && imgsrc.includes('http://127.0.0.1:8000/') 
    ? imgsrc 
    : `http://127.0.0.1:8000/${imgsrc || ''}`  } className=" w-72 h-72 rounded-full object-cover "/>
            </div>
        
        </div>
        <div className="text-center py-5 group-hover:bg-white group-hover:shadow-lg :">
            <p className="font-nunito font-bold text-base text-red py-1">{menu} item</p>
            <p className="font-nunito font-extrabold text-base text-black py-1">{name}</p>
        </div>
        

      </div>
    </div>
  );
}
CatagoriesSectionCard.propTypes = {
    imgsrc: PropTypes.string,
    name: PropTypes.string,
    menu: PropTypes.number,
    
}

export default CatagoriesSectionCard
