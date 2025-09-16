

const OwnerHeader = ({name,onAdd,isAdd=true}) => {
  return (
    <div className='flex justify-between w-full'>
    <h1 className='font-fredoka font-normal text-2xl text-black'>{name}</h1>
    {isAdd &&   <div className='rounded-full p-3 bg-black'>
      <i onClick={onAdd} className='fas fa-add text-white text-lg' />
    </div>}
  
  </div>
  )
}

export default OwnerHeader;
