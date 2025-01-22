import { useState } from 'react';
import PhoneInput from 'react-phone-input-2'; // Import PhoneInput component
import 'react-phone-input-2/lib/style.css';
import RelativeButton from '../Components/RelativeButton';
import { useNavigate } from 'react-router-dom';
import { notify } from '../Components/notify';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../Redux/UserSlice';

const AuthPage = () => {
  const [isActive,setIsActive] = useState(false);
  const [regName,setRegName] = useState("");
  const [regPhoneNumber,setRegPhoneNumber] = useState("251");
  const [logPhoneNumber,setLogPhoneNumber] = useState("251");
  const [nameError, setNameError] = useState('');
  const [regPhoneError, setRegPhoneError] = useState('');
  const [logPhoneError,setLogPhoneError] = useState("");
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError,setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const validateName = (value)=>{
    if(!value){
      setNameError("name is required");
      return false;
    }
    const nameRegex = /^[a-zA-ZÀ-ž' -]+$/; 
    if (!nameRegex.test(value)) {
      setNameError("Invalid characters in the name.");
    return false;}
    setNameError("");
    return true;
  }

  const validatePhone=(value)=>{
    if(value.length !== 12){
    
      
      return false;
      
    }
  
    return true;
  }
  const validateotp = (value)=>{
    if(!value){
      setOtpError("otp required");
      return false;
    }
    
    const otpRegex = /^\d+$/;
    if(!otpRegex.test(value))
    {
      setOtpError("otp should be only number");
      return false;
    }
    if(value.length !== 6){
      setOtpError("otp length is not valid");
      return false;
    }
    setOtpError("");
    return true;
  }
  const handleOtpChange = (e)=>{
    setOtp(e.target.value);
    validateotp(e.target.value);
  }
  const handleNameChange =(e) =>{
    setRegName(e.target.value);
    validateName(e.target.value);

  }
  
  const handleRegPhoneChange = (value)=>{
    setRegPhoneNumber(value);
    if(!validatePhone(value)){
      setRegPhoneError("phone length is not valid");

    }
    else{
      setRegPhoneError("");

    }
  }
  const handleLogPhoneChange = (value)=>{
    setLogPhoneNumber(value);
    if(!validatePhone(value)){
      setLogPhoneError("phone length is not valid");
    }
    else{
      setLogPhoneError("");
    }

  }
  const handleLogin = async (e) =>{
    e.preventDefault();
    const isLoginPhoneValid = validatePhone(logPhoneNumber);
    if(!isLoginPhoneValid){
      return;
    }
      setLoading(true);
      try{
        const response = await fetch(`http://127.0.0.1:8000/api/send-otp?phone=${logPhoneNumber}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.status === 200){// parse the error response
    
           const userId = data.user_id;
    
    // Store userId in session storage
    sessionStorage.setItem('userId', userId);
        notify("otp Sent Successfully","success");
        setTimeout(()=>{
          setIsOtpSent(true);

        },2200);
       
     

        }
        else{
          throw new Error( response.message);

        }
       
      }
      catch (error){
        // notify("otp sent failed please try again" +error.message,"error");
        notify(`Failed to send OTP: ${error.message}`, "error");
        
      }
      finally{
        setLoading(false);

      }
    

  }


  

  const handleActive=() =>{
    setIsActive(!isActive);
  }
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const isOtpValid = validateotp(otp);
    if(!isOtpValid){
      return;
    }
      setLoading(true);
      try{
        const userId = parseInt(sessionStorage.getItem("userId"));
        const code = otp
        console.log(userId,otp);
        const apiUrl = `http://127.0.0.1:8000/api/verify-otp?id=${userId}&code=${code}`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (!response.ok){// parse the error response
      throw new Error(data.message  || "failed to verify");
        }
        const token = data.access_token;
    
    // Store userId in session storage
    localStorage.setItem('pizzaHutToken', token);
        notify("otp verified successfully","success");
        setIsOtpSent(false);
        dispatch(fetchUser());
        
        navigate("/");
        // await initializeUser();

        // // Get the user state after initialization
        // if (user && user?.data.role === "owner") {
        //     navigate("/owner-dashboard"); // Navigate to Owner Dashboard
        // } else {
        //     navigate("/"); // Navigate to the default landing page or homepage
        // }
        
        

      }
      catch (error){
        notify(`error verifying otp: ${error.message}`,"error");
      }
      finally{
        setLoading(false);

      }
  
   

  };


  const handleRegister = async (e) => {
    e.preventDefault();

    const isNameValid = validateName(regName);
    const isPhoneValid = validatePhone(regPhoneNumber);
    if (!isNameValid || !isPhoneValid) {
      return;
    }
  

     
    

   

    setLoading(true);
    

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/register?name=${regName}&&phone=${regPhoneNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register ');
      }

     
    
     notify("Registered Successfully","success");
     setTimeout(()=> {
      handleActive();
      setLoading(false);

     },2200);
    } catch (error) {
      notify("error Registering ,please try again","error");
      setTimeout(()=>{
        setLoading(false);
      },2200);
    }
  };




  return (
    <div className={`${isActive? "active": ""} flex justify-center items-center bg-amber-50 w-full h-screen`}>
    
        <div className='w-[850px] h-[600px]  overflow-hidden bg-white flex relative  shadow-lg '>
        <span className='triangle-bg '></span>
        <span className='triangle-bg2 '></span>
       
       
       
       
       
       
       
       
       
       
       
        <div className= 'flex justify-between   ml-10 z-30'>
          <div className='flex  flex-col gap-4 justify-center items-center '>
           <p className='font-fredoka  animation my-5 text-2xl text-center '>Login</p>



{/* <div className='animation'>
<PhoneInput
      country={"et"}
      dropdown = {false}
      value={logPhoneNumber}
      onChange={handleLogPhoneChange}
      />
      {logPhoneError && <p className='text-red'>{logPhoneError}</p>}
</div>
      
      <div className='flex  justify-center animation'>
      <RelativeButton onClick={handleLogin} name="login"/>
        </div> */}




{!isOtpSent ? ( // Show login form if OTP is not sent
              <div className='animation'>
                <PhoneInput
                  country={"et"}
                  dropdown={false}
                  value={logPhoneNumber}
                  onChange={handleLogPhoneChange}
                />
                {logPhoneError && <p className='text-red'>{logPhoneError}</p>}
                <div className='flex py-3 justify-center animation'>
                  <RelativeButton onClick={handleLogin} name="Login" />
                </div>
              </div>
            ) : (
              // Show OTP input form if OTP is sent
              <div className='animation '>
                <input
                  type='text'
                  maxLength={6}
                  placeholder='Enter OTP'
                  value={otp}
                  onChange={handleOtpChange}
                  className='border-solid p-2 border-black border-2'
                />
                {otpError && <p className='text-red'>{otpError}</p>}
                <div className='flex justify-center animation my-5'>
                  <RelativeButton onClick={handleOtpSubmit} name="Submit OTP" />
                </div>
              </div>
            )}




{/* 
        <p onClick={handleActive} className='font-nunito animation font-semibold text-black text-base text-center'>Don't have an account? Register</p>
      

          </div>
          <div className='z-30 word-animation'> <p>Welcome Back</p> </div>
          </div> */}
      
      
      {!isOtpSent && (
        <div className='flex gap-2'>
            <p  className='font-nunito animation font-semibold text-black text-base text-center'>
                Don't have an account? 
              </p>
              <p onClick={handleActive} className='font-nunito animation font-semibold text-red text-base text-center hover:cursor-pointer'>
               Register
              </p>

        </div>
            
            )}
          </div>
        </div>
      
      
      


      
      
          <div className='flex flex-row-reverse absolute justify-between w-full  mt-48 z-20'>
          <div className='flex flex-col gap-4 justify-center  h-full'>
          <p className='font-fredoka my-5 text-2xl text-center register-animation'>Register</p>
      <input type='text' value={regName} onChange={handleNameChange} placeholder="enter your name " className='register-animation border-solid p-2 border-cyan-300 border-2'/>
     {nameError && <p className='text-red'>{nameError}</p>}
     <div className='register-animation'>
     <PhoneInput
      country={"et"}
      dropdown= {false}
      value={regPhoneNumber}
      onChange={handleRegPhoneChange}
      />
      {regPhoneError && <p className='text-red'> {regPhoneError}</p>}</div> 
      <div className='flex justify-center register-animation'>
    
      <RelativeButton onClick={handleRegister} name="Register"/>
        </div>
        <div className='flex gap-2'>
        <p  className=' register-animation font-nunito font-semibold text-black text-base text-center'>
        Already have an account? </p>
        <p onClick= {handleActive} className=' register-animation font-nunito font-semibold text-red text-base text-center'>
     Login</p>

        </div>
     
      

          </div>

          <div className='register-word-animation'> Welcome </div>

          </div>
          
   
    
      </div>


    </div>
  

  )
}

export default AuthPage;



