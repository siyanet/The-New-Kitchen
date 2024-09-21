import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MenuButton = ({name,to}) => {
    return (
      <div className="relative inline-block">
        {/* Background Rectangle */}
        <div className="absolute inset-0 border-2 border-red rounded-lg  transform translate-x-2  scale-y-125"></div>
        
        {/* Button */}
        <Link to = {to}>
        <button className="relative pl-2 pr-2 pt-1 pb-1 bg-red text-white font-fredoka font-normal text-base rounded-md transition-transform duration-100 ease-in-out hover:scale-y-125 hover:translate-x-2">
          {name}
        </button></Link>
       
      </div>
    );
  };
  MenuButton.propTypes = {
    name: PropTypes.string,
    
    to: PropTypes.string
  }
  export default MenuButton;
  