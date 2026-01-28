import React from 'react';
import { Button } from '@heroui/react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform built with React and Node.js.',
    },
    {
      title: 'Task Management App',
      description: 'A productivity app for managing tasks with drag-and-drop functionality.',
    },
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio website built with React and Tailwind CSS.',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-slate-400 mb-4">{project.description}</p>
              <Button variant="outline" size="sm">View Repo</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;