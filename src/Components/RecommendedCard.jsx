import PropTypes from "prop-types";
const RecommendedCard = ({imgsrc, onClick,price, name}) => {
  return (
    <div className="relative z-10">
       <div className="relative w-full h-full rounded-md  bg-white flex flex-col justify-between">
       <div className="relative h-full w-full">
      {/* Base Image */}
      <img src= {imgsrc} alt="Base" className=" rounded-t-lg w-full h-full object-cover" />

      {/* Overlay Image */}
      <img
        src="recommendedend.png"
        alt="Overlay"
        className="absolute bottom-0 right-0  object-cover"
      />
      <button onClick={onClick} className=" absolute bottom-1  lg:bottom-3 left-1/2 transform -translate-x-1/2 ">       
          <div className="w-12 h-12 border-yellow border-dashed   border-2 p-1 rounded-full flex items-center justify-center shadow-sm">
            <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center">
              <i className="fas fa-cart-plus text-black text-lg"></i>
            </div>
          </div>
                 </button>
    </div>


      
      <div className="p-2 text-center">
          <p className="text-red font-nunito font-bold text-sm">{price}</p>
          <p className="text-black font-nunito font-bold text-sm">{name}</p>
        </div>
      </div>
      
      
    </div>
   
    
  );
};
RecommendedCard.propTypes = {
  imgsrc: PropTypes.string,
  price: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func

};

export default RecommendedCard;





