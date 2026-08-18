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

Rules enforced (selected highlights):
- Non-whitelisted calendar/booking URLs (BLOCK) -- includes app.reclaim.ai/* for Brady
- Inactive white-label partner name or calendar URL appearing in draft (BLOCK)
- Partner-video co-reference when active partner has_upwork_video=False (BLOCK)
- "Cade" in lindsey-profile drafts (BLOCK)
- Off-platform contact info: email addresses or phone numbers (BLOCK -- offplatform_contact_email /
  offplatform_contact_phone). Covers the lead's AND our own addresses (Lindsey's, Samuel's,
  @creeksidemarketingpros.com, etc.). The only permitted contact mechanism is the whitelisted
  calendar URL from the loaded profile doc.
- Pricing leaks, hourly rates, timeline commitments, placeholder brackets (BLOCK)
- Flat-decline framing ("not a fit for us") before partner redirect (BLOCK -- flat_decline_not_fit)
- Partner-distance language ("what he takes on is his call") (BLOCK -- flat_decline_partner_distance)
- Self-incrimination on lost-lead responses (WARN -- self_incrimination_lost_lead_warn)
- Validating lead's decision to go elsewhere on lost-lead responses (WARN -- defeat_validation_lost_lead)
- Past-tense hiring language = lost lead (WARN -- hired_someone_else_lost_lead_warn) [S10]
- Availability-assumption phrases (WARN -- availability_assumption_warn) [S4]
- Self-blame phrases in any context (WARN -- self_blame_phrase_warn) [S6]
- Name-comma DM opener (WARN -- name_comma_dm_opener) [S2]
- Fluff openers, setup sentences, banned phrases, em-dashes, markdown (WARN, auto-fixed)

WARN vs BLOCK semantics (S5):
  BLOCK = must rewrite + re-validate; max 1 retry, then escalate to Peterson.
  WARN (auto-fixable) = validator strips/replaces the phrase deterministically; use the
    ---FIXED--- output. No regeneration required.
  WARN (non-auto-fixable) = surfaced alongside the draft; agent reviews and decides whether
    to revise. A WARN alone NEVER triggers full regeneration.
"""
import os
import re
import sys

# ---------------------------------------------------------------------------
# White-label partner registry
# Keys are partner slugs (matching the active_partner: line in sdr-agent.md).
# Fields:
#   name            -- lead-facing first name used in messages
#   calendar        -- booking URL
#   has_upwork_video -- whether the partner is featured in the Upwork profile video
# When has_upwork_video is False, any co-reference of the partner name + video
# language is a BLOCK (catches real bleed: "check out my profile video where I
# talk about [partner name]").
# ---------------------------------------------------------------------------
_PARTNER_REGISTRY = {
    "jay": {
        "name": "Jay",
        "calendar": "https://calendar.app.google/nFP1Brwxz1TsetBA6",
        "has_upwork_video": True,
    },
    "scott": {
        "name": "Scott",
        "calendar": "https://calendar.app.google/WZyDqnmW5kkqkReK9",
        "has_upwork_video": False,
    },
    "keith": {
        "name": "Keith",
        "calendar": "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1rM42oKd0V45PouVuipnzu1DvAy-uNRHnTgnnVaasVqfpOk1ekphBNJ0qYAvm-XgeH41ztaTFu",
        "has_upwork_video": False,
    },
    "brady": {
        "name": "Brady",
        "calendar": "https://app.reclaim.ai/m/brady-tibbits/flexible-quick-meeting",
        "has_upwork_video": True,  # Brady IS in the Upwork profile video; partner+video co-ref allowed
    },
}

_SDR_AGENT_MD_PATH = os.path.join(
    os.path.dirname(__file__), "..", "sdr-agent.md"
)

_PROFILES_DIR = os.path.join(
    os.path.dirname(__file__), "docs", "profiles"
)


def _load_active_partner(profile="samuel"):
    """
    Parse active_partner: from the profile doc matching `profile`, then fall
    back to sdr-agent.md's global line, then fall back to the registry default.

    Resolution order:
      1. docs/profiles/{profile}.md  active_partner: line
      2. sdr-agent.md                active_partner: line (legacy global)
      3. Hardcoded default: 'keith'

    Returns (slug, partner_dict).
    """
    default_slug = "keith"
    slug = None

    # 1. Try the profile doc first
    profile_path = os.path.join(_PROFILES_DIR, f"{profile}.md")
    try:
        with open(profile_path, "r") as f:
            for line in f:
                m = re.match(r"^\s*active_partner:\s*(\S+)", line)
                if m:
                    slug = m.group(1).strip().lower()
                    break
    except (OSError, IOError):
        pass

    # 2. Fall back to sdr-agent.md global line
    if slug is None or slug not in _PARTNER_REGISTRY:
        try:
            with open(_SDR_AGENT_MD_PATH, "r") as f:
                for line in f:
                    m = re.match(r"^\s*active_partner:\s*(\S+)", line)
                    if m:
                        slug = m.group(1).strip().lower()
                        break
        except (OSError, IOError):
            pass

    # 3. Fall back to hardcoded default
    if slug is None or slug not in _PARTNER_REGISTRY:
        slug = default_slug

    return slug, _PARTNER_REGISTRY[slug]


# Module-level load uses default profile (samuel) for the whitelist set.
# Per-profile resolution happens inside check_blocks() at call time.
_ACTIVE_PARTNER_SLUG, _ACTIVE_PARTNER = _load_active_partner("samuel")

# ---------------------------------------------------------------------------
# Calendar URL whitelist (FIX A)
# Any calendar.app.google, calendar.google.com/calendar/..., or calendly.com
# URL not in this set is a BLOCK.
# The active white-label partner's calendar is dynamically added at load time.
# NOTE: Per-profile partner resolution happens inside check_blocks() at call
# time, so the module-level whitelist uses the samuel-profile active partner.
# check_blocks() rebuilds the effective whitelist per profile at runtime.
# ---------------------------------------------------------------------------
CALENDAR_URL_WHITELIST = {
    "https://calendar.app.google/iwVAR8raqiD9a7dx6",    # samuel (Peterson's lead-facing sales calendar)
    "https://calendly.com/lindsey-bouffard/30min",       # lindsey
    _ACTIVE_PARTNER["calendar"],                         # active white-label partner (samuel profile default)
}

# Regex to find any calendar.app.google, calendar.google.com/calendar/...,
# calendly.com, or app.reclaim.ai URL in the response.
# Covers:
#   https://calendar.app.google/<token>
#   https://calendar.google.com/calendar/u/0/appointments/schedules/<token>
#   https://calendly.com/<path>
#   https://app.reclaim.ai/<path>  (Brady's booking domain)
_CALENDAR_URL_RE = re.compile(
    r'https?://(?:'
    r'calendar\.app\.google'
    r'|calendar\.google\.com/calendar(?:/[^\s,;)]*)?'
    r'|calendly\.com'
    r'|app\.reclaim\.ai'
    r')/[^\s,;)]*',
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

    # Off-platform contact info: email addresses (Upwork compliance -- BLOCK)
    # Covers the lead's AND our own addresses (Lindsey's, Samuel's, Peterson's,
    # @creeksidemarketingpros.com, etc.). Retrieved context may contain emails but
    # they must never appear in a lead-facing draft. The whitelisted calendar URLs
    # do not contain '@', so no false-positive risk from URL matching.
    (r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', "offplatform_contact_email"),

    # Off-platform contact info: phone numbers (Upwork compliance -- BLOCK)
    # Conservative patterns only -- must NOT fire on dollar figures, stats, or
    # ROAS numbers. Catches:
    #   (xxx) xxx-xxxx  -- standard US format with parens
    #   xxx-xxx-xxxx    -- hyphen-delimited
    #   xxx.xxx.xxxx    -- dot-delimited
    #   +1 xxx-xxx-xxxx / +1xxxxxxxxxx  -- +1-prefixed (any separator)
    # Does NOT match: "$3,000-5,000", "4-6x ROAS", "$27.92 CPA", bare 7-digit numbers.
    (r'\(\d{3}\)\s*\d{3}[- ]\d{4}', "offplatform_contact_phone"),
    (r'\b\d{3}-\d{3}-\d{4}\b', "offplatform_contact_phone"),
    (r'\b\d{3}\.\d{3}\.\d{4}\b', "offplatform_contact_phone"),
    (r'\+1[\s\-.]?\d{3}[\s\-.]?\d{3}[\s\-.]?\d{4}\b', "offplatform_contact_phone"),

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

    # Flat-decline framing for out-of-scope requests (ruling 2026-08-12)
    # White-label/agency requests must use affirmative partner-redirect framing,
    # never a flat decline. "Not a fit for us" before routing a lead is banned.
    # Pattern covers: "isn't a fit for us", "not a great fit for us", "that's not a fit for us", etc.
    (r"(?:n'?t|not)\s+(?:a\s+)?(?:great\s+)?fit\s+for\s+us\b", "flat_decline_not_fit"),
    (r"\bwe\s+don'?t\s+(?:take\s+on|work\s+with|handle|do)\s+(?:white.?label|agency\s+client|media.?buyer)\b", "flat_decline_not_fit"),
    (r"\bwhat\s+he\s+takes\s+on\s+is\s+his\s+call\b", "flat_decline_partner_distance"),
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

    Calendar URL enforcement (profile-aware):
      - samuel: standard whitelist (Samuel's calendar + Lindsey's Calendly +
        the profile's active partner calendar). Any other booking URL is a BLOCK.
      - lindsey: Samuel's calendar (https://calendar.app.google/wSdVbfwaJRzkw12E7)
        is ALWAYS a BLOCK. Lindsey's Calendly + the lindsey-profile's active partner
        calendar are allowed. Any other URL is a BLOCK.
        The lindsey-profile active partner's calendar is loaded per-profile at
        call time, so Keith's calendar.google.com URL is whitelisted for Lindsey
        when Keith is Lindsey's active partner.
    """
    issues = []

    # Resolve the active partner for THIS profile (profile-aware, not module-level).
    active_partner_slug, active_partner = _load_active_partner(profile)

    # Build the effective whitelist for this profile + partner combination.
    _effective_whitelist = {
        "https://calendar.app.google/iwVAR8raqiD9a7dx6",    # samuel (lead-facing sales calendar)
        "https://calendly.com/lindsey-bouffard/30min",       # lindsey
        active_partner["calendar"],                          # active partner for THIS profile
    }

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
    # Profile-aware:
    #   - lindsey: Samuel's calendar.app.google URL is ALWAYS a BLOCK.
    #     Lindsey's Calendly + the lindsey-profile's active partner calendar are
    #     allowed (even when the partner uses a calendar.google.com URL).
    #   - samuel: standard effective whitelist applies.
    _SAMUEL_CALENDAR = "https://calendar.app.google/iwVAR8raqiD9a7dx6"
    for url_match in _CALENDAR_URL_RE.finditer(text):
        url = url_match.group().rstrip('.,;)')  # strip trailing punctuation
        if profile == "lindsey":
            if url == _SAMUEL_CALENDAR:
                # Samuel's calendar is always blocked on lindsey profile
                issues.append((
                    "lindsey_blocked_calendar_url",
                    f"{url} -- Samuel's booking calendar must never appear in a "
                    "Lindsey-profile draft (Cross-Profile Routing Prohibition); "
                    "use Lindsey's Calendly or the active partner's calendar instead",
                ))
            elif url not in _effective_whitelist:
                issues.append((
                    "non_whitelisted_calendar_url",
                    f"{url} -- only approved URLs for lindsey profile are: "
                    "https://calendly.com/lindsey-bouffard/30min | "
                    f"active partner ({active_partner['name']}): {active_partner['calendar']}",
                ))
        else:
            # samuel (default) or unknown profile: standard whitelist
            if url not in _effective_whitelist:
                issues.append((
                    "non_whitelisted_calendar_url",
                    f"{url} -- only approved URLs are samuel: "
                    "https://calendar.app.google/iwVAR8raqiD9a7dx6 | "
                    "lindsey: https://calendly.com/lindsey-bouffard/30min | "
                    f"active partner ({active_partner['name']}): {active_partner['calendar']}",
                ))

    # "Cade" in lead-facing response -- profile-dependent (ruling 2026-07-23).
    # samuel profile: Cade references are ALLOWED ("Cade, my partner" / "my
    # co-founder"). Cade owns Meta for default-path (higher-value) leads; the
    # active white-label partner is the Meta specialist for partner-routed leads
    # (especially sub-$3K/month spend). Cade's calendar URL is NOT whitelisted --
    # the whitelist checks above still apply, so booking CTAs stay on the profile
    # or active partner's calendars.
    # lindsey profile: solo-freelancer persona -- any "Cade" mention is a BLOCK.
    if profile == "lindsey":
        cade_match = re.search(r'\bCade\b', text)
        if cade_match:
            issues.append((
                "lindsey_internal_name_cade",
                "Cade -- must never appear in a Lindsey-profile draft (solo persona, "
                "no agency/co-founder references); lindsey routing targets are the "
                "persona and the active white-label partner (operator-handled) only",
            ))

    # ---------------------------------------------------------------------------
    # Inactive partner bleed (BLOCK)
    # When a partner is inactive (not the active_partner for THIS profile), any
    # mention of that partner's name (word-boundary, case-insensitive) or calendar
    # URL in a draft is a BLOCK. This catches context bleed like "check out my
    # profile video where I talk about Jay" when Keith is the active partner.
    # Uses active_partner_slug resolved per-profile above.
    # ---------------------------------------------------------------------------
    for slug, partner in _PARTNER_REGISTRY.items():
        if slug == active_partner_slug:
            continue  # skip the active partner for this profile -- it's allowed
        inactive_name = partner["name"]
        inactive_cal = partner["calendar"]
        # Check inactive partner name (word-boundary match)
        name_match = re.search(r'\b' + re.escape(inactive_name) + r'\b', text, re.IGNORECASE)
        if name_match:
            issues.append((
                "inactive_partner_name_bleed",
                f"{name_match.group()} -- '{inactive_name}' is an INACTIVE partner "
                f"(active for {profile}: {active_partner['name']}); remove all references to "
                f"inactive partners from lead-facing drafts",
            ))
        # Check inactive partner calendar URL (substring match -- URL is unique enough)
        # Extract the path token from the URL as the fingerprint (avoids full URL issues)
        cal_token = inactive_cal.rstrip("/").split("/")[-1]
        if cal_token and cal_token in text:
            issues.append((
                "inactive_partner_calendar_bleed",
                f"{inactive_cal} -- calendar URL for inactive partner '{inactive_name}'; "
                f"use active partner '{active_partner['name']}' calendar instead: "
                f"{active_partner['calendar']}",
            ))

    # ---------------------------------------------------------------------------
    # Partner-video co-reference BLOCK
    # When the active partner has has_upwork_video=False, any draft that contains
    # both the partner's name and a reference to OUR video content is a BLOCK.
    # This catches the real bleed pattern: "check out my profile video where I
    # talk about Scott" (observed July 27 Upwork follow-ups).
    #
    # Pattern 1: a specific "our video" phrase within ~60 chars of the partner
    # name (either direction). Bare "video ads", "video creative", "video
    # content", "video campaigns" are NOT our Upwork profile video and must NOT
    # fire -- only possessive/profile-specific constructions trigger this check.
    #
    # "Our video" phrases (word-boundary anchored):
    #   profile video | my video | the video | intro video | video where I |
    #   video about | video on my profile | video covers | video I
    #
    # Pattern 2: "profile video" anywhere combined with partner name anywhere
    # (kept broad -- "profile video" is unambiguous regardless of proximity).
    # ---------------------------------------------------------------------------
    if not active_partner.get("has_upwork_video", True):
        partner_name = active_partner["name"]
        partner_name_re = re.escape(partner_name)
        # Pattern 1: specific "our video" phrase within 60 chars of partner name
        _OUR_VIDEO = (
            r'(?:'
            r'profile\s+video'
            r'|my\s+video'
            r'|the\s+video'
            r'|intro\s+video'
            r'|video\s+where\s+I'
            r'|video\s+about'
            r'|video\s+on\s+my\s+profile'
            r'|video\s+covers'
            r'|video\s+I\b'
            r')'
        )
        video_near_name = re.search(
            r'(?:'
                + _OUR_VIDEO + r'.{0,60}\b' + partner_name_re + r'\b'
                r'|\b' + partner_name_re + r'\b.{0,60}' + _OUR_VIDEO
            + r')',
            text,
            re.IGNORECASE | re.DOTALL,
        )
        # Pattern 2: "profile video" anywhere combined with partner name anywhere
        has_profile_video = bool(re.search(r'\bprofile\s+video\b', text, re.IGNORECASE))
        has_partner_name = bool(re.search(r'\b' + partner_name_re + r'\b', text, re.IGNORECASE))
        if video_near_name or (has_profile_video and has_partner_name):
            issues.append((
                "partner_video_reference_block",
                f"Reference to the Upwork profile video in connection with "
                f"'{partner_name}' -- active partner has has_upwork_video=False; "
                f"NEVER say 'profile video where I talk about {partner_name}', "
                f"'as mentioned in the video', or any video+partner co-reference. "
                f"The profile video features a different person.",
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
    # Anchored to end-of-text to avoid false positives on mid-sentence name mentions.
    # Catches:
    #   Bare names:              "Samuel" / "Lindsey" (with optional preceding newline)
    #   Dash-prefixed names:     "- Lindsey" / "– Lindsey" / "— Lindsey"
    #   Full names/initials:     "Lindsey Bouffard" / "Lindsey B." / "Samuel Rainey"
    #   Closing + name on line:  "Thanks, Lindsey" / "Talk soon, Samuel"
    #   Multi-line closings:     "Best,\nLindsey Bouffard"
    #   Standalone closings:     "Best," / "Regards," / "Cheers,"
    # All patterns are stripped as WARN (auto-fix: remove the signature block).
    _PERSONA_NAME_RE = (
        r'(?:Lindsey(?:\s+Bouffard|\s+B\.)?|Samuel(?:\s+Rainey)?)'
    )
    sig_patterns = [
        # Multi-line: "Best,\nLindsey Bouffard" or "Talk soon,\nLindsey Bouffard"
        # (closing keyword + optional comma + newline + persona name).
        # MUST come before the bare-name pattern to strip both lines in one pass.
        r'[\n\s]*(?:Best|Regards|Thanks|Cheers|Warm\s+wishes|Sincerely|Take\s+care|Talk\s+soon|Looking\s+forward)[,\s]*\n\s*' + _PERSONA_NAME_RE + r'\s*$',
        # "Closing phrase, Name" on a SINGLE final line (e.g. "Thanks, Lindsey")
        r'[\n\s]*(?:Thanks|Talk\s+soon|Best|Cheers|Take\s+care|Warm\s+wishes|Sincerely|Regards|Looking\s+forward)[,\s]+' + _PERSONA_NAME_RE + r'\s*$',
        # Dash/en-dash/em-dash prefixed persona names at end
        r'[\n\s]*[-\u2013\u2014]\s*' + _PERSONA_NAME_RE + r'\s*$',
        # Bare persona names at end (with optional preceding newline/whitespace)
        r'(?:\n\s*|\s+)' + _PERSONA_NAME_RE + r'\s*$',
        # Standalone closing lines (no name)
        r'\n\s*Best,?\s*$',
        r'\n\s*Regards,?\s*$',
        r'\n\s*Best regards,?\s*$',
        r'\n\s*Kind regards,?\s*$',
        r'\n\s*Warm regards,?\s*$',
        r'\n\s*Cheers,?\s*$',
        r'\n\s*Sincerely,?\s*$',
        r'\n\s*Talk\s+soon,?\s*$',
    ]
    for pat in sig_patterns:
        m = re.search(pat, fixed, re.IGNORECASE | re.MULTILINE)
        if m:
            issues.append(("signature", m.group().strip()))
            fixed = fixed[:m.start()].rstrip()
            break  # one signature strip per run; re-runs handle stacked patterns

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
            context = fixed[max(0, m.start()-40):min(len(fixed), m.end()+80)].lower()
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
    # Per A2 policy update: a named client is COMPLIANT when EITHER:
    #   (a) the slug URL for that client appears in the response, OR
    #   (b) the response explicitly references an attachment AND contains a VA attachment block
    #       for that client (file_name or web_view_link pattern in the response).
    # What remains banned: bare client name with no slug URL AND no attachment block.
    # The hub-only URL (no slug) is never sufficient when a client is named.
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
    # Detect whether the response contains a VA attachment block.
    # A VA attachment block is the operator block appended after the message body,
    # containing file_name and web_view_link fields for a case study PDF.
    # When present, an attachment reference in the message body satisfies the proof requirement
    # without the slug URL (per A2 policy).
    _has_va_attachment_block = bool(
        re.search(r'file_name\s*[:=]', fixed, re.IGNORECASE) or
        re.search(r'web_view_link\s*[:=]', fixed, re.IGNORECASE)
    )
    # Only run this check when the response contains the base case-study domain
    # (i.e., the response is attempting to share proof -- not a general message).
    if _CASE_STUDY_BASE in fixed:
        for client_name, slug in _CASE_STUDY_CLIENTS:
            # Check if client name appears in the response (case-insensitive)
            if re.search(re.escape(client_name), fixed, re.IGNORECASE):
                # Check if the slug URL also appears
                slug_present = f"/{slug}" in fixed.lower()
                if not slug_present:
                    # B4: exempt if VA attachment block is present (A2 policy)
                    if _has_va_attachment_block:
                        pass  # Named client + attached PDF + referenced = COMPLIANT
                    else:
                        issues.append((
                            "missing_slug_url",
                            f"{client_name} named but slug URL '.../{slug}' not found and no VA "
                            "attachment block detected -- either add the full slug URL, or attach "
                            "the case study PDF and reference it in the message body",
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

    # 14a. "Cade" check moved to check_blocks (profile-dependent, ruling 2026-07-23):
    # samuel profile allows Cade references; lindsey profile BLOCKs them.

    # 14c. AI/humanity false-drafting-denial patterns (WARN, no auto-fix -- updated per A1 policy)
    # NEW POLICY (A1): affirming the lead is talking to a real person is now ALLOWED.
    # GOOD: "You're talking to a real person -- I read and send everything here myself." -- NO WARN.
    # The remaining ban covers FALSE DRAFTING DENIAL: claiming no AI is involved in writing/drafting.
    # These patterns fire on false blanket denials; they do NOT fire on affirmations of human sending.
    humanity_denial_patterns = [
        (r'\bno\s+AI\s+(?:involved|used|anywhere)\b',
         "humanity_false_drafting_denial -- blanket denial of AI involvement in drafting is false; "
         "approved posture: 'I use tools to help draft, but I read and send everything myself'"),
        (r'\bhand[- ]typed\b',
         "humanity_false_drafting_denial -- claiming messages are 'hand-typed' denies AI drafting; "
         "approved posture: 'I use tools to help draft, but I read and send everything myself'"),
        (r'\b100\s*%\s+human\b',
         "humanity_false_drafting_denial -- '100% human' is a false blanket denial of AI involvement; "
         "approved posture: affirm human sending without denying AI tools"),
        (r'\bnot\s+automated\b',
         "humanity_false_drafting_denial -- 'not automated' may be a false process claim; "
         "approved posture: 'I read and send everything myself'"),
        (r'\bnot\s+templated\b',
         "humanity_false_drafting_denial -- 'not templated' may be a false process claim; "
         "approved posture: affirm human review without denying tools"),
    ]
    for pat, label in humanity_denial_patterns:
        m = re.search(pat, fixed, re.IGNORECASE)
        if m:
            issues.append(("humanity_false_drafting_denial_warn", f"{m.group()} -- {label}"))
            break  # One WARN is enough; the agent checks the rest manually

    # P07c. Dollar-conversion affirmation WARN (no auto-fix)
    # When a lead does their own percentage-to-dollar math and asks for confirmation,
    # affirming their calculation is identical to quoting the dollar figure yourself.
    # This check fires when the response contains an affirmation phrase in a context
    # that also includes a dollar figure or per-month rate -- indicating the agent
    # may be validating the lead's conversion rather than deflecting to the call.
    # Conservative patterns; one WARN max to avoid stacking duplicates.
    _dollar_context_re = re.compile(r'\$\d|/month|per month', re.IGNORECASE)
    if _dollar_context_re.search(fixed):
        dollar_affirmation_patterns = [
            r'the\s+(?:ballpark\s+)?math\s+(?:is|checks?\s+out|is\s+right)',
            r'that\s+checks?\s+out',
            r'(?:roughly|about\s+right),?\s+yes',
        ]
        for pat in dollar_affirmation_patterns:
            m = re.search(pat, fixed, re.IGNORECASE)
            if m:
                issues.append((
                    "dollar_conversion_affirmation_warn",
                    f"{m.group()} -- affirming a lead's own percentage-to-dollar math is identical "
                    "to quoting the dollar figure yourself (P07c); deflect to the call: "
                    "'The percentage is approximate and the exact structure gets worked out on a call'",
                ))
                break  # One WARN max

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

    # 16. Reply word count (WARN, no auto-fix)
    # Follow-up replies over 200 words have a 44.6% drop-off rate vs 15.7% under 200.
    # Initial proposals are exempt -- the validator cannot distinguish them, so this
    # is a WARN to let the agent decide whether the cap applies.
    word_count = len(fixed.split())
    if word_count > 200:
        issues.append((
            "reply_length_excessive",
            f"reply_length_excessive -- {word_count} words exceeds the 200-word follow-up cap "
            "(data: 44.6% drop-off at 200+ vs 15.7% under 200). Shorten the reply or confirm "
            "this is an initial proposal (exempt).",
        ))

    # 17. Question count (WARN, no auto-fix)
    # Exactly 1 question is optimal (16.0% drop). 2 = 39.3%, 3+ = 50%+.
    # Count "?" characters as a proxy for questions.
    question_count = fixed.count('?')
    if question_count >= 2:
        issues.append((
            "excessive_questions",
            f"excessive_questions -- {question_count} questions detected; optimal is exactly 1 "
            "(data: 1 question = 16.0% drop, 2 = 39.3%, 3+ = 50%+). Remove questions until "
            "only 1 remains.",
        ))

    # 18. Name-as-greeting opener (WARN, no auto-fix)
    # Do not start a reply by addressing the lead by name like an email salutation.
    # Pattern: first non-whitespace word is a capitalized name immediately followed by a comma.
    # E.g., "Hey Anthony," / "Ann Mari," / "Boris, you asked..."
    # Also catches "Hey [Name]," constructions.
    _name_greeting_re = re.compile(
        r'^\s*(?:Hey\s+|Hi\s+)?([A-Z][a-zA-Z\-\']+(?:\s+[A-Z][a-zA-Z\-\']+)?)\s*,',
    )
    _name_greeting_m = _name_greeting_re.match(fixed)
    if _name_greeting_m:
        issues.append((
            "name_as_greeting_opener",
            f"{_name_greeting_m.group().strip()} -- do not open a chat reply by addressing the "
            "lead by name like an email salutation; drop the name opener and start with the "
            "substance (name-as-greeting rule, response-guidelines.md Communication Style)",
        ))

    # 19a. Self-incrimination on lost leads (WARN, no auto-fix -- ruling 2026-08-12)
    # When a lead says "went another direction" or similar, the draft must NOT admit
    # mistakes the lead didn't raise, fabricate delivery failures, or validate their decision.
    # These patterns fire when self-flagellating language appears in the same response
    # as a lost-lead signal. False-positive risk is low because these phrases are rare
    # in non-lost-lead contexts.
    _LOST_LEAD_SIGNALS = re.compile(
        r'(?:went\s+another\s+direction|went\s+with\s+someone\s+else|'
        r'went\s+(?:a\s+)?different\s+(?:direction|way)|decided\s+to\s+go\s+elsewhere|'
        r'no\s+worries\b|best\s+of\s+luck)',
        re.IGNORECASE,
    )
    _SELF_INCRIMINATION_PATTERNS = [
        (r"\bthat'?s\s+on\s+me\b", "self_incrimination_lost_lead"),
        (r"\bI\s+(?:dropped\s+the\s+ball|missed\s+that|should\s+have\s+(?:sent|followed|called))\b",
         "self_incrimination_lost_lead"),
        (r"\bmy\s+(?:fault|mistake|bad)\b", "self_incrimination_lost_lead"),
        (r"\bI\s+(?:never|didn'?t)\s+(?:send|get|follow)\b", "self_incrimination_lost_lead"),
        (r"\bsmart\s+(?:of\s+you|move|choice|decision)\b", "defeat_validation_lost_lead"),
        (r"\b(?:sounds?\s+like\s+you\s+made|you\s+(?:probably\s+)?made)\s+the\s+right\s+(?:call|choice|decision)\b",
         "defeat_validation_lost_lead"),
    ]
    if _LOST_LEAD_SIGNALS.search(fixed):
        for pat, label in _SELF_INCRIMINATION_PATTERNS:
            m = re.search(pat, fixed, re.IGNORECASE)
            if m:
                issues.append((
                    "self_incrimination_lost_lead_warn",
                    f"{m.group()} -- on a lost-lead response, never admit mistakes the lead didn't "
                    "raise, fabricate delivery failures, or validate their decision to go elsewhere; "
                    "keep it to a short gracious well-wish (ruling 2026-08-12, Lost Lead Rule in "
                    "docs/response-guidelines.md)",
                ))
                break  # One WARN is enough; multiple patterns are additive noise

    # 19. Dramatic update opener in first sentence (WARN, no auto-fix)
    # When a lead shares new info, don't dramatize the update with phrases like
    # "that changes everything" / "real change from where things stood" / etc.
    # Check only in the first sentence (up to first period/exclamation/question mark).
    _first_sentence_end = re.search(r'[.!?]', fixed)
    _first_sentence = fixed[:_first_sentence_end.start() + 1] if _first_sentence_end else fixed
    _dramatic_update_patterns = [
        r'\bchanges?\s+everything\b',
        r'\breal\s+change\s+from\b',
        r'\bcompletely\s+changes?\s+the\b',
        r'\btotally\s+changes?\s+the\b',
        r'\bchanges?\s+the\s+(?:whole\s+)?picture\b',
        r'\bchanges?\s+the\s+game\b',
    ]
    for _dp in _dramatic_update_patterns:
        _dm = re.search(_dp, _first_sentence, re.IGNORECASE)
        if _dm:
            issues.append((
                "dramatic_update_opener",
                f"{_dm.group()} -- never open by dramatizing new info from the lead; "
                "acknowledge briefly and go straight to substance "
                "(response-guidelines.md Zero-Tolerance Fluff Rules)",
            ))
            break  # One WARN is enough

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


def validate(text, profile="samuel"):
    """
    Run full validation. Returns (verdict, block_issues, warn_issues, fixed_text).

    profile: 'samuel' (default) or 'lindsey'. Passed to check_blocks for
    profile-aware calendar URL enforcement (B1).
    """
    block_issues = check_blocks(text, profile=profile)
    fixed_text, warn_issues = check_and_fix_warns(text)

    if block_issues:
        return "BLOCK", block_issues, warn_issues, text
    elif warn_issues:
        return "WARN", block_issues, warn_issues, fixed_text
    else:
        return "PASS", [], [], text


def main():
    # Parse arguments: optional --profile flag (samuel|lindsey) and file path.
    # Accepted forms:
    #   validate_response.py <file>
    #   validate_response.py --profile lindsey <file>
    #   validate_response.py <file> --profile lindsey
    #   echo "text" | validate_response.py --profile lindsey
    args = sys.argv[1:]
    profile = "samuel"
    file_path = None

    i = 0
    while i < len(args):
        if args[i] == "--profile" and i + 1 < len(args):
            profile = args[i + 1].lower()
            i += 2
        elif not args[i].startswith("--"):
            file_path = args[i]
            i += 1
        else:
            i += 1

    if profile not in ("samuel", "lindsey"):
        profile = "samuel"  # default for unrecognised values

    # Read response text from file argument or stdin
    if file_path:
        with open(file_path, 'r') as f:
            text = f.read().strip()
    else:
        text = sys.stdin.read().strip()

    if not text:
        print("VERDICT: BLOCK")
        print("ISSUES: BLOCK:empty_response:empty")
        print("---BLOCKED---")
        print("  empty_response: empty", file=sys.stderr)
        sys.exit(2)

    verdict, block_issues, warn_issues, fixed_text = validate(text, profile=profile)

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
