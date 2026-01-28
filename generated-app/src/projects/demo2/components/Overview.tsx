import React from 'react';
import { Box, Text } from '@heroui/react';

export default function Overview() {
  return (
    <Box className="container mx-auto p-4">
      <Text className="text-2xl font-bold mb-6">Overview</Text>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Box className="bg-white p-4 rounded-lg shadow">
          <Text className="text-lg font-semibold">Accounts</Text>
          <Text>Your account information</Text>
        </Box>
        <Box className="bg-white p-4 rounded-lg shadow">
          <Text className="text-lg font-semibold">Transactions</Text>
          <Text>Recent transactions</Text>
        </Box>
      </Box>
    </Box>
  );
}
```

####