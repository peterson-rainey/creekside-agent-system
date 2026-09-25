# Upwork pre-call warm-up: Niki Mott, upscale ecommerce Facebook ads (LINDSEY thread)

- **Profile:** Lindsey (lindsey_default). **Status:** UNSENT. **Drafted:** Fri 2026-09-25 Central (Sat 9/26 on the operator's Manila screen).
- **Call:** Mon 2026-09-28, 7:00-7:30 PM US Central (operator confirmed Central) = 5:00 PM Pacific. That is an hour past Lindsey's recorded 10am-6pm Central window, so she must confirm she is holding it. Niki's own time zone is unknown; pin Central only. Booking mechanism unknown (link vs Upwork scheduler): do not mention it.
- **Send time:** Mon 9/28, 9:30-10:30 AM Central (about 9 hours out). Not Friday/Sunday (weekend burial), not 30 minutes out.
- **Asks:** revenue bare, budget as a 3-anchor bracket, AOV, past ads + whether the pixel/CAPI records the purchase, markets. Goals omitted (the post states them). Proposal's three questions were all unanswered, so they are folded in, not withheld.
- **Review:** sdr-agent (2 variants) + qc-reviewer-agent. SDR R1 (CPM value line, no correction) **QC FAIL**: reads as cause-and-effect ("CPM doubled, so structure"), implies auction decay under Lindsey, and adds fresh detail on an account whose proposal figures are wrong. SDR R2 QC PASS WITH FIXES; fixes applied below. SDR recommended R1, overruled. Expert review skipped (two-paragraph scheduling message). Not logged to sdr_generation_log (contractor_query cannot INSERT).

## WHY THERE IS A CLARIFYING SENTENCE (verified live 2026-09-25)

The sent proposal's first-person proof figures were totalled over each account's whole history, not from Creekside's start date:

| Account | Proposal said | Whole account | Creekside/Lindsey run |
|---|---|---|---|
| Furniture (Neue Maison, act_782415276397596) | "about ten months, roughly $206,000" | $205,570.78, 2025-09-25 to 2026-08-10 | **2026-04-10 to 2026-08-10, $105,010.24** |
| Mattress (Tiami, act_1401195627889544) | "about $51,000 in spend" | $51,333.01 | **since 2026-07-04, $13,962.54** |

Every pre-4/10 furniture campaign ends 2026-04-09 and every later one starts 2026-04-10. The proposal's two traffic-objective campaigns (17 cents a click, $2,018.85) are both BEFORE Lindsey's run; during it there was one traffic campaign, $17.12. `reporting_clients` and `clients.start_date` give the run dates; **Lindsey's personal start on each account is not recorded**, so she must confirm before the clarifying sentence is sent.

## PASTE-READY A (recommended: needs Lindsey to confirm her start dates)

Hi Niki,

Got it on my calendar for Monday at 7:00 pm Central.

So Monday goes to structure instead of basics:

Monthly revenue
Monthly ad budget: under $5K, $5K to $15K, or higher
Average order value
Any past ads, and whether the pixel or Conversions API records the actual purchase
Main markets you sell to

A line each is plenty, and whatever's easier live can wait for the call.

For context on the two accounts I mentioned, those totals were whole-account figures. My own run is about $105,000 over roughly four months on the furniture brand, and about $14,000 since early July on the mattress brand.

(107 words. Final sentence: "My own run is about $105,000 over roughly four months on the furniture brand, and about $14,000 since early July on the mattress brand." Final question: none.)

## PASTE-READY B (fallback if Lindsey cannot confirm her start dates before sending)

Same as A, but the last paragraph is only:

For context on the two accounts I mentioned, those totals were whole-account figures.

(This is true whatever her personal start dates were and makes no claim about her own run. Final sentence: "For context on the two accounts I mentioned, those totals were whole-account figures.")

## PRE-SEND STEPS
1. Lindsey confirms (a) her own start on each account is on or after 4/10 and 7/4, and (b) she is holding Monday 7:00 PM Central. If (a) cannot be confirmed, send B.
2. Reopen the thread first: cut any list line Niki has since answered; if he rescheduled, fix "Monday" and the time; make sure no quick acknowledgment already went out.
3. Confirm the date from Postgres, not the shell or the Manila screen. Paste as plain text with line breaks intact. No sign-off.
4. Get Lindsey's approval (her profile).

## CALL BRIEF FOR LINDSEY (any version)
Never repeat "ten months", $206,000, or $51,000. Furniture: April to August, about $105,000; mattress: about $14,000 since early July. Leave the replacement-parts store out (tenure not re-checked). Say "conversions", not "purchases"; no ROAS; do not cite Tiami for results (Meta 0.54x as of 8/23 per the 8/26 record; re-check first). The furniture CPM climb (May $41.83, June $45.37, July $78.88) is real but July carried a 50%-off July 4th campaign that was 59% of July spend, so do not lean on it.
