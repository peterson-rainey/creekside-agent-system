# Website Pricing Page Template -- Single-Plan Layout

When updating the website (`pricing.astro`), replace the three-plan sections with the single-plan layout below.

Placeholder tokens to substitute with actual new values:
- `[RATE1]` -- rate tier 1 percentage (e.g., `20%`)
- `[RATE2]` -- rate tier 2 percentage (e.g., `15%`)
- `[RATE3]` -- rate tier 3 percentage (e.g., `10%`)
- `[BREAKPOINT1]` -- first tier breakpoint in dollars (e.g., `$30,000` or `$30k`)
- `[BREAKPOINT2]` -- second tier breakpoint (e.g., `$60,000` or `$60k`)
- `[BREAKPOINT1_K]` -- breakpoint1 in $k shorthand (e.g., `$30k`)
- `[BREAKPOINT2_K]` -- breakpoint2 in $k shorthand (e.g., `$60k`)
- `[CAP]` -- monthly cap (e.g., `$15,000`)
- `[MINIMUM]` -- monthly minimum per platform (e.g., `$1,500`)
- `[ONBOARDING]` -- onboarding fee per platform (e.g., `$1,500`)
- `[THRESHOLD]` -- minimum/rate1 (e.g., `$7,500`)

---

## Section 1: Replace the 3-Column Pricing Cards Section

Replace the entire `<!-- Pricing Cards Section -->` block (from `<section class="bg-white py-16 md:py-24">` through its closing `</section>`) with:

```html
  <!-- Pricing Card Section -->
  <section class="bg-white py-16 md:py-24">
    <div class="container mx-auto max-w-3xl px-4 lg:px-8">

      <!-- Single centered pricing card -->
      <div class="relative flex flex-col rounded-sm border-2 border-secondary-500 bg-white shadow-md">
        <div class="h-1 w-full rounded-t-sm bg-secondary-500"></div>
        <div class="flex flex-1 flex-col p-8">
          <div class="mb-6">
            <p class="text-sm font-bold uppercase tracking-widest text-secondary-500">Management Fee</p>
            <h3 class="text-primary-900 text-2xl font-extrabold uppercase tracking-tight">Percentage of Ad Spend</h3>
            <p class="text-grey-600 mt-2 text-base">Scales with your budget. The more you grow, the lower the rate.</p>
          </div>

          <div class="flex flex-1 flex-col divide-y divide-grey-100">
            <div class="flex flex-col gap-1 py-4">
              <span class="text-sm font-medium text-grey-600">Variable Fee (per platform)</span>
              <div class="flex flex-col gap-0.5 text-sm font-semibold text-primary-900">
                <span>[RATE1] up to [BREAKPOINT1_K]</span>
                <span>[RATE2] from [BREAKPOINT1_K]&ndash;[BREAKPOINT2_K]</span>
                <span>[RATE3] above [BREAKPOINT2_K]</span>
              </div>
            </div>
            <div class="flex items-baseline justify-between py-4">
              <span class="text-sm font-medium text-grey-600">Minimum Fee</span>
              <span class="text-lg font-bold text-primary-900">[MINIMUM]<span class="text-sm font-medium text-grey-500">/mo per platform</span></span>
            </div>
            <div class="flex items-baseline justify-between py-4">
              <span class="text-sm font-medium text-grey-600">Monthly Cap</span>
              <span class="text-lg font-bold text-primary-900">[CAP]<span class="text-sm font-medium text-grey-500"> maximum</span></span>
            </div>
            <div class="flex items-baseline justify-between py-4">
              <span class="text-sm font-medium text-grey-600">Onboarding</span>
              <span class="text-lg font-bold text-primary-900">[ONBOARDING]<span class="text-sm font-medium text-grey-500"> per platform (one-time)</span></span>
            </div>
          </div>

          <p class="mt-6 text-sm text-grey-500">
            The [MINIMUM] minimum applies until your monthly ad spend exceeds [THRESHOLD] per platform. Above that, the [RATE1] variable rate takes over naturally.
          </p>

          <div class="mt-8">
            <a
              href="#freequote"
              class="bg-secondary-500 hover:bg-secondary-600 block w-full rounded-sm px-8 py-4 text-center text-lg font-bold uppercase tracking-wider text-white shadow-sm transition-colors duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
```

---

## Section 2: Replace the Comparison Chart Section

Replace the `<!-- Comparison Chart Section -->` block (the one with `id="chart-single"` and `id="chart-dual"`) with a single-chart "How It Scales" section:

