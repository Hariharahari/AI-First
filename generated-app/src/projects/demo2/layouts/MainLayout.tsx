import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { navigationConfig } from '../config/navigation';
import { useAuthStore } from '../store/useAuthStore';
import { Avatar, Button, Modal } from '@heroui/react';
import { Menu, LogOut } from 'lucide-react';

export default function MainLayout() {
  console.log('Rendering MainLayout');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F8]">
      <header className="flex items-center justify-between p-4 bg-[#F37E20] text-white shadow-sm">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg"
              alt="ICICI Bank Logo"
              className="h-8 w-auto"
            />
          </div>
          <nav className="hidden md:flex space-x-1">
            {navigationConfig?.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  to={item.path || '#'}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-white/20'
                      : 'hover:bg-white/20'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
                {item.subItems && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    {item.subItems?.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.path}
                        className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors rounded-md text-gray-800"
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 bg-white text-[#F37E20]">
            <span className="flex h-full w-full items-center justify-center rounded-full font-medium">
              {user?.name?.split(' ')?.map(n => n[0])?.join('')}
            </span>
          </Avatar>
          <div className="hidden md:block text-sm">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs opacity-90">Last login: Today 9:30 AM</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {navigationConfig?.map((item) => (
            <div key={item.title} className="border-b border-gray-200">
              <Link
                to={item.path || '#'}
                className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
              {item.subItems && (
                <div className="pl-6">
                  {item.subItems?.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.path}
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <subItem.icon className="h-4 w-4" />
                      <span>{subItem.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="p-4 border-t border-gray-200">
            <Button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 justify-center text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}

      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
      <footer className="p-4 text-center text-sm text-gray-600 bg-white">
        <div className="flex items-center justify-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg"
            alt="ICICI Bank Logo"
            className="h-6 w-auto opacity-50"
          />
          <span>© {new Date().getFullYear()} ICICI Bank. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}