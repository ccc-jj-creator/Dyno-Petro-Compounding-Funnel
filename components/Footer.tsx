
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark-blue border-t border-brand-light-blue/20">
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-6 lg:px-8">
        <p className="text-center text-xs leading-5 text-brand-gray">
          &copy; {new Date().getFullYear()} Dyno Petro LLC. All rights reserved.
        </p>
        <div className="mt-4 text-center text-xs leading-5 text-brand-gray">
          <span className="cursor-pointer hover:text-white">Privacy Policy</span>
          <span className="mx-2">|</span>
          <span className="cursor-pointer hover:text-white">Terms of Service</span>
        </div>
        <p className="mt-8 text-center text-xs leading-5 text-brand-gray/50">
          Disclaimer: This information is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Any such offer will be made only by means of a confidential private placement memorandum. Past performance is not indicative of future results.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
