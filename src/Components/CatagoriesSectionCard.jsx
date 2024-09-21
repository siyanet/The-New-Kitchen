
import PropTypes from "prop-types";
const CatagoriesSectionCard = ({imgsrc,name,listPrice}) => {
     
  const onClick = () => {}
    return (
      
    <div onClick = { () => {onClick}} className=" w-full h-full border-b-4 border-red hover:border-none  hover:cursor-pointer parent group">   
      <div  className="">
        <div className=" group-hover:bg-red">
            <div className=" p-3 flex justify-center">
            <img src={imgsrc} className="rounded-full object-cover "/>
            </div>
        
        </div>
        <div className="text-center py-5 group-hover:bg-white group-hover:shadow-lg :">
            <p className="font-nunito font-bold text-base text-red py-1">From {listPrice} ETB</p>
            <p className="font-nunito font-extrabold text-base text-black py-1">{name}</p>
        </div>
        

      </div>
    </div>
  );
}
CatagoriesSectionCard.propTypes = {
    imgsrc: PropTypes.string,
    name: PropTypes.string,
    listPrice: PropTypes.integer,
    
}

export default CatagoriesSectionCard
