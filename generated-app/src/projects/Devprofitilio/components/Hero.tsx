import React from 'react';
import { Button } from '@heroui/react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
      <h2 className="text-5xl md:text-7xl font-bold mb-4">Hi, I'm John</h2>
      <p className="text-lg md:text-xl max-w-2xl mb-8 text-slate-400">
        A passionate developer with expertise in building modern web applications.
      </p>
      <div className="flex gap-4">
        <Button variant="primary" size="lg">View Work</Button>
        <Button variant="outline" size="lg">Contact Me</Button>
      </div>
    </section>
  );
};

export default Hero;