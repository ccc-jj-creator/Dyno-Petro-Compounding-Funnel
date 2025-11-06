
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import InvestmentDetails from './components/InvestmentDetails';
import Footer from './components/Footer';
import TrackRecord from './components/TrackRecord';
import AdvancedCalculators from './components/AdvancedCalculators';
import VideoSection from './components/VideoSection';
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
        <VideoSection />
        <TrackRecord />
        <AdvancedCalculators />
        <InfoSection 
          title="Our Proven Advantage: How We Deliver Consistent High Yields" 
          items={advantageItems} 
        />
        <InfoSection 
          title="Protecting Your Capital: Our Comprehensive Risk Mitigation Strategy" 
          items={riskMitigationItems} 
          bgColor="bg-brand-dark-blue"
        />
        <InvestmentDetails />
      </main>
      <Footer />
    </div>
  );
};

export default App;