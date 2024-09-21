
import MenuButton from "./MenuButton";

import './styles.css';
const LandingHeader = () =>{
    const onClick = () =>{}
    return (
        <div className="w-full h-full mx-0 px-0">
            <div className="w-full bg-[url('/LandingHeader.png')] bg-cover bg-right lg:bg-center h-screen m-0 p-0">
            <div className="pt-52 sm:pt-96 align-middle pl-5 pr-5 lg:pt-60  lg:w-5/12 text-center lg:text-left">
            <p className=" text-white     font-fredoka text-xl md:text-5xl font-normal leading-tight tracking-wide">The perfect Space to Enjoy Fantastic Foods</p>
            <p className = "text-white mt-3 mb-3 font-epilogue text-base font-normal  ">Festive dining at Farthings where we are strong believers in
            using the very best produce</p>
            <MenuButton onClick={onClick} name="See More"/>

            </div>
           
            
            </div>
       
        </div>
    );
};
export default LandingHeader;