

// const OwnerHeader = ({name,onAdd,isAdd=true}) => {
//   return (
//     <div className='flex justify-between w-full'>
//     <h1 className='text-2xl font-normal text-black font-fredoka'>{name}</h1>
//     {isAdd &&   <div className='p-3 bg-black rounded-full'>
//       <i onClick={onAdd} className='text-lg text-white fas fa-add' />
//     </div>}
  
//   </div>
//   )
// }

// export default OwnerHeader;


import React from "react";

interface OwnerHeaderProps {
  name: string;
  onAdd: () => void;
  isAdd?: boolean;
}

const OwnerHeader: React.FC<OwnerHeaderProps> = ({ name, onAdd, isAdd = true }) => {
  return (
    <div className='flex justify-between w-full'>
      <h1 className='text-2xl font-normal text-black font-fredoka'>{name}</h1>
      {isAdd && (
        <div className='p-3 bg-black rounded-full'>
          <i onClick={onAdd} className='text-lg text-white fas fa-add' />
        </div>
      )}
    </div>
  );
};

export default OwnerHeader;