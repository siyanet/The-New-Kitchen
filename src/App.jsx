import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  const navigate = useNavigate();
  const { status, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "loading") {
      return; // Skip navigation while loading
    }

    if (user) {
      if (user.data.role === "owner") {
        navigate('/OwnerDashboard');
      } else if (user.data.role === "chef") {
        navigate('/chefHomePage');
      } else if(user.data.role === "waiter"){
        navigate('/waiterHomePage');
      }
    }
  }, [status, user, navigate]); // Add dependencies to useEffect

  return <LandingPage />;
}

export default App;




// import 'boxicons/css/boxicons.min.css';

// import './App.css'
// import 'react-toastify/dist/ReactToastify.css';

// import LandingPage from './pages/LandingPage'
// import { useSelector } from 'react-redux';

// import { ClipLoader } from 'react-spinners';
// import { useNavigate } from 'react-router-dom';
// import { toast,ToastContainer } from 'react-toastify';


// function App() {
//   const navigate = useNavigate();
  
 
  
//   const {status,user} = useSelector((state) => state.user); 


//   if(status == "loading"){

//     return (
//       <div className=' h-full w-full flex justify-center items-center'>
//         <ClipLoader color="#222" loading={true} size={50} /> 
//       </div>
//     );

    
//   }
  
 
//     return <>
  
     

   
//     {user && user.data.role === "owner" && (
//       navigate('/OwnerDashboard') // This would navigate to the owner dashboard
//     ) }
//     {user && user.data.role === "chef" && (
//       navigate("/chefHomePage")
    
//     )}
//       <LandingPage />
   
//   </>
//   }


// export default App;

// import 'boxicons/css/boxicons.min.css';
// import './App.css';
// import 'react-toastify/dist/ReactToastify.css';

// import LandingPage from './pages/LandingPage';
// import { useSelector } from 'react-redux';
// import { ClipLoader } from 'react-spinners';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';

// function App() {
//   const navigate = useNavigate();
//   const { status, user } = useSelector((state) => state.user);

//   // Handle navigation based on user role
//   useEffect(() => {
//     if (user) {
//       if (user.data.role === "owner") {
//         navigate('/OwnerDashboard');
//       } else if (user.data.role === "chef") {
//         navigate('/chefHomePage');
//       }
//     }
//   }, [user, navigate]);

//   // Show loading spinner if status is "loading"
//   if (status === "loading") {
//     return (
//       <div className='flex justify-center items-center h-full w-full'>
//         <ClipLoader color="#000" loading={true} size={50} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <ToastContainer />
//       {/* ToastContainer will be available for all users */}
//       {!user && <LandingPage />}
//     </>
//   );
// }

// export default App;