import React from 'react';
import { Layer } from '@heroui/react';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';

export default function App() {
  return (
    <Layer>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-200">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
      </div>
    </Layer>
  );
}