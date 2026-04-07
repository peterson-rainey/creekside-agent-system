/**
 * Statistical search term classifier.
 *
 * Handles all MATH-based classification: data sufficiency, binomial tests,
 * CPA heuristics, and Bayesian estimation. Does NOT handle business relevance
 * — that's the AI's job.
 *
 * CANNOT: determine if a term is relevant to a business (needs AI for that).
 */

export type StatisticalVerdict =
  | 'INSUFFICIENT_DATA'
  | 'PAUSE_CANDIDATE'
  | 'UNDERPERFORMING'
  | 'LIKELY_UNDERPERFORMING'
  | 'PERFORMING_OK'
  | 'GOOD';

export interface StatisticalAssessment {
  verdict: StatisticalVerdict;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
  details: {
    dataQuality: string;
    spendVsCpa?: string;
    bayesianEstimate?: number;
    credibleIntervalLow?: number;
    credibleIntervalHigh?: number;
  };
}

/**
 * Evaluate a search term using a layered statistical approach.
 *
 * Layer 1: Data sufficiency — do we even have enough data to judge?
 * Layer 2: CPA heuristic — zero-conversion terms that spent 2x+ target CPA
 * Layer 3: Binomial test — is the conversion rate statistically below baseline?
 * Layer 4: Bayesian estimate — soft probability for borderline cases
 */
export function evaluateSearchTerm(
  clicks: number,
  conversions: number,
  spend: number,
  impressions: number,
  baselineCvr: number,
  targetCpa: number,
): StatisticalAssessment {
  // ── Layer 1: Data sufficiency ───────────────────────────────────────
  // 5 clicks minimum — below that, there is no meaningful signal.
  // The CPA heuristic (Layer 2) handles the "spent enough money" check
  // independently, so we don't need a huge click threshold here.
  const minClicks = 5;

  if (clicks < minClicks) {
    const bayesian = bayesianEstimate(clicks, conversions, baselineCvr);
    return {
      verdict: 'INSUFFICIENT_DATA',
      confidence: 'low',
      reason: `Only ${clicks} click${clicks === 1 ? '' : 's'} — need at least ${minClicks} to assess performance`,
      details: {
        dataQuality: `${clicks}/${minClicks} clicks needed`,
        bayesianEstimate: bayesian.mean,
        credibleIntervalLow: bayesian.ciLow,
        credibleIntervalHigh: bayesian.ciHigh,
      },
    };
  }

  // ── Layer 2: CPA heuristic for zero-conversion terms ────────────────
  // Pause candidate if spent 1.5x the target/average CPA with zero conversions
  if (conversions === 0 && targetCpa > 0 && spend >= targetCpa * 1.5) {
    const multiplier = spend / targetCpa;
    return {
      verdict: 'PAUSE_CANDIDATE',
      confidence: multiplier >= 2.5 ? 'high' : 'medium',
      reason: `Spent $${spend.toFixed(2)} (${multiplier.toFixed(1)}x target CPA of $${targetCpa.toFixed(2)}) with zero conversions across ${clicks} clicks`,
      details: {
        dataQuality: multiplier >= 2.5 ? 'Strong signal' : 'Sufficient spend',
        spendVsCpa: `${multiplier.toFixed(1)}x CPA`,
      },
    };
  }

  // ── Layer 3: Binomial test ──────────────────────────────────────────
  // Is the observed conversion rate statistically below the baseline?
  const pValue = binomialPValue(clicks, conversions, baselineCvr);

  if (pValue < 0.05) {
    const actualCvr = clicks > 0 ? conversions / clicks : 0;
    return {
      verdict: 'UNDERPERFORMING',
      confidence: 'high',
      reason: `Converting at ${(actualCvr * 100).toFixed(1)}% vs ${(baselineCvr * 100).toFixed(1)}% baseline (p=${pValue.toFixed(3)})`,
      details: {
        dataQuality: 'Statistically significant',
      },
    };
  }

  // ── Layer 4: Bayesian soft estimate ─────────────────────────────────
  const bayesian = bayesianEstimate(clicks, conversions, baselineCvr);

  // If >75% probability that true CVR is below 40% of baseline
  // (40% is more practical than 50% — catches terms that are meaningfully worse,
  // not just slightly below average)
  if (bayesian.probBelowThreshold > 0.75) {
    return {
      verdict: 'LIKELY_UNDERPERFORMING',
      confidence: 'medium',
      reason: `Estimated CVR ${(bayesian.mean * 100).toFixed(1)}% — ${Math.round(bayesian.probBelowThreshold * 100)}% probability it's significantly below baseline`,
      details: {
        dataQuality: 'Moderate data',
        bayesianEstimate: bayesian.mean,
        credibleIntervalLow: bayesian.ciLow,
        credibleIntervalHigh: bayesian.ciHigh,
      },
    };
  }

  // ── Term is performing within expectations ──────────────────────────
  if (conversions > 0) {
    const actualCvr = conversions / clicks;
    return {
      verdict: 'GOOD',
      confidence: clicks > minClicks * 3 ? 'high' : 'medium',
      reason: `Converting at ${(actualCvr * 100).toFixed(1)}% with ${conversions} conversion${conversions === 1 ? '' : 's'}`,
      details: { dataQuality: clicks > minClicks * 3 ? 'Strong data' : 'Moderate data' },
    };
  }

  return {
    verdict: 'PERFORMING_OK',
    confidence: 'medium',
    reason: `No conversions yet but not enough evidence to flag — ${clicks} clicks at $${spend.toFixed(2)} spend`,
    details: { dataQuality: 'Moderate data' },
  };
}

