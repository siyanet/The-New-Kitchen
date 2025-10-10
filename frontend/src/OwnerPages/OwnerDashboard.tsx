// import React from 'react'
// import OwnerNavBar from '../OwnerComponets/OwnerNavBar'
// import OwnerSideBar from '../OwnerComponets/OwnerSideBar'

// const OwnerDashboard = () => {
//   return (
//     <div className='flex flex-col w-full h-full'>
//         <OwnerNavBar/>
//         <OwnerSideBar/>
//         <div className="pt-10 pr-20 pl-28">
//   {/* Welcome Section */}
//   <div className="mb-10 text-center">
//     <h1 className="text-4xl font-fredoka text-red">Welcome to Your Restaurant Dashboard</h1>
//     <p className="mt-4 text-lg text-gray-600 font-nunito">
//       Manage your restaurant operations efficiently and stay on top of your orders, menus, and staff.
//     </p>
//   </div>

//   {/* Overview Section */}
//   <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//     {/* Orders Card */}
//     <div className="p-6 text-center bg-white rounded-lg shadow-lg">
//       <i className="mb-3 text-4xl fas fa-receipt text-red"></i> {/* Orders Icon */}
//       <h2 className="text-xl text-black font-fredoka">Orders</h2>
//       <p className="mt-2 text-gray-600 font-nunito">Track customer orders and ensure timely delivery.</p>
//     </div>

//     {/* Menus Card */}
//     <div className="p-6 text-center bg-white rounded-lg shadow-lg">
//       <i className="mb-3 text-4xl fas fa-utensils text-red"></i> {/* Menus Icon */}
//       <h2 className="text-xl text-black font-fredoka">Menus</h2>
//       <p className="mt-2 text-gray-600 font-nunito">Create and manage your restaurant’s menu with ease.</p>
//     </div>

//     {/* Staff Card */}
//     <div className="p-6 text-center bg-white rounded-lg shadow-lg">
//       <i className="mb-3 text-4xl fas fa-user-friends text-red"></i> {/* Staff Icon */}
//       <h2 className="text-xl text-black font-fredoka">Staff</h2>
//       <p className="mt-2 text-gray-600 font-nunito">Manage staff schedules and roles within the restaurant.</p>
//     </div>
//   </div>

//   {/* Financial Section */}
//   <div className="mt-10 text-center">
//     <h2 className="text-3xl text-black font-fredoka">Financial Overview</h2>
//     <p className="mt-4 text-lg text-gray-600 font-nunito">
//       Monitor your restaurant's financial performance and gain insights into daily sales.
//     </p>

//     {/* Financial Stats */}
//     <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4">
//       {/* Daily Sales */}
//       <div className="p-6 text-center bg-white rounded-lg shadow-lg">
//         <i className="mb-3 text-4xl text-green-600 fas fa-chart-line"></i> {/* Sales Icon */}
//         <h3 className="text-xl text-black font-fredoka">Daily Sales</h3>
//         <p className="mt-2 text-gray-600 font-nunito">$2,500</p>
//       </div>

//       {/* Monthly Revenue */}
//       <div className="p-6 text-center bg-white rounded-lg shadow-lg">
//         <i className="mb-3 text-4xl text-blue-600 fas fa-dollar-sign"></i> {/* Revenue Icon */}
//         <h3 className="text-xl text-black font-fredoka">Monthly Revenue</h3>
//         <p className="mt-2 text-gray-600 font-nunito">$45,000</p>
//       </div>

//       {/* Total Expenses */}
//       <div className="p-6 text-center bg-white rounded-lg shadow-lg">
//         <i className="mb-3 text-4xl text-yellow-600 fas fa-money-bill-wave"></i> {/* Expenses Icon */}
//         <h3 className="text-xl text-black font-fredoka">Total Expenses</h3>
//         <p className="mt-2 text-gray-600 font-nunito">$15,000</p>
//       </div>

//       {/* Profit */}
//       <div className="p-6 text-center bg-white rounded-lg shadow-lg">
//         <i className="mb-3 text-4xl text-purple-600 fas fa-wallet"></i> {/* Profit Icon */}
//         <h3 className="text-xl text-black font-fredoka">Profit</h3>
//         <p className="mt-2 text-gray-600 font-nunito">$30,000</p>
//       </div>
//     </div>
//   </div>
// </div>


      
//     </div>
//   )
// }

// export default OwnerDashboard



// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Flame, ShoppingBag, BarChart3, ListOrdered, LogOut } from 'lucide-react';
import AxiosInstance from '../Components/AxiosInstance';
import DashboardCard from '../OwnerComponets/DashboradCard';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar';
import OwnerSideBar from '../OwnerComponets/OwnerSideBar';
import OwnerHeader from '../OwnerComponets/OwnerTitle';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Define prop type
// interface DashboardProps {
//   branchId: string;
// }

// Define types for data shape
interface BestSeller {
  portion__menu__name: string;
  total_sold: number;
}

interface OrderData {
  date: string;
  order_count: number;
}

interface StatusBreakdown {
  status: string;
  count: number;
}

const Dashboard: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<BestSeller[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [ordersData, setOrdersData] = useState<OrderData[]>([]);
  const [statusBreakdown, setStatusBreakdown] = useState<StatusBreakdown[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [best, revenue, orders, status] = await Promise.all([
          AxiosInstance.get<BestSeller[]>(`orders/dashboard/best-sellers/`,{withAuth:true}),
          AxiosInstance.get<{ total_revenue: number }>(`orders/dashboard/total-revenue/`,{withAuth:true}),
          AxiosInstance.get<OrderData[]>(`orders/dashboard/orders-last-7-days/`,{withAuth:true}),
          AxiosInstance.get<StatusBreakdown[]>(`orders/dashboard/status-breakdown/`,{withAuth:true}),
        ]);

        setBestSellers(best.data );
        setTotalRevenue(revenue.data.total_revenue);
        setOrdersData(orders.data);
        setStatusBreakdown(status.data);
      } catch (err) {
        
       
      }
    };

    fetchDashboard();
  });

  const chartData = {
    labels: ordersData.map((item) => item.date),
    datasets: [
      {
        label: 'Orders',
        data: ordersData.map((item) => item.order_count),
        backgroundColor: '#F3274C',
      },
    ],
  };

  return (
    <div >
      <OwnerNavBar/> 
      
      <OwnerSideBar/>
      <div className='pl-48 pr-20'>
        <h1 className='text-2xl font-normal text-black font-fredoka'>Dashboard</h1>
       

      <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Revenue"
          value={`ETB ${totalRevenue}`}
          icon={<Flame color="#F3274C" />}
          color="border-red"
        />
        <DashboardCard
          title="Best Seller"
          value={bestSellers[0]?.portion__menu__name || 'N/A'}
          icon={<ShoppingBag color="#FFD40D" />}
          color="border-yellow"
        />
        <DashboardCard
          title="Total Orders"
          value={ordersData.reduce((sum, o) => sum + o.order_count, 0)}
          icon={<BarChart3 color="#F3274C" />}
          color="border-red"
        />
        <DashboardCard
          title="Status Types"
          value={statusBreakdown.length}
          icon={<ListOrdered color="#FFD40D" />}
          color="border-yellow"
        />
      </div>

      <div className="p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Orders in Last 7 Days
        </h2>
        <Bar data={chartData} />
      </div>
      </div>
   
    </div>
  );
};

export default Dashboard;

