
import 'boxicons/css/boxicons.min.css';

import './App.css'

import LandingPage from './pages/LandingPage'
import {useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './Redux/UserSlice';



function App() {
  console.log("appp");
  const dispatch = useDispatch();
  
  const {status} = useSelector((state) => state.user);
  useEffect(() =>{
    console.log("user fetch begin");

    const token = localStorage.getItem('pizzaHutToken');
    
    if (token) {
      const getUserData = () => {
        dispatch(fetchUser());
    };

    getUserData();
    }



  }, [dispatch]);
  if(status == "loading"){
    return <p> Loading user data ...</p>;
  }
  return (
   <LandingPage/>

  
  )
}

export default App