/**
 * One-tailed binomial test: P(X <= observed | n, p)
 * Returns the p-value for the hypothesis that the true rate is below baseline.
 */
function binomialPValue(n: number, k: number, p: number): number {
  if (n === 0) return 1;
  if (p <= 0) return 1;
  if (p >= 1) return 0;

  // Cumulative binomial probability: P(X <= k) using the regularized incomplete beta function
  // For the binomial CDF: P(X <= k) = I(1-p, n-k, k+1) where I is the regularized beta
  // We use a direct summation which is accurate for n < 1000 (our 300 term cap)
  let cdf = 0;
  for (let i = 0; i <= k; i++) {
    cdf += binomialPmf(n, i, p);
  }
  return Math.min(1, Math.max(0, cdf));
}

function binomialPmf(n: number, k: number, p: number): number {
  if (k < 0 || k > n) return 0;
  // Use log to avoid overflow with large n
  const logPmf = logCombination(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p);
  return Math.exp(logPmf);
}

function logCombination(n: number, k: number): number {
  if (k === 0 || k === n) return 0;
  // Use Stirling or direct sum of logs
  let result = 0;
  for (let i = 0; i < k; i++) {
    result += Math.log(n - i) - Math.log(i + 1);
  }
  return result;
}

/**
 * Bayesian Beta-Binomial estimate of the true conversion rate.
 * Uses a weak prior (~5 pseudo-observations) so real data dominates quickly.
 */
function bayesianEstimate(clicks: number, conversions: number, baselineCvr: number) {
  // Weak prior equivalent to ~5 pseudo-observations — responsive to real data
  const priorStrength = 5;
  const priorAlpha = Math.max(0.5, baselineCvr * priorStrength);
  const priorBeta = Math.max(0.5, (1 - baselineCvr) * priorStrength);

  const postAlpha = priorAlpha + conversions;
  const postBeta = priorBeta + (clicks - conversions);

  const mean = postAlpha / (postAlpha + postBeta);

  const variance = (postAlpha * postBeta) / ((postAlpha + postBeta) ** 2 * (postAlpha + postBeta + 1));
  const sd = Math.sqrt(variance);
  const ciLow = Math.max(0, mean - 1.96 * sd);
  const ciHigh = Math.min(1, mean + 1.96 * sd);

  // P(true CVR < 40% of baseline) — catches terms that are meaningfully worse,
  // not just slightly below average. More practical than 50% for low-CVR accounts.
  const cutoff = baselineCvr * 0.4;
  const probBelowThreshold = betaCdf(cutoff, postAlpha, postBeta);

  return { mean, ciLow, ciHigh, probBelowThreshold };
}

/**
 * Approximate Beta CDF using the incomplete beta function.
 * Uses a continued fraction expansion that converges quickly.
 */
function betaCdf(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  // Use the regularized incomplete beta function
  // For small x, use the direct continued fraction
  // For large x, use the complement: I(x,a,b) = 1 - I(1-x,b,a)
  if (x > (a + 1) / (a + b + 2)) {
    return 1 - betaCdf(1 - x, b, a);
  }

  const lnBeta = logGamma(a) + logGamma(b) - logGamma(a + b);
  const prefix = Math.exp(a * Math.log(x) + b * Math.log(1 - x) - lnBeta) / a;

  // Lentz's continued fraction
  let f = 1, c = 1, d = 0;
  for (let m = 0; m <= 200; m++) {
    let numerator: number;
    if (m === 0) {
      numerator = 1;
    } else if (m % 2 === 0) {
      const k = m / 2;
      numerator = (k * (b - k) * x) / ((a + 2 * k - 1) * (a + 2 * k));
    } else {
      const k = (m - 1) / 2;
      numerator = -((a + k) * (a + b + k) * x) / ((a + 2 * k) * (a + 2 * k + 1));
    }

    d = 1 + numerator * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    d = 1 / d;

    c = 1 + numerator / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;

    f *= c * d;
    if (Math.abs(c * d - 1) < 1e-10) break;
  }

  return Math.min(1, Math.max(0, prefix * f));
}

function logGamma(x: number): number {
  // Lanczos approximation
  if (x <= 0) return 0;
  const g = 7;
  const coef = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];

  if (x < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }

  x -= 1;
  let a = coef[0];
  const t = x + g + 0.5;
  for (let i = 1; i < coef.length; i++) {
    a += coef[i] / (x + i);
  }

  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
