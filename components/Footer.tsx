
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 border-t border-gray-800 mt-8">
      <div className="container mx-auto px-4 text-center text-brand-text-secondary text-sm">
        <p>&copy; {new Date().getFullYear()} ARC Smart Agriculture Project. All rights reserved.</p>
        <p className="mt-1">Real-time Soil Monitoring System</p>
      </div>
    </footer>
  );
};

export default Footer;
