import React from 'react';

export interface InfoItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface CalculationResult {
  monthlyInterest: number;
  totalInterest: number;
  totalReturn: number;
  roi: number;
  yearlyBreakdown: {
    year: number;
    interest: number; // Interest for this specific year
    totalInterest: number; // Cumulative interest
    endValue: number;
  }[];
}