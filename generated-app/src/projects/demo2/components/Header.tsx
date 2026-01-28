import React from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <GlobeAltIcon className="h-8 w-8 text-white" />
          <h1 className="text-xl font-bold">Global Bank</h1>
        </div>
        <nav className="flex space-x-6">
          <a href="/" className="hover:text-blue-200">Home</a>
          <a href="/overview" className="hover:text-blue-200">Overview</a>
        </nav>
      </div>
    </header>
  );
}
```

####