# Jybr Lead Report PDF -- Full Revision Spec

Reference mockup: `~/Desktop/jybr-pdf-mockup-v3.html` (open in Chrome, Cmd+P to export as PDF)

---

## Overall Direction

- **Reframe from sales deck to playbook/blueprint.** The PDF should feel like expert advice the reader can act on, not a scope of work. Value-first throughout, sell only on the last page.
- **Headline changed** from "here's the build" to "here's the **blueprint**"
- **Target audience:** Mix of business owners (non-technical) and ops leads. Plain English first, technical terms as credibility proof.
- **Primary CTA:** Pay the $250 deposit (direct checkout on the last page)
- **No dollar figures anywhere except the Plan page** -- no savings estimates, no hours saved, no $1,600 baseline, no per-agent pricing on card footers
- **No guessed ROI** -- don't estimate money saved or hours replaced since the intake doesn't ask for volume, staffing, or labor cost

---

## Page Structure (10 pages)

| Page | Section | Content |
|------|---------|---------|
| 1 | Cover + Diagnostic | Headline, narrative, TOC, vitals, pain/before-after, agent priority cards |
| 2 | Agent #01 Deep Dive | Inbox mockup, value stack, MCP servers/triggers/actions |
| 3-4 | Phase 1: Blueprint | Steps 1-4 (2 per page) |
| 5-6 | Phase 2: Infrastructure | Steps 5-8 (2 per page) |
| 7-8 | Phase 3: Safety & Launch | Steps 9-12 (2 per page) |
| 9 | Agents #02 & #03 | Expansion agents with unique examples |
| 10 | The Plan | Roadmap, pricing, signoff, FAQ |

---

## Page 1: Cover + Diagnostic (combined)

1. **Remove the social proof pill** ("Lead report n 2486 / 47 builds shipped / 100% on time") entirely from this page
2. **Shrink the title font** (from 72px to ~58px in the mockup) so everything fits on one page without cramming
3. **Add a "What's inside" table of contents** with an eyebrow header reading "What's inside" above a compact 5-column strip. Each cell has: page number, section name, one-line description. Keep descriptions short (3-5 words each).
4. **Keep the vitals strip** (First workflow, Named tools, Build model, Pilot window) -- no dollar figures in any cell
5. **Keep the diagnostic section** (Reported Pain + Before/After) on this same page
6. **Keep the 3 agent priority cards** but **remove all dollar figures** from them. No savings per agent, no "$1,350+ / mo save." Just show: agent name, MCP server chips, and priority label (Build first / Expansion path)

---

## Page 2: Agent #01 Deep Dive

7. **Keep the inbox mockup** as-is -- it's effective and worth the space
8. **Value stack: remove the $1,600 baseline and $250/mo rows.** Keep only the 4 "Included" items: Workflow teardown, Tool integration, Simulation pass, Monitoring + rollback
9. **Remove the Impact strip entirely** (the row showing offset/hours/baseline dollar amounts). Keep only MCP servers, Triggers, and Actions in a 3-column strip

---

## Pages 3-8: How We Wire (the core of the PDF)

This section is the meat of the document -- 6 of 10 pages. It should feel like a genuine blueprint they could follow themselves.

10. **Group the 12 build steps into 3 named phases:**
    - Phase 1: Blueprint (steps 1-4)
    - Phase 2: Infrastructure (steps 5-8)
    - Phase 3: Safety & Launch (steps 9-12)

11. **2 steps per page, 6 pages total**

12. **Add a phase progress bar** at the top of each How We Wire page showing Phase 1 / Phase 2 / Phase 3 with done/active/upcoming states. Small and compact (20-24px height).

13. **Use compact section heads** on How We Wire pages -- smaller title (~28px) and eyebrow (~9px) than other pages to maximize space for step content

14. **Each step card has 4 visually distinct sections with colored badges/icons:**

    - **Technical** (gray badge, gear icon) -- short, proves credibility with architecture terminology. 1-2 sentences of dense technical language.

    - **What this means for you** (teal/accent highlight box, star icon) -- plain English, outcome-focused. Explains what the jargon means for their business. Should be the longest section. Uses a teal left-border highlight box.

    - **Deliverables** (green chips) -- tangible artifacts they receive after this step. Displayed as small green pill/chip elements (e.g., "Workflow scope document," "Escalation owner map," "Rollback plan"). 3-5 chips per step.

    - **Build it yourself** (amber/warning box, warning icon) -- slightly daunting but genuinely helpful. Tells them exactly what they'd need to do to handle this step independently. Names specific tools, platforms, and starting points (e.g., "Start with CallRail's webhook docs and work outward," "Choose a message broker like AWS SQS, RabbitMQ, or Google Pub/Sub"). Uses an amber left-border highlight box. **Does NOT recommend hiring a developer** -- just lays out the concrete steps so the complexity speaks for itself.

