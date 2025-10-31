
import React from 'react';

const InvestmentDetails: React.FC = () => {
    const details = [
        { label: 'Minimum Investment', value: '$25,000' },
        { label: 'Target APY', value: '12-15%' },
        { label: 'Distributions', value: 'Monthly' },
        { label: 'Investment Term', value: '2 Years' },
    ];

    return (
        <div id="investment-details" className="bg-brand-dark-blue py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Simple & Accessible Investment</h2>
                    <p className="mt-6 text-lg leading-8 text-brand-gray">
                        Getting started is straightforward. Here are the key details of our investment opportunity.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200/20 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                        <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2">
                           {details.map(detail => (
                               <div key={detail.label} className="flex gap-x-3">
                                    <svg className="h-7 w-5 flex-none text-brand-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-brand-gray">{detail.label}:</span> <strong className="text-white">{detail.value}</strong>
                               </div>
                           ))}
                        </div>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                        <div className="rounded-2xl bg-brand-blue py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-brand-gray">Ready to Invest? Speak with an Energy Specialist</p>
                                <div className="mt-6 flex flex-col items-center gap-y-4">
                                     <button className="block w-full rounded-md bg-brand-accent px-3 py-2 text-center text-sm font-semibold text-brand-blue shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent">Download Investment Overview</button>
                                     <button className="block w-full rounded-md bg-brand-light/10 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-light/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contact Us Today</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentDetails;
