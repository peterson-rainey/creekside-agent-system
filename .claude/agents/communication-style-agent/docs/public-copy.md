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

## Humor Mechanics

### 1. Self-deprecation (default humor mode)

He mocks himself first, then delivers the substantive point. This builds credibility by undercutting the pitch before making it.

Verbatim examples from the authentic corpus:
- "Absolutely bombing on a sales/strategy call. ... I post plenty about how awesome we are, so figured I'd balance it out + get some free content from the worst 30min of my week lol"
- "Just realized I had my notifications for my comments turned off in settings, just wanted to apologize to the 2 people and 3 AI bots that occassionally comment."
- "I've also got an engineering degree if you want to hear about how useless college is lol"
- "I always harp on consultation calls with my clients that garbage data in = garbage results out ... I just realized this year that I wasn't even following my own best practices lol"

### 2. Sarcasm targets (platforms and industry BS only -- NEVER clients or prospects)

Google is the recurring villain. Also: AI hype, LinkedIn engagement bait, Google Ad Reps, cruise wi-fi. Clients are only ever defended or empathized with. This rule is absolute.

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

He voluntarily caps his own claims. This is the single most distinctive anti-corporate pattern and the core of why the voice converts.

Verbatim examples:
- "I'm also not going to sit here and pretend this is some magical insight, it's pretty ground level stuff"
- "95%% of the clients that run as with us thru the entire 3 month intitial testing process end up with profitable ad campaigns. (any one who says they have a 100%% success rate is either lying or stupid, or both lol)"
- "If you want a plug-and-play setup, I'm not your guy."
- "It won't tell you if your ads will work. But it'll tell you what "working" actually looks like for your business model before you spend the money."
- To a client unprompted: "don't want to recommend something you can't afford at the moment"

**Formula:** Undercut the pitch, explain the constraint honestly, then the constraint becomes the credibility signal.

## Reusable Analogy Library

Use these before inventing new metaphors. Peterson returns to them repeatedly because they stick.

| Analogy | Core idea | Verbatim quote |
|---------|-----------|----------------|
| **Vending machine** | Ads should be an investment machine, but most clients think they are | "you think of advertising as a vending machine, $1 in - $3 out" |
| **Tuition** | Ad spend buys learning/data, not just results | "Your ad spend isn't marketing budget. It's tuition." |
| **Leaky bucket** | Fix conversion holes before pouring in more spend | "you can't fix a leaky bucket by pouring in more water" |
| **Lighting money on fire** | Untracked or mis-attributed spend | "Basically Google just giving you the middle finger as you try to prevent them from lighting your money on fire" |

Persona: "your advertising financial advisor" -- use this framing when positioning what Creekside does vs a typical agency.

## CTA Patterns for Public Copy

**Public copy uses direct, pressure-free CTAs.** The 1:1 rule ("do not default to offering a call") does NOT apply here.

Authentic CTAs from the corpus:
- "Let's talk"
- "Let me know!"
- "Tired of gambling on your ads? Let's talk."
- "Worst case you get a free second opinion."
- "feel free to shoot me over any questions"

**Pattern:** Invitation + remove the pressure. "Worst case you get X" is his natural framing. Never: "Don't wait! Spots are limited!" Never: "Book a FREE strategy session NOW."

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

Never: symmetrical sentence pairs where two sentences mirror each other in length and structure. That is an AI tell.

## Quick Checklist (before submitting public copy)

- [ ] Zero emojis (Peterson directive 2026-08-12: public copy is emoji-free, no exceptions)
- [ ] No em dashes (use double hyphens -- or just a comma or period)
- [ ] No tricolon (three parallel clauses ending a thought)
- [ ] No "It's not X. It's Y." flip
- [ ] No tidy corporate closer ("That's the standard we set for every client.")
- [ ] At most one parenthetical aside per section
- [ ] Self-deprecation or platform-sarcasm present somewhere on the page
- [ ] CTA is a casual invitation, not a pressure close
- [ ] Analogy used is from the vending machine / tuition / leaky bucket / fire library (or a new one explicitly grounded in a concrete platform mechanic)
- [ ] P.S. line used if it's a long-form post or landing page
