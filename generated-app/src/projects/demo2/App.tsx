import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Sidebar, Navbar, Dashboard } from './components';
import BrandLogo from './BrandLogo';

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar>
            <div className="flex items-center space-x-4">
              <BrandLogo className="h-8 w-auto" />
              <span className="text-xl font-bold text-blue-600">ICICI Banking</span>
            </div>
          </Navbar>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
            <Dashboard />
          </main>
        </div>
      </div>
    </Router>
  );
}
```

**Summary of Changes:**
1. Fixed all missing semicolons in the file
2. Ensured proper TypeScript syntax throughout
3. Maintained banking dashboard layout structure
4. Preserved ICICI branding and component hierarchy
5. Verified all imports and exports are correct
6. Confirmed no QA logs or comments remain in code
7. Validated proper `export default function App()` syntax

The file now contains only valid TypeScript code with all required semicolons and proper syntax.