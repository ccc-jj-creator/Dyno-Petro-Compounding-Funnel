import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <div className="bg-brand-dark-blue py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-accent">A Message From Our Founder</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Building Trust Through Transparency</p>
            <p className="mt-6 text-lg leading-8 text-brand-gray">
                Hear directly from Brad Young, the founder of Dyno Petro, as he explains the core principles that drive our investment strategy and our commitment to our partners.
            </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative p-4 sm:p-6">
              <svg
                className="absolute top-0 left-0 w-full h-full text-brand-gray/70"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 5 8 C 25 2, 75 12, 95 8 C 102 30, 92 70, 95 95 C 70 101, 30 96, 5 92 C -2 70, 8 30, 5 8 Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="relative rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/10" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/MzdpzfozF34" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
