import React, { useState, useEffect, useMemo } from 'react';
import { 
    ResponsiveContainer, 
    LineChart, Line, 
    XAxis, YAxis, CartesianGrid, Legend, Tooltip as RechartsTooltip
} from 'recharts';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const Slider: React.FC<{label: string, id: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min: number, max: number, step: number, displayValue: string}> = ({ label, id, value, onChange, min, max, step, displayValue }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-brand-light flex justify-between">
            <span>{label}</span>
            <span className="font-bold text-white">{displayValue}</span>
        </label>
        <input
            type="range"
            id={id}
            name={id}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-brand-light-blue/20 rounded-lg appearance-none cursor-pointer accent-brand-accent mt-2"
        />
    </div>
);

const ResultCard: React.FC<{title: string, value: string, subtitle: string}> = ({ title, value, subtitle }) => (
    <div className="bg-brand-blue/50 p-4 rounded-lg text-center">
        <p className="text-sm text-brand-gray">{title}</p>
        <p className="text-2xl font-bold text-brand-accent my-1">{value}</p>
        <p className="text-xs text-brand-gray/80">{subtitle}</p>
    </div>
);


const AdvancedCalculators: React.FC = () => {
    const [investment, setInvestment] = useState(100000);
    const [scenario, setScenario] = useState(1); // 0: Conservative, 1: Moderate, 2: Optimistic
    const [term, setTerm] = useState(5);

    const [results, setResults] = useState<{
        taxSavings: number;
        monthlyIncome: number;
        totalProfit: number;
        lineData: { month: number; profit: number; }[];
    }>({ taxSavings: 0, monthlyIncome: 0, totalProfit: 0, lineData: [] });
    
    const marketScenarios = useMemo(() => [
        { name: 'Conservative', oilPrice: 70, gasPrice: 2.50 },
        { name: 'Moderate', oilPrice: 80, gasPrice: 3.50 },
        { name: 'Optimistic', oilPrice: 95, gasPrice: 4.50 },
    ], []);

    useEffect(() => {
        // --- Constants representing a typical Dyno Petro Project ---
        const taxRate = 0.37;
        const idcPercentage = 0.70;
        const depletionPercentage = 0.15;
        const wi = 0.01; // Assume 1% working interest for this investment size for modeling
        const bopd = 50;
        const mcfd = 300;
        const opex = 8000;
        const severanceTax = 0.046;
        const daysInMonth = 30.4;
        
        // --- Calculations ---
        const selectedScenario = marketScenarios[scenario];

        // 1. Tax Savings
        const idc = investment * idcPercentage;
        const depletion = investment * depletionPercentage;
        const totalDeduction = idc + depletion;
        const taxSavings = totalDeduction * taxRate;
        const netInvestment = investment - taxSavings;

        // 2. Monthly Income
        const grossOil = wi * bopd * daysInMonth * selectedScenario.oilPrice;
        const grossGas = wi * mcfd * daysInMonth * selectedScenario.gasPrice;
        const grossTotal = grossOil + grossGas;
        const totalTax = grossTotal * severanceTax;
        const opexShare = opex * wi;
        const monthlyIncome = grossTotal - totalTax - opexShare;

        // 3. Total Profit & Chart Data
        const totalMonths = term * 12;
        const totalCashFlow = monthlyIncome * totalMonths;
        const totalProfit = totalCashFlow - netInvestment;
        
        const lineData = [];
        for (let m = 0; m <= totalMonths; m++) {
            lineData.push({ month: m, profit: -netInvestment + (monthlyIncome * m) });
        }

        setResults({ taxSavings, monthlyIncome, totalProfit, lineData });

    }, [investment, scenario, term, marketScenarios]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg bg-brand-dark-blue/80 backdrop-blur-sm p-4 shadow-2xl ring-1 ring-white/10">
                    <p className="label text-brand-light font-semibold">{`Month ${payload[0].payload.month}`}</p>
                    <p style={{ color: '#D4AF37' }}>
                        {`Cumulative Profit : ${formatCurrency(payload[0].value)}`}
                    </p>
                </div>
            );
        }
        return null;
    };
    
    const scenarioOptions = [
      { name: 'Conservative', value: 0 },
      { name: 'Moderate', value: 1 },
      { name: 'Optimistic', value: 2 },
    ];

    const termOptions = [
      { name: '2 Years', value: 2 },
      { name: '5 Years', value: 5 },
      { name: '10 Years', value: 10 },
      { name: '20 Years', value: 20 },
    ];

    const ToggleButton: React.FC<{options: {name: string, value: number}[], selectedValue: number, onSelect: (value: number) => void, label: string}> = ({ options, selectedValue, onSelect, label }) => (
      <div>
        <label className="block text-sm font-medium leading-6 text-brand-light">{label}</label>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-lg bg-brand-blue/50 p-1">
          {options.map((option) => (
            <button
              key={option.name}
              onClick={() => onSelect(option.value)}
              className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                selectedValue === option.value
                  ? 'bg-brand-accent text-brand-blue shadow'
                  : 'bg-transparent text-brand-gray hover:bg-brand-light-blue/20'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    );

    return (
        <div className="bg-brand-blue py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-brand-accent">Investment Modeling</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Explore Your Potential Returns</p>
                    <p className="mt-6 text-lg leading-8 text-brand-gray">
                        Use our interactive modeler to see how tax advantages and monthly cash flow can fuel your long-term growth. Adjust the sliders to fit your financial goals.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-5xl rounded-lg bg-brand-dark-blue/80 p-8 shadow-2xl ring-1 ring-white/10">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                        {/* INPUTS */}
                        <div className="space-y-8">
                            <Slider 
                                label="Initial Investment"
                                id="investment"
                                value={investment}
                                onChange={e => setInvestment(Number(e.target.value))}
                                min={25000}
                                max={1000000}
                                step={5000}
                                displayValue={formatCurrency(investment)}
                            />
                            <ToggleButton
                              label="Market Scenario"
                              options={scenarioOptions}
                              selectedValue={scenario}
                              onSelect={setScenario}
                            />
                            <ToggleButton
                              label="Investment Term"
                              options={termOptions}
                              selectedValue={term}
                              onSelect={setTerm}
                            />
                        </div>

                        {/* CHART */}
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={results.lineData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1}/>
                                    <XAxis dataKey="month" stroke="#778DA9" tick={{ fontSize: 10 }} label={{ value: 'Months', position: 'insideBottom', offset: -5, fill: '#778DA9', fontSize: 12 }} />
                                    <YAxis stroke="#778DA9" tickFormatter={(value) => `$${(Number(value)/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="profit" name="Cumulative Profit" stroke="#D4AF37" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    {/* RESULTS */}
                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                       <ResultCard title="Year 1 Tax Savings" value={formatCurrency(results.taxSavings)} subtitle="Immediate capital efficiency" />
                       <ResultCard title="Projected Avg. Monthly Income" value={formatCurrency(results.monthlyIncome)} subtitle="Consistent cash flow potential" />
                       <ResultCard title="Total Projected Profit" value={formatCurrency(results.totalProfit)} subtitle={`Over ${term} years`} />
                    </div>

                    {/* CALL TO ACTION */}
                    <div className="mt-12 text-center border-t border-white/10 pt-8">
                        <h3 className="text-xl font-semibold text-white">Ready to Make This a Reality?</h3>
                        <p className="mt-2 text-sm text-brand-gray">Your personalized projection is just the first step. Let's discuss how we can put your capital to work.</p>
                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <button className="rounded-md bg-brand-accent px-4 py-2.5 text-sm font-semibold text-brand-blue shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent">
                                Schedule a Consultation
                            </button>
                            <button className="text-sm font-semibold leading-6 text-white hover:text-brand-accent">
                                Download Prospectus <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>

                </div>

                <p className="mt-8 text-center text-xs text-brand-gray/70">
                    Disclaimer: This modeler provides hypothetical projections for informational purposes only. These figures are based on internal models and assumptions which may include data from previous returns. Past performance is not indicative of future results, and these projections do not constitute a guarantee. This is not financial advice. Please consult with your CPA or a qualified financial advisor to discuss your specific situation.
                </p>
            </div>
        </div>
    )
}

export default AdvancedCalculators;