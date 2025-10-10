



import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OwnerDashboard from './OwnerPages/OwnerDashboard';
import ChefHomePage from './Chef/ChefHomePage';
import WaiterLandingPage from './waiter/WaiterLandingPage';
import SpecialDealsPage from './pages/SpecialDealsPage';
import MenuPage from './pages/MenuPage';
import ReviewPage from './pages/ReviewPage';
import OwnerMenuView from './OwnerPages/OwnerMenuView';
import OwnerCatagoryView from './OwnerPages/OwnerCatagoryView';
import OrdersTable from './OwnerPages/orderTable';
import AuthPage from './pages/RegisterAndLoginPage';
import ProtectedRoute from './Components/ProtectedRoute';
import CatagoryForm from './OwnerComponets/CatagoryForm';
import CustomerOrderView from './pages/CustomerOrderView';
import OwnerTableView from './OwnerPages/OwnerTableView';
import OwnerStaff from './OwnerPages/OwnerStaff';
import OwnerDiscount from './OwnerPages/OwnerDiscount';
import OwnerReview from './OwnerPages/OwnerReview';
import WaiterHomePage from './waiter/WaiterHomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSubdomainFromPath } from './Components/utitlites';
import { fetchUser } from './Redux/UserSlice';
import { AppDispatch, RootState } from './Redux/Store';
import BranchesPage from './OwnerPages/OwnerBranchView';
import OwnerKitchenView from './OwnerPages/ownerKichenView';
import OwnerWaiterView from './OwnerPages/ownerWaiterView';
import WaiterQRLogin from './Waiter/WaiterLoginPage';
import WaitersOrdersPage from './Waiter/WaiterOrdersPage';
import TenantRegistration from './pages/TenantRegisteraionPage';

function App() {
  return (
    <Router>
       <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<LandingPage />} /> */}
        {/* <Route path="/thekitchenethio" element={<LandingPage />} /> */}
        <Route path="/thekitchenethio/:subdomain" element={<SubdomainRouter />} />
        <Route path="/thekitchenethio/:subdomain/AuthPage" element={<AuthPage />} />

        {/* Subdomain Public Pages */}
        <Route path="/thekitchenethio/:subdomain/special-deals" element={<SpecialDealsPage />} />
        <Route path="/thekitchenethio/:subdomain/menu" element={<MenuPage />} />
        <Route path="/thekitchenethio/:subdomain/review" element={<ReviewPage />} />

        {/* Subdomain Protected Routes */}
        <Route 
          path="/thekitchenethio/:subdomain/OwnerDashboard" 
          element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/OwnerMenuView" 
          element={<ProtectedRoute><OwnerMenuView /></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/OwnerCategoryView" 
          element={<ProtectedRoute><OwnerCatagoryView /></ProtectedRoute>} 
        />
        {/* <Route 
          path="/thekitchenethio/:subdomain/CategoryForm" 
          element={<ProtectedRoute><CatagoryForm /></ProtectedRoute>} 
        /> */}
        <Route 
          path="/thekitchenethio/:subdomain/CustomerOrderView" 
          element={<ProtectedRoute><CustomerOrderView /></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/Order" 
          element={<ProtectedRoute><OrdersTable /></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/branch" 
          element={<ProtectedRoute><BranchesPage/></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/waiter" 
          element={<ProtectedRoute><OwnerWaiterView/></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/kitchen" 
          element={<ProtectedRoute><OwnerKitchenView/></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/discount" 
          element={<ProtectedRoute><OwnerDiscount /></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/Reviews" 
          element={<ProtectedRoute><OwnerReview /></ProtectedRoute>} 
        />
        <Route
        path ="/thekitchenethio/tenant_registeration"
        element = {<TenantRegistration/>}/>
        <Route 
          path="/thekitchenethio/:subdomain/chefHomePage" 
          element={<ProtectedRoute><ChefHomePage /></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/waiterHomePage" 
          element={<ProtectedRoute><WaiterHomePage /></ProtectedRoute>} 
        />
        <Route 
          path="/thekitchenethio/:subdomain/waiterLandingPage" 
          element={<ProtectedRoute><WaiterLandingPage /></ProtectedRoute>} 
        />
        <Route
        path = "/thekitchenethio/:subdomain/waiterLoginPage"
        element = { <WaiterQRLogin/>}
        />
         <Route
        path = "/thekitchenethio/:subdomain/waiterOrders"
        element = { <WaitersOrdersPage/>}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}




function SubdomainRouter() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const subdomain  = getSubdomainFromPath();
  console.log("subdomain")
  console.log(subdomain);
  const { userLoading, user } = useSelector((state:RootState) => state.user);

  // Fetch user if not available
  useEffect(() => {
    if (!user && !userLoading) {
      dispatch(fetchUser());
    }
  }, [user, userLoading, dispatch]);

  // Redirect user based on role and subdomain
  useEffect(() => {
    if (userLoading || !user || !subdomain) return;

    if (user.role === "owner") {
      navigate(`/thekitchenethio/${subdomain}/OwnerDashboard`);
    } else if (user.role === "kitchen") {
      navigate(`/thekitchenethio/${subdomain}/chefHomePage`);
    } else if (user.role === "waiter") {
      navigate(`/thekitchenethio/${subdomain}/waiterLandingPage`);
    }
  }, [userLoading, user, subdomain, navigate]);

  return <LandingPage />;
}

export default App;