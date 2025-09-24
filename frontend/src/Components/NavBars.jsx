 
import PropTypes from 'prop-types';
import './styles.css';
import { Link } from 'react-router-dom';
const NavBars = ({word,to}) => {
    return ( 
   
    <li className="inline underline-hover">
      
  <Link to={to} className="font-epilogue text-base font-normal ">
    {word}
  </Link>
</li>

    
    
    );
};
NavBars.propTypes = {
    word: PropTypes.string,
    to: PropTypes.string // `string` should be lowercase
  };
export default NavBars;