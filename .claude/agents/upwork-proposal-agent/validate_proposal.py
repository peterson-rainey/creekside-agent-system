#!/usr/bin/env python3
"""
Deterministic Upwork proposal validator.

Usage:
    python3 validate_proposal.py <proposal_file> [--profile samuel|lindsey]
    echo "proposal text" | python3 validate_proposal.py [--profile samuel|lindsey]

Exit codes:
    0 = PASS (no issues)
    1 = WARN (auto-fixed, fixed text written to stdout after ---FIXED---)
    2 = BLOCK (must rewrite, issues written to stderr)

Output format:
    VERDICT: PASS|WARN|BLOCK
    ISSUES: issue1; issue2; ...
    ---FIXED---
    (auto-fixed proposal text, only if WARN and auto-fixable changes were made)
"""
import re
import sys

# ---------------------------------------------------------------------------
# BLOCK patterns -- any match = proposal must be rewritten by the agent
# ---------------------------------------------------------------------------
BLOCK_PATTERNS = [
    # Hourly rates: $X/hr, $X per hour, $X an hour, $X hourly
    (r'\$\d[\d,]*\s*/\s*h(?:ou)?r', "hourly_rate"),
    (r'\$\d[\d,]*\s+per\s+hour', "hourly_rate"),
    (r'\$\d[\d,]*\s+an\s+hour', "hourly_rate"),
    (r'\$\d[\d,]*\s*hourly', "hourly_rate"),
    # Acceptance of hourly billing (e.g., "Hourly with Time Tracker works")
    (r'[Hh]ourly\s+with\s+[Tt]ime\s+[Tt]racker\s+works', "hourly_acceptance"),
    (r'[Hh]ourly\s+works\s+(?:well\s+)?for\s+me', "hourly_acceptance"),
    (r'[Hh]ourly\s+(?:billing|rate|structure)\s+works', "hourly_acceptance"),
    (r'(?:comfortable|fine|ok|okay)\s+with\s+hourly', "hourly_acceptance"),
    # "X hourly" (number followed by hourly, e.g., "85 hourly", "100 hourly")
    (r'\b\d[\d,]*\s+hourly\b', "hourly_rate"),

    # Email addresses (Upwork compliance -- never include any email address)
    (r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', "email_address"),

    # Placeholder brackets: [text] but not [No ...], URLs, or markdown links [text](url)
    (r'\[(?!No |no |http)[A-Za-z][^\]]{1,}\](?!\()', "placeholder_brackets"),
    # Curly-brace tokens
    (r'\{\{[^}]+\}\}', "placeholder_curly"),
    (r'(?<!\{)\{[A-Za-z][^}]+\}(?!\})', "placeholder_curly"),
    # Angle-bracket insert tokens
    (r'<insert\b', "placeholder_angle"),
    # Literal placeholder strings
    (r'\bTBD\b', "placeholder_tbd"),
    (r'\bTODO\b', "placeholder_todo"),
    (r'\bXXX\b', "placeholder_xxx"),
    # Dollar-blank patterns
    (r'\$_{2,}', "placeholder_dollar"),
    (r'\$\[[a-zA-Z]', "placeholder_dollar"),
]

# ---------------------------------------------------------------------------
# WARN patterns -- auto-fixable
# Each: (pattern, category, replacement_or_None)
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# WARN patterns -- report-only (no auto-fix)
# These are checked and reported but the text is NOT modified.
# ---------------------------------------------------------------------------

# Forbidden words (word-boundary, case-insensitive)
FORBIDDEN_WORDS = [
    "delve", "leverage", "harness", "foster", "empower", "elevate",
    "seamlessly", "robust", "pivotal", "comprehensive", "cutting-edge",
    "game-changing", "transformative", "unlock",
]

# Banned phrases (case-insensitive substring/pattern matches)
# Using raw patterns so we can do regex-level precision.
# "I'd be happy to" / "I'd be happy to" -- match with optional apostrophe,
# but do NOT match bare "happy to" (e.g. "Happy to talk through..." is approved).
BANNED_PHRASES = [
    (r"\bfeel free to\b", "feel_free_to"),
    (r"\bmoving forward\b", "moving_forward"),
    (r"\bI'?d be happy to\b", "id_be_happy_to"),
]

# Fluff openers -- only flag when the phrase is at the START of the proposal
FLUFF_OPENERS = [
    (r"^Good question[\.,!]?", "fluff_opener_good_question"),
    (r"^Great question[\.,!]?", "fluff_opener_great_question"),
    (r"^Thanks for the detail[\.,!]?", "fluff_opener_thanks_for_detail"),
]

# Formal transitions -- only flag at the start of a sentence (capitalized, sentence-start)
FORMAL_TRANSITIONS = [
    (r"(?:^|(?<=\. ))Additionally,", "formal_transition_additionally"),
    (r"(?:^|(?<=\. ))Furthermore,", "formal_transition_furthermore"),
    (r"(?:^|(?<=\. ))Moreover,", "formal_transition_moreover"),
    (r"(?:^|(?<=\. ))That said,", "formal_transition_that_said"),
]

# Lindsey persona violations -- only when --profile lindsey is passed
# Do NOT flag bare "we"/"our"/"us" -- only the specific phrases below
LINDSEY_PERSONA_PHRASES = [
    (r"\bour team\b", "lindsey_our_team"),
    (r"\bmy team\b", "lindsey_my_team"),
    (r"\bCreekside\b", "lindsey_creekside"),
    (r"\bour agency\b", "lindsey_our_agency"),
    (r"\bas an agency\b", "lindsey_as_an_agency"),
]


def check_blocks(text):
    """Check for BLOCK-level issues. Returns list of (category, match_text)."""
    issues = []
    for pattern, category in BLOCK_PATTERNS:
        m = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
        if m:
            issues.append((category, m.group()))
    return issues


def check_report_only_warns(text, profile="samuel"):
    """Check for WARN-level report-only issues. Returns list of (category, match_text).
    These do NOT modify the text -- they are flagged for agent review only.
    """
    issues = []

    # 1. Forbidden words (word-boundary, case-insensitive)
    for word in FORBIDDEN_WORDS:
        pattern = r'\b' + re.escape(word) + r'\b'
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            issues.append(("forbidden_word", m.group()))

    # 2. Banned phrases (case-insensitive)
    for pattern, category in BANNED_PHRASES:
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            issues.append((category, m.group()))

    # 3. Fluff openers -- only at START of proposal (after stripping leading whitespace)
    stripped = text.lstrip()
    for pattern, category in FLUFF_OPENERS:
        m = re.match(pattern, stripped, re.IGNORECASE)
        if m:
            issues.append((category, m.group().strip()))

    # 4. Formal transitions -- sentence-start, case-sensitive capitalized
    # We look for these at the start of a line or after a sentence-ending period+space.
    for pattern, category in FORMAL_TRANSITIONS:
        m = re.search(pattern, text, re.MULTILINE)
        if m:
            issues.append((category, m.group()))

    # 5. Lindsey persona violations (only when profile == lindsey)
    if profile == "lindsey":
        for pattern, category in LINDSEY_PERSONA_PHRASES:
            m = re.search(pattern, text, re.IGNORECASE)
            if m:
                issues.append((category, m.group()))

    return issues


def check_and_fix_warns(text):
    """Check for WARN-level issues and auto-fix where possible.
    Returns (fixed_text, issues_found).
    """
    issues = []
    fixed = text

    # 1. Em-dashes (unicode U+2014) -> comma (consume surrounding whitespace to avoid
    #    "word , word" spacing artifacts)
    if '\u2014' in fixed:
        issues.append(("em_dash", "\u2014"))
        fixed = re.sub(r'\s*\u2014\s*', ', ', fixed)

    # 2. Double-hyphen em dash " -- " -> ", " (skip inside URLs)
    if ' -- ' in fixed:
        parts = re.split(r'(https?://\S+)', fixed)
        replaced = False
        for i, part in enumerate(parts):
            if not part.startswith('http'):
                if ' -- ' in part:
                    replaced = True
                    parts[i] = part.replace(' -- ', ', ')
        if replaced:
            issues.append(("em_dash_double", " -- "))
            fixed = ''.join(parts)

    # 3. Bold markdown (**text**) -> plain text
    bold_matches = re.findall(r'\*\*([^*]+)\*\*', fixed)
    if bold_matches:
        issues.append(("markdown_bold", f"**{bold_matches[0]}**"))
        fixed = re.sub(r'\*\*([^*]+)\*\*', r'\1', fixed)

    # 4. Italic markdown (*text* or _text_) -> plain text
    italic_matches = re.findall(r'(?<!\*)\*([^*\n]+)\*(?!\*)', fixed)
    if italic_matches:
        issues.append(("markdown_italic", f"*{italic_matches[0]}*"))
        fixed = re.sub(r'(?<!\*)\*([^*\n]+)\*(?!\*)', r'\1', fixed)
    underscore_italic = re.findall(r'(?<!_)_([^_\n]+)_(?!_)', fixed)
    if underscore_italic:
        issues.append(("markdown_italic_underscore", f"_{underscore_italic[0]}_"))
        fixed = re.sub(r'(?<!_)_([^_\n]+)_(?!_)', r'\1', fixed)

    # 5. Markdown headers (# at line start) -> plain line
    if re.search(r'^#+\s', fixed, re.MULTILINE):
        issues.append(("markdown_header", "# header detected"))
        fixed = re.sub(r'^#+\s+', '', fixed, flags=re.MULTILINE)

    # 6. Bullet lists (- or * at start of line) -- REPORT ONLY, do not auto-strip.
    # Bullets are allowed ONLY when the job post itself uses them (agent checks this
    # contextually). The script cannot see the JD, so it flags for agent review.
    # The agent must decide: if the JD used bullets, keep them; otherwise remove.
    if re.search(r'^\s*[-*]\s', fixed, re.MULTILINE):
        issues.append(("markdown_bullets",
                        "bullet list detected -- keep ONLY if job post uses bullets"))
        # Do NOT auto-strip bullets. Agent decides based on JD context.

    # 7. Markdown links [text](url) -> plain URL
    md_links = re.findall(r'\[([^\]]+)\]\((https?://[^)]+)\)', fixed)
    if md_links:
        issues.append(("markdown_link", f"[{md_links[0][0]}]({md_links[0][1]})"))
        fixed = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'\2', fixed)

    # Clean up double spaces and excess blank lines from removals
    fixed = re.sub(r'  +', ' ', fixed)
    fixed = re.sub(r'\n{3,}', '\n\n', fixed)
    fixed = fixed.strip()

    return fixed, issues


