import PropTypes from "prop-types";
const RelativeButton = ({name,onClick}) => {
    return (
      <div className="relative inline-block">
        {/* Background Rectangle */}
        <div className="absolute inset-0 border-2 border-red rounded-lg  transform translate-x-2  scale-y-125"></div>
        
        {/* Button */}
        
        <button onClick={onClick} className="relative pl-2 pr-2 pt-1 pb-1 bg-red text-white font-fredoka font-normal text-base rounded-md transition-transform duration-100 ease-in-out hover:scale-y-125 hover:translate-x-2">
          {name}
        </button>
       
      </div>
    );
  };
  RelativeButton.propTypes = {
    name: PropTypes.string,
    
    onClick: PropTypes.func
  }
  export default RelativeButton;