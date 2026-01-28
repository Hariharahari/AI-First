import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-20 px-4 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Contact</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <a href="mailto:john@example.com" className="text-lg hover:text-white transition-colors">
            john@example.com
          </a>
          <a href="https://github.com/john" className="text-lg hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/john" className="text-lg hover:text-white transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;