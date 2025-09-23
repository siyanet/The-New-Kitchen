import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import RelativeButton from '../Components/RelativeButton';
import { useNavigate } from 'react-router-dom';
import { notify } from '../Components/notify';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../Redux/UserSlice';
import AxiosInstance from '../Components/AxiosInstance';
import { getSubdomainFromPath } from '../Components/utitlites';


const AuthPage = () => {
  const [isActive,setIsActive] = useState(false);
   const [regName,setRegName] = useState("");
  const [regEmail,setRegEmail] = useState("");
  const [regPassword,setRegPassword] = useState("");
  const [logEmail,setLogEmail] = useState("");
  const [logPassword,setLogPassword] = useState("");
  const [nameError, setNameError] = useState('');
  const [regEmailError, setRegEmailError] = useState('');
  const [regPasswordError, setRegPasswordError] = useState('');
  const [logEmailError,setLogEmailError] = useState("");
  const [logPasswordError,setLogPasswordError] = useState("");
  const [regPhoneNumber,setRegPhoneNumber] = useState("251");
  const [regPhoneError, setRegPhoneError] = useState('');
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
  const validateEmail = (value) => {
    if(!value){
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(value)){
      return "Invalid email format";
    }
    return "";
  }

   const validatePhone=(value)=>{
    if(value.length !== 12){
      return "phone length is not valid";
    }
    return "";
  }

  const validatePassword = (value) => {
    if(!value){
      return "Password is required";
    }
    if(value.length < 6){
      return "Password must be at least 6 characters";
    }
    return "";
  }
 

    const handleNameChange =(e) =>{
    setRegName(e.target.value);
    validateName(e.target.value);
  }
  const handleRegPhoneChange = (value) => {
    setRegPhoneNumber(value);
    setRegPhoneError(validatePhone(value));
  }

  const handleRegEmailChange = (e) => {
    setRegEmail(e.target.value);
    setRegEmailError(validateEmail(e.target.value));
  }

  const handleRegPasswordChange = (e) => {
    setRegPassword(e.target.value);
    setRegPasswordError(validatePassword(e.target.value));
  }

  const handleLogEmailChange = (e) => {
    setLogEmail(e.target.value);
    setLogEmailError(validateEmail(e.target.value));
  }

  const handleLogPasswordChange = (e) => {
    setLogPassword(e.target.value);
    setLogPasswordError(validatePassword(e.target.value));
  }

 const handleLogin = async (e) => {
  e.preventDefault();
  const emailError = validateEmail(logEmail);
  const passwordError = validatePassword(logPassword);
  
  if(emailError || passwordError){
    setLogEmailError(emailError);
    setLogPasswordError(passwordError);
    return;
  }
  
  setLoading(true);
  try {
    const response = await AxiosInstance.post('auth/jwt/create/', {
      email: logEmail,
      password: logPassword
    }, {
      withAuth: false // No auth needed for login
    });

    const token = response.data.access;
    const subdomain = getSubdomainFromPath(); // Make sure this matches your implementation
    localStorage.setItem(`kitchenethio${subdomain}`, token);
    notify("Login successful", "success");
    dispatch(fetchUser());
    navigate(`/thekitchenethio/${subdomain}`);
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        "Login failed";
                        console.log(errorMessage);
    notify(`Login failed: ${errorMessage}`, "error");
  } finally {
    setLoading(false);
  }
};


   const handleRegister = async (e) => {
    e.preventDefault();

    const isNameValid = validateName(regName);
    const emailError = validateEmail(regEmail);
    const passwordError = validatePassword(regPassword);
    const phoneError = validatePhone(regPhoneNumber);
    
    if (!isNameValid || emailError || passwordError || phoneError) {
    setRegEmailError(emailError);
    setRegPasswordError(passwordError);
    setRegPhoneError(phoneError);
    return;
  }
    setLoading(true);
    
    try {
      const response = await AxiosInstance.post('/auth/users/', {
      full_name: regName,
      email: regEmail,
      password: regPassword,
      phone_number: regPhoneNumber,
      re_password: regPassword,
    }, {
      withAuth: false // Explicitly set since we don't need auth for registration
    });
     console.log("response")
    console.log(response.data)
   
    if(response.status === 201){
        notify("Registered Successfully","success");
      setTimeout(()=> {
        handleActive();
        setLoading(false);
      },2200);
      
    }
    
    
    } catch (error) {
       console.log("response")
    console.log(error)
      notify(`Registration failed: ${error.message}`,"error");
      setTimeout(()=>{
        setLoading(false);
      },2200);
    }
  };
  

  

 
  // const handleLogin = async (e) =>{
  //   e.preventDefault();
  //   const isLoginPhoneValid = validatePhone(logPhoneNumber);
  //   if(!isLoginPhoneValid){
  //     return;
  //   }
  //     setLoading(true);
  //     try{
  //       const response = await fetch(`http://127.0.0.1:8000/api/send-otp?phone=${logPhoneNumber}`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       });
  //       const data = await response.json();
  //       if (response.status === 200){// parse the error response
    
  //          const userId = data.user_id;
    
  //   // Store userId in session storage
  //   sessionStorage.setItem('userId', userId);
  //       notify("otp Sent Successfully","success");
  //       setTimeout(()=>{
  //         setIsOtpSent(true);

  //       },2200);
       
     

  //       }
  //       else{
  //         throw new Error( response.message);

  //       }
       
  //     }
  //     catch (error){
  //       // notify("otp sent failed please try again" +error.message,"error");
  //       notify(`Failed to send OTP: ${error.message}`, "error");
        
  //     }
  //     finally{
  //       setLoading(false);

  //     }
    

  // }


  

  const handleActive=() =>{
    setIsActive(!isActive);
  }
  // const handleOtpSubmit = async (e) => {
  //   e.preventDefault();
  //   const isOtpValid = validateotp(otp);
  //   if(!isOtpValid){
  //     return;
  //   }
  //     setLoading(true);
  //     try{
  //       const userId = parseInt(sessionStorage.getItem("userId"));
  //       const code = otp
  //       console.log(userId,otp);
  //       const apiUrl = `http://127.0.0.1:8000/api/verify-otp?id=${userId}&code=${code}`;
  //       const response = await fetch(apiUrl, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       });
  //       const data = await response.json();
  //       if (!response.ok){// parse the error response
  //     throw new Error(data.message  || "failed to verify");
  //       }
  //       const token = data.access_token;
    
  //   // Store userId in session storage
  //   localStorage.setItem('pizzaHutToken', token);
  //       notify("otp verified successfully","success");
  //       setIsOtpSent(false);
  //       dispatch(fetchUser());
        
  //       navigate("/");
  //       // await initializeUser();

  //       // // Get the user state after initialization
  //       // if (user && user?.data.role === "owner") {
  //       //     navigate("/owner-dashboard"); // Navigate to Owner Dashboard
  //       // } else {
  //       //     navigate("/"); // Navigate to the default landing page or homepage
  //       // }
        
        

  //     }
  //     catch (error){
  //       notify(`error verifying otp: ${error.message}`,"error");
  //     }
  //     finally{
  //       setLoading(false);

  //     }
  
   

  // };


  // const handleRegister = async (e) => {
  //   e.preventDefault();

  //   const isNameValid = validateName(regName);
  //   const isPhoneValid = validatePhone(regPhoneNumber);
  //   if (!isNameValid || !isPhoneValid) {
  //     return;
  //   }
  

     
    

   

  //   setLoading(true);
    

  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/api/register?name=${regName}&&phone=${regPhoneNumber}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || 'Failed to register ');
  //     }

     
    
  //    notify("Registered Successfully","success");
  //    setTimeout(()=> {
  //     handleActive();
  //     setLoading(false);

  //    },2200);
  //   } catch (error) {
  //     notify("error Registering ,please try again","error");
  //     setTimeout(()=>{
  //       setLoading(false);
  //     },2200);
  //   }
  // };




  return (
    <div className={`${isActive? "active": ""} flex justify-center items-center bg-amber-50 w-full h-screen`}>
    
        <div className='w-[850px] h-[600px]  overflow-hidden bg-white flex relative  shadow-lg '>
        <span className='triangle-bg '></span>
        <span className='triangle-bg2 '></span>
       
       
       
       
       
       
       
       
       
       
       
        <div className= 'z-30 flex justify-between ml-10'>
          <div className='flex flex-col items-center justify-center gap-4 '>
           <p className='my-5 text-2xl text-center font-fredoka animation '>Login</p>








              <div className='animation'>
                <div className='flex flex-col'>
                      <input
                type='email'
                value={logEmail}
                onChange={handleLogEmailChange}
                placeholder='Enter your email'
                className='p-2 border-2 border-black border-solid'
              />
              {logEmailError && <p className='text-red'>{logEmailError}</p>}
              <input
                type='password'
                value={logPassword}
                onChange={handleLogPasswordChange}
                placeholder='Enter your password'
                className='p-2 mt-2 border-2 border-black border-solid'
              />
              {logPasswordError && <p className='text-red'>{logPasswordError}</p>}

                  </div>


              
                
                <div className='flex justify-center py-3 animation'>
                  <RelativeButton onClick={handleLogin} name="Login" />
                </div>
              </div>
            




      
      
      
        <div className='flex gap-2'>
            <p  className='text-base font-semibold text-center text-black font-nunito animation'>
                Donot have an account? 
              </p>
              <p onClick={handleActive} className='text-base font-semibold text-center font-nunito animation text-red hover:cursor-pointer'>
               Register
              </p>

        </div>
            
            
          </div>
        </div>
      
      
      


      
      
          <div className='absolute z-20 flex flex-row-reverse justify-between w-full pr-5 mt-16'>
          <div className='flex flex-col justify-center h-full gap-4'>
          <p className='my-5 text-2xl text-center font-fredoka register-animation'>Register</p>



<input 
                type='text' 
                value={regName} 
                onChange={handleNameChange} 
                placeholder="Enter your name" 
                className='p-2 border-2 border-solid register-animation border-cyan-300'
              />
              {nameError && <p className='text-red'>{nameError}</p>}
              <input
                type='email'
                value={regEmail}
                onChange={handleRegEmailChange}
                placeholder="Enter your email"
                className='p-2 border-2 border-solid register-animation border-cyan-300'
              />
              {regEmailError && <p className='text-red'>{regEmailError}</p>}
{/*               
               <PhoneInput
                  country={"et"}
                  dropdown={false}
                  value={regPhoneNumber}
                  onChange={handleRegPhoneChange}
                />
                {regPhoneError && <p className='text-red'>{regPhoneError}</p>}
               */}

               <input
  type="tel"
  value={regPhoneNumber}
  onChange={(e) => handleRegPhoneChange(e.target.value)}
  placeholder="Enter your phone number"
  className='p-2 border-2 border-solid register-animation border-cyan-300'
/>
{regPhoneError && <p className='text-red'>{regPhoneError}</p>}
              <input
                type='password'
                value={regPassword}
                onChange={handleRegPasswordChange}
                placeholder="Enter your password"
                className='p-2 border-2 border-solid register-animation border-cyan-300'
              />
              {regPasswordError && <p className='text-red'>{regPasswordError}</p>}


    
    
      <div className='flex justify-center register-animation'>
      <RelativeButton onClick={handleRegister} name="Register"/>
        </div>
        <div className='flex gap-2'>
        <p  className='text-base font-semibold text-center text-black register-animation font-nunito'>
        Already have an account? </p>
        <p onClick= {handleActive} className='text-base font-semibold text-center register-animation font-nunito text-red'>
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



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { notify } from '../Components/notify';
// import RelativeButton from '../Components/RelativeButton';
// import { fetchUser } from '../Redux/UserSlice';
// import AxiosInstance from '../Components/AxiosInstance';
// import { getSubdomainFromPath } from '../Components/utitlites';

// const AuthPage = () => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rePassword, setRePassword] = useState('');

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     if (isRegister && !name.trim()) {
//       newErrors.name = 'Full name is required';
//       valid = false;
//     }

//     if (!email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Invalid email format';
//       valid = false;
//     }

//     if (!password) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       valid = false;
//     }

//     if (isRegister && password !== rePassword) {
//       newErrors.rePassword = 'Passwords do not match';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   const subdomain = getSubdomainFromPath();
//   const tokenKey = `kitchenethio${subdomain}`;

//   setLoading(true);
//   const endpoint = isRegister ? 'register' : 'login';
//   const payload = isRegister
//     ? { name, email, password }
//     : { email, password };

//   try {
//     const response = await AxiosInstance.post(endpoint, payload, {
//       withAuth: false
//     });

//     const data = response.data;

//     if (!isRegister) {
//       localStorage.setItem(tokenKey, data.access_token);
//       dispatch(fetchUser());
//       notify('Login successful', 'success');
//       navigate('/');
//     } else {
//       notify('Registration successful! You can now log in.', 'success');
//       setIsRegister(false);
//     }
//   } catch (error) {
//     const message = error.response?.data?.message || error.message || 'Something went wrong';
//     notify(message, 'error');
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className='flex items-center justify-center w-full h-screen bg-amber-50'>
//       <div className='w-[400px] p-8 bg-white rounded shadow-md'>
//         <h2 className='mb-6 text-2xl font-bold text-center'>{isRegister ? 'Register' : 'Login'}</h2>
//         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//           {isRegister && (
//             <>
//               <input
//                 type='text'
//                 placeholder='Full Name'
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className='p-2 border border-gray-300 rounded'
//               />
//               {errors.name && <p className='text-sm text-red-500'>{errors.name}</p>}
//             </>
//           )}

//           <input
//             type='email'
//             placeholder='Email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className='p-2 border border-gray-300 rounded'
//           />
//           {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}

//           <input
//             type='password'
//             placeholder='Password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className='p-2 border border-gray-300 rounded'
//           />
//           {errors.password && <p className='text-sm text-red-500'>{errors.password}</p>}

//           {isRegister && (
//             <>
//               <input
//                 type='password'
//                 placeholder='Confirm Password'
//                 value={rePassword}
//                 onChange={(e) => setRePassword(e.target.value)}
//                 className='p-2 border border-gray-300 rounded'
//               />
//               {errors.rePassword && <p className='text-sm text-red-500'>{errors.rePassword}</p>}
//             </>
//           )}

//           <RelativeButton name={loading ? 'Loading...' : isRegister ? 'Register' : 'Login'} />
//         </form>

//         <div className='mt-4 text-center'>
//           <p>
//             {isRegister ? 'Already have an account?' : "Don't have an account?"}
//             <span
//               onClick={() => setIsRegister(!isRegister)}
//               className='ml-2 text-red-500 cursor-pointer'
//             >
//               {isRegister ? 'Login' : 'Register'}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
