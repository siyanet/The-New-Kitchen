

// export const InputField = ({label,name,value,onChange,error,type='text',...props}) => {
//   return (
//     <div className="mb-5">
//     <label className="block py-2 text-lg font-bold text-black font-nunito">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={(e) => onChange(name, e.target.value)}
//       className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50 ${error ? 'border-red' : 'border-black'}`}
//       {...props}
//     />
//     {error && <p className="mt-1 text-xs text-red">{error}</p>}
//   </div>
//   );
// }

// export const FileInput = ({ label, name, onChange, error,...props }) => (
//     <div className="mb-5">
//       <label className="block py-2 text-lg font-bold text-black font-nunito">{label}</label>
//       <input
//         type="file"
//         name={name}
//         onChange={(e) => onChange(name, e.target.files[0])}
//         className="block w-full mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-200 file:text-black file:font-nunito file:text-base file:font-medium hover:file:bg-gray-300"
//       {...props}
//       />
//       {error && <p className="mt-1 text-xs text-red">{error}</p>}
//     </div>
//   );
// export const OwnerButton = ({text,onclick,isRed=false,...props}) =>(
//     <button
//     onClick={onclick}
//     className={`font-bold py-2 px-4 rounded-md ${
//         isRed ? 'bg-yellow text-black' : 'bg-red text-white'
//       } hover:opacity-80 transition-opacity`}
//       {...props}>
//         {text}
//     </button>
// );


import React from 'react';


interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void; // your custom onChange signature
  error?: string;
  placeholder?: string;  // add placeholder support
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  ...props
}) => {
  return (
    <div className="mb-5">
      <label className="block py-2 text-lg font-bold text-black font-nunito">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder} // <-- added here
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50 ${
          error ? "border-red" : "border-black"
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red">{error}</p>}
    </div>
  );
};

export default InputField;












interface OwnerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onclick?: () => void;
  isRed?: boolean;
}

export const OwnerButton: React.FC<OwnerButtonProps> = ({
  text,
  onclick,
  isRed = false,
  ...props
}) => {
  return (
    <button
      onClick={onclick}
      className={`font-bold py-2 px-4 rounded-md ${
        isRed ? 'bg-yellow text-black' : 'bg-red text-white'
      } hover:opacity-80 transition-opacity`}
      {...props}
    >
      {text}
    </button>
  );
};





interface FileInputProps {
  label: string;
  name: string;
  onChange: (name: string, file: File | string) => void;
  error?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  name,
  onChange,
  error,
  ...props
}) => {
  return (
    <div className="mb-5">
      <label className="block py-2 text-lg font-bold text-black font-nunito">{label}</label>
      <input
        type="file"
        name={name}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onChange(name, e.target.files[0]);
          }
        }}
        className="block w-full mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-200 file:text-black file:font-nunito file:text-base file:font-medium hover:file:bg-gray-300"
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red">{error}</p>}
    </div>
  );
};
