
import React from 'react';

interface HeaderProps {
    onGetStartedClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetStartedClick }) => {
  return (
    <header className="sticky top-0 bg-brand-blue/80 backdrop-blur-md z-50 border-b border-brand-light-blue/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-xl tracking-wider">
              DYNO PETRO <span className="text-brand-accent">LLC</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button 
                onClick={onGetStartedClick}
                className="bg-brand-accent text-brand-blue font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors duration-300">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
