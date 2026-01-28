import React from 'react';
import { Box, Text } from '@heroui/react';

export default function Footer() {
  return (
    <Box className="bg-gray-800 text-white p-4 mt-auto">
      <Box className="container mx-auto text-center">
        <Text>© {new Date().getFullYear()} Global Bank. All rights reserved.</Text>
        <Box className="mt-2 text-sm">
          <a href="#" className="hover:text-gray-300 mx-2">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 mx-2">Terms of Service</a>
        </Box>
      </Box>
    </Box>
  );
}
```

####