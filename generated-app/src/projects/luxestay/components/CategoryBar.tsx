import { Button } from '@heroui/react';
import { Home, Mountain, TrendingUp, Sun } from 'lucide-react';

export const CategoryBar = () => {
  const categories = [
    { name: 'All', icon: <Home className="h-5 w-5" /> },
    { name: 'Beach', icon: <Sun className="h-5 w-5" /> },
    { name: 'Cabin', icon: <Mountain className="h-5 w-5" /> },
    { name: 'Trending', icon: <TrendingUp className="h-5 w-5" /> },
  ];

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 overflow-x-auto py-4">
          {categories?.map((category) => (
            <Button
              key={category.name}
              variant="ghost"
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};