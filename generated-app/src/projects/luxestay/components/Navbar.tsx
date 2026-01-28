import { useState } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import { Input } from '@heroui/react';

export const Navbar = () => {
  const { setSearchQuery } = useMovieStore();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
  };

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-70 z-50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-red-600 text-2xl font-bold">NETMIRROR</div>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search movies..."
            value={inputValue}
            onChange={handleSearch}
            className="w-64 bg-gray-800 text-white border-none"
          />
        </div>
      </div>
    </nav>
  );
};