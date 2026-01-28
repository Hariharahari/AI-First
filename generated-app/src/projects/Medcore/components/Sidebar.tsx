import { Link, useLocation } from 'react-router-dom';
import { Activity, Users, Calendar, Settings } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <h1 className="text-xl font-bold text-gray-800">MediCore Pro</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center p-2 rounded ${isActive('/') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Activity className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/patients"
              className={`flex items-center p-2 rounded ${isActive('/patients') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Users className="w-5 h-5 mr-3" />
              Patients
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className={`flex items-center p-2 rounded ${isActive('/schedule') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Schedule
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`flex items-center p-2 rounded ${isActive('/settings') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};