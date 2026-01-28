import React from 'react';
import { Box, Card, CardHeader, CardBody, Avatar } from '@heroui/react';

interface Testimonial {
  quote: string;
  name: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Elevate transformed our online presence. Our leads increased by 150% in just three months!',
    name: 'Laura Mitchell',
    avatar: '/avatar/laura.jpg',
  },
  {
    quote: 'The team’s expertise in SEO and PPC gave us a competitive edge we couldn’t ignore.',
    name: 'James Patel',
    avatar: '/avatar/james.jpg',
  },
  {
    quote: 'Creative content and strategic campaigns drove record sales during our launch.',
    name: 'Sofia Ramirez',
    avatar: '/avatar/sofia.jpg',
  },
];

export default function Testimonials() {
  return (
    <Box p={4} md:p={8}>
      <Card shadow={2} into="rounded-lg">
        <CardHeader as="h2" textAlign="center" weight={600}>
          What Our Clients Say
        </CardHeader>
        <CardBody spaceY={4}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex items-start space-x-4">
              <Avatar
                name={testimonial.name}
                src={testimonial.avatar}
                size="md"
                variant="subtle"
                className="border border-white"
              />
              <div className="flex-1">
                <p className="text-gray-300 break-words">{testimonial.quote}</p>
                <p className="font-medium text-white">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </Box>
  );
}