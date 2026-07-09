#!/usr/bin/env python3
"""
Deterministic SDR response validator.

Usage:
    python3 validate_response.py <response_file>
    echo "response text" | python3 validate_response.py

Exit codes:
    0 = PASS (no issues)
    1 = WARN (auto-fixed, fixed text written to stdout)
    2 = BLOCK (must rewrite, issues written to stderr)

Output format:
    VERDICT: PASS|WARN|BLOCK
    ISSUES: issue1; issue2; ...
    ---FIXED---
    (auto-fixed response text, only if WARN)
"""
import re
import sys

# ---------------------------------------------------------------------------
# BLOCK patterns -- any match = response must be rewritten by the agent
# ---------------------------------------------------------------------------
BLOCK_PATTERNS = [
    # Hourly rates: any $/hr figure
    (r'\$\d[\d,]*\s*/\s*h(?:ou)?r', "hourly_rate"),
    (r'\$\d[\d,]*\s+per\s+hour', "hourly_rate"),
    (r'\$\d[\d,]*\s*hourly', "hourly_rate"),

    # Placeholder brackets: [text] but not [No ...] or URLs like [link]
    (r'\[(?!No |no |http)[A-Za-z][^\]]{1,}\]', "placeholder_brackets"),

    # Timeline commitments: specific days
    (r'\b(?:by|before)\s+(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b', "timeline_day"),
    # Timeline commitments: specific durations (unless softened)
    (r'\bwithin\s+\d+\s+(?:days?|weeks?|business days?)\b(?!\s*(?:typically|usually|generally|on average))', "timeline_duration"),
    # Launch commitments
    (r'\b(?:live|launched|ready|done)\s+by\b', "timeline_launch"),

    # Hard-banned phrases
    (r'[Bb]efore we lock anything in', "banned_before_lock"),
    (r'(?:I|[Ww]e)\s+charge for consultations', "banned_charge_consult"),

    # Placeholder calendar links
    (r'\[(?:calendar|Calendar)\s*(?:link|Link)\]', "placeholder_calendar"),
    (r'\[insert\b', "placeholder_insert"),

    # Off-platform contact info: email addresses (Upwork compliance -- never
    # include any email address in a response, even Creekside's own)
    (r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', "email_address"),

    # Pricing policy: retainer/onboarding/setup-fee constructions
    # Dollar/number adjacent to a fee keyword is the signal.
    # A bare dollar amount alone (e.g. "$5,000/month in ad spend") must NOT block.
    # Retainer patterns: require $ OR K/k suffix to avoid bare numbers.
    # Allow "a month" / "per month" as alternatives to /mo between amount and retainer.
    (r'\$[\d,]+[Kk]?(?:/mo(?:nth)?|(?:\s+(?:a|per)\s+month))?\s*(?:flat\s+)?retainer', "pricing_retainer_fee"),
    (r'[\d,]+[Kk](?:/mo(?:nth)?|(?:\s+(?:a|per)\s+month))?\s*(?:flat\s+)?retainer', "pricing_retainer_fee"),
    # Onboarding fee: amount before keyword ($-required or K/k suffix)
    (r'\$[\d,]+[Kk]?\s*onboarding\s*fee', "pricing_onboarding_fee"),
    (r'[\d,]+[Kk]\s*onboarding\s*fee', "pricing_onboarding_fee"),
    # Onboarding fee: keyword before amount (widen bridge: of/is/runs/:/-- optional)
    (r'onboarding\s*fee\s*(?:(?:of|is|runs|:|-{1,2})\s*)?\$[\d,]+[Kk]?', "pricing_onboarding_fee"),
    # Setup fee: amount before keyword ($-required or K/k suffix)
    (r'\$[\d,]+[Kk]?\s*setup\s*fee', "pricing_setup_fee"),
    (r'[\d,]+[Kk]\s*setup\s*fee', "pricing_setup_fee"),
    # Setup fee: keyword before amount (widen bridge: of/is/runs/:/-- optional)
    (r'setup\s*fee\s*(?:(?:of|is|runs|:|-{1,2})\s*)?\$[\d,]+[Kk]?', "pricing_setup_fee"),
    (r'one[- ]time\s+\$[\d,]+[Kk]?\s*setup', "pricing_setup_fee"),
    (r'\$[\d,]+[Kk]?\s*flat\s*fee', "pricing_flat_fee"),
    (r'flat\s*fee\s*(?:of\s*)?\$[\d,]+[Kk]?', "pricing_flat_fee"),

    # Pricing policy: spend-floor/minimum-as-condition-of-working-together
    (r'\bour\s+floor\b', "pricing_spend_floor"),
    (r'\bhard\s+(?:cap|minimum)\s+of\s+.{0,20}minimum', "pricing_spend_floor"),
    (r"\bminimum\s+I'?d\s+want\s+to\s+see\b", "pricing_spend_floor"),
    (r'\bminimum\s+for\s+any\s+client\b', "pricing_spend_floor"),
    (r"\bthat'?s\s+our\s+minimum\b", "pricing_spend_floor"),

    # Pricing policy: disqualification language
    (r'\bhave\s+to\s+pass\s+on\b', "disqualification_language"),
    (r'\bgoing\s+to\s+pass\s+on\s+this\b', "disqualification_language"),
    (r'\bbudget\s+is\s+(?:just\s+)?too\s+low\b', "disqualification_language"),
    (r'\btoo\s+low\s+for\s+our\s+services\b', "disqualification_language"),
    (r"don'?t\s+have\s+options\s+that\s+low\b", "disqualification_language"),
    (r"\bwe\s+probably\s+aren'?t\s+the\s+right\s+fit\b", "disqualification_language"),
]

# Structural BLOCK: call suggested without a real URL
CALL_WORDS = [
    'hop on a call', 'schedule a call', 'book a time', 'grab a time',
    'book a call', 'get on a call', 'jump on a call',
]

# ---------------------------------------------------------------------------
# WARN patterns -- auto-fixable
# Each tuple: (compiled_regex, category, fix_function_or_None)
# ---------------------------------------------------------------------------

FLUFF_OPENERS = [
    r'^Good questions?[,.\s]',
    r'^Thanks for the detail',
    r'^Appreciate the context',
    r'^Really helpful',
    r'^Great question',
    r'^Thanks for putting this together',
    r"^Got it,?\s*(?:that'?s?\s*)?helpful(?:\s*context)?[,.\s]",
    r"^That'?s helpful",
]

SETUP_SENTENCES = [
    r"I'll be honest\b",
    r"I want to be straight\b",
    r"I want to be upfront\b",
    r"I'll be straight about that\b",
    r"Fair question\b",
    r"I'll give you a straight answer\b",
    r"To be transparent\b",
]

SEAL_CLAPPING = [
    r"I like the direction",
    r"That's a smart approach",
    r"Your instinct is right",
    r"Your concern is the right one",
    r"That's the right question",
    r"You're thinking about this the right way",
    r"Smart thinking",
]

BANNED_PHRASES = [
    (r"I'?d be happy to\b", "I can"),
    (r"I'?d love to\b", "I can"),
    (r"I'?m excited to\b", "I"),
    (r"Thank you for reaching out", ""),
    (r"Please don'?t hesitate", ""),
    (r"I hope this message finds you", ""),
    (r"Best regards", ""),
    (r"Kind regards", ""),
    (r"Warm regards", ""),
    (r"Thanks in advance", ""),
    (r"Per our conversation", ""),
    (r"Moving forward", ""),
    (r"Feel free to reach out", "you know where to find me"),
    (r"Feel free to\b", "you can"),
    (r"\bleverage\b", "use"),
    (r"\butilize\b", "use"),
    (r"\bfacilitate\b", "help with"),
    (r"\bdelve\b", "dig into"),
]

FORMAL_TRANSITIONS = [
    (r"\bFurthermore\b", "And"),
    (r"\bMoreover\b", "And"),
    (r"\bAdditionally\b", "Also"),
    (r"\bIn conclusion\b", ""),
    (r"\bThat said\b", "But"),
]


def check_blocks(text):
    """Check for BLOCK-level issues. Returns list of (category, match_text)."""
    issues = []

    for pattern, category in BLOCK_PATTERNS:
        m = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
        if m:
            issues.append((category, m.group()))

    # Structural: call suggested without calendar URL
    text_lower = text.lower()
    if any(w in text_lower for w in CALL_WORDS):
        if 'https://' not in text and 'http://' not in text:
            issues.append(("missing_calendar_link", "(call suggested but no URL)"))

    return issues


def check_and_fix_warns(text):
    """Check for WARN-level issues and auto-fix. Returns (fixed_text, issues_found)."""
    issues = []
    fixed = text

    # 1. Fluff openers (remove from start)
    for pat in FLUFF_OPENERS:
        m = re.match(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("fluff_opener", m.group().strip()))
            # Remove the opener and any trailing whitespace/punctuation
            fixed = fixed[m.end():].lstrip(' ,.')
            # Capitalize the new first character
            if fixed:
                fixed = fixed[0].upper() + fixed[1:]

    # 2. Setup sentences (remove the sentence containing them)
    for pat in SETUP_SENTENCES:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("setup_sentence", m.group()))
            # Remove from start of sentence to the period/end
            # Find sentence boundaries
            start = fixed.rfind('.', 0, m.start())
            start = start + 1 if start >= 0 else 0
            end = fixed.find('.', m.end())
            end = end + 1 if end >= 0 else m.end()
            sentence = fixed[start:end].strip()
            if len(sentence) < len(fixed) * 0.5:  # Don't remove if it's most of the response
                fixed = (fixed[:start] + fixed[end:]).strip()

    # 3. Seal clapping (remove the sentence)
    for pat in SEAL_CLAPPING:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("seal_clapping", m.group()))
            start = fixed.rfind('.', 0, m.start())
            start = start + 1 if start >= 0 else 0
            end = fixed.find('.', m.end())
            end = end + 1 if end >= 0 else m.end()
            sentence = fixed[start:end].strip()
            if len(sentence) < len(fixed) * 0.5:
                fixed = (fixed[:start] + fixed[end:]).strip()

    # 4. Em dashes -> commas (consume surrounding whitespace to avoid
    #    "word , word" spacing artifacts)
    if '\u2014' in fixed:
        issues.append(("em_dash", "\u2014"))
        fixed = re.sub(r'\s*\u2014\s*', ', ', fixed)
    # Double-hyphen em dash (but not in URLs)
    if ' -- ' in fixed:
        # Don't replace inside URLs
        parts = re.split(r'(https?://\S+)', fixed)
        for i, part in enumerate(parts):
            if not part.startswith('http'):
                if ' -- ' in part:
                    issues.append(("em_dash_double", " -- "))
                    parts[i] = part.replace(' -- ', ', ')
        fixed = ''.join(parts)

    # 5. Formal transitions
    for pat, replacement in FORMAL_TRANSITIONS:
        m = re.search(pat, fixed)
        if m:
            issues.append(("formal_transition", m.group()))
            fixed = re.sub(pat, replacement, fixed)

    # 6. Banned phrases
    for pat, replacement in BANNED_PHRASES:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("banned_phrase", m.group()))
            fixed = re.sub(pat, replacement, fixed, flags=re.IGNORECASE)

    # 7. "agency" as standalone word (self-description ban)
    # Exempt when "agency" clearly refers to the lead's past/other agencies in a
    # question or past-experience context. The ban covers describing OURSELVES as
    # an agency -- not asking the lead about their history with other agencies.
    AGENCY_PAST_EXPERIENCE_PATTERNS = [
        r'worked\s+with\s+an\s+agency',
        r'an\s+agency\s+or\s+freelancer',
        r'your\s+(?:last|previous|current|prior)\s+agency',
        r'experience\s+with\s+an?\s+agency',
        r'past\s+agency',
        r'another\s+agency',
        r'other\s+agencies',
        r'previous\s+agency',
    ]

    agency_matches = list(re.finditer(r'\bagency\b', fixed, re.IGNORECASE))
    for m in reversed(agency_matches):  # reverse to preserve positions
        context = fixed[max(0, m.start()-50):m.end()+50].lower()

        # Skip: past-experience/question context (lead's agencies, not ours)
        if any(re.search(p, context) for p in AGENCY_PAST_EXPERIENCE_PATTERNS):
            continue

        # Skip: negation -- covered by "defining by negation" rule
        if 'not an agency' in context or "aren't an agency" in context:
            continue

        # Self-description replacements
        if 'your agency' in context or 'their agency' in context or 'the agency' in context:
            replacement = 'marketing company'
        elif 'an agency' in context:
            replacement = 'a marketing company'
        else:
            replacement = 'paid ads team'
        issues.append(("agency_word", m.group()))
        fixed = fixed[:m.start()] + replacement + fixed[m.end():]

    # 8. Defining by negation
    negation_patterns = [
        (r"We don'?t do hourly\.?", "We work on custom retainers."),
        (r"We actually don'?t do [^.]+\.?", ""),
        (r"We'?re not an agency\.?", "We specialize in paid ads."),
    ]
    for pat, repl in negation_patterns:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("defining_by_negation", m.group()))
            fixed = re.sub(pat, repl, fixed, flags=re.IGNORECASE).strip()

    # 9. Markdown formatting
    # Bold
    bold_matches = re.findall(r'\*\*([^*]+)\*\*', fixed)
    if bold_matches:
        issues.append(("markdown_bold", f"**{bold_matches[0]}**"))
        fixed = re.sub(r'\*\*([^*]+)\*\*', r'\1', fixed)
    # Italic (single asterisk, not in URLs or contractions)
    italic_matches = re.findall(r'(?<!\*)\*([^*\n]+)\*(?!\*)', fixed)
    if italic_matches:
        issues.append(("markdown_italic", f"*{italic_matches[0]}*"))
        fixed = re.sub(r'(?<!\*)\*([^*\n]+)\*(?!\*)', r'\1', fixed)
    # Headers
    if re.search(r'^#+\s', fixed, re.MULTILINE):
        issues.append(("markdown_header", "# header"))
        fixed = re.sub(r'^#+\s+', '', fixed, flags=re.MULTILINE)
    # Bullet lists (- or * at start of line)
    if re.search(r'^\s*[-*]\s', fixed, re.MULTILINE):
        issues.append(("markdown_bullets", "- bullet list"))
        # Convert bullets to plain sentences
        fixed = re.sub(r'^\s*[-*]\s+', '', fixed, flags=re.MULTILINE)

    # 10. Markdown links [text](url) -> just the url
    md_links = re.findall(r'\[([^\]]+)\]\((https?://[^)]+)\)', fixed)
    if md_links:
        issues.append(("markdown_link", f"[{md_links[0][0]}]({md_links[0][1]})"))
        fixed = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'\2', fixed)

    # 11. Signatures (trailing)
    sig_patterns = [
        r'\n\s*Samuel\s*$',
        r'\n\s*Lindsey\s*$',
        r'\n\s*Best,?\s*$',
        r'\n\s*Regards,?\s*$',
        r'\n\s*Best regards,?\s*$',
        r'\n\s*Kind regards,?\s*$',
        r'\n\s*Warm regards,?\s*$',
        r'\n\s*Cheers,?\s*$',
    ]
    for pat in sig_patterns:
        m = re.search(pat, fixed, re.IGNORECASE | re.MULTILINE)
        if m:
            issues.append(("signature", m.group().strip()))
            fixed = fixed[:m.start()].rstrip()

    # 12. Pre-call work offers (unless "on a/the call" nearby)
    precall_patterns = [
        r"I'?ll put together",
        r"I will send over",
        r"we'?ll build out",
        r"I'?ll prepare",
        r"I'?ll create",
        r"I'?ll draft",
        r"we will prepare",
        r"we will create",
        r"we will draft",
    ]
    for pat in precall_patterns:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            context = fixed[max(0, m.start()-40):min(len(fixed), m.end()+40)].lower()
            if 'on a call' not in context and 'on the call' not in context and 'during the call' not in context:
                issues.append(("pre_call_work_offer", m.group()))
                # Don't auto-fix these -- they need contextual rewriting by the agent

    # 13. Percentage-of-spend tiers (report-only WARN -- no auto-fix)
    # Allowed as Stage 2 answer only (lead already got custom/performance answer
    # AND explicitly asked for a rough range). Validator can't see conversation
    # stage, so it flags for human/agent review.
    # Anchor on "% of ad spend" or "percent of" near a number, or tier step-downs.
    # Avoid triggering on unrelated ROAS percentages like "ROAS at 4.5x while spend
    # scaled 20%" by requiring the ad-spend context phrase.
    tier_patterns = [
        r'\b\d+\s*%\s*of\s*ad\s*spend\b',
        r'\bpercentage\s+of\s+(?:ad\s+)?spend\b',
        r'\b\d+\s*percent\s+of\s+(?:ad\s+)?spend\b',
        r'\bstep(?:ping)?\s+down\s+to\s+\d+\s*%',
    ]
    for pat in tier_patterns:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append((
                "pricing_tier_detected",
                f"{m.group()} -- percentage tiers detected: allowed ONLY as "
                "Stage 2 answer (lead already got the custom/performance-based "
                "answer and explicitly asked for a rough range)",
            ))
            break  # One WARN is enough; don't stack duplicates

    # Clean up double spaces and double newlines from removals
    fixed = re.sub(r'  +', ' ', fixed)
    fixed = re.sub(r'\n{3,}', '\n\n', fixed)
    fixed = fixed.strip()

    return fixed, issues


