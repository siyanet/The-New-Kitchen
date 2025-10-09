
import PropTypes from "prop-types";

const CatagoriesSectionCard = ({ name, menu }) => {
  const onClick = () => {
    // Placeholder if you plan to add logic
  };

  return (
    <div
      onClick={() => onClick()}
      className="w-full h-full transition-all duration-200 border-b-4 shadow-md border-red hover:border-none hover:cursor-pointer group"
    >
      <div className="flex items-center justify-center p-10 border-b-2 group-hover:bg-red border-yellow"  >
        <p className="text-xl font-extrabold text-center text-black font-nunito">
          {name}
        </p>
      </div>

      <div className="py-5 text-center transition-all duration-200 group-hover:bg-white group-hover:shadow-lg">
        <p className="py-1 text-base font-bold font-nunito text-red">{menu} item</p>
      
      </div>
    </div>
  );
};

CatagoriesSectionCard.propTypes = {
  name: PropTypes.string,
  menu: PropTypes.number,
};

export default CatagoriesSectionCard;
