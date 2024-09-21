

import Logo from "./logo";
import NavBars from "./NavBars";

const GuestNavBar = ()=>{
    return (
    <div className=' fixed z-50 flex justify-between items-center h-10 w-full p-2 bg-white shadow-md'>

        <div className="w-1/4"><Logo /></div>
        <div className=" w-8/12 md:w-2/6 pr-3 pl-3"> 
        <ul className='flex list-none justify-between '>
            <NavBars word="Hello"></NavBars>
            <NavBars word='Menu'></NavBars>
            <NavBars word='Reservation'></NavBars>
            <NavBars word='Testimonials'></NavBars>
            <NavBars word='About Us'></NavBars>
            <li>Login</li>
           
    </ul>
        </div>
        
    
 
   

    </div>
);
};
export default GuestNavBar