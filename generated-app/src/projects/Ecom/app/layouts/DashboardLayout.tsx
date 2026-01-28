import { Outlet } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Home, ShoppingCart, Package, Users, BarChart3, Bell, User } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Client Commerce</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="/" className="flex items-center p-2 rounded hover:bg-gray-700">
                <Home className="w-5 h-5 mr-3" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/orders" className="flex items-center p-2 rounded hover:bg-gray-700">
                <ShoppingCart className="w-5 h-5 mr-3" />
                <span>Orders</span>
              </a>
            </li>
            <li>
              <a href="/products" className="flex items-center p-2 rounded hover:bg-gray-700">
                <Package className="w-5 h-5 mr-3" />
                <span>Products</span>
              </a>
            </li>
            <li>
              <a href="/customers" className="flex items-center p-2 rounded hover:bg-gray-700">
                <Users className="w-5 h-5 mr-3" />
                <span>Customers</span>
              </a>
            </li>
            <li>
              <a href="/analytics" className="flex items-center p-2 rounded hover:bg-gray-700">
                <BarChart3 className="w-5 h-5 mr-3" />
                <span>Analytics</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm flex items-center justify-between p-4">
          <div className="flex items-center">
            <span className="text-gray-600">Dashboard / Products</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}