import React from 'react';
import { Button } from '@heroui/react';

export default function Hero() {
  return (
    <div className="relative p-8 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-950 to-indigo-900 text-indigo-100">
      <h1 className="font-mono text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 ring-2 ring-white/30 uppercase tracking-wide">
        Dominate Your Market
      </h1>
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <Button colorScheme="teal" variant="solid" size="lg" className="shadow-xl shadow-blue-500/30" onClick={() => alert('Get Started clicked')}>
          Get Started
        </Button>
        <Button colorScheme="gray" variant="outline" size="lg" onClick={() => alert('Learn More clicked')}>
          Learn More
        </Button>
      </div>
      <div className="mt-12 w-12 h-12 absolute top-4 right-4 rounded-full bg-opacity-20 bg-gradient-to-tl from-white via-white/30 to-transparent animate-bounce" />
    </div>
  );
}