
// import PropTypes from "prop-types";
// const CatagoriesSectionCard = ({imgsrc,name,menu}) => {
//  console.log("categories");
//   console.log(imgsrc);
     
//   const onClick = () => {}
//     return (
      
//     <div onClick = { () => {onClick}} className="w-full h-full border-b-4 border-red hover:border-none hover:cursor-pointer parent group">   
//       <div  className="">
//         <div className=" group-hover:bg-red">
//             <div className="flex justify-center p-3 rounded-full ">
//             <img src={imgsrc && imgsrc.includes('http://127.0.0.1:8000/') 
//     ? imgsrc 
//     : `http://127.0.0.1:8000/${imgsrc || ''}`  } className="object-cover rounded-full w-72 h-72"/>
//             </div>
        
//         </div>
//         <div className="py-5 text-center group-hover:bg-white group-hover:shadow-lg :">
//             <p className="py-1 text-base font-bold font-nunito text-red">{menu} item</p>
//             <p className="py-1 text-base font-extrabold text-black font-nunito">{name}</p>
//         </div>
        

//       </div>
//     </div>
//   );
// }
// CatagoriesSectionCard.propTypes = {
//     imgsrc: PropTypes.string,
//     name: PropTypes.string,
//     menu: PropTypes.number,
    
// }

// export default CatagoriesSectionCard


import PropTypes from "prop-types";

const CatagoriesSectionCard = ({ name, menu }) => {
  const onClick = () => {
    // Placeholder if you plan to add logic
  };

  return (
    <div
      onClick={() => onClick()}
      className="w-full h-full transition-all duration-200 border-b-4 border-red hover:border-none hover:cursor-pointer group"
    >
      <div className="flex items-center justify-center p-10 bg-gray-100 rounded-full shadow-md group-hover:bg-red">
        <p className="text-xl font-extrabold text-center text-black font-nunito">
          {name}
        </p>
      </div>

      <div className="py-5 text-center transition-all duration-200 group-hover:bg-white group-hover:shadow-lg">
        <p className="py-1 text-base font-bold font-nunito text-red">{menu} item</p>
        <p className="py-1 text-base font-extrabold text-black font-nunito">{name}</p>
      </div>
    </div>
  );
};

CatagoriesSectionCard.propTypes = {
  name: PropTypes.string,
  menu: PropTypes.number,
};

export default CatagoriesSectionCard;
