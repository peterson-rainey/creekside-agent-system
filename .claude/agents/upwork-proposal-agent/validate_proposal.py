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

    # 6. Bare URLs -- any raw URL or bare domain in proposal text.
    # Matches http(s)://, www., or bare domains like creeksidemarketingpros.com.
    # Anchored on a TLD whitelist to avoid false-positives on decimals (4.5x, 1.2M)
    # and common abbreviations. Requires a word-boundary before the domain segment.
    #
    # Interaction with markdown_link: check_and_fix_warns() converts [text](url) to a
    # plain URL before this function is called (when auto-fix runs). Both checks may
    # fire on a proposal that contains markdown links -- markdown_link fires on the
    # original text, bare_url fires on the fixed text. This is the expected behavior
    # and is acceptable: the agent sees both warnings and knows a URL is present.
    # When bare_url is called via check_report_only_warns(text, ...) from validate(),
    # `text` is the ORIGINAL text, so bare_url fires on raw http/https/www/bare-domain
    # occurrences in the original, independently of the markdown_link auto-fix.
    BARE_URL_PATTERN = (
        r'(?:'
        r'https?://\S+'                             # http:// or https:// URLs
        r'|www\.\S+'                                # www. prefixed
        r'|\b[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'     # bare domain label (no hyphens at edges)
        r'(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*' # optional extra subdomains
        r'\.'                                       # dot before TLD
        r'(?:com|net|org|io|co|ai)'                 # TLD whitelist
        r'\b'
        r')'
    )
    m = re.search(BARE_URL_PATTERN, text, re.IGNORECASE)
    if m:
        issues.append(("bare_url", m.group()))

    # 7. Numbered list -- lines starting with "1." "2." "3)" etc.
    # NOTE: The existing bullets check (check_and_fix_warns, step 6) uses the pattern
    # r'^\s*[-*]\s' which matches only dash/asterisk bullets. It does NOT cover numbered
    # lines. This check is therefore not redundant -- it catches a distinct formatting
    # pattern that the bullets check misses.
    if re.search(r'^\s*\d+[.)]\s', text, re.MULTILINE):
        issues.append(("numbered_list",
                        "numbered list detected -- remove; use prose or unnumbered form"))

    # 8. Colon header -- a short standalone line (1-6 words) ending in a colon,
    # functioning as a section label (e.g. "Audiences:", "How I'd run it:").
    # Does NOT flag colons mid-paragraph: only matches when the entire line is 1-6 words
    # ending with a colon and nothing after it (optional trailing whitespace only).
    # Word characters allowed: letters, digits, apostrophes, hyphens, slashes, +, &.
    COLON_HEADER_PATTERN = (
        r"^(?:[A-Za-z0-9'/+&-]+\s){0,5}[A-Za-z0-9'/+&-]+:\s*$"
    )
    if re.search(COLON_HEADER_PATTERN, text, re.MULTILINE):
        m2 = re.search(COLON_HEADER_PATTERN, text, re.MULTILINE)
        issues.append(("colon_header",
                        f"section-header colon detected: {m2.group().strip()!r}"))

    # 9. Salutation opener -- first non-empty line starts with a greeting.
    # Styles mandate opening with the strategic insight, never a greeting.
    first_line = next((ln for ln in text.splitlines() if ln.strip()), "")
    SALUTATION_PATTERN = r'^(?:Hi[,\s]|Hi there|Hello[,\s]|Hey[,\s]|Dear\s)'
    if re.match(SALUTATION_PATTERN, first_line, re.IGNORECASE):
        issues.append(("salutation_opener",
                        f"proposal opens with a greeting: {first_line[:50]!r}"))

    # 10. All-caps header -- a standalone line of 1-4 words where every alphabetic
    # word is fully uppercase and at least one word is 3+ letters.
    # Excludes lines containing digits+units (e.g. "4X ROAS") and lines that are
    # part of flowing prose. Only fires when the line is standalone (its own line).
    def _is_allcaps_header(line):
        stripped = line.strip()
        if not stripped:
            return False
        words = stripped.split()
        if not (1 <= len(words) <= 4):
            return False
        alpha_words = [w for w in words if re.search(r'[A-Za-z]', w)]
        if not alpha_words:
            return False
        # Exclude if any word contains a digit (catches "4X", "B2B" units inline)
        if any(re.search(r'\d', w) for w in words):
            return False
        # Every alphabetic word must be fully uppercase
        if not all(w == w.upper() for w in alpha_words):
            return False
        # At least one word must be 3+ purely alphabetic letters
        if not any(re.fullmatch(r'[A-Z]{3,}', w) for w in alpha_words):
            return False
        return True

    for line in text.splitlines():
        if _is_allcaps_header(line):
            issues.append(("allcaps_header",
                            f"all-caps standalone line detected: {line.strip()!r}"))
            break  # report the first occurrence only

    # 11. Lindsey sign-off check (profile=lindsey only, report-only -- no auto-fix).
    #
    # Lindsey proposals must NOT end with any name sign-off or closing phrase.
    # Flag conservatively: only fire when the last meaningful content looks like
    # a name-only line or an explicit closing-phrase line.
    #
    # Two conditions trigger the warning:
    #   a. A standalone line of 1-2 capitalized words (e.g. "Lindsey", "Samuel",
    #      "Best wishes") following a blank line -- classic sign-off pattern.
    #   b. An explicit closing phrase ("Best,", "Thanks,", "Regards,", "Cheers,",
    #      "Talk soon,", "Sincerely,", "Warmly,") in the last 2 non-empty lines.
    #
    # Does NOT fire on prose that happens to end a paragraph -- requires either
    # the blank-line separator or an explicit closing keyword.
    if profile == "lindsey":
        tail = text.rstrip()
        # Split into lines and collect the last few non-empty ones.
        all_lines = tail.splitlines()

        # Check condition a: last non-empty line is 1-2 capitalized words after a blank.
        # Walk from the end: find last non-empty line and whether a blank precedes it.
        non_empty_lines = [ln for ln in all_lines if ln.strip()]
        last_line = non_empty_lines[-1].strip() if non_empty_lines else ""
        # Determine if there is a blank line before the last non-empty line.
        blank_before_last = False
        if len(all_lines) >= 2:
            # Find index of the last non-empty line, then check the line before it.
            for idx in range(len(all_lines) - 1, -1, -1):
                if all_lines[idx].strip():
                    # Found last non-empty line at idx. Check if idx-1 exists and is blank.
                    if idx > 0 and not all_lines[idx - 1].strip():
                        blank_before_last = True
                    break

        SIGNOFF_NAME_PATTERN = r'^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?$'
        is_name_line = bool(re.match(SIGNOFF_NAME_PATTERN, last_line))

        # Check condition b: explicit closing phrase in last 2 non-empty lines.
        CLOSING_KW = (
            r'\b(?:Best|Thanks|Regards|Cheers|Talk\s+soon|Sincerely|Warmly)\b'
        )
        last_two = ' '.join(non_empty_lines[-2:]) if len(non_empty_lines) >= 2 else last_line
        has_closing_kw = bool(re.search(CLOSING_KW, last_two, re.IGNORECASE))

        if (blank_before_last and is_name_line) or has_closing_kw:
            issues.append(("lindsey_signoff",
                            f"Lindsey proposals must not end with a sign-off name or closing phrase: "
                            f"{last_line!r}"))

    return issues


