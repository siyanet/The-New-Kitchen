

// const Confimation = ({isOpen,onConfirm,onCancel,message}) => {
//   if(!isOpen) return null;
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
            
//         <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
//           <h2 className="mb-4 text-xl font-semibold text-center">{message}</h2>

          
//           <div className="flex justify-between space-x-4 mt-14">
//             <button 
//               className="px-4 py-2 font-semibold text-black rounded bg-yellow font-epilogue" 
//               onClick={onCancel}
//             >
//               Cancel
//             </button>
//             <button 
//               className="px-4 py-2 font-semibold text-white rounded bg-red font-epilogue" 
//               onClick={onConfirm}
//             >
//               Yes
//             </button>
//           </div>
//         </div>
//       </div>
    
//   );
// }

// export default Confimation;


import React from "react";

interface ConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-center">{message}</h2>
        <div className="flex justify-between space-x-4 mt-14">
          <button
            className="px-4 py-2 font-semibold text-black rounded bg-yellow font-epilogue"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 font-semibold text-white rounded bg-red font-epilogue"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;