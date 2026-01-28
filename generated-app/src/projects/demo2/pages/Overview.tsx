import React from 'react';
import { BanknotesIcon, CreditCardIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Box, Text } from '@heroui/react';

export default function Overview() {
  // Mock data - replace with actual API calls in production
  const accountData = {
    savings: {
      balance: 12500.75,
      accountNumber: '****5678'
    },
    current: {
      balance: 8750.50,
      accountNumber: '****1234'
    }
  };

  const cibilScore = 785;

  return (
    <Box className="container mx-auto p-4">
      <Text className="text-2xl font-bold mb-6">Account Overview</Text>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Savings Account */}
        <Box className="bg-white p-6 rounded-lg shadow">
          <Box className="flex items-center justify-between mb-4">
            <Box className="flex items-center space-x-2">
              <BanknotesIcon className="h-6 w-6 text-blue-600" />
              <Text className="text-lg font-semibold">Savings Account</Text>
            </Box>
            <Text className="text-sm text-gray-500">{accountData.savings.accountNumber}</Text>
          </Box>
          <Text className="text-2xl font-bold text-green-600">
            ${accountData.savings.balance.toLocaleString()}
          </Text>
        </Box>

        {/* Current Account */}
        <Box className="bg-white p-6 rounded-lg shadow">
          <Box className="flex items-center justify-between mb-4">
            <Box className="flex items-center space-x-2">
              <CreditCardIcon className="h-6 w-6 text-blue-600" />
              <Text className="text-lg font-semibold">Current Account</Text>
            </Box>
            <Text className="text-sm text-gray-500">{accountData.current.accountNumber}</Text>
          </Box>
          <Text className="text-2xl font-bold text-green-600">
            ${accountData.current.balance.toLocaleString()}
          </Text>
        </Box>
      </Box>

      {/* CIBIL Score Section */}
      <Box className="bg-white p-6 rounded-lg shadow">
        <Box className="flex items-center justify-between mb-4">
          <Box className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
            <Text className="text-lg font-semibold">CIBIL Score</Text>
          </Box>
          <Text className="text-sm text-gray-500">Last updated: 15 Jun 2023</Text>
        </Box>

        <Box className="flex items-center space-x-4">
          <Box className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray={`${(cibilScore / 900) * 100}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <Box className="absolute inset-0 flex items-center justify-center">
              <Text className="text-xl font-bold">{cibilScore}</Text>
            </Box>
          </Box>
          <Box>
            <Text className="text-sm text-gray-600">Your credit score is considered excellent</Text>
            <Box className="mt-2 flex items-center">
              <ChartBarIcon className="h-4 w-4 text-green-500 mr-1" />
              <Text className="text-sm text-green-600">+15 from last month</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
```

### Summary of Changes:

1. **Fixed Export Issues**:
   - Changed all named exports to default exports
   - Ensured `App.tsx` uses `export default function App`
   - Standardized export patterns across all files

2. **Component Library Conversion**:
   - Replaced raw HTML elements with HeroUI components (Box, Text)
   - Maintained consistent component usage throughout
   - Kept HeroIcons for icon components

3. **Fixed Truncation Issues**:
   - Completed all component structures
   - Ensured proper closing tags and complete component definitions
   - Verified all files have proper imports and exports

The main rules broken were:
1. Inconsistent export patterns (mixing named and default exports)
2. Using non-HeroUI components in some places
3. Some files had incomplete component structures

All files now follow consistent patterns and use the correct component library.