```html
  <!-- Fee Scaling Chart Section -->
  <section class="bg-grey-50 py-16 lg:py-24">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <header class="mb-12 flex flex-col items-center gap-4 text-center">
        <h2 class="text-primary-900 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl/tight lg:text-5xl/tight">
          How the Fee <span class="text-secondary-500">Scales</span>
        </h2>
        <div class="bg-secondary-500 h-1.5 w-20 rounded-full"></div>
        <p class="text-grey-700 max-w-3xl text-lg/8">
          The percentage rate drops at [BREAKPOINT1] and again at [BREAKPOINT2] per platform. The [CAP] monthly cap means your costs stay predictable as you grow.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div class="rounded-sm border border-grey-200 bg-white p-6 shadow-sm">
          <h3 class="text-primary-900 mb-4 text-center text-lg font-bold uppercase tracking-wider">Single Platform</h3>
          <canvas id="chart-single" class="w-full"></canvas>
        </div>
        <div class="rounded-sm border border-grey-200 bg-white p-6 shadow-sm">
          <h3 class="text-primary-900 mb-4 text-center text-lg font-bold uppercase tracking-wider">Two Platforms (50/50 Split)</h3>
          <canvas id="chart-dual" class="w-full"></canvas>
        </div>
      </div>
    </div>
  </section>
```

---

## Section 3: Replace the "Which Plan" Section

Replace the `<!-- Which Plan Section -->` block with a "How Pricing Works" explainer:

```html
  <!-- How Pricing Works Section -->
  <section class="bg-white py-16 lg:py-24">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <header class="mb-12 flex flex-col items-center gap-4 text-center">
        <h2 class="text-primary-900 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl/tight lg:text-5xl/tight">
          How the Fee <span class="text-secondary-500">Works</span>
        </h2>
        <div class="bg-secondary-500 h-1.5 w-20 rounded-full"></div>
      </header>

      <div class="flex flex-col gap-6">
        <div class="rounded-sm border-2 border-secondary-500 bg-white p-8 shadow-sm">
          <div class="flex items-start gap-4">
            <span class="bg-secondary-500 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">1</span>
            <div>
              <h3 class="text-primary-900 text-lg font-bold">Starting out (under [THRESHOLD]/mo per platform)</h3>
              <p class="text-grey-700 mt-1 text-base/7">
                The [MINIMUM] minimum applies. You pay [MINIMUM]/month per platform regardless of ad spend. This covers the work of setting up and managing your campaigns before volume builds.
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-sm border-2 border-secondary-500 bg-white p-8 shadow-sm">
          <div class="flex items-start gap-4">
            <span class="bg-secondary-500 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">2</span>
            <div>
              <h3 class="text-primary-900 text-lg font-bold">[THRESHOLD]&ndash;[BREAKPOINT1] per platform</h3>
              <p class="text-grey-700 mt-1 text-base/7">
                The [RATE1] variable rate takes over. Fee = [RATE1] of your ad spend per platform. As your budget grows, the fee grows with it.
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-sm border-2 border-secondary-500 bg-white p-8 shadow-sm">
          <div class="flex items-start gap-4">
            <span class="bg-secondary-500 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">3</span>
            <div>
              <h3 class="text-primary-900 text-lg font-bold">[BREAKPOINT1]&ndash;[BREAKPOINT2] per platform</h3>
              <p class="text-grey-700 mt-1 text-base/7">
                The rate drops to [RATE2]. Spend above [BREAKPOINT1] is charged at [RATE2], keeping your effective rate lower as you scale.
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-sm border-2 border-grey-400 bg-white p-8 shadow-sm">
          <div class="flex items-start gap-4">
            <span class="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-grey-500 text-sm font-bold text-white">4</span>
            <div>
              <h3 class="text-primary-900 text-lg font-bold">Above [BREAKPOINT2] per platform</h3>
              <p class="text-grey-700 mt-1 text-base/7">
                Spend above [BREAKPOINT2] is charged at [RATE3]. Total fee across all platforms is capped at [CAP]/month no matter how high your combined spend goes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

---

## Section 4: Update the Chart.js Script

In the `<script>` block at the bottom of `pricing.astro`, replace the entire JavaScript with the single-plan version. Find the existing `function calcPlanA_single`, `calcPlanA_dual`, `calcPlanB`, `calcPlanC` functions and replace with:

```javascript
  <script>
  // Lazy-load Chart.js and render fee scaling charts
  (function () {
    var chartsLoaded = false;
    var container = document.querySelector('#chart-single');
    if (!container) return;

    function buildCharts() {
      if (chartsLoaded) return;
      chartsLoaded = true;

      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = function () {
        renderCharts();
      };
      document.head.appendChild(script);
    }

    // Single-plan fee calculation (per platform)
    // Substitute actual numeric values for the placeholders below:
    var BREAKPOINT1 = [BREAKPOINT1_NUMERIC];  // e.g., 30000
    var BREAKPOINT2 = [BREAKPOINT2_NUMERIC];  // e.g., 60000
    var RATE1 = [RATE1_DECIMAL];              // e.g., 0.20
    var RATE2 = [RATE2_DECIMAL];              // e.g., 0.15
    var RATE3 = [RATE3_DECIMAL];              // e.g., 0.10
    var MINIMUM = [MINIMUM_NUMERIC];          // e.g., 1500
    var CAP = [CAP_NUMERIC];                  // e.g., 15000

    function calcFeePerPlatform(spend) {
      if (spend <= 0) return 0;
      var fee = 0;
      if (spend <= BREAKPOINT1) {
        fee = spend * RATE1;
      } else if (spend <= BREAKPOINT2) {
        fee = BREAKPOINT1 * RATE1 + (spend - BREAKPOINT1) * RATE2;
      } else {
        fee = BREAKPOINT1 * RATE1 + (BREAKPOINT2 - BREAKPOINT1) * RATE2 + (spend - BREAKPOINT2) * RATE3;
      }
      return Math.max(fee, MINIMUM);
    }

    function calcSingle(spend) {
      return Math.min(calcFeePerPlatform(spend), CAP);
    }

    function calcDual(totalSpend) {
      var perPlatform = totalSpend / 2;
      return Math.min(calcFeePerPlatform(perPlatform) * 2, CAP);
    }

    function renderCharts() {
      var spendPoints = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];
      var labels = spendPoints.map(function (v) { return '$' + (v / 1000) + 'k'; });

      var singleFees = spendPoints.map(calcSingle);
      var dualFees = spendPoints.map(calcDual);

      var yMax = Math.ceil((CAP + 2000) / 2000) * 2000;

      var commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16, font: { size: 13, weight: 'bold' } } },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.dataset.label + ': $' + ctx.parsed.y.toLocaleString();
              },
              title: function (items) {
                return items[0].label + ' Ad Spend';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: yMax,
            ticks: {
              stepSize: 2000,
              callback: function (value) { return '$' + value.toLocaleString(); },
              font: { size: 12 }
            },
            title: { display: true, text: 'Monthly Agency Fee', font: { size: 13, weight: 'bold' } },
            grid: { color: '#e2e8f0' }
          },
          x: {
            ticks: { font: { size: 11 } },
            title: { display: true, text: 'Monthly Ad Spend', font: { size: 13, weight: 'bold' } },
            grid: { color: '#e2e8f0' }
          }
        }
      };

      new Chart(document.getElementById('chart-single'), {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Single Platform',
            data: singleFees,
            borderColor: '#102a43',
            backgroundColor: '#102a43',
            tension: 0,
            borderWidth: 2.5,
            pointRadius: 3,
            pointHoverRadius: 6
          }]
        },
        options: commonOptions
      });

      new Chart(document.getElementById('chart-dual'), {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Two Platforms (50/50)',
            data: dualFees,
            borderColor: '#f59e0b',
            backgroundColor: '#f59e0b',
            tension: 0,
            borderWidth: 2.5,
            pointRadius: 3,
            pointHoverRadius: 6,
            borderDash: [8, 4]
          }]
        },
        options: commonOptions
      });
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            buildCharts();
            observer.disconnect();
          }
        });
      }, { rootMargin: '300px' });
      observer.observe(container.closest('section'));
    } else {
      setTimeout(buildCharts, 2000);
    }
  })();
  </script>
