

import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color: string; // e.g., 'border-red' or 'border-yellow'
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-500">{title}</h2>
          <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
        </div>
        {icon && <div className="text-4xl">{icon}</div>}
      </div>
    </div>
  );
};

export default DashboardCard;
