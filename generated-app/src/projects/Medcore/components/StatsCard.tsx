import { ReactNode } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}

export const StatsCard = ({ title, value, icon, color = 'blue' }: StatsCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Card>
      <CardHeader className="flex items-center">
        <div className={`p-2 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </CardHeader>
    </Card>
  );
};