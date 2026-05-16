"""
validate_output.py -- Pre-send validation for Creekside proposal .docx files.

Extracts all text from a .docx and checks for forbidden patterns. Exits non-zero
if any violations are found. Does NOT delete the file -- leaves it for inspection.

Usage:
    python3 validate_output.py /path/to/proposal.docx

Exit codes:
    0  -- all checks passed
    1  -- one or more violations found (details printed to stdout)
    2  -- bad arguments or unreadable file
"""

import re
import sys

try:
    from docx import Document
except ImportError:
    print("ERROR: python-docx is not installed. Run: pip install python-docx")
    sys.exit(2)


# ---------------------------------------------------------------------------
# Forbidden pattern definitions
# ---------------------------------------------------------------------------

CHECKS = [
    {
        "id": "em_dash",
        "description": "Em dash (U+2014)",
        "action": "block",
        "pattern": re.compile(r"—"),
        "message": (
            "Em dashes are forbidden in all Creekside output (hard rule #4). "
            "Rewrite the sentence using a colon, period, or restructuring."
        ),
    },
    {
        "id": "slack_reference",
        "description": "Word 'Slack' (case-insensitive)",
        "action": "block",
        "pattern": re.compile(r"\bslack\b", re.IGNORECASE),
        "message": (
            "Slack is not an active platform at Creekside (Standing Rule #1). "
            "Remove the reference. Do not replace with 'Google Chat' in sales-stage "
            "materials -- see agent_knowledge id 81e7d4e6-534b-4cc2-836e-dc46cbbbdc8a."
        ),
    },
    {
        "id": "performance_claim",
        "description": "Quantified performance promise (e.g. '20-50% better in 90 days')",
        "action": "block",
        "pattern": re.compile(
            r"\d+(\s*[-–]\s*\d+)?\s*%"
            r".{0,60}(better|improv|reduc|increas|lower|higher)"
            r".{0,60}(\d+\s*days?|in\s+\d+\s+months?)",
            re.IGNORECASE,
        ),
        "message": (
            "Quantified performance promises are forbidden in proposals (rule #6: no "
            "guaranteed ROI or specific results promises). Remove or rephrase without "
            "attaching a number to a timeframe."
        ),
    },
    {
        "id": "work_free_claim",
        "description": "'work free' outside marketing tagline context",
        "action": "block",
        # Matches "work free" when NOT immediately preceded by "we" + some qualifier
        # related to the approved tagline ("work free" in isolation or
        # "or we work free" where it's a naked promise, not a cited tagline).
        "pattern": re.compile(r"\bwork\s+free\b", re.IGNORECASE),
        "message": (
            "The phrase 'work free' appears in a sales-stage proposal. "
            "This may be an inadvertent inclusion of the 'Improve ROAS or we work free' "
            "marketing tagline, which is for marketing materials only -- not sales proposals. "
            "Remove or confirm intentional inclusion."
        ),
    },
    {
        "id": "google_chat_in_proposal",
        "description": "'Google Chat' in a sales-stage document",
        "action": "block",
        "pattern": re.compile(r"\bgoogle\s+chat\b", re.IGNORECASE),
        "message": (
            "Internal communication platform references ('Google Chat') must not appear "
            "in sales-stage proposals. This rule is documented in agent_knowledge id "
            "81e7d4e6-534b-4cc2-836e-dc46cbbbdc8a. Remove the reference."
        ),
    },
]


# ---------------------------------------------------------------------------
# Extraction
# ---------------------------------------------------------------------------

def extract_paragraphs(docx_path: str) -> list[tuple[int, str]]:
    """Return list of (paragraph_index, text) tuples from the document."""
    doc = Document(docx_path)
    paragraphs = []
    idx = 0
    for para in doc.paragraphs:
        text = para.text
        if text.strip():
            paragraphs.append((idx, text))
        idx += 1
    # Also check table cells
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for para in cell.paragraphs:
                    text = para.text
                    if text.strip():
                        paragraphs.append((idx, text))
                        idx += 1
    return paragraphs


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def validate(docx_path: str) -> list[dict]:
    """Run all checks. Return list of violation dicts (empty = clean)."""
    try:
        paragraphs = extract_paragraphs(docx_path)
    except Exception as e:
        print(f"ERROR: Could not read {docx_path}: {e}")
        sys.exit(2)

    violations = []
    for check in CHECKS:
        matches = []
        for para_idx, text in paragraphs:
            for m in check["pattern"].finditer(text):
                matches.append({
                    "para_idx": para_idx,
                    "line_preview": text[:200],
                    "match": m.group(0),
                    "match_start": m.start(),
                })
        if matches:
            violations.append({
                "id": check["id"],
                "description": check["description"],
                "action": check["action"],
                "message": check["message"],
                "occurrences": matches,
            })

    return violations


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 validate_output.py /path/to/proposal.docx")
        sys.exit(2)

    docx_path = sys.argv[1]

    print(f"Validating: {docx_path}")
    violations = validate(docx_path)

    if not violations:
        print("PASS -- no forbidden patterns found.")
        sys.exit(0)

    print(f"\nFAIL -- {len(violations)} violation(s) found. File left at path for inspection.\n")
    for v in violations:
        print(f"[{v['action'].upper()}] {v['description']}")
        print(f"  Rule: {v['message']}")
        print(f"  Occurrences: {len(v['occurrences'])}")
        for occ in v["occurrences"][:3]:  # show max 3 examples
            snippet = occ["line_preview"]
            print(f"    - Para {occ['para_idx']}: ...{snippet[:120]}...")
        if len(v["occurrences"]) > 3:
            print(f"    ... and {len(v['occurrences']) - 3} more.")
        print()

    sys.exit(1)


if __name__ == "__main__":
    main()
