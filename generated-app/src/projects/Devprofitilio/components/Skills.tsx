import React from 'react';
import { ReactIcon, CodeIcon, TypeScriptIcon, WindIcon } from '@heroui/react';

const Skills: React.FC = () => {
  const skills = [
    { name: 'React', icon: <ReactIcon className="w-8 h-8" /> },
    { name: 'Python', icon: <CodeIcon className="w-8 h-8" /> },
    { name: 'TypeScript', icon: <TypeScriptIcon className="w-8 h-8" /> },
    { name: 'Tailwind', icon: <WindIcon className="w-8 h-8" /> },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center gap-2">
              {skill.icon}
              <span className="text-lg">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;