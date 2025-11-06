
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import InvestmentDetails from './components/InvestmentDetails';
import Footer from './components/Footer';
import TrackRecord from './components/TrackRecord';
import AdvancedCalculators from './components/AdvancedCalculators';
import { advantageItems, riskMitigationItems } from './constants';

const App: React.FC = () => {
  const scrollToDetails = () => {
    document.getElementById('investment-details')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-blue font-sans">
      <Header onGetStartedClick={scrollToDetails} />
      <main>
        <Hero />

        <div className="py-16 sm:py-24 bg-brand-dark-blue">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Tired of Volatile Markets? Discover the Stability of Energy Investments.
              </h2>
              <p className="mt-4 text-lg leading-8 text-brand-gray">
                We democratize significant returns, making them accessible to everyone, not just institutional investors. Our proprietary turnkey acquisition model focuses on Proved Undeveloped (PUD) drilling locations in established producing fields, avoiding risky wildcatting ventures.
              </p>
            </div>
          </div>
        </div>
        
        <InfoSection 
          title="Our Proven Advantage: How We Deliver Consistent High Yields" 
          items={advantageItems} 
        />

        <InfoSection 
          title="Protecting Your Capital: Our Comprehensive Risk Mitigation Strategy" 
          items={riskMitigationItems} 
          bgColor="bg-brand-dark-blue"
        />

        <TrackRecord />

        <AdvancedCalculators />

        <InvestmentDetails />

      </main>
      <Footer />
    </div>
  );
};

export default App;
