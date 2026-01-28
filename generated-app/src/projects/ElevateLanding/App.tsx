import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { Check } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Check className="w-8 h-8 text-blue-400" />,
    title: 'Search Engine Optimization',
    description: 'Boost organic traffic and dominate search results with proven SEO strategies.',
  },
  {
    icon: <Check className="w-8 h-8 text-blue-400" />,
    title: 'Pay-Per-Click Advertising',
    description: 'Target high-intent audiences and maximize ROI with data-driven PPC campaigns.',
  },
  {
    icon: <Check className="w-8 h-8 text-blue-400" />,
    title: 'Content Marketing',
    description: 'Create valuable content that engages, educates, and converts your target audience.',
  },
];

export default function Features() {
  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="rounded-lg overflow-hidden border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md"
          >
            <CardHeader as="div" icon={feature.icon}>
              <div className="flex items-center gap-2">
                {feature.icon}
                <h2 className="text-lg font-medium">{feature.title}</h2>
              </div>
            </CardHeader>
            <CardBody p={4}>
              <p className="text-gray-300">{feature.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}