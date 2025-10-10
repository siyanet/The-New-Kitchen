
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

