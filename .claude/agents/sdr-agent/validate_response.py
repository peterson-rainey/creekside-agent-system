#!/usr/bin/env python3
"""
Deterministic SDR response validator.

Usage:
    python3 validate_response.py <response_file> [--profile samuel|lindsey]
    python3 validate_response.py --profile lindsey <response_file>
    echo "response text" | python3 validate_response.py [--profile samuel|lindsey]

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
# Calendar URL whitelist (FIX A)
# Any calendar.app.google or calendly.com URL not in this set is a BLOCK.
# ---------------------------------------------------------------------------
CALENDAR_URL_WHITELIST = {
    "https://calendar.app.google/wSdVbfwaJRzkw12E7",   # samuel
    "https://calendly.com/lindsey-bouffard/30min",       # lindsey
    "https://calendar.app.google/nFP1Brwxz1TsetBA6",   # jay
}

# Regex to find any calendar.app.google or calendly.com URL in the response
_CALENDAR_URL_RE = re.compile(
    r'https?://(?:calendar\.app\.google|calendly\.com)/\S+',
    re.IGNORECASE,
)

# ---------------------------------------------------------------------------
# BLOCK patterns -- any match = response must be rewritten by the agent
# ---------------------------------------------------------------------------
BLOCK_PATTERNS = [
    # Hourly rates: any $/hr figure
    (r'\$\d[\d,]*\s*/\s*h(?:ou)?r', "hourly_rate"),
    (r'\$\d[\d,]*\s*hourly', "hourly_rate"),

    # Placeholder brackets: [text] but not [No ...], URLs, or markdown links [text](url)
    (r'\[(?!No |no |http)[A-Za-z][^\]]{1,}\](?!\()', "placeholder_brackets"),

    # Timeline commitments: specific days
    (r'\b(?:by|before)\s+(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b', "timeline_day"),
    # Timeline commitments: specific durations (unless softened)
    (r'\bwithin\s+\d+\s+(?:days?|weeks?|business days?)\b(?!\s*(?:typically|usually|generally|on average))', "timeline_duration"),
    # Launch commitments: only block when "by" is followed by a temporal expression.
    # Temporal expressions include:
    #   - Named days (Mon-Sun), optionally preceded by "the"
    #   - tomorrow / next week / next month
    #   - end/beginning/start/middle of ... (optionally preceded by "the")
    #   - the weekend
    #   - named months
    #   - any digit (existing catch-all for "by 3pm", "by 2026", etc.)
    #   - digit ordinals: "the 15th", "the 1st"
    #   - word ordinals ONLY when followed by "of the/a month/year/week"
    #     (so "by the second call" does NOT match, but "by the first of the month" does)
    (
        r'\b(?:live|launched|ready|done)\s+by\s+'
        r'(?:'
            r'(?:the\s+)?(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)'
            r'|tomorrow'
            r'|next\s+(?:week|month)'
            r'|(?:the\s+)?(?:end|beginning|start|middle)\s+of'
            r'|the\s+weekend'
            r'|(?:January|February|March|April|May|June|July|August|September|October|November|December)'
            r'|\d'
            r'|(?:the\s+)?\d{1,2}(?:st|nd|rd|th)'
            r'|(?:the\s+)?(?:first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth'
                r'|eleventh|twelfth|thirteenth|fourteenth|fifteenth|sixteenth|seventeenth'
                r'|eighteenth|nineteenth|twentieth|twenty[-\s]first|twenty[-\s]second'
                r'|twenty[-\s]third|thirtieth|thirty[-\s]first)\s+of\s+(?:the\s+|a\s+)?(?:month|year|week)'
        r')',
        "timeline_launch"
    ),

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

    # Hourly phrasing: "$50 an hour" / "$50 per hour"
    (r'\$\d[\d,]*(?:\.\d+)?\s*(?:an|per)\s+h(?:ou)?r', "hourly_rate"),

    # Retainer word orders: amount + monthly + retainer, or retainer keyword-first with amount
    (r'\$[\d,]+[Kk]?(?:/mo(?:nth)?|(?:\s+(?:a|per)\s+month))?\s+monthly\s+retainer', "pricing_retainer_fee"),
    (r'[\d,]+[Kk](?:/mo(?:nth)?|(?:\s+(?:a|per)\s+month))?\s+monthly\s+retainer', "pricing_retainer_fee"),
    (r'retainer\s+(?:is|of|runs(?:\s+at)?|at)\s+\$[\d,]+[Kk]?', "pricing_retainer_fee"),
    (r'retainer\s+(?:is|of|runs(?:\s+at)?|at)\s+[\d,]+[Kk]', "pricing_retainer_fee"),

    # Setup fee variants: hyphen and space
    (r'\$[\d,]+[Kk]?\s*set[- ]up\s+fee', "pricing_setup_fee"),
    (r'[\d,]+[Kk]\s*set[- ]up\s+fee', "pricing_setup_fee"),
    (r'set[- ]up\s+fee\s*(?:(?:of|is|runs|:|-{1,2})\s*)?\$[\d,]+[Kk]?', "pricing_setup_fee"),
    # Onboarding without "fee": "Onboarding is/runs/costs $X"
    (r'\bonboarding\s+(?:is|runs|costs)\s+\$[\d,]+[Kk]?', "pricing_onboarding_fee"),

    # Timeline: within N months / in N months
    (r'\bwithin\s+\d+\s+months?\b(?!\s*(?:typically|usually|generally|on average))', "timeline_duration"),
    (r'\bin\s+\d+\s+months?\b(?!\s+ago)(?!\s*(?:typically|usually|generally|on average))', "timeline_duration"),

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
    (r'[Ll]ook\s+forward\s+to\s+hearing\s+back\b', ""),
]

FORMAL_TRANSITIONS = [
    (r"\bFurthermore\b", "And"),
    (r"\bMoreover\b", "And"),
    (r"\bAdditionally\b", "Also"),
    (r"\bIn conclusion\b", ""),
    (r"\bThat said\b", "But"),
]


SPEND_FLOOR_NEGATION = re.compile(
    r"(?:no\s+|there'?s\s+no\s+|there\s+is\s+no\s+|without\s+a\s+)",
    re.IGNORECASE,
)

def check_blocks(text, profile="samuel"):
    """
    Check for BLOCK-level issues. Returns list of (category, match_text).

    profile: 'samuel' (default) or 'lindsey'.
    When profile='lindsey', any calendar.app.google URL is a BLOCK -- Lindsey
    may only use https://calendly.com/lindsey-bouffard/30min. Samuel's and
    Jay's calendar.app.google links must never appear in a lindsey draft.
    If Jay's link is genuinely needed, the operator must handle that routing
    manually rather than including it in a Lindsey-profile response.
    """
    issues = []

    for pattern, category in BLOCK_PATTERNS:
        m = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
        if m:
            # Negation guard for spend-floor patterns
            if category == "pricing_spend_floor":
                prefix = text[max(0, m.start() - 20):m.start()]
                if SPEND_FLOOR_NEGATION.search(prefix):
                    continue
            issues.append((category, m.group()))

    # Structural: call suggested without calendar URL
    text_lower = text.lower()
    if any(w in text_lower for w in CALL_WORDS):
        if 'https://' not in text and 'http://' not in text:
            issues.append(("missing_calendar_link", "(call suggested but no URL)"))

    # Calendar URL whitelist check (B1)
    # Profile-aware: when profile=lindsey, any calendar.app.google URL is a BLOCK.
    # Lindsey may only use https://calendly.com/lindsey-bouffard/30min.
    # When profile=samuel or absent, the standard three-URL whitelist applies.
    for url_match in _CALENDAR_URL_RE.finditer(text):
        url = url_match.group().rstrip('.,;)')  # strip trailing punctuation
        if profile == "lindsey":
            # For Lindsey drafts: calendar.app.google is never allowed
            if "calendar.app.google" in url:
                issues.append((
                    "lindsey_calendar_app_google_url",
                    f"{url} -- Lindsey profile may only use "
                    "https://calendly.com/lindsey-bouffard/30min; "
                    "calendar.app.google links (Samuel, Jay) are not permitted in Lindsey drafts; "
                    "if Jay routing is needed, flag for operator handling",
                ))
            elif url not in CALENDAR_URL_WHITELIST:
                issues.append((
                    "non_whitelisted_calendar_url",
                    f"{url} -- only approved URLs are samuel: "
                    "https://calendar.app.google/wSdVbfwaJRzkw12E7 | "
                    "lindsey: https://calendly.com/lindsey-bouffard/30min | "
                    "jay: https://calendar.app.google/nFP1Brwxz1TsetBA6",
                ))
        else:
            # samuel (default) or unknown profile: standard whitelist
            if url not in CALENDAR_URL_WHITELIST:
                issues.append((
                    "non_whitelisted_calendar_url",
                    f"{url} -- only approved URLs are samuel: "
                    "https://calendar.app.google/wSdVbfwaJRzkw12E7 | "
                    "lindsey: https://calendly.com/lindsey-bouffard/30min | "
                    "jay: https://calendar.app.google/nFP1Brwxz1TsetBA6",
                ))

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
            # Capitalize the new first character (skip if it starts with a URL)
            if fixed and not fixed.startswith(('http://', 'https://', 'www.')):
                fixed = fixed[0].upper() + fixed[1:]

    # 2. Setup sentences (remove the sentence containing them)
    def _find_sentence_bounds(text, match_start, match_end):
        """Find sentence start/end treating '.', '?', '!' as boundaries."""
        # Find sentence start: rfind over all terminators, take the rightmost
        s_dot = text.rfind('.', 0, match_start)
        s_que = text.rfind('?', 0, match_start)
        s_exc = text.rfind('!', 0, match_start)
        start_marker = max(s_dot, s_que, s_exc)
        start = start_marker + 1 if start_marker >= 0 else 0
        # Find sentence end: find over all terminators, take the leftmost found
        candidates = []
        e_dot = text.find('.', match_end)
        e_que = text.find('?', match_end)
        e_exc = text.find('!', match_end)
        if e_dot >= 0:
            candidates.append(e_dot)
        if e_que >= 0:
            candidates.append(e_que)
        if e_exc >= 0:
            candidates.append(e_exc)
        if candidates:
            end = min(candidates) + 1
        else:
            end = match_end
        return start, end

    def _remove_phrase_only(text, m):
        """
        Fallback when the full-sentence removal guard fires (sentence >= 50% of text).
        Remove only the matched phrase plus an adjacent comma/space, then clean up
        spacing and capitalize the following character if it now opens the text.
        """
        start, end = m.start(), m.end()
        # Consume a trailing comma+space or leading comma+space around the phrase
        if end < len(text) and text[end] == ',':
            end += 1
            if end < len(text) and text[end] == ' ':
                end += 1
        elif start > 0 and text[start - 1] == ' ' and start > 1 and text[start - 2] == ',':
            start -= 2
        elif start > 0 and text[start - 1] in (' ', ','):
            start -= 1
        result = (text[:start] + text[end:]).strip()
        result = re.sub(r'  +', ' ', result)
        # Capitalize the new first alphabetical character if not a URL
        if result and not result.startswith(('http://', 'https://', 'www.')):
            for i, ch in enumerate(result):
                if ch.isalpha():
                    result = result[:i] + ch.upper() + result[i + 1:]
                    break
        return result

    for pat in SETUP_SENTENCES:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("setup_sentence", m.group()))
            start, end = _find_sentence_bounds(fixed, m.start(), m.end())
            sentence = fixed[start:end].strip()
            if len(sentence) < len(fixed) * 0.5:  # Don't remove if it's most of the response
                fixed = (fixed[:start] + fixed[end:]).strip()
            else:
                # Guard fired: remove only the matched phrase to prevent re-triggering
                fixed = _remove_phrase_only(fixed, m)

    # 3. Seal clapping (remove the sentence)
    for pat in SEAL_CLAPPING:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("seal_clapping", m.group()))
            start, end = _find_sentence_bounds(fixed, m.start(), m.end())
            sentence = fixed[start:end].strip()
            if len(sentence) < len(fixed) * 0.5:
                fixed = (fixed[:start] + fixed[end:]).strip()
            else:
                # Guard fired: remove only the matched phrase to prevent re-triggering
                fixed = _remove_phrase_only(fixed, m)

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
        r'their\s+(?:last|previous|current|old)\s+agency',
        r'(?:his|her)\s+(?:last|previous|current|old)\s+agency',
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

        # Self-description replacements ("their agency" is now exempt via past-experience patterns above)
        if 'your agency' in context or 'the agency' in context:
            replacement = 'marketing company'
            issues.append(("agency_word", m.group()))
            fixed = fixed[:m.start()] + replacement + fixed[m.end():]
        else:
            # Check if preceded by article "an" to replace "an agency" as a unit
            look_back = fixed[max(0, m.start()-4):m.start()]
            an_match = re.search(r'\b([Aa])n\s+$', look_back)
            if an_match:
                article_start = m.start() - len(an_match.group())
                repl = 'A marketing company' if an_match.group(1) == 'A' else 'a marketing company'
                issues.append(("agency_word", fixed[article_start:m.end()]))
                fixed = fixed[:article_start] + repl + fixed[m.end():]
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

    # 13. Anti-fabrication: suspicious client-count and geographic-coverage claims (WARN, no auto-fix)
    # These fire on fabrication patterns observed in smoke tests. They are WARN not BLOCK because
    # legitimate responses can sometimes contain these patterns (e.g., genuinely retrieved data).
    # The agent must confirm the fact is in verified context before proceeding.
    fabrication_patterns = [
        # Client count with specific number: "90+ active accounts", "80 active clients"
        (r'\b\d+\+?\s*(?:active\s+)?(?:accounts?|clients?)\b',
         "fabrication_client_count -- never state a specific client count unless present in "
         "verified retrieved context (case study table, company rules, or pasted thread)"),
        # Geographic overclaim: "all 50 states"
        (r'\ball\s+50\s+states\b',
         "fabrication_geographic_claim -- never claim 'all 50 states' unless present in "
         "verified retrieved context"),
    ]
    for pat, label in fabrication_patterns:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("fabrication_warn", f"{m.group()} -- {label}"))

    # 13b. Slug-URL check: named case-study client without a slug URL (WARN, no auto-fix -- G25 fix)
    # If the response names a known case-study client, it must also contain that client's slug URL.
    # Hub-only responses (creeksidemarketingpros.com/case-study-digital-marketing/ with no slug)
    # pass only when the response does NOT name a specific client.
    # This list covers all clients in the case study table. Names that appear as substrings of
    # other words are wrapped in word-boundary patterns to avoid false positives.
    _CASE_STUDY_CLIENTS = [
        ("Dr. Laleh", "dr-laleh"),
        ("Polaris Dentistry", "polaris-dentistry"),
        ("Aura Displays", "aura-displays"),
        ("Chagrin Valley", "chagrin-valley-beauty"),
        ("Fitness Superstore", "fitness-superstore"),
        ("Join Piper", "join-piper"),
        ("Florida Awnings", "florida-awnings"),
        ("Landmark Lawn", "landmark-lawn"),
        ("LawnValue", "lawnvalue"),
        ("Perfect Parking", "perfect-parking"),
        ("UrCovered", "urcovered-construction"),
        ("Big Chad Law", "big-chad-law"),
        ("Winterbotham", "winterbotham-parham-teeple"),
        ("CI Lifestyle", "ci-lifestyle-meals"),
        ("Duck A Diet", "duck-a-diet"),
        ("Punch Drunk Chef", "punch-drunk-chef"),
        ("Unrefined Meal", "unrefined-meal-prep"),
        ("Advanced Medical Spa", "advanced-medical-spa"),
        ("Integrity Naturopathic", "integrity-naturopathic"),
        ("Root Hair", "root-hair"),
        ("South River Mortgage", "south-river-mortgage"),
        ("Green Shield Pest", "green-shield-pest"),
        ("ReferPro", "referpro"),
        ("American Foam Products", "american-foam-products"),
        ("GPP Industrial", "gpp-industrial"),
        ("Axle Solutions", "axle-solutions"),
        ("Adventures in Wisdom", "adventures-in-wisdom"),
        ("Birthday Club", "birthday-club-app"),
        ("NYC Notary", "nyc-notary"),
        ("Luggage Drop", "luggage-drop"),
    ]
    _CASE_STUDY_BASE = "creeksidemarketingpros.com/case-study-digital-marketing/"
    # Only run this check when the response contains the base case-study domain
    # (i.e., the response is attempting to share proof -- not a general message).
    if _CASE_STUDY_BASE in fixed:
        for client_name, slug in _CASE_STUDY_CLIENTS:
            # Check if client name appears in the response (case-insensitive)
            if re.search(re.escape(client_name), fixed, re.IGNORECASE):
                # Check if the slug URL also appears
                if slug not in fixed.lower():
                    issues.append((
                        "missing_slug_url",
                        f"{client_name} named but slug URL '.../{slug}' not found -- "
                        "either add the full slug URL or remove the client name and use the hub page",
                    ))

    # 14b. Hours-scoped engagement phrasing (WARN, no auto-fix -- FIX E)
    # We never accept, quote, or scope work by hours. When a lead requests hours-based
    # help, address the underlying need within our engagement model (custom retainer,
    # performance-based). Never parrot the lead's hour count or promise an hours breakdown.
    hours_scoped_patterns = [
        (r'\b\d+\s*[-\u2013]\s*\d+\s+hours?\b',
         "hours_scoped_engagement -- never accept or quote hours-based scoping; "
         "address the underlying need within our retainer/performance model"),
        (r'\bhours?\s+breaks?\s+down\b',
         "hours_scoped_engagement -- never promise a breakdown of how hours will be spent; "
         "reframe around our retainer/performance engagement model"),
        (r'\bper\s+hour\s+of\s+work\b',
         "hours_scoped_engagement -- never reference per-hour-of-work framing; "
         "reframe around our retainer/performance engagement model"),
    ]
    for pat, label in hours_scoped_patterns:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("hours_scoped_warn", f"{m.group()} -- {label}"))
            break  # One WARN is enough; don't stack duplicates

    # 14a. "Cade" in lead-facing response (WARN, no auto-fix -- FIX A)
    # Cade is an internal team member. He must never be referenced in lead-facing messages.
    # Routing targets are the active profile persona (Samuel/Lindsey) and Jay only.
    cade_match = re.search(r'\bCade\b', fixed)
    if cade_match:
        issues.append((
            "internal_name_cade",
            "Cade -- internal team member must not appear in lead-facing text; "
            "routing targets are the active profile persona and Jay only",
        ))

    # 14c. AI/humanity denial patterns (WARN, no auto-fix)
    # Claiming messages are "not automated", "not templated", "hand-typed", or fabricating
    # personal-life details to imply humanity are all banned humanity claims.
    # These are WARN (not BLOCK) because they require contextual judgment -- the script
    # catches the most common surface forms; the agent must also check manually.
    humanity_denial_patterns = [
        (r'\bnot\s+automated\b',
         "humanity_claim -- claiming messages are 'not automated' is a banned AI-identity claim; "
         "use neutral process framing instead"),
        (r'\bnot\s+templated\b',
         "humanity_claim -- claiming messages are 'not templated' is a banned AI-identity claim; "
         "use neutral process framing instead"),
        (r'\bhand[- ]typed\b',
         "humanity_claim -- claiming messages are 'hand-typed' is a banned AI-identity claim; "
         "use neutral process framing instead"),
        (r'\bI\s+(?:personally\s+)?run\s+every\s+conversation\b',
         "humanity_claim -- asserting personal handling of every conversation implies human operation; "
         "use neutral process framing instead"),
        (r'\bI\s+personally\s+(?:read|write|respond\s+to)\s+every\b',
         "humanity_claim -- asserting personal reading/writing of every message implies human operation; "
         "use neutral process framing instead"),
    ]
    for pat, label in humanity_denial_patterns:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("humanity_claim_warn", f"{m.group()} -- {label}"))
            break  # One WARN is enough; the agent checks the rest manually

    # 14. Fee terminology without dollar amounts (WARN, no auto-fix)
    # Catches bare fee phrases that slip past the BLOCK patterns (which require a dollar amount).
    # These are WARN because stage-2 percentage-tier presentations legitimately use "management fee"
    # as a label. Agent must review and rephrase if not in an approved stage-2 context.
    # Approved rephrase: "our pricing is custom and performance-based" instead of "our management fee is custom"
    bare_fee_patterns = [
        r'\bmanagement\s+fee\b',
        r'\bonboarding\s+fee\b',
        r'\bsetup\s+fee\b',
        r'\bmonthly\s+cap\b',
    ]
    for pat in bare_fee_patterns:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append((
                "bare_fee_terminology",
                f"{m.group()} -- rephrase to 'our pricing is custom and performance-based' "
                "unless this appears inside an approved Stage-2 percentage-tier presentation",
            ))
            break  # One WARN is enough per response; don't stack duplicates

    # 15a. Dollar-magnitude phrases derived from pricing tiers (WARN, no auto-fix -- FIX G)
    # Stage-2 percentage tiers (20%/15%/10% of ad spend) must NEVER be converted into
    # dollar figures or dollar-magnitude phrases. Percentages only; exact numbers on the call.
    # Patterns:
    #   - "(low|mid|high) four/five/six figures" -- dollar-magnitude qualifiers
    #   - "$X-$Y/month" or "$X-$Yk/month" in a pricing context (near "management", "fee",
    #     "our pricing", "per month") -- catches tier-derived ranges like "$3-5K/month"
    # Kept as WARN (not BLOCK) to avoid false positives on ad spend guidance.
    dollar_magnitude_patterns = [
        (r'\b(?:low|mid|high)[- ]?(?:four|five|six)[- ]figures?\b',
         "pricing_dollar_magnitude -- dollar-magnitude phrase (e.g. 'mid-four-figures per month') "
         "may be a tier-derived dollar conversion; percentages only in Stage-2 pricing answers"),
        (r'\$\d[\d,]*[Kk]?\s*[-\u2013]\s*\$?\d[\d,]*[Kk]?\s*(?:\/month|per month|a month)\b',
         "pricing_dollar_magnitude -- dollar range near 'per month' may be a tier-derived conversion; "
         "percentages only in Stage-2 pricing answers"),
    ]
    for pat, label in dollar_magnitude_patterns:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("pricing_dollar_magnitude_warn", f"{m.group()} -- {label}"))
            break  # One WARN is enough; don't stack duplicates

    # 15. Percentage-of-spend tiers (report-only WARN -- no auto-fix)
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

    # Clean up punctuation artifacts from phrase removals
    # Collapse whitespace before a comma: "word , word" -> "word, word"
    fixed = re.sub(r'\s+,', ',', fixed)
    # Remove a comma that starts a sentence (after sentence-ending punctuation + space, or at text
    # start) and capitalize the first alphabetical character of the remainder (unless it's a URL).
    _LEADING_COMMA_RE = re.compile(r'(?:(?<=[.?!])\s+|^),\s*')

    def _strip_leading_comma(text):
        """Remove sentence-leading commas and capitalize the following word."""
        result = text
        for m in reversed(list(_LEADING_COMMA_RE.finditer(text))):
            # Text that will follow the removed comma
            rest_start = m.end()
            rest = text[rest_start:]
            replacement = ' '
            result = result[:m.start()] + replacement + rest
        result = result.lstrip()
        # Capitalize first alphabetical character unless the text starts with a URL
        if result and not result.startswith(('http://', 'https://', 'www.')):
            for i, ch in enumerate(result):
                if ch.isalpha():
                    result = result[:i] + ch.upper() + result[i + 1:]
                    break
        return result

    fixed = _strip_leading_comma(fixed)
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
        print("VERDICT: BLOCK")
        print("ISSUES: BLOCK:empty_response:empty")
        print("---BLOCKED---")
        print("  empty_response: empty", file=sys.stderr)
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
