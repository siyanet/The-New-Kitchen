 
import PropTypes from 'prop-types';
import './styles.css';
const NavBars = ({word}) => {
    return ( 
    <li className=' inline '><a className="font-epilogue text-base font-normal underline-hover ">{word}</a></li>
    
    
    );
};
NavBars.propTypes = {
    word: PropTypes.string, // `string` should be lowercase
  };
export default NavBars;