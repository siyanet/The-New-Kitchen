import React from 'react'
import OwnerNavBar from '../OwnerComponets/OwnerNavBar'
import OwnerSideBar from '../OwnerComponets/OwnerSideBar'

const OwnerDashboard = () => {
  return (
    <div className='flex flex-col w-full h-full'>
        <OwnerNavBar/>
        <OwnerSideBar/>
        <div className="pl-28 pr-20 pt-10">
  {/* Welcome Section */}
  <div className="text-center mb-10">
    <h1 className="text-4xl font-fredoka text-red">Welcome to Your Restaurant Dashboard</h1>
    <p className="mt-4 text-lg font-nunito text-gray-600">
      Manage your restaurant operations efficiently and stay on top of your orders, menus, and staff.
    </p>
  </div>

  {/* Overview Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Orders Card */}
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <i className="fas fa-receipt text-4xl text-red mb-3"></i> {/* Orders Icon */}
      <h2 className="text-xl font-fredoka text-black">Orders</h2>
      <p className="mt-2 font-nunito text-gray-600">Track customer orders and ensure timely delivery.</p>
    </div>

    {/* Menus Card */}
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <i className="fas fa-utensils text-4xl text-red mb-3"></i> {/* Menus Icon */}
      <h2 className="text-xl font-fredoka text-black">Menus</h2>
      <p className="mt-2 font-nunito text-gray-600">Create and manage your restaurant’s menu with ease.</p>
    </div>

    {/* Staff Card */}
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <i className="fas fa-user-friends text-4xl text-red mb-3"></i> {/* Staff Icon */}
      <h2 className="text-xl font-fredoka text-black">Staff</h2>
      <p className="mt-2 font-nunito text-gray-600">Manage staff schedules and roles within the restaurant.</p>
    </div>
  </div>

  {/* Financial Section */}
  <div className="mt-10 text-center">
    <h2 className="text-3xl font-fredoka text-black">Financial Overview</h2>
    <p className="mt-4 text-lg font-nunito text-gray-600">
      Monitor your restaurant's financial performance and gain insights into daily sales.
    </p>

    {/* Financial Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      {/* Daily Sales */}
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        <i className="fas fa-chart-line text-4xl text-green-600 mb-3"></i> {/* Sales Icon */}
        <h3 className="text-xl font-fredoka text-black">Daily Sales</h3>
        <p className="mt-2 font-nunito text-gray-600">$2,500</p>
      </div>

      {/* Monthly Revenue */}
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        <i className="fas fa-dollar-sign text-4xl text-blue-600 mb-3"></i> {/* Revenue Icon */}
        <h3 className="text-xl font-fredoka text-black">Monthly Revenue</h3>
        <p className="mt-2 font-nunito text-gray-600">$45,000</p>
      </div>

      {/* Total Expenses */}
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        <i className="fas fa-money-bill-wave text-4xl text-yellow-600 mb-3"></i> {/* Expenses Icon */}
        <h3 className="text-xl font-fredoka text-black">Total Expenses</h3>
        <p className="mt-2 font-nunito text-gray-600">$15,000</p>
      </div>

      {/* Profit */}
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        <i className="fas fa-wallet text-4xl text-purple-600 mb-3"></i> {/* Profit Icon */}
        <h3 className="text-xl font-fredoka text-black">Profit</h3>
        <p className="mt-2 font-nunito text-gray-600">$30,000</p>
      </div>
    </div>
  </div>
</div>


      
    </div>
  )
}

export default OwnerDashboard
