

export const InputField = ({label,name,value,onChange,error,type='text',...props}) => {
  return (
    <div className="mb-5">
    <label className="block font-nunito text-lg font-bold text-black py-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50 ${error ? 'border-red' : 'border-black'}`}
      {...props}
    />
    {error && <p className="text-red text-xs mt-1">{error}</p>}
  </div>
  );
}

export const FileInput = ({ label, name, onChange, error,...props }) => (
    <div className="mb-5">
      <label className="block font-nunito text-lg font-bold text-black py-2">{label}</label>
      <input
        type="file"
        name={name}
        onChange={(e) => onChange(name, e.target.files[0])}
        className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-200 file:text-black file:font-nunito file:text-base file:font-medium hover:file:bg-gray-300"
      {...props}
      />
      {error && <p className="text-red text-xs mt-1">{error}</p>}
    </div>
  );
export const OwnerButton = ({text,onclick,isRed=false,...props}) =>(
    <button
    onClick={onclick}
    className={`font-bold py-2 px-4 rounded-md ${
        isRed ? 'bg-yellow text-black' : 'bg-red text-white'
      } hover:opacity-80 transition-opacity`}
      {...props}>
        {text}
    </button>
);

