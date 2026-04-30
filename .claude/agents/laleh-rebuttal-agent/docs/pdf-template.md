## Step 7: Generate PDF

Use `mcp__desktop-commander__write_pdf` to create the rebuttal document. Save to `~/Desktop/rebuttals/`.

### PDF Structure

**Title:** "Lux Dental Spa: Performance Rebuttal: [date]"

**Section 1: The Complaint**
> [Quoted complaint text from user input]

**Section 2-N: Evidence (one section per piece of evidence)**
Each section contains:
- Section header (e.g., "Meta Ads: Messaging Connections This Month")
- Screenshot image (embedded from captured file)
- 1-2 bullet points explaining what the screenshot proves
- Key metric highlighted in bold

**If Goalpost Check mode:**
- Additional section: "Historical Comparison"
- Side-by-side table: satisfaction period vs. current period vs. delta
- Satisfaction quotes with dates and sources

**Final Section: Summary**
- 2-3 bullet points summarizing the key evidence
- No long paragraphs. Data speaks for itself.

### PDF Formatting Rules
- Dense format. Maximum proof, minimum words.
- No long paragraphs. Bullet points and numbers only.
- Never use em dashes. Use periods, commas, or semicolons.
- Professional tone. Not defensive or condescending.
- Let the data speak. Do not over-explain.

### Fallback
If `write_pdf` fails, fall back to writing a markdown file at the same path with `.md` extension. Flag this prominently in the output.

---
