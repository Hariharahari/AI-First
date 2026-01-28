import { useStore } from '../store/useStore';
import { Button } from '@heroui/react';
import { BarChart, DollarSign, ShoppingCart, Users } from 'lucide-react';

export default function AnalyticsPage() {
  const { stats } = useStore();

  // Mock data for charts
  const salesData = [
    { month: 'Jan', sales: 1200 },
    { month: 'Feb', sales: 1900 },
    { month: 'Mar', sales: 800 },
    { month: 'Apr', sales: 1500 },
    { month: 'May', sales: 2000 },
    { month: 'Jun', sales: 1800 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-1">+20% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
          <p className="text-xs text-gray-500 mt-1">+15% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
            <BarChart className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</div>
          <p className="text-xs text-gray-500 mt-1">+5% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Customers</h3>
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">1,250</div>
          <p className="text-xs text-gray-500 mt-1">+10% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Monthly Sales</h3>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
            <div className="text-center text-gray-400">
              <BarChart className="h-16 w-16 mx-auto mb-2" />
              <p>Chart visualization would be here</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
            <div className="text-center text-gray-400">
              <BarChart className="h-16 w-16 mx-auto mb-2" />
              <p>Chart visualization would be here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}