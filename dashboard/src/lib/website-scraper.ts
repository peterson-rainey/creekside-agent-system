import * as cheerio from 'cheerio';

export interface BusinessContext {
  businessName: string;
  description: string;
  keywords: string[];
  services: string[];
  location: string | null;
  industry: string | null;
  rawText: string;
}

const INDUSTRY_SIGNALS: Record<string, string[]> = {
  dental: ['dentist', 'dental', 'orthodont', 'teeth', 'oral', 'implant', 'crown', 'veneer', 'invisalign', 'cleaning', 'whitening'],
  legal: ['attorney', 'lawyer', 'law firm', 'legal', 'litigation', 'injury', 'defense', 'family law', 'estate planning'],
  hvac: ['hvac', 'heating', 'cooling', 'air conditioning', 'furnace', 'ac repair', 'duct', 'thermostat'],
  plumbing: ['plumber', 'plumbing', 'drain', 'pipe', 'water heater', 'sewer', 'leak', 'faucet'],
  roofing: ['roof', 'roofing', 'shingle', 'gutter', 'siding', 'flashing', 'leak repair'],
  'real estate': ['realtor', 'real estate', 'homes for sale', 'listing', 'buyer', 'seller', 'mortgage', 'property'],
  medical: ['doctor', 'physician', 'clinic', 'medical', 'healthcare', 'patient', 'treatment', 'diagnosis'],
  automotive: ['auto', 'car', 'vehicle', 'mechanic', 'oil change', 'brake', 'tire', 'transmission', 'body shop'],
  'home services': ['remodel', 'renovation', 'contractor', 'handyman', 'painting', 'flooring', 'kitchen', 'bathroom'],
  restaurant: ['restaurant', 'menu', 'dining', 'catering', 'reservation', 'chef', 'cuisine', 'delivery'],
  ecommerce: ['shop', 'buy', 'cart', 'checkout', 'shipping', 'product', 'order', 'price', 'sale'],
  'digital marketing': ['seo', 'ppc', 'marketing', 'social media', 'advertising', 'campaign', 'analytics', 'conversion'],
  fitness: ['gym', 'fitness', 'personal training', 'workout', 'yoga', 'pilates', 'crossfit', 'membership'],
  insurance: ['insurance', 'policy', 'coverage', 'premium', 'claim', 'deductible', 'quote', 'underwriting'],
  accounting: ['accountant', 'cpa', 'bookkeeping', 'tax', 'payroll', 'audit', 'financial statement'],
};

async function fetchPage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    let currentUrl = url;
    let redirects = 0;

    // Manual redirect following to validate each hop against SSRF
    while (redirects < 5) {
      const res = await fetch(currentUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CreeksideAnalyzer/1.0)',
        },
        redirect: 'manual',
      });

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location');
        if (!location) break;
        // Resolve relative redirects
        currentUrl = new URL(location, currentUrl).href;
        try {
          validateUrl(currentUrl);
        } catch {
          return null; // Redirect target is internal/private — block silently
        }
        redirects++;
        continue;
      }

      clearTimeout(timeout);
      if (!res.ok) return null;
      return await res.text();
    }

    clearTimeout(timeout);
    return null; // Too many redirects
  } catch {
    return null;
  }
}

function extractText($: cheerio.CheerioAPI): string {
  // Remove script, style, nav, footer, header elements
  $('script, style, noscript, iframe').remove();

  const bodyText = $('body').text()
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 8000);

  return bodyText;
}

function detectIndustry(text: string): string | null {
  const lower = text.toLowerCase();
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [industry, signals] of Object.entries(INDUSTRY_SIGNALS)) {
    let score = 0;
    for (const signal of signals) {
      const regex = new RegExp(signal, 'gi');
      const matches = lower.match(regex);
      if (matches) score += matches.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = industry;
    }
  }

  return bestScore >= 3 ? bestMatch : null;
}

function extractKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  const words = lower.match(/\b[a-z]{3,}\b/g) || [];
  const freq: Record<string, number> = {};

  const stopWords = new Set([
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
    'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'from',
    'this', 'that', 'with', 'they', 'will', 'each', 'make', 'like',
    'more', 'when', 'very', 'what', 'about', 'which', 'their', 'would',
    'there', 'these', 'other', 'into', 'some', 'could', 'them', 'than',
    'its', 'over', 'also', 'back', 'after', 'your', 'just', 'being',
    'any', 'were', 'here', 'should', 'how', 'where', 'who', 'why',
    'does', 'most', 'only', 'through', 'while', 'before', 'between',
    'under', 'such', 'then', 'because', 'those', 'first', 'well',
    'contact', 'click', 'home', 'page', 'site', 'website', 'menu',
    'learn', 'read', 'call', 'today', 'get', 'see', 'new', 'best',
    'right', 'privacy', 'policy', 'terms', 'copyright', 'reserved',
  ]);

  for (const word of words) {
    if (!stopWords.has(word)) {
      freq[word] = (freq[word] || 0) + 1;
    }
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([word]) => word);
}

function extractServices($: cheerio.CheerioAPI): string[] {
  const services: string[] = [];

  // Extract from headings
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 2 && text.length < 100) {
      services.push(text.toLowerCase());
    }
  });

  // Extract from nav links
  $('nav a, .nav a, .menu a').each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 2 && text.length < 50) {
      services.push(text.toLowerCase());
    }
  });

  // Deduplicate
  return [...new Set(services)];
}

function extractLocation(text: string): string | null {
  // Common US state patterns
  const statePattern = /\b(?:AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\b/;
  const match = text.match(statePattern);
  return match ? match[0] : null;
}

function validateUrl(url: string): void {
  const parsed = new URL(url);
  const hostname = parsed.hostname.toLowerCase();

  // Block non-HTTP protocols
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only HTTP and HTTPS URLs are supported');
  }

  // Block private/internal IPs and metadata endpoints
  const blocked = [
    'localhost', '127.0.0.1', '0.0.0.0', '::1',
    '169.254.169.254', 'metadata.google.internal',
  ];
  if (blocked.includes(hostname)) {
    throw new Error('Internal URLs are not allowed');
  }

  // Block IPv6 private ranges and IPv4-mapped addresses
  const cleanHost = hostname.replace(/^\[|\]$/g, '');
  if (cleanHost.startsWith('fc') || cleanHost.startsWith('fd') ||       // unique local (fc00::/7)
      cleanHost.startsWith('fe80') ||                                     // link-local (fe80::/10)
      cleanHost.startsWith('::ffff:') ||                                  // IPv4-mapped IPv6
      cleanHost.startsWith('2001:db8')) {                                 // documentation range
    throw new Error('Private IP addresses are not allowed');
  }

  // Block private IPv4 ranges
  const parts = hostname.split('.').map(Number);
  if (parts.length === 4 && parts.every(p => !isNaN(p))) {
    if (parts[0] === 10 ||
        (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
        (parts[0] === 192 && parts[1] === 168) ||
        (parts[0] === 169 && parts[1] === 254)) {
      throw new Error('Private IP addresses are not allowed');
    }
  }
}

export async function scrapeWebsite(url: string): Promise<BusinessContext> {
  // Normalize URL
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }

  // Validate against SSRF
  try {
    validateUrl(normalizedUrl);
  } catch {
    throw new Error('Please enter a valid public website URL');
  }

  // Fetch homepage and key pages in parallel
  const baseUrl = new URL(normalizedUrl).origin;
  const [homepageHtml, aboutHtml, servicesHtml] = await Promise.all([
    fetchPage(normalizedUrl),
    fetchPage(`${baseUrl}/about`),
    fetchPage(`${baseUrl}/services`),
  ]);

  if (!homepageHtml) {
    throw new Error('Could not fetch website. Please check the URL and try again.');
  }

  const $ = cheerio.load(homepageHtml);

  // Also parse about/services pages if available
  let combinedText = extractText($);
  if (aboutHtml) {
    const $about = cheerio.load(aboutHtml);
    combinedText += ' ' + extractText($about);
  }
  if (servicesHtml) {
    const $services = cheerio.load(servicesHtml);
    combinedText += ' ' + extractText($services);
  }

  const businessName = $('title').first().text().trim().split('|')[0].split('-')[0].trim() || 'Unknown';
  const metaDescription = $('meta[name="description"]').attr('content') || '';
  const description = metaDescription || combinedText.slice(0, 300);

  return {
    businessName,
    description,
    keywords: extractKeywords(combinedText),
    services: extractServices($),
    location: extractLocation(combinedText),
    industry: detectIndustry(combinedText),
    rawText: combinedText.slice(0, 5000),
  };
}