15. **Step cards should expand to fill the page** (use flex:1) so they take up available space rather than leaving white gaps at the bottom

---

## Page 9: Agents #02 & #03

16. **Each agent card has a richer layout (not cramped):**
    - Large rank number (28px) to the left, agent name (17px) and full descriptive tagline to the right
    - MCP server chips below the tagline
    - Triggers and Actions in a **2-column horizontal strip** (not stacked vertically)
    - **New "When to add this agent" section** (teal accent highlight box with label) -- explains the specific business signal that tells them it's time to expand. Example: "Once agent #01 is live and you notice that estimates are still aging without follow-up, or customers are asking questions about quotes and waiting days for a response. This agent picks up where intake leaves off."
    - **Conversation examples side by side** in a 2-column grid, not stacked. Readable font size (11px body).

17. **Fix the duplicate examples problem.** Each agent must have **unique, agent-specific examples** -- not the same "missed call" and "schedule request" from Agent #01:
    - Agent #02 (Estimate Follow-Up): "Quote aging" and "Quote question"
    - Agent #03 (Billing & Review): "Unpaid invoice" and "Review request"

18. **Remove all dollar figures** from agent cards (no offset/hours/baseline impact row)

19. **Richer taglines** -- instead of a generic one-liner, each agent gets a full sentence explaining what it watches, detects, and handles. Example: "Watches open estimates in ServiceTitan, detects aging quotes and customer questions, and handles follow-ups through Gmail and Podium so no revenue slips through the cracks."

---

## Page 10: The Plan

20. **Change plan title** from "Seven days to live. $1,600 in, $1,350 back." to **"Seven days to live. Agent #01 first."**

21. **Remove all savings math** from the pricing card. No "$250 vs $1,600 = $1,350 offset" calculation. No "$10/hr x 40 hrs/week x 4 weeks" note.

22. **Pricing shows "$250 / month"** -- drop "per agent." Frame it as the price for Agent #01, not a per-unit multiplier.

23. **Eyebrow says "Your investment"** instead of "First scoped build"

24. **Pricing checklist is outcome-focused,** describing what the business looks like after, not what gets built:
    - After-hours calls classified and routed before your office opens
    - Customer details flow between CallRail, ServiceTitan, and Calendar automatically
    - Emergency jobs triaged by urgency, service area, and availability without staff intervention
    - Every action logged, approval-gated, and reversible with one click

25. **Agents #02/#03 described as "optional add-ons"** (not "expansion paths at $250/agent")

26. **FAQ changes (4 items, 2-column grid):**
    - **#1 (NEW):** "What if we want to change the workflow later?" -- "The agent is built on modular MCP contracts. Changing a trigger, adding a tool, or adjusting an approval threshold is a config update, not a rebuild."
    - **#2 (NEW):** "How is this different from a chatbot?" -- "A chatbot answers questions. This agent takes actions across your real tools with policy gates, audit trails, and rollback. It works, not just talks."
    - **#3:** "Can we build this ourselves?" -- "Yes, if your team can own MCP contracts, adapters, auth, queues, state, approval gates, simulation tests, and rollout. Pages 3-8 are your starting point."
    - **#4:** "Prefer to start by email?" -- (keep as-is)

---

## Global Design Rules

27. **Use the production Jybr design system:**
    - Blue accent (`#2d8fb5`), not teal
    - Bold 1.5px ink borders with `4px 4px 0` box shadows on cards
    - Dot grid background pattern on pages
    - Rotated `em` tags with box shadows on display headings
    - Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code/labels), Instrument Serif (signoff)

28. **Visual variety across the How We Wire pages:**
    - Phase progress bar (done/active states)
    - 4 distinct badge colors per section type (gray, teal, green, amber)
    - Colored left-border highlight boxes for "What this means for you" and "Build it yourself"
    - Deliverable chips in green
    - This prevents the 6 pages from feeling monotone

29. **No sticky headers.** Header and footer are absolute-positioned per page (correct for PDF output).

30. **Step cards use flex:1** to expand and fill available page height, eliminating white space gaps at the bottom of How We Wire pages.

---

## Reference Files

- **Mockup HTML:** `~/Desktop/jybr-pdf-mockup-v3.html`
- **Original PDF reviewed:** `~/Downloads/Jybr-PDF-Review-Pack/01-original-flow-no-roi.pdf`
- **Existing codebase:** `~/jybr-landing/`
  - Data types + generation: `lib/jybr-report-data.ts`
  - HTML wrapper: `lib/report-template-html.ts`
  - LLM generation: `lib/report-generation.ts`
  - React renderer: `public/report-template/JybrReport.jsx`
  - Styles: `public/report-template/styles.css`
