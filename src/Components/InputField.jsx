
// import PropTypes from 'prop-types'
// const InputField = ({placeholder,type,value,onChange,error}) => {
//   return (
//     <div>
//        <input placeholder={placeholder} type={type} value={value} onChange={onChange}  className={`inline-block w-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 h-full focus:outline-none focus:ring-black focus:border-black shadow-sm md:shadow-md lg:shadow-lg rounded-sm md:rounded-md lg:rounded:lg text-gray-300 font-nunito font-medium md:font-semibold text-sm md:text-base ${
//       error ? 'border-black': ''
//     }`}>
//        {error && <p className="text-black text-xs mt-1">{error}</p>}
     
         

      
//     </input>
//     </div>
   
//   );
// }
// InputField.propTypes = {
//   type: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   error: PropTypes.string,
//   className: PropTypes.string
// };
// export default InputField

import PropTypes from 'prop-types';

const InputField = ({ placeholder, type, value, onChange, error }) => {
  return (
    <div>
      <input 
        placeholder={placeholder} 
        type={type} 
        value={value} 
        onChange={onChange} 
        className={`inline-block w-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 h-full focus:outline-none focus:ring-black focus:border-black shadow-sm md:shadow-md lg:shadow-lg rounded-sm md:rounded-md lg:rounded:lg text-gray-300 font-nunito font-medium md:font-semibold text-sm md:text-base ${
          error ? 'border-black' : ''
        }`} 
      />
      {error && <p className="text-black text-xs mt-1">{error}</p>}
    </div>
  );
}

InputField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string
};

export default InputField;

