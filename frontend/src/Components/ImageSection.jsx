

const ImageSection = () => {
  return (
    <div className="w-full h-96">
       <div className='mt-20 grid grid-rows-2 grid-cols-4 w-full h-full'>
        <div className='row-span-2 col-span-1'><img src="/image1.png " alt="" className="w-full h-full object-cover"/></div>
        <div className='row-span-1 col-span-2'><img src="/image2.png " className="w-full h-full object-cover" alt="" /></div>
        <div className='row-span-1 col-span-1'><img src="/image3.png " className="w-full h-full object-cover" alt="" /></div>
        <div className='col-span-3 row-span-1'><img src="/image4.png " className="w-full h-full object-cover" alt="" /></div>
      
    </div>

    </div>
   
  );
}

export default ImageSection
