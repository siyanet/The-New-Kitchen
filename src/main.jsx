import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import SpecialDealsPage from './pages/SpecialDealsPage';

import MenuPage from './pages/MenuPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import { Provider } from 'react-redux';
import store from './Redux/Store.js';
import OwnerDashboard from './OwnerPages/OwnerDashboard.jsx';
import OwnerMenuView from './OwnerPages/OwnerMenuView.jsx';
import OwnerCatagoryView from './OwnerPages/OwnerCatagoryView.jsx';
import AddCategoryForm from './OwnerComponets/AddCatagoryForm.jsx';
import OrdersTable from './OwnerComponets/orderTable.jsx';
import AuthPage from './pages/RegisterAndLoginPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';


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
   {
    path: '/review',
    element: <ReviewPage/>
   },
   {
    path: "/OwnerDashboard",
   
    element: 
    <ProtectedRoute>  <OwnerDashboard/> </ProtectedRoute>
   },
   {
    path: "/OwnerMenuView",
    element:
    <ProtectedRoute>   <OwnerMenuView/>  </ProtectedRoute>
   },
   {
    
    path: "/OwnerCategoryView",
    element: 
    <ProtectedRoute> <OwnerCatagoryView/> </ProtectedRoute>
   },
   {
    path: "/AddCategoryForm",
    element: 
    <ProtectedRoute> 
      <AddCategoryForm/>
    </ProtectedRoute>
   },
   {
    path: "/Order",
    
    element:
    <ProtectedRoute> <OrdersTable/> </ProtectedRoute>
   },
   {
    path: "/AuthPage",
    element: <AuthPage/>
   }
 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
 
  </StrictMode>,
)
