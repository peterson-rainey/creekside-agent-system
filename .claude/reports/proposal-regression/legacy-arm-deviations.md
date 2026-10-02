# Arm B (strategic_legacy) vs Byte-Exact July 8 2026 (commit b1e757d)

Comparison run 2026-10-02 at Peterson's request. Verified via `git show b1e757d:<path>` diffed
against each file in `.claude/agents/upwork-proposal-agent/legacy-2026-07-08/`.
Decision: snapshot stays as-is (NOT restored to byte-exact). This doc is the record of every
deviation so A/B results can be interpreted correctly.

## Verdict

Pipeline LOGIC is identical to July 8. All deviations are either approved (persona rename),
required integration plumbing, or cosmetic text differences with no behavioral effect.

## Approved / required deviations

1. **Samuel -> Peterson rename** everywhere (persona only; July 8 era ran under the Samuel
   profile, proposals now go out under Peterson's Upwork profile). Approved by Peterson.
2. **Snapshot headers + path redirects**: each legacy file carries a comment header noting it
   is the July 8 snapshot; the agent prompt redirects internal path references to the
   `legacy-2026-07-08/` copies (samuel-strategic.md -> peterson-strategic.md, etc.).
3. **DISPATCHER OVERRIDE preamble** in agent-prompt.md: legacy Steps 1-4 only; logging and
   presentation are owned by the dispatcher (prevents double-logging).
4. **Output section**: Variant line ("Style: strategic_legacy (A/B-assigned)") prepended;
   log-insert mode hardcoded to 'strategic_legacy' (unused in practice, dispatcher logs).
5. **validate_proposal.py**: default profile samuel -> peterson ("samuel" kept as alias),
   added no-op `--style` flag. Check logic verified line-by-line identical.

## Cosmetic drift (known, accepted, NOT restored)

6. Literal em-dash characters (U+2014) in the July 8 INSTRUCTION TEXT were converted to
   " -- " throughout all four snapshot files. Same words, same rules, not byte-exact.
   Includes the strategic template's em-dash-scan line, which lost its literal glyph but
   still names U+2014/U+2013 explicitly, so the scan rule is intact.
7. Several explanatory code comments were stripped from validate_proposal.py (zero logic
   change).

## Latent gap (accepted)

8. The agent-prompt style table rows for `strategic_exp` and `v2` point at the CURRENT
   template files, not July 8 copies (only the strategic template was snapshotted). Irrelevant
   while Arm B only ever runs `strategic`, but if a legacy run were ever forced with another
   style it would mix eras.

## Runtime isolation guarantees (verified 2026-10-02)

- Dispatcher states only Step 0 (variant assignment), the log write, and the variant line
  apply during strategic_legacy runs.
- Step 1.5 (web research) explicitly skipped for strategic_legacy.
- Regression run RT05_20261002: legacy arm executed end-to-end clean (zero "Samuel", no
  research callout, complete legacy pipeline, validator run from legacy copy).
- Legacy word-count looseness (e.g., self-asserted word counts near the 250 floor) is
  ACCEPTED as authentic July 8 behavior per Peterson, 2026-10-02.