def validate(text):
    """
    Run full validation. Returns (verdict, block_issues, warn_issues, fixed_text).
    """
    block_issues = check_blocks(text)
    fixed_text, warn_issues = check_and_fix_warns(text)

    if block_issues:
        return "BLOCK", block_issues, warn_issues, text
    elif warn_issues:
        return "WARN", block_issues, warn_issues, fixed_text
    else:
        return "PASS", [], [], text


def main():
    # Read response text from file argument or stdin
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r') as f:
            text = f.read().strip()
    else:
        text = sys.stdin.read().strip()

    if not text:
        print("VERDICT: BLOCK", file=sys.stderr)
        print("ISSUES: empty_response", file=sys.stderr)
        sys.exit(2)

    verdict, block_issues, warn_issues, fixed_text = validate(text)

    # Output verdict and issues
    all_issues = []
    for category, match in block_issues:
        all_issues.append(f"BLOCK:{category}:{match}")
    for category, match in warn_issues:
        all_issues.append(f"WARN:{category}:{match}")

    print(f"VERDICT: {verdict}")
    if all_issues:
        print(f"ISSUES: {'; '.join(all_issues)}")
    else:
        print("ISSUES: none")

    if verdict == "WARN":
        print("---FIXED---")
        print(fixed_text)
    elif verdict == "BLOCK":
        print("---BLOCKED---")
        for category, match in block_issues:
            print(f"  {category}: {match}", file=sys.stderr)

    # Exit codes
    if verdict == "PASS":
        sys.exit(0)
    elif verdict == "WARN":
        sys.exit(1)
    else:
        sys.exit(2)


if __name__ == "__main__":
    main()
