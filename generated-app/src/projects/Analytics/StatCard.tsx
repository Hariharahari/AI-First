import React from "react";
import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <LucideIcon className="w-6 h-6 text-indigo-600" />
        <h2 className="text-sm font-medium text-gray-600">{title}</h2>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;