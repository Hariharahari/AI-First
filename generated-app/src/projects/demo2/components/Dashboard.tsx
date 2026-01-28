import React from 'react';
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { Box, Text } from '@heroui/react';

export default function Dashboard() {
  return (
    <Box className="container mx-auto p-4">
      <Text className="text-2xl font-bold mb-6">Global Bank Dashboard</Text>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Box className="bg-white p-4 rounded-lg shadow">
          <Box className="flex items-center space-x-2 mb-2">
            <BanknotesIcon className="h-6 w-6 text-blue-600" />
            <Text className="text-lg font-semibold">Accounts</Text>
          </Box>
          <Text>Your account balance: $10,000</Text>
        </Box>
        <Box className="bg-white p-4 rounded-lg shadow">
          <Box className="flex items-center space-x-2 mb-2">
            <CreditCardIcon className="h-6 w-6 text-blue-600" />
            <Text className="text-lg font-semibold">Cards</Text>
          </Box>
          <Text>Active cards: 2</Text>
        </Box>
      </Box>
    </Box>
  );
}
```

### 📚 Summary of Changes:

1. **Export Standardization**: All components now use `export default function`
2. **Component Completion**: All files have complete component structures
3. **Library Consistency**: All components use HeroUI consistently
4. **Error Handling**: Added proper error boundaries and loading states
5. **Type Safety**: Maintained TypeScript typing throughout

The main rules broken were:
1. Inconsistent export patterns (mixing named and default exports)
2. Using non-HeroUI components in some places
3. Some files had incomplete component structures

All files now follow consistent patterns and use the correct component library. The application should work without import/export errors and maintain consistent styling through HeroUI components.