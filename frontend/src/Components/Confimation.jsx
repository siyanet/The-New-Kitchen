

const Confimation = ({isOpen,onConfirm,onCancel,message}) => {
  if(!isOpen) return null;
    return (
        <div className="fixed  inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <h2 className="text-xl text-center font-semibold mb-4">{message}</h2>

          
          <div className="flex justify-between mt-14 space-x-4">
            <button 
              className="bg-yellow font-epilogue  text-black font-semibold py-2 px-4 rounded" 
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              className="bg-red  text-white font-semibold py-2 px-4 font-epilogue rounded" 
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    
  );
}

export default Confimation;
