import React from 'react'

const OrderItemCard = ({item}) => {
  return (
    <div   className={` flex h-full w-full max-h-32  parent hover:cursor-pointer group  `}>
    <img    src={item.image && item.image.includes('http://127.0.0.1:8000/storage') 
    ? item.image 
    : `http://127.0.0.1:8000/storage/${item.image || ''}`  } className='w-1/2 rounded-tl-xl rounded-bl-xl  object-fit '></img>
      <div className=' w-1/2  bg-white border-t-2 border-b-2 border-r-2 border-gray-100 group-hover:border-red  shadow-lg   rounded-tr-xl rounded-br-xl group-hover:bg-red   '>
        
        
        <div className=' flex flex-col gap-3 p-3'> 
        <p className=' group-hover:text-white font-semibold text-sm text-black '>{item.portion_name}</p>
        <p className=' group-hover:text-white font-semibold text-sm text-black '>{item.menu_name}</p>
        <div className='flex  '>
             <p className="text-red group-hover:text-white font-nunito font-extrabold text-base">{item.price}</p>
             <p className="text-red group-hover:text-white font-nunito font-extrabold text-base"> X {item.quantity}</p>
        
         
           </div>

        </div>          
      </div>    
    </div>
  )
}

export default OrderItemCard
