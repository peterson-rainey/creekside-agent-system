# Public Copy Register

## When to use this doc

Read this doc whenever Peterson asks you to write or rewrite:
- Website copy (homepage, about, services, landing pages)
- LinkedIn posts
- Blog posts
- Ad copy
- Email newsletters

Do NOT apply this doc to 1:1 messages (Gmail, ClickUp, Google Chat). Those use the standard audience-classification rules.

## What makes public copy different

Peterson's authentic public voice (LinkedIn posts with authenticity_score > 0) is measurably different from his 1:1 messaging:

- Blunter openers (platform sarcasm, self-deprecation, problem statements)
- Humor is expected, not exceptional
- Parenthetical asides appear in roughly 1/3 of posts -- they carry the joke or the caveat
- Direct CTAs are the authentic close ("Let's talk", not "happy to hop on a call")
- Radical honesty is the sales strategy -- he voluntarily caps his own claims
- Trailing "lol" survives in low-stakes zones (about pages, P.S. lines, after a self-jab)
- The public copy register should read like how Peterson and Cade actually talk on sales calls: conversational, not boring, fourth-wall-breaking allowed

## Style Anchor: Use authenticity_score

Before writing public copy, pull 3 top-scored posts as live style anchors:

```sql
SELECT text, authenticity_score FROM linkedin_post_examples
WHERE authenticity_score > 0
ORDER BY authenticity_score DESC
LIMIT 3;
```

**Positive score = authentic Peterson.** These are the target register.
**Negative score = ghostwritten/AI-polished.** These posts contain em dashes, tricolons, "👉" bullets, tidy closers. Do not imitate them.

Note: em dashes appear ONLY in negative-scored posts. This empirically confirms the no-em-dash rule -- the corpus itself has separated out the inauthentic writing, and it is the em-dash writing.

## Sales-Call Voice (Fathom evidence, 2026-08-12)

This section is sourced from 8 full Fathom call transcripts (Nov 2025 - Aug 2026, Peterson + Cade). The patterns here are Creekside's actual sales voice -- replicate them in public copy to close the gap between the website and the call.

Every digital agency says the same things. These patterns are what make Creekside different on a call. They must also be what make the copy different on the page.

### Fourth-Wall Breaks

Peterson and Cade name their own salesmanship out loud, mid-pitch. This defuses skepticism more effectively than polished copy can. On a page, one well-placed fourth-wall break reads as confidence, not awkwardness.

Verbatim from calls:
- "And the final question I like to ask, it's kind more of a salesy question, but I ask it on every call because I get good answers from it." -- Peterson (McClung, 8/10)
- "I know a lot of the stuff that I'm telling you, it's obviously going to sound great. You don't really know until it is in practice." -- Peterson (McClung, 8/10)
- "I know that's kind of a more salesy pitch. So if there's any questions you have on how we operate, I'm happy to dive into them." -- Peterson (Zielinski, 7/03)
- "I just try to tell people that at the beginning so we don't get to the end, and then I tell you how we work, and then you're like, I don't want to do that." -- Cade (Modi, 7/24)

**Translation rule for written copy:** Break the fourth wall once per page -- maximum once, never repeated. ("This is obviously the part of the page where we pitch you. Here's why we structured it this way.") The break must name the sales moment, then immediately justify it with something honest.

### Radical Honesty / Self-Disqualification

He volunteers disqualifying information before the prospect asks. This is intentional. The more he disqualifies, the more the surviving leads trust him.

Verbatim from calls:
- "Honestly, I always say that I'm not going to be a good fit for you because I just don't believe that you're going to get results in a week with any marketing method." -- Peterson (Rubinshtein, 7/02)
- "If you've already spent $190,000 hating Google, another $100,000 probably isn't going to convince you to keep doing it. You're kind of throwing good money after bad money." -- Peterson (Rubinshtein, 7/02)
- "If you aren't comfortable talking with the person actually managing the ads, it's probably not a good fit to begin with." -- Peterson (McClung, 8/10)
- "If you don't think you want to listen to anything I have to say after hearing that, it doesn't hurt my feelings." -- Cade (Modi, 7/24)
- "I can't guarantee that... because if I say that and it doesn't, I look like an idiot and I've just done this too much to know that it's run by bots." -- Cade (Modi, 7/24)
- Cade talked a paying client OUT of programmatic ads spend (Vizion, 7/21).

**Translation rule for written copy:** Disqualify readers explicitly on the page. ("We're probably not a good fit if..." / "If that's not what you're looking for, no hard feelings.") Write refusals of guarantees as a feature: "We can't guarantee anything. Anyone who does is lying to you. Here's the 90-day plan instead."

Don't hide the humans. Name the operating model directly ("the person actually running your ads talks to you") -- never abstract it into "dedicated support."

