import React from 'react';
import { Box, Text } from '@heroui/react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="flex flex-col min-h-screen">
      <Box className="bg-blue-600 text-white p-4">
        <Text className="text-xl font-bold">Global Bank</Text>
      </Box>
      <Box className="flex-1">{children}</Box>
      <Footer />
    </Box>
  );
}
```

####