
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners';

const Footer = () => {
    const {status,category} = useSelector((state) => state.category);
  if(status == "loading"){
    return(
<ClipLoader/>

    );
  }
    return (
    <div className='mt-20 border-t-2 border-black pt-1  '>
        {/* <div className='grid  grid-rows-1 grid-cols-6 '> */}
        <div className='flex justify-between w-full '>
            <div className='w-1/4'>
                <img src = "footerleft.png" className='object-fit w-full'/>
            </div>

            <div className='w-full '>
                <div className='flex flex-col h-full w-full justify-between'> 
                    
                <div className='flex justify-between '>
                    <div className='bg-red h-48 w-full mx-5 rounded-lg mt-10  flex justify-center items-center '>
                        <div className='text-white text-center w-full font-nunito text-lg font-bold '>
                        <p>Tuesday-Sunday 12:00pm-23:00pm</p>
                        <p>closed on Monday</p>
                        <p>call us</p>
                        <div className='flex flex-wrap justify-between p-2 gap-3'>

                        <p>2517897478</p>
                        <p>2519087865</p>
                        <p>2517897478</p>
                        <p>2519087865</p>
                        </div>
                        
                            </div>
                    </div>

                    {/* {category && (
                    <div className='flex flex-col'>

                    <p>Categories</p>
                    {category.map((item)=>{
                        <p key = {item.category_id}>{item.category_name}</p>
                    })}
                 

                </div>
                )}   */}
                </div>
                <div className='border-t-4  border-yellow mt-7 flex w-full justify-between py-3'>
                    <p className='font-fredoka text-red '>@2024 pizza hut</p>
                    <p className='font-fredoka text-black'>Facebook</p>                </div>
                      </div>
                
            </div>


        <div className='w-1/4 flex justify-end'>
            <img src="footerleft.png"/>
        </div>

        </div>
      
    </div>
  )
}

export default Footer;

{/* <div className='grid row-6 col-1 '>
    <div className=''></div>
</div> */}