import React from "react";
import { LucideIcon } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: "home" },
  { path: "/reports", label: "Reports", icon: "file-text" },
  { path: "/settings", label: "Settings", icon: "cog" },
];

const Sidebar: React.FC = () => {
  return (
    <nav className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white">
      <ul className="py-8 space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <a
              href={item.path}
              className="flex items-center px-4 py-3 hover:bg-slate-800 transition-colors"
            >
              <LucideIcon className="w-5 h-5 mr-2" />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;