### Pricing Objection Pre-Emption

Both Peterson and Cade answer the obvious pricing objection before the prospect raises it. The objection is: "if you're paid on ad spend %, why wouldn't you just inflate the budget?" They answer it unprompted.

Verbatim from calls:
- "A big piece of the percentage of ad spend that a lot of people are concerned of is like, oh, if you guys are just paid on a percentage of ad spend basis, then why would you guys not just continue to crank up the budget forever... You give us the budget that you need for your business... And quite frankly, you're not going to increase spend unless you're making money on the ads." -- Peterson (McClung, 8/10)
- "We like to have a lot of that be performance-based, so that way our incentives are perfectly aligned with yours... we make more money when your business scales." -- Peterson (Ulrich, 6/25)
- "As you guys are doing better, we're also going to be doing better." -- Peterson (McClung, 8/10)
- Honest cap: "If we are scaling to the moon, we do want to cut it off at a certain point." -- Peterson (McClung, 8/10)
- Cade promises pricing "in writing" after every call; acknowledges "I know you're going to interview other people. You are going to want to price shop... I completely understand that." -- Cade (Modi, 7/24)

**Translation rule for written copy:** Inside the pricing section itself, answer "why wouldn't you just crank our budget forever?" Include the fee cap as good faith. Use "as you grow, we grow" / aligned-incentives as the pricing thesis. Always use concrete numbers ($1,500 minimum, 20/15/10 tiers, 90-day plan, seven-day money-back). Never use "affordable" or "competitive."

### Peterson vs Cade Register Split

Both voices appear in Creekside's external presence. Knowing the split helps you dial the right register for the copy type.

**Peterson = strategist-teacher.** Longer sentences. Deep technical dives. Self-aware pullbacks ("I know I threw a bunch of numbers at you" / "Stop me if I'm getting too into the weeds"). Warmth comes through thoroughness, not friendliness. More "quite frankly," "honestly," "obviously."

**Cade = straight-shooter operator.** Shorter, faster, more colloquial. Disclaimers and constraints up front. Volunteers internal numbers unprompted. Zero-pressure exits ("it doesn't hurt my feelings," "we're not going to be mad at you"). More "like," "hey dude," "basically," "transparently" as a mid-sentence adverb.

Both registers are on-brand. For landing pages and about copy, default to Peterson's register. For case study pull-quotes, client testimonials framing, or constraint-heavy explanations, Cade's register can work.

### Stock Phrases (on-call vocabulary that carries to copy)

These phrases appear across multiple calls. They are Creekside's actual vocabulary -- use them before inventing new framings.

| Phrase | Context |
|--------|---------|
| "Good fit / not a good fit" | Universal framing for disqualification and qualification |
| "Incentives are aligned" | Pricing thesis |
| "As you grow, we grow" | Pricing thesis short form |
| "We can't guarantee anything... this is the strategy" | Guarantee refusal |
| "In writing" (Cade) | Commitment signal after pricing discussion |
| "It doesn't hurt my feelings" / "We're not going to be mad at you" | Zero-pressure exit |
| "The person actually managing the ads" | Anti-abstraction; names the operating model |
| "Seven-day money-back" | Framed as a fit-check, not a closer |

### Verbal Tics: What to Use, What to Cut

**Softeners to use in moderation -- they ARE the voice:**
"kind of," "sort of," "honestly," "quite frankly," "obviously." These signal authenticity, not vagueness. Use sparingly. Scrubbing them entirely produces AI-sounding precision. One or two per section is correct.

**Filler to cut -- spoken convenience only:**
"that sort of thing," "and stuff like that," "you know what I mean," "gotcha." These survive verbally because of pacing. In writing they read as sloppy.

**Structural pattern: dense explanation + hard stop + check-in.** Peterson runs a long technical explanation, then breaks himself off: "Stop me if I'm getting too into the weeds" / "Anyways, I know that's a lot. Any questions on that?" In long-form copy, this translates to: dense 3-4 sentence paragraph, then a short one-line beat. ("That's a lot. Here's the short version.") Never write long unbroken blocks.

### Vivid Contrast Images Over Jargon

Peterson uses one sharp image to replace an entire explanation. Use these before inventing new ones. Stack no more than one per page -- one vivid image lands; two competing ones cancel.

Verbatim from calls:
- "Branded is just cheating at that point. I mean, you're just stat padding." -- Peterson (Ulrich, 6/25)
- The big-agency handoff to "someone overseas making $5 an hour who barely speaks English." -- Peterson (multiple calls, 3+)
- "I could be saying a bunch of great keywords and terminology and stuff like that and just kind of blowing smoke... it's really when the rubber meets the road." -- Peterson (Zielinski, 7/03)