def check_and_fix_warns(text, profile="samuel"):
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

    # 8. Samuel sign-off checks (profile=samuel only).
    #
    # These three checks are mutually exclusive -- exactly one fires per proposal.
    # Evaluation order:
    #   a. signoff_prefix  -- "Samuel" present at end but preceded by a closing word
    #                         or hyphen on the same or immediately preceding line.
    #   b. signoff_spacing -- "Samuel" present at end but no blank line before it.
    #   c. missing_signoff -- "Samuel" not present at end at all.
    #
    # "End" is defined after stripping trailing whitespace. Mid-text occurrences of
    # the word "Samuel" are ignored -- only the final token matters.
    #
    # CLOSING_WORDS patterns that constitute an unwanted prefix:
    #   - A standalone line immediately before "Samuel" that is a closing phrase:
    #     "Best,", "Best", "Talk soon,", "Thanks,", "Regards,", "Cheers,"
    #   - A hyphen/dash directly attached or space-separated before "Samuel" on the
    #     same line: "-Samuel", "- Samuel"
    if profile == "samuel":
        tail = fixed.rstrip()  # strip trailing whitespace for all checks below

        # Check whether "Samuel" appears as the last token of the (stripped) text.
        ends_with_samuel = bool(re.search(r'Samuel\s*$', tail))

        if ends_with_samuel:
            # --- check a: signoff_prefix ---
            # Patterns for a forbidden prefix on the same line as Samuel or
            # on the immediately preceding non-empty line.
            #
            # Same-line patterns: "- Samuel", "-Samuel"
            same_line_prefix = re.search(
                r'(?:[-\u2013\u2014]\s*)Samuel\s*$', tail
            )
            # Preceding-line patterns: "Best,\nSamuel", "Best\nSamuel", etc.
            # Match: optional blank lines, then a closing word line, then
            # optional whitespace lines, then "Samuel" at very end.
            CLOSING_WORDS_PATTERN = (
                r'(?:Best|Talk\s+soon|Thanks|Regards|Cheers|Sincerely|Warmly)'
                r',?\s*\n'             # closing word, optional comma, newline
                r'\s*Samuel\s*$'       # then Samuel at end (allowing only ws in between)
            )
            preceding_line_prefix = re.search(CLOSING_WORDS_PATTERN, tail, re.IGNORECASE)

            if same_line_prefix or preceding_line_prefix:
                issues.append(("signoff_prefix",
                                "sign-off has prefix (closing word or hyphen) before Samuel"))
                # Auto-fix: remove everything from the offending prefix up to and
                # including it, leave exactly \n\nSamuel at the end.
                # Strip trailing "Samuel" and any closing/hyphen junk before it,
                # then re-append the correct ending.
                body = re.sub(
                    r'(?:\n\s*(?:Best|Talk\s+soon|Thanks|Regards|Cheers|Sincerely|Warmly),?\s*)?'
                    r'(?:[-\u2013\u2014]\s*)?Samuel\s*$',
                    '',
                    tail,
                    flags=re.IGNORECASE,
                )
                fixed = body.rstrip() + '\n\nSamuel'

            else:
                # --- check b: signoff_spacing ---
                # "Samuel" IS at the end, no forbidden prefix. Check that there is
                # exactly a blank line (two newlines) before "Samuel".
                # A blank line requires at least \n\n before "Samuel" (after stripping).
                has_blank_line = bool(re.search(r'\n\n\s*Samuel\s*$', tail))
                if not has_blank_line:
                    issues.append(("signoff_spacing",
                                    "Samuel present but no blank line before it"))
                    # Auto-fix: strip everything after the last paragraph content,
                    # remove the trailing Samuel (with any single-newline), then
                    # re-append \n\nSamuel.
                    body = re.sub(r'\n?\s*Samuel\s*$', '', tail)
                    fixed = body.rstrip() + '\n\nSamuel'
                # else: correct spacing -- no issue to append

        else:
            # --- check c: missing_signoff ---
            issues.append(("missing_signoff", "proposal does not end with 'Samuel'"))
            # Auto-fix: append \n\nSamuel to the current fixed text (already processed
            # by earlier fixes above). We append to `fixed` (not `tail`) to preserve
            # any other auto-fix changes made above, but use rstrip() first to avoid
            # trailing whitespace before the sign-off.
            fixed = fixed.rstrip() + '\n\nSamuel'

    # Clean up double spaces and excess blank lines from removals.
    # NOTE: We do NOT run the general \n{3,} collapse or strip() after sign-off fixes
    # because they would destroy the carefully placed \n\nSamuel ending.
    # Instead, only clean the body portion (everything before the final Samuel
    # if a samuel sign-off was added/fixed), or the whole text for non-samuel profiles.
    if profile == "samuel" and fixed.endswith('\n\nSamuel'):
        body = fixed[:-len('\n\nSamuel')]
        body = re.sub(r'  +', ' ', body)
        body = re.sub(r'\n{3,}', '\n\n', body)
        body = body.strip()
        fixed = body + '\n\nSamuel'
    else:
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
    fixed_text, auto_fix_issues = check_and_fix_warns(text, profile=profile)
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