def validate(text, profile="samuel"):
    """
    Run full validation. Returns (verdict, block_issues, warn_issues, fixed_text).
    warn_issues includes both auto-fixable and report-only issues.
    """
    block_issues = check_blocks(text)
    fixed_text, auto_fix_issues = check_and_fix_warns(text)
    report_only_issues = check_report_only_warns(text, profile=profile)

    all_warn_issues = auto_fix_issues + report_only_issues

    if block_issues:
        return "BLOCK", block_issues, all_warn_issues, text
    elif all_warn_issues:
        return "WARN", block_issues, all_warn_issues, fixed_text
    else:
        return "PASS", [], [], text


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Validate an Upwork proposal.")
    parser.add_argument("proposal_file", nargs="?", help="Path to proposal text file (reads stdin if omitted)")
    parser.add_argument("--profile", default="samuel", choices=["samuel", "lindsey"],
                        help="Proposal profile (default: samuel)")
    args = parser.parse_args()

    # Read proposal text from file argument or stdin
    if args.proposal_file:
        with open(args.proposal_file, 'r') as f:
            text = f.read().strip()
    else:
        text = sys.stdin.read().strip()

    if not text:
        print("VERDICT: BLOCK")
        print("ISSUES: empty_proposal", file=sys.stderr)
        sys.exit(2)

    verdict, block_issues, warn_issues, fixed_text = validate(text, profile=args.profile)

    # Build issues list
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
