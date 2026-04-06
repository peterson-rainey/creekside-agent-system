import type { Industry, IndustryBenchmark, RoasAssumptions } from './types';

export const INDUSTRY_BENCHMARKS: Record<Industry, IndustryBenchmark> = {
  dental_medical: {
    industry: 'dental_medical',
    label: 'Dental & Medical',
    cpcRange: [2.5, 8.0],
    cpaRange: [10, 50],
    benchmarkRoas: 5.0,
    riskLevel: 'low',
    recommendedMinBudget: 1500,
  },
  home_services: {
    industry: 'home_services',
    label: 'Home Services',
    cpcRange: [3, 12],
    cpaRange: [50, 160],
    benchmarkRoas: 3.5,
    riskLevel: 'medium',
    recommendedMinBudget: 2000,
  },
  ecommerce: {
    industry: 'ecommerce',
    label: 'E-Commerce',
    cpcRange: [0.5, 3],
    cpaRange: [15, 60],
    benchmarkRoas: 4.0,
    riskLevel: 'medium',
    recommendedMinBudget: 1000,
  },
  legal: {
    industry: 'legal',
    label: 'Legal',
    cpcRange: [5, 25],
    cpaRange: [100, 500],
    benchmarkRoas: 3.0,
    riskLevel: 'medium',
    recommendedMinBudget: 3000,
  },
  mortgage_financial: {
    industry: 'mortgage_financial',
    label: 'Mortgage & Financial',
    cpcRange: [3, 15],
    cpaRange: [38, 82],
    benchmarkRoas: 2.5,
    riskLevel: 'high',
    recommendedMinBudget: 5000,
  },
  med_spa: {
    industry: 'med_spa',
    label: 'Med Spa',
    cpcRange: [2, 8],
    cpaRange: [50, 132],
    benchmarkRoas: 3.5,
    riskLevel: 'medium',
    recommendedMinBudget: 2000,
  },
  saas_b2b: {
    industry: 'saas_b2b',
    label: 'SaaS / B2B',
    cpcRange: [2, 10],
    cpaRange: [50, 200],
    benchmarkRoas: 1.75,
    riskLevel: 'high',
    recommendedMinBudget: 3000,
  },
  meal_prep_food: {
    industry: 'meal_prep_food',
    label: 'Meal Prep & Food',
    cpcRange: [0.5, 3],
    cpaRange: [10, 40],
    benchmarkRoas: 13.0,
    riskLevel: 'low',
    recommendedMinBudget: 1000,
  },
  other: {
    industry: 'other',
    label: 'Other',
    cpcRange: [1, 10],
    cpaRange: [20, 100],
    benchmarkRoas: 3.0,
    riskLevel: 'medium',
    recommendedMinBudget: 2000,
  },
};

export function getDefaultRoasAssumptions(industry: Industry): RoasAssumptions {
  const bench = INDUSTRY_BENCHMARKS[industry].benchmarkRoas;
  return {
    low: Math.round(bench * 0.6 * 10) / 10,
    bench,
    high: Math.round(bench * 1.5 * 10) / 10,
  };
}
