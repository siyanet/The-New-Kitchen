import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import SpecialDealsPage from './pages/SpecialDealsPage';

import MenuPage from './pages/MenuPage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage/>
  },
  {
    path: '/special-deals',
    element : <SpecialDealsPage/>
  },
  {  
    path: '/menu',
    element: <MenuPage/>
   },
 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
