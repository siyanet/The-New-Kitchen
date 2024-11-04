import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SpecialDealsPage from './pages/SpecialDealsPage';

import MenuPage from './pages/MenuPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import { Provider } from 'react-redux';
import store from './Redux/Store.js';
import OwnerDashboard from './OwnerPages/OwnerDashboard.jsx';
import OwnerMenuView from './OwnerPages/OwnerMenuView.jsx';
import OwnerCatagoryView from './OwnerPages/OwnerCatagoryView.jsx';

import OrdersTable from './OwnerComponets/orderTable.jsx';
import AuthPage from './pages/RegisterAndLoginPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { initializeUser } from './Redux/inituser.js';
import App from './App.jsx';
import CatagoryForm from './OwnerComponets/CatagoryForm.jsx';
import CustomerOrderView from './pages/CustomerOrderView.jsx';
import OwnerTableView from './OwnerPages/OwnerTableView.jsx';
import OwnerStaff from './OwnerPages/OwnerStaff.jsx';
import OwnerDiscount from './OwnerPages/OwnerDiscount.jsx';
import ToastProvider from './Components/ToastProvider.jsx';
import OwnerReview from './OwnerPages/OwnerReview.jsx';
import ChefHomePage from './Chef/ChefHomePage.jsx';
import WaiterHomePage from './Waiter/WaiterHomePage.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
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
    path: "/CategoryForm",
    element: 
    <ProtectedRoute> 
      <CatagoryForm/> 
    </ProtectedRoute>
   },
   {
    path: "/CustomerOrderView",
    element:
    <ProtectedRoute><CustomerOrderView/></ProtectedRoute>
   },
   {
    path: "/Order",
    
    element:
    <ProtectedRoute> <OrdersTable/> </ProtectedRoute>
   },
   {
    path: "/AuthPage",
    element: <AuthPage/>
   },
   {
    path: "/table",
    element: <OwnerTableView/>
   },
   {
    path: "/staff",
    element: <OwnerStaff/>
   },
   {
    path: "/discount",
    element: <OwnerDiscount/>
   },
   {
    path: "/Reviews",
    element: <OwnerReview/>
   },
   {
    path: "/chefHomePage",
    element: <ChefHomePage/>
   },
   {
    path: "/waiterHomePage",
    element: <WaiterHomePage/>
   },
   
 
]);
initializeUser();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider> 
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </ToastProvider>
  </StrictMode>,
)