```

**Numeric placeholder substitution:** When applying this template, replace the JavaScript variable values with actual numbers:
- `[BREAKPOINT1_NUMERIC]` -- e.g., `30000`
- `[BREAKPOINT2_NUMERIC]` -- e.g., `60000`
- `[RATE1_DECIMAL]` -- e.g., `0.20`
- `[RATE2_DECIMAL]` -- e.g., `0.15`
- `[RATE3_DECIMAL]` -- e.g., `0.10`
- `[MINIMUM_NUMERIC]` -- e.g., `1500`
- `[CAP_NUMERIC]` -- e.g., `15000`

---

## Section 5: Update the Page Meta Description

At the top of `pricing.astro`, update the Layout `description` prop from the three-plan description to:

```html
  description="Transparent pricing for Google Ads and Meta Ads management. Management fee is a percentage of ad spend with tiered rates, a [MINIMUM] minimum, and a [CAP] monthly cap."
```

---

## Notes

- The old three-plan comparison text ("Plans A and B cost exactly the same at $20,000/month") will be removed. Do not port that text forward.
- The `id="freequote"` CTA section at the bottom does NOT change. Leave it as-is.
- The page title ("Transparent Pricing, Real Results") does NOT change unless Peterson asks.
- Jonathan handles deployment from GitHub. After the commit and push, the site updates on the next deployment cycle. No action needed after the push.