In written copy: pick one vivid contrast per page ("stat padding," the $5/hour handoff, or "blowing smoke vs rubber meets the road"). Do not stack them.

## Humor Mechanics

### 1. Self-deprecation (default humor mode)

He mocks himself first, then delivers the substantive point. This builds credibility by undercutting the pitch before making it.

Verbatim examples from the authentic corpus:
- "Absolutely bombing on a sales/strategy call. ... I post plenty about how awesome we are, so figured I'd balance it out + get some free content from the worst 30min of my week lol"
- "Just realized I had my notifications for my comments turned off in settings, just wanted to apologize to the 2 people and 3 AI bots that occassionally comment."
- "I've also got an engineering degree if you want to hear about how useless college is lol"
- "I always harp on consultation calls with my clients that garbage data in = garbage results out ... I just realized this year that I wasn't even following my own best practices lol"
- Calls: "I apologize if you hear some gunshots... that's my family shooting off their guns." -- Peterson (Zielinski)
- Calls: "Transparent, I'm going to try to answer these questions fast. I can talk a lot." / "I know that sounds really stupid" (explaining Meta's bots). -- Cade (Modi)

### 2. Sarcasm targets (platforms and industry BS only -- NEVER clients or prospects)

Google is the recurring villain. Also: AI hype, LinkedIn engagement bait, Google Ad Reps, cruise wi-fi, big-agency handoff culture. Clients are only ever defended or empathized with. This rule is absolute.

Verbatim examples:
- "Basically Google just giving you the middle finger as you try to prevent them from lighting your money on fire"
- "Worst of all, listening to Google Ad Reps lol"
- "will save you whole 5 minutes, which you can use to travel the world or something"
- "oh good, glad we have denises thoughts from AI on how to run meta ads" (internal, same instinct)

### 3. Parenthetical asides (appear in ~1/3 of authentic posts)

The main sentence stays professional or informational. The aside carries the joke, the caveat, or the honesty disclaimer. One per section maximum.

Verbatim examples:
- "(Well a coffee shop next to the beach, but close enough)"
- "(yes you have to give me your email, nothings free around here lol)"
- "(if it were this simple that would be fantastic, but then I might not have a job lol)"
- "(any one who says they have a 100%% success rate is either lying or stupid, or both lol)"
- "(No I'm not actually working on Christmas. I don't grind that hard)"
- "(I stole this analogy from someone I think, but I don't know who)"

### 4. Trailing "lol" to defuse

"lol" lands at the end of a jab or self-deprecating truth to defuse it. Always trailing, never standalone, never in the middle of a sentence. In public copy, appropriate in low-stakes zones (about page, 404 page, P.S. lines). Not in headlines or pricing copy.

Cross-corpus frequency: 20 instances across 64 LinkedIn posts, 26 in Gmail sample, 10 in Google Chat sample.

## Radical Honesty as Sales Tactic

He voluntarily caps his own claims. This is the single most distinctive anti-corporate pattern and the core of why the voice converts. The call evidence above (Sales-Call Voice section) shows this pattern is equally present in live sales conversations -- it is not a LinkedIn persona, it is the actual operating posture.

Verbatim examples from LinkedIn corpus:
- "I'm also not going to sit here and pretend this is some magical insight, it's pretty ground level stuff"
- "95%% of the clients that run as with us thru the entire 3 month intitial testing process end up with profitable ad campaigns. (any one who says they have a 100%% success rate is either lying or stupid, or both lol)"
- "If you want a plug-and-play setup, I'm not your guy."
- "It won't tell you if your ads will work. But it'll tell you what 'working' actually looks like for your business model before you spend the money."
- To a client unprompted: "don't want to recommend something you can't afford at the moment"

**Formula:** Undercut the pitch, explain the constraint honestly, then the constraint becomes the credibility signal. No marketing superlatives ("cutting-edge," "world-class," "unlock growth"). If Peterson wouldn't say it on a call, it doesn't go on the site.

## Reusable Analogy Library

Use these before inventing new metaphors. Peterson returns to them repeatedly because they stick.

| Analogy | Core idea | Verbatim quote |
|---------|-----------|----------------|
| **Vending machine** | Ads should be an investment machine, but most clients think they are | "you think of advertising as a vending machine, $1 in - $3 out" |
| **Tuition** | Ad spend buys learning/data, not just results | "Your ad spend isn't marketing budget. It's tuition." |
| **Leaky bucket** | Fix conversion holes before pouring in more spend | "you can't fix a leaky bucket by pouring in more water" |
| **Lighting money on fire** | Untracked or mis-attributed spend | "Basically Google just giving you the middle finger as you try to prevent them from lighting your money on fire" |
| **Stat padding** | Branded search inflating results | "Branded is just cheating at that point. I mean, you're just stat padding." |
| **Blowing smoke vs rubber meets the road** | Jargon vs actual performance | "I could be saying a bunch of great keywords and terminology and just kind of blowing smoke... it's really when the rubber meets the road." |
| **$5/hour handoff** | Big-agency account manager reality | "someone overseas making $5 an hour who barely speaks English" |

Persona: "your advertising financial advisor" -- use this framing when positioning what Creekside does vs a typical agency.

## CTA Patterns for Public Copy

**Public copy uses direct, pressure-free CTAs.** The 1:1 rule ("do not default to offering a call") does NOT apply here.

Authentic CTAs from the corpus:
- "Let's talk"
- "Let me know!"
- "Tired of gambling on your ads? Let's talk."
- "Worst case you get a free second opinion."
- "feel free to shoot me over any questions"

**Sales-call framing:** Frame the call as a fit-check, not a pressure close. Cade's exact framing maps directly: "Book a call. Worst case, we tell you we're not a good fit and point you somewhere better." This is the authentic voice. Never: "Don't wait! Spots are limited!" Never: "Book a FREE strategy session NOW."

**Pattern:** Invitation + remove the pressure. "Worst case you get X" is his natural framing.

## Fit-Finding Framing (BANNED: "We interview our leads")

**Banned framing (hard rule, 2026-08-12):** Never write copy that puts scrutiny or qualification pressure on the prospect -- framing them as someone being vetted, screened, or interviewed. This includes any variant of "we interview our leads, not the other way around" and any language that positions the first call or /start/ funnel as Creekside judging whether the prospect is good enough.

Peterson's directive: "It seems like we're putting a bunch of scrutiny on them. We just want to make it feel like we're helping them figure out if working together would be a good idea."

**Replacement framing:** Collaborative fit-finding. Both parties are figuring out together whether working together makes sense. The prospect is not being evaluated -- they are being helped to make a good decision for themselves.

Approved live examples now on the site (use these as models):

- "Six quick questions so we can both figure out if working together actually makes sense." (/start/ subtitle)
- "The whole point is to figure out together whether working with us actually makes sense. If it doesn't, we'll tell you that too." (homepage, How We Work step 01)
- "First call is about fit, not a pitch" (homepage differentiator bullet)

**Test:** Read the line from the prospect's perspective. Does it feel like Creekside is deciding something about them? If yes, rewrite it as mutual -- we are both figuring something out.

## P.S. Lines

Peterson uses P.S. lines in posts and some emails. They hold either the punchline or the filter condition (e.g., "US only"). He writes "P.S.S." not "P.P.S." -- this is authentic, not a typo. Preserve it.

Examples:
- "P.S. if you can't tell what's wrong with the image below, you probably use AI too much lol"
- "P.S.S. Must be US based"

Use one P.S. per landing page or long-form post. It is an on-brand structural element.

## Sentence Rhythm

Wildly uneven lengths -- this is intentional and authentic. Short fragments are beats, not dramatic mic drops.

- One-word or two-word fragments used casually: "Noted." / "Nope." / "On to the next challenge..."
- Long rambling sentences with comma splices sit right next to very short ones
- He trails off rather than wrapping with a bow: "oh well, maybe the linkedin gods will bless me again soon (I doubt it)"
- Questions and soft closes end sections: "Let me know!", "Stay tuned", "Worth a look before your spend goes up."
- Dense 3-4 sentence paragraph, then a one-line beat. ("That's a lot. Here's the short version.") This mirrors his call behavior of explaining deeply then breaking himself off to check in.

Never: symmetrical sentence pairs where two sentences mirror each other in length and structure. That is an AI tell.

## Quick Checklist (before submitting public copy)

- [ ] Zero emojis (Peterson directive 2026-08-12: public copy is emoji-free, no exceptions)
- [ ] No em dashes (use double hyphens -- or just a comma or period)
- [ ] No tricolon (three parallel clauses ending a thought)
- [ ] No "It's not X. It's Y." flip
- [ ] No tidy corporate closer ("That's the standard we set for every client.")
- [ ] No marketing superlatives -- if Peterson wouldn't say it on a call, it doesn't go on the site
- [ ] At most one parenthetical aside per section
- [ ] At most one fourth-wall break per page (never more than once per section)
- [ ] At most one vivid contrast image per page (stat padding, $5/hour handoff, or rubber meets the road -- pick one, don't stack)
- [ ] Self-deprecation or platform-sarcasm present somewhere on the page
- [ ] CTA is framed as a fit-check, not a pressure close ("Worst case, we tell you we're not a good fit")
- [ ] Analogy used is from the library above (or a new one explicitly grounded in a concrete platform mechanic)
- [ ] P.S. line used if it's a long-form post or landing page
