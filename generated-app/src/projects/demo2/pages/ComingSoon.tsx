import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react'; // Verify these are correct HeroUI imports

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h4 className="font-bold text-large">Feature Coming Soon</h4>
          <p className="text-small text-default-500">
            We're working hard to bring you this feature. Please check back later.
          </p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="mb-4 text-6xl">🚀</div>
            <p className="text-center text-gray-600">
              This section is under development. We appreciate your patience.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ComingSoon;
```

**Rule Broken**: Potential library inconsistency - need to verify if `Card`, `CardHeader`, `CardBody` are from HeroUI