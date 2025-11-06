import React, { useState, useEffect } from 'react';
import { 
    ResponsiveContainer, 
    PieChart, Pie, Cell, Tooltip as RechartsTooltip, 
    BarChart, Bar, 
    LineChart, Line, 
    XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const CalculatorCard: React.FC<{title: string, subtitle: string, children: React.ReactNode, id?: string}> = ({ title, subtitle, children, id }) => (
    <div id={id} className="w-full rounded-lg bg-brand-dark-blue/80 backdrop-blur-sm p-6 shadow-2xl ring-1 ring-white/10 flex flex-col">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-brand-gray mb-4">{subtitle}</p>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const InputField: React.FC<{label: string, id: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, step?: string}> = ({ label, id, value, onChange, type = "number", step = "any" }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-brand-light">{label}</label>
        <div className="relative mt-1 rounded-md shadow-sm">
            <input type={type} name={id} id={id} value={value} onChange={onChange} step={step} className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-accent sm:text-sm sm:leading-6"/>
        </div>
    </div>
);

const OutputField: React.FC<{label: string, value: string, isBold?: boolean}> = ({ label, value, isBold = false }) => (
    <div className={`flex justify-between text-sm ${isBold ? 'text-white font-bold mt-2 pt-2 border-t border-white/10' : 'text-brand-gray'}`}>
        <span>{label}:</span>
        <span className={isBold ? 'text-brand-accent' : ''}>{value}</span>
    </div>
);


const AdvancedCalculators: React.FC = () => {
    const [inv, setInv] = useState(100000);
    const [taxRate, setTaxRate] = useState(37);

    const [wiOil, setWiOil] = useState(1);
    const [bopd, setBopd] = useState(50);
    const [oilPrice, setOilPrice] = useState(80);
    const [opexOil, setOpexOil] = useState(8000);
    const [severOil, setSeverOil] = useState(4.6);

    const [wiGas, setWiGas] = useState(1);
    const [mcfd, setMcfd] = useState(300);
    const [gasPrice, setGasPrice] = useState(3.50);
    const [opexGas, setOpexGas] = useState(8000);
    const [severGas, setSeverGas] = useState(4.6);

    const [years, setYears] = useState(5);
    
    // State for calculated results
    const [calc1Result, setCalc1Result] = useState({ idc: 0, depl: 0, totalDed: 0, saved: 0, net: 0 });
    const [calc2Result, setCalc2Result] = useState({ gross: 0, tax: 0, opexShare: 0, net: 0 });
    const [calc3Result, setCalc3Result] = useState({ gross: 0, tax: 0, opexShare: 0, net: 0 });
    const [calc4Result, setCalc4Result] = useState<{totalCF: number; profit: number; irr: number; payback: number; lineData: {month: number, profit: number}[]}>({ totalCF: 0, profit: 0, irr: 0, payback: 0, lineData: [] });
    
    useEffect(() => {
        // --- Calc 1 ---
        const rate = taxRate / 100;
        const idc = inv * 0.70;
        const depl = inv * 0.15;
        const totalDed = idc + depl;
        const saved = totalDed * rate;
        const net = inv - saved;
        setCalc1Result({ idc, depl, totalDed, saved, net });

        // --- Calc 2 (Oil) ---
        const wi = wiOil / 100;
        const sev = severOil / 100;
        const days = 30;
        const grossOil = wi * bopd * days * oilPrice;
        const taxOil = grossOil * sev;
        const opexShareOil = opexOil * wi;
        const netOil = grossOil - taxOil - opexShareOil;
        setCalc2Result({ gross: grossOil, tax: taxOil, opexShare: opexShareOil, net: netOil });

        // --- Calc 3 (Gas) ---
        const wiG = wiGas / 100;
        const sevG = severGas / 100;
        const grossGas = wiG * mcfd * days * gasPrice;
        const taxGas = grossGas * sevG;
        const opexShareGas = opexGas * wiG;
        const netGas = grossGas - taxGas - opexShareGas;
        setCalc3Result({ gross: grossGas, tax: taxGas, opexShare: opexShareGas, net: netGas });

        // --- Calc 4 (ROI) ---
        const netInv = net;
        const monthlyCF = netOil + netGas;
        let totalCF = 0, profit = -netInv, annualIRR = -100, paybackMonths = Infinity, lineData = [{ month: 0, profit: -netInv }];
        
        if (monthlyCF > 0) {
            const totalMonths = years * 12;
            totalCF = monthlyCF * totalMonths;
            profit = totalCF - netInv;
            paybackMonths = netInv / monthlyCF;
            annualIRR = years > 0 ? (profit / netInv / years) * 100 : 0;
            
            for (let m = 1; m <= totalMonths; m++) {
                lineData.push({ month: m, profit: -netInv + (monthlyCF * m) });
            }
        }
        setCalc4Result({ totalCF, profit, irr: annualIRR, payback: paybackMonths, lineData });
    }, [inv, taxRate, wiOil, bopd, oilPrice, opexOil, severOil, wiGas, mcfd, gasPrice, opexGas, severGas, years]);

    const pieData1 = [
        { name: 'Net Investment', value: calc1Result.net },
        { name: 'Tax Saved', value: calc1Result.saved },
    ];
    const COLORS1 = ['#415A77', '#D4AF37'];

    const barData2 = [{ name: 'Oil Revenue', Gross: calc2Result.gross, Net: calc2Result.net }];
    const barData3 = [{ name: 'Gas Revenue', Gross: calc3Result.gross, Net: calc3Result.net }];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg bg-brand-dark-blue/80 backdrop-blur-sm p-4 shadow-2xl ring-1 ring-white/10">
                    <p className="label text-brand-light font-semibold">{label || payload[0].name}</p>
                    {payload.map((entry: any) => (
                         <p key={`item-${entry.name}`} style={{ color: entry.color || entry.payload.fill }}>
                            {`${entry.name} : ${formatCurrency(entry.value)}`}
                         </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-brand-blue py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-brand-accent">Financial Modeling</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Drill Down Into the Details</p>
                    <p className="mt-6 text-lg leading-8 text-brand-gray">
                        These calculators are designed to help you model potential outcomes based on common industry metrics. Adjust the inputs to explore different scenarios.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
                    <CalculatorCard 
                        title="1 – Net Investment (Year-1 Tax Savings)"
                        subtitle="See how tax incentives reduce your initial capital at risk. This shows your effective investment after year-one deductions."
                    >
                        <InputField label="Total Investment ($)" id="inv" value={inv} onChange={e => setInv(Number(e.target.value))} />
                        <InputField label="Tax Bracket (%)" id="taxrate" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} />
                        <div className="mt-4 border-t border-white/10 pt-4 space-y-1">
                            <OutputField label="IDC (70%)" value={formatCurrency(calc1Result.idc)} />
                            <OutputField label="Depletion (15%)" value={formatCurrency(calc1Result.depl)} />
                            <OutputField label="Total Deduction" value={formatCurrency(calc1Result.totalDed)} />
                            <OutputField label="Tax Saved" value={formatCurrency(calc1Result.saved)} />
                            <OutputField label="Net Investment" value={formatCurrency(calc1Result.net)} isBold />
                        </div>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData1} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} labelLine={false} label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                        {pieData1.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} stroke={''} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CalculatorCard>

                    <CalculatorCard 
                        title="2 – Barrels to Cash (OIL)"
                        subtitle="Model potential monthly income from oil production. This breaks down revenue, taxes, and costs to estimate net cash flow."
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Working Interest (%)" id="wi" value={wiOil} onChange={e => setWiOil(Number(e.target.value))} step="0.01" />
                            <InputField label="Daily Oil (bbl/day)" id="bopd" value={bopd} onChange={e => setBopd(Number(e.target.value))} step="0.1" />
                            <InputField label="Oil Price ($/bbl)" id="oilprice" value={oilPrice} onChange={e => setOilPrice(Number(e.target.value))} step="0.5" />
                            <InputField label="Monthly OPEX ($/well)" id="opex" value={opexOil} onChange={e => setOpexOil(Number(e.target.value))} />
                            <InputField label="Severance Tax (%)" id="sever" value={severOil} onChange={e => setSeverOil(Number(e.target.value))} step="0.1" />
                        </div>
                        <div className="mt-4 border-t border-white/10 pt-4 space-y-1">
                            <OutputField label="Gross Monthly Revenue" value={formatCurrency(calc2Result.gross)} />
                            <OutputField label="Severance Tax" value={formatCurrency(calc2Result.tax)} />
                            <OutputField label="OPEX Share" value={formatCurrency(calc2Result.opexShare)} />
                            <OutputField label="Net Monthly Check" value={formatCurrency(calc2Result.net)} isBold />
                        </div>
                         <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData2} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                    <XAxis dataKey="name" stroke="#778DA9" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#778DA9" tickFormatter={(value) => `$${(Number(value)/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                                    <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.1)'}} />
                                    <Legend wrapperStyle={{fontSize: '12px'}} />
                                    <Bar dataKey="Gross" fill="#415A77" />
                                    <Bar dataKey="Net" fill="#D4AF37" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CalculatorCard>

                    <CalculatorCard 
                        title="3 – MCF to Cash (GAS)"
                        subtitle="Estimate potential monthly income from natural gas. This helps you understand the components of your net revenue."
                    >
                         <div className="grid grid-cols-2 gap-4">
                            <InputField label="Working Interest (%)" id="wiGas" value={wiGas} onChange={e => setWiGas(Number(e.target.value))} step="0.01" />
                            <InputField label="Daily Gas (MCF/day)" id="mcfd" value={mcfd} onChange={e => setMcfd(Number(e.target.value))} step="1" />
                            <InputField label="Gas Price ($/MCF)" id="gasprice" value={gasPrice} onChange={e => setGasPrice(Number(e.target.value))} step="0.05" />
                            <InputField label="Monthly OPEX ($/well)" id="opexGas" value={opexGas} onChange={e => setOpexGas(Number(e.target.value))} />
                            <InputField label="Severance Tax (%)" id="severGas" value={severGas} onChange={e => setSeverGas(Number(e.target.value))} step="0.1" />
                        </div>
                         <div className="mt-4 border-t border-white/10 pt-4 space-y-1">
                            <OutputField label="Gross Monthly Revenue" value={formatCurrency(calc3Result.gross)} />
                            <OutputField label="Severance Tax" value={formatCurrency(calc3Result.tax)} />
                            <OutputField label="OPEX Share" value={formatCurrency(calc3Result.opexShare)} />
                            <OutputField label="Net Monthly Check" value={formatCurrency(calc3Result.net)} isBold />
                        </div>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData3} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                    <XAxis dataKey="name" stroke="#778DA9" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#778DA9" tickFormatter={(value) => `$${(Number(value)/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                                    <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.1)'}} />
                                    <Legend wrapperStyle={{fontSize: '12px'}} />
                                    <Bar dataKey="Gross" fill="#415A77" />
                                    <Bar dataKey="Net" fill="#D4AF37" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CalculatorCard>

                    <CalculatorCard 
                        title="4 – Rate of Return"
                        subtitle="Project your overall return and payback period. This combines tax savings and revenue to estimate total profit and IRR."
                    >
                        <InputField label="Years to run" id="years" value={years} onChange={e => setYears(Number(e.target.value))} />
                        <div className="mt-4 border-t border-white/10 pt-4 space-y-1">
                            <OutputField label="Net Investment" value={formatCurrency(calc1Result.net)} />
                            <OutputField label="Total Monthly Check" value={formatCurrency(calc2Result.net + calc3Result.net)} />
                            <OutputField label="Total Cash Flow" value={formatCurrency(calc4Result.totalCF)} />
                            <OutputField label="Total Profit" value={formatCurrency(calc4Result.profit)} />
                            <OutputField label="Annual IRR" value={`${isFinite(calc4Result.irr) ? calc4Result.irr.toFixed(0) : '0'}%`} isBold />
                            <OutputField label="Payback (months)" value={isFinite(calc4Result.payback) ? calc4Result.payback.toFixed(1) : 'N/A'} isBold />
                        </div>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={calc4Result.lineData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1}/>
                                    <XAxis dataKey="month" stroke="#778DA9" tick={{ fontSize: 10 }} label={{ value: 'Months', position: 'insideBottom', offset: -5, fill: '#778DA9', fontSize: 12 }} />
                                    <YAxis stroke="#778DA9" tickFormatter={(value) => `$${(Number(value)/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{fontSize: '12px'}} />
                                    <Line type="monotone" dataKey="profit" name="Cumulative Profit" stroke="#D4AF37" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CalculatorCard>
                </div>
                <p className="mt-8 text-center text-xs text-brand-gray/70">*These calculators are for illustration purposes only. The figures are hypothetical and not a guarantee of future performance. Consult your CPA or financial advisor.</p>
            </div>
        </div>
    )
}

export default AdvancedCalculators;