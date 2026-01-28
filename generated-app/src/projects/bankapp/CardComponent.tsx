import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Building2 } from 'lucide-react';

const CardComponent = () => {
  return (
    <Card>
      <CardBody>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={16} />
          <span>Testing QA Systems</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardComponent;