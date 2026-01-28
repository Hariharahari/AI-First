import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Switch,
  Button,
} from '@heroui/react';
import { Check } from 'lucide-react';
import { Box, Heading } from '@heroui/react';

interface Tier {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'Starter',
    price: '$29/mo',
    features: [
      'Keyword Research',
      'On-Page SEO',
      'Social Media Posts',
    ],
  },
  {
    name: 'Pro',
    price: '$79/mo',
    popular: true,
    features: [
      'Keyword Research',
      'On-Page SEO',
      'Social Media Posts',
      'PPC Campaign Setup',
      'Email Marketing',
      'Analytics Reporting',
    ],
  },
  {
    name: 'Enterprise',
    price: '$199/mo',
    features: [
      'All Pro Features',
      'Custom Dashboard',
      'Dedicated Account Manager',
      'Priority Support',
    ],
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const toggleChange = (e: any) => {
    setIsYearly(e.isToggled);
  };

  const calculatePrice = (priceStr: string) => {
    const numeric = parseFloat(priceStr.replace(/[^\d]/g, ''));
    const discounted = numeric * 0.8;
    return `${discounted.toFixed(0)} / mo`;
  };

  return (
    <Box p={8}>
      {/* Monthly / Yearly Toggle */}
      <Box mb={4} flex flex-col sm:flex-row items-stretch gap-2 justify-between>
        <Box className="flex items-center gap-1">
          <Switch
            isChecked={isYearly}
            onCheckedChange={toggleChange}
            color="teal"
            size="md"
          />
          <span className="text-sm text-gray-300">
            {isYearly ? 'Yearly' : 'Monthly'}
          </span>
        </Box>
      </Box>

      <Card shadow={3} into="rounded-lg max-w-3xl mx-auto">
        <CardHeader as="h2" textAlign="center" weight={600}>
          Pricing Plans
        </CardHeader>
        <CardBody spaceY={6}>
          {tiers.map((tier) => {
            const displayedPrice = isYearly ? calculatePrice(tier.price) : tier.price;
            const isPro = tier.popular;
            const badge = isPro ? (
              <Box className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                Best Value
              </Box>
            ) : null;

            return (
              <Card
                key={tier.name}
                shadow={isPro ? 8 : 2}
                into={
                  isPro
                    ? 'border border-teal-500/30 rounded-lg relative'
                    : 'rounded-lg'
                }
              >
                <CardHeader>
                  <Box className="flex flex-col items-center space-y-1">
                    <Heading size="lg" weight={700} textAlign="center">
                      {tier.name}
                    </Heading>
                    <Heading size="xl" weight={800} color="teal" textAlign="center">
                      {displayedPrice}
                    </Heading>
                  </Box>
                </CardHeader>
                <CardBody>
                  <ul className="divide-y divide-gray-700">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center px-4 py-2">
                        <Check className="mr-2 h-5 w-5 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {badge}
                  {isPro && (
                    <Box className="mt-2 flex justify-center">
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        size="lg"
                        onClick={() => alert('Subscribe to Pro')}
                      >
                        Get Pro
                      </Button>
                    </Box>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </CardBody>
      </Card>
    </Box>
  );
}