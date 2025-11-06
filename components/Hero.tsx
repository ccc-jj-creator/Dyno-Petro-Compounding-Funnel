
import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculationResult } from '../types';

const MIN_INVESTMENT = 25000;
const MAX_INVESTMENT = 1000000;
const DEFAULT_INVESTMENT = 25000;
const DEFAULT_RATE = 15;
const DEFAULT_TERM = 20;


const ValueProp: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center">
    <svg className="h-6 w-6 flex-shrink-0 text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
    <span className="ml-3 text-brand-light">{children}</span>
  </div>
);

const Hero: React.FC = () => {
    const [investment, setInvestment] = useState<number>(DEFAULT_INVESTMENT);
    const [annualRate, setAnnualRate] = useState<number>(DEFAULT_RATE);
    const [term, setTerm] = useState<number>(DEFAULT_TERM);
    const [reinvest, setReinvest] = useState<boolean>(true);
    const [result, setResult] = useState<CalculationResult | null>(null);

    const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
        setInvestment(value);
    };
    
    useEffect(() => {
        const clampedInvestment = Math.max(MIN_INVESTMENT, Math.min(investment, MAX_INVESTMENT));
        const rateDecimal = annualRate / 100;

        let yearlyBreakdown: CalculationResult['yearlyBreakdown'] = [];
        let cumulativeInterest = 0;

        if (reinvest) {
            // Compounding annually
            let currentPrincipal = clampedInvestment;
            for (let i = 1; i <= term; i++) {
                const interestForYear = currentPrincipal * rateDecimal;
                currentPrincipal += interestForYear;
                cumulativeInterest += interestForYear;
                yearlyBreakdown.push({
                    year: i,
                    interest: interestForYear,
                    totalInterest: cumulativeInterest,
                    endValue: currentPrincipal,
                });
            }
        } else {
            // Simple interest
            for (let i = 1; i <= term; i++) {
                const interestForYear = clampedInvestment * rateDecimal;
                cumulativeInterest += interestForYear;
                yearlyBreakdown.push({
                    year: i,
                    interest: interestForYear,
                    totalInterest: cumulativeInterest,
                    endValue: clampedInvestment + cumulativeInterest,
                });
            }
        }
        
        const totalReturn = clampedInvestment + cumulativeInterest;
        const roi = (cumulativeInterest / clampedInvestment) * 100;
        const monthlyInterest = (clampedInvestment * rateDecimal) / 12;

        setResult({
            monthlyInterest,
            totalInterest: cumulativeInterest,
            totalReturn,
            roi,
            yearlyBreakdown,
        });
    }, [investment, annualRate, term, reinvest]);

    const chartData = useMemo(() => {
        if (!result) return [];
        return result.yearlyBreakdown.map(item => ({
            name: `Year ${item.year}`,
            'Initial Investment': investment,
            'Interest Earned': item.totalInterest,
        }));
    }, [result, investment]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const totalValue = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
            return (
                <div className="rounded-lg bg-brand-dark-blue/80 backdrop-blur-sm p-4 shadow-2xl ring-1 ring-white/10">
                    <p className="label text-brand-light">{`${label}`}</p>
                    <p style={{ color: payload[1]?.color || '#D4AF37' }}>{`Interest Earned : ${formatCurrency(payload[1]?.value)}`}</p>
                    <p style={{ color: payload[0]?.color || '#415A77' }}>{`Initial Investment : ${formatCurrency(payload[0]?.value)}`}</p>
                    <p className="font-bold text-white mt-2 border-t border-white/10 pt-2">{`Total Value : ${formatCurrency(totalValue)}`}</p>
                </div>
            );
        }
        return null;
    };

  return (
    <div className="bg-brand-dark-blue">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Project Your Long-Term Growth
              </h1>
              <p className="mt-6 text-lg leading-8 text-brand-gray">
                Use the interactive calculator to see how our 12-15% APY through a proven, low-risk acquisition model can help you achieve your financial goals.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 text-base font-semibold leading-7 sm:grid-cols-2">
                <ValueProp>12-15% APY</ValueProp>
                <ValueProp>Monthly Income</ValueProp>
                <ValueProp>Minimum Investment: $25,000</ValueProp>
                <ValueProp>Low-Risk Strategy</ValueProp>
              </div>
              <p className="mt-8 text-sm text-brand-gray">Trusted by 100+ investors over 7 years.</p>
            </div>
            
            <div className="w-full rounded-lg bg-brand-dark-blue/80 backdrop-blur-sm p-8 shadow-2xl ring-1 ring-white/10">
                <h3 className="text-xl font-semibold text-white text-center mb-6">Long-Term Growth Calculator</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="investment" className="block text-sm font-medium leading-6 text-brand-light">Initial Investment ($)</label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input type="text" name="investment" id="investment" value={investment.toLocaleString()} onChange={handleInvestmentChange} className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-accent sm:text-sm sm:leading-6"/>
                        </div>
                        <p className="mt-1 text-xs text-brand-gray">Min: ${MIN_INVESTMENT.toLocaleString()}, Max: ${MAX_INVESTMENT.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="rate" className="block text-sm font-medium leading-6 text-brand-light">Annual Rate (%)</label>
                            <select id="rate" name="rate" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-2 pl-3 pr-10 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-accent sm:text-sm sm:leading-6">
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="term" className="block text-sm font-medium leading-6 text-brand-light">Term (Years)</label>
                            <select id="term" name="term" value={term} onChange={(e) => setTerm(Number(e.target.value))} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-2 pl-3 pr-10 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-accent sm:text-sm sm:leading-6">
                                <option>2</option>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 rounded-md bg-white/5 p-3">
                        <span className="flex flex-grow flex-col">
                            <span className="text-sm font-medium leading-6 text-brand-light">Hypothetical Reinvestment</span>
                            <span className="text-xs text-brand-gray">Compound returns annually</span>
                        </span>
                        <button
                            type="button"
                            className={`${reinvest ? 'bg-brand-accent' : 'bg-brand-gray/50'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-dark-blue`}
                            role="switch"
                            aria-checked={reinvest}
                            onClick={() => setReinvest(!reinvest)}
                        >
                            <span
                                aria-hidden="true"
                                className={`${reinvest ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                        </button>
                    </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                    <div className="grid grid-cols-2 gap-4 rounded-lg bg-brand-blue/50 p-4">
                        <div className="text-center">
                            <p className="text-xs sm:text-sm text-brand-gray">1st Year Monthly Interest</p>
                            <p className="text-lg sm:text-xl font-bold text-brand-accent">{formatCurrency(result?.monthlyInterest ?? 0)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs sm:text-sm text-brand-gray">Total Interest Earned</p>
                            <p className="text-lg sm:text-xl font-bold text-brand-accent">{formatCurrency(result?.totalInterest ?? 0)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs sm:text-sm text-brand-gray">Total Return</p>
                            <p className="text-lg sm:text-xl font-bold text-white">{formatCurrency(result?.totalReturn ?? 0)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs sm:text-sm text-brand-gray">Overall ROI</p>
                            <p className="text-lg sm:text-xl font-bold text-white">{result?.roi.toFixed(2) ?? 0}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {result && (
             <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
                 <div className="rounded-lg bg-brand-dark-blue/80 backdrop-blur-sm p-8 shadow-2xl ring-1 ring-white/10">
                     <h3 className="text-xl font-semibold text-white text-center mb-6">Investment Growth Over Time</h3>
                     <div className="h-96 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.1}/>
                                    </linearGradient>
                                    <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#415A77" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#415A77" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1}/>
                                <XAxis dataKey="name" stroke="#778DA9" tick={{ fontSize: 12 }} />
                                <YAxis stroke="#778DA9" tickFormatter={(value) => `$${(Number(value)/1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{color: '#E0E1DD', paddingTop: '10px'}}/>
                                <Area type="monotone" dataKey="Initial Investment" stackId="1" stroke="#415A77" strokeWidth={2} fill="url(#colorPrincipal)" />
                                <Area type="monotone" dataKey="Interest Earned" stackId="1" stroke="#D4AF37" strokeWidth={2} fill="url(#colorInterest)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Hero;
