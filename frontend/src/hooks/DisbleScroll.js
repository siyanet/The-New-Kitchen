import { useEffect } from 'react';

const useDisableScroll = (isDisabled) => {
  useEffect(() => {
    if (isDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDisabled]);
};

export default useDisableScroll;



import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners';

const Footer = () => {
    const { status, category } = useSelector((state) => state.category);

    if (status === "loading") {
        return <ClipLoader />;
    }

    return (
        <div className='mt-20 border-t-2 h-[300px] border-black pt-1'>
            <div className='flex justify-between w-full h-full'>
                
                {/* Left Image */}
                <div className='w-1/4 h-full'>
                    <img src="footerleft.png" className='object-fit w-full h-full' />
                </div>

                {/* Center Content */}
                <div className='w-full h-full flex flex-col justify-between'>
                    <div className='flex justify-between h-full'>
                        
                        {/* Contact Information */}
                        <div className='bg-red w-full mx-5 rounded-lg flex flex-col justify-center items-center h-[150px]'>
                            <div className='text-white text-center w-full font-nunito text-lg font-bold'>
                                <p>Tuesday-Sunday 12:00pm-23:00pm</p>
                                <p>Closed on Monday</p>
                                <p>Call us</p>
                                <div className='flex flex-wrap justify-between p-2 gap-3'>
                                    <p>2517897478</p>
                                    <p>2519087865</p>
                                    <p>2517897478</p>
                                    <p>2519087865</p>
                                </div>
                            </div>
                        </div>

                        {/* Optional Categories Section */}
                        {/* {category && (
                            <div className='flex flex-col'>
                                <p>Categories</p>
                                {category.map((item) => (
                                    <p key={item.category_id}>{item.category_name}</p>
                                ))}
                            </div>
                        )} */}
                    </div>

                    {/* Footer Bottom Bar */}
                    <div className='border-t-4 border-yellow mt-7 flex w-full justify-between py-3'>
                        <p className='font-fredoka text-red'>@2024 Pizza Hut</p>
                        <p className='font-fredoka text-black'>Facebook</p>
                    </div>
                </div>

                {/* Right Image */}
                <div className='w-1/4 flex justify-end h-full'>
                    <img src="footerleft.png" className='h-full' />
                </div>
            </div>
        </div>
    );
}

export default Footer;