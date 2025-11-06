
import React from 'react';

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div>
        <dt className="text-4xl font-bold tracking-tight text-brand-accent">{value}</dt>
        <dd className="mt-1 text-base leading-7 text-brand-gray">{label}</dd>
    </div>
);


const TrackRecord: React.FC = () => {
    return (
        <div className="bg-brand-blue py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-brand-accent">Our Journey</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Forged in the Field: Our Proven Track Record</p>
                        <p className="mt-6 text-lg leading-8 text-brand-gray">
                           Our story isn't just about drilling for oil; it's about building a smarter, more resilient investment model. Founded by Brad Young in 2017 after experiencing the pitfalls of oil & gas investing firsthand, Dyno Petro was built on a foundation of transparency, meticulous due diligence, and a commitment to protecting our partners' capital.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold leading-8 text-white">Rapid, Sustainable Growth</h3>
                            <p className="mt-4 text-base leading-7 text-brand-gray">
                                We started small with just two wells. Within six months, we were operating eight. Within a year and a half, over a hundred. This wasn't luck; it was the result of a disciplined strategy, scaling from East Texas to prolific fields in Louisiana and Mississippi.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold leading-8 text-white">Due Diligence is Our Bedrock</h3>
                            <p className="mt-4 text-base leading-7 text-brand-gray">
                                We don't chase risky "wildcat" wells. Our "baseball club"—a team of five geologists and two petrophysicists—rigorously vets every opportunity, looking for reasons *not* to invest. This exhaustive, unanimous approval process is why our proprietary model boasts a remarkable success rate.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold leading-8 text-white">Resilience Through Crisis</h3>
                            <p className="mt-4 text-base leading-7 text-brand-gray">
                                When oil prices crashed during the COVID pandemic, many operators went bankrupt. We navigated the storm by planning for the worst. We made tough operational decisions, survived, and emerged stronger, proving the resilience of our model and our commitment to long-term success.
                            </p>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-white/10 pt-16">
                         <dl className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
                            <Stat value="100+" label="Wells Operated in 18 Months" />
                            <Stat value="97%" label="Success Rate with Our Tech" />
                            <Stat value="7+" label="Years of Operational Experience" />
                            <Stat value="3" label="States with Active Operations" />
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackRecord;
