# Case Study Attachments

**Applies to:** `lead`, `followup`, and `nurture` response types -- ONLY when specifically relevant.
**Does NOT apply to:** `warmup`. Never attach case studies in post-booking warm-up messages.

---

## When to Include a Case Study Attachment

This is opt-in, not automatic. Include a physical case study attachment ONLY when ALL of these are true:

1. **Relevance match:** The lead's industry, vertical, platform, or stated problem maps clearly to an available case study PDF. OR the response is already citing that client's results as proof (e.g., "we took a dental practice from zero to $200K/month in 90 days").
2. **Natural fit:** The case study reference fits organically in the message. If adding one feels forced, skip it.
3. **Length allows it:** Never attach to messages that must stay minimal (e.g., a followup that is just a calendar link, a two-sentence confirmation acknowledgment, or a simple Jay redirect).
4. **The message already mentions proof or results relevant to that lead.** If you are not already talking about results, do not introduce a case study just to have an attachment.

**Never force a case study into a message where it doesn't naturally fit.**

---

## Inventory Query (Run at Generation Time)

Do NOT hardcode file names. Query live at generation time so the list stays current as new PDFs are added to Drive:

```sql
SELECT file_name, web_view_link
FROM gdrive_marketing
WHERE folder_path = 'Drive/Case Studies'
  AND mime_type = 'application/pdf'
  AND is_archived IS NOT TRUE
ORDER BY file_name;
```

**Filtering out non-case-study files:** The folder contains a handful of internal reports that are not client case studies. Exclude files whose names begin with `B2B_Rocket_Report` and `Blush Camera.pdf` -- these are not client case study PDFs. All other PDFs are valid.

**Selection rule:** From the returned list, pick the single PDF whose client industry or name most closely matches the lead's situation. Maximum ONE attachment per message.

**If no relevant match exists:** Do not attach anything. Do not mention "I'll attach something." Simply omit the attachment entirely.

---

## Message Text Rules

When a case study IS included:

- Reference the result naturally in the message body. Example: "We took a dental practice from zero to $200K+ in monthly revenue in 90 days -- the full breakdown is attached."
- The word "attached" (or "I've attached", "case study attached", "the attached PDF") signals to the VA that a file goes with this message. Use it when you include the VA block.
- **NEVER include the Drive URL in the message body.** The URL is for the VA only. Upwork compliance rules and validate_response.py both block URLs other than approved calendar links. The attachment is physical: Queenie downloads the PDF and attaches it in Upwork.
- Keep the in-message reference brief. One sentence pointing to the result and the fact that it's attached is enough. Do not write a paragraph about the case study inside the message.

**Dr. Laleh / Lux Dental Spa caution:** Her case study PDF (`Dr. Laleh  Elective Health Care Case Study.pdf`) is an approved public asset and may be used. However, prefer other dental case studies (e.g., Polaris Dentistry) when the lead's situation is an equally good match. If Dr. Laleh is the only relevant match, use it -- but do not add any detail about her beyond what the PDF itself contains.

---

## VA Block Output Contract

When a case study is attached, append a clearly separated block AFTER the validated response text. This block is NEVER part of the message sent to the lead -- it is an operator instruction for Queenie.

Format:

```
---
ATTACHMENT FOR VA (do not paste into the message):
File: <exact file_name from gdrive_marketing>
Download: <web_view_link from gdrive_marketing>
Instruction: download this PDF and attach it to the Upwork message before sending.
---
```

**Consistency rule (enforced at Step 5 checklist):**
- If the message body contains the word "attached" (or "I've attached", "case study attached"): the VA block MUST be present.
- If the VA block is present: the message body MUST contain a reference to the attachment.
- No orphan mentions of attachments without a VA block. No orphan VA block without a message-body reference.

---

## Validation Interaction (CRITICAL)

`validate_response.py` runs on the **message text only** -- not on the full output including the VA block.

**The correct flow:**

1. Generate the message text (which includes the in-message result reference and the word "attached").
2. Write ONLY the message text to `/tmp/sdr_response_draft.txt` and run the validator (Step 6 in sdr-agent.md).
3. Receive PASS or apply WARN fixes to the message text.
4. AFTER validation is complete, append the VA block to the output.

**Do NOT pass the VA block through the validator.** The VA block contains a `web_view_link` (a `https://drive.google.com/...` URL), which would trip the validator's URL-in-email check or other patterns. The block is operator-facing context, not Upwork message text. It is appended after validation, never before.

---

## Output Format When Attachment Is Included

The existing "Present Output" section in sdr-agent.md stays unchanged. The VA block is appended at the very end, after the Validation line:

```
**Context Retrieved:**
...

**---RESPONSE---**
{Validated message text, ready to paste into Upwork}

**Validation:** {PASSED / FAILED: list issues}

---
ATTACHMENT FOR VA (do not paste into the message):
File: <exact file_name>
Download: <web_view_link>
Instruction: download this PDF and attach it to the Upwork message before sending.
---
```

When no case study is used, nothing changes -- the VA block is simply absent.

---

## Step 5 Checklist Addition

Add these items to the Final Checklist under the "Content check" section (they are already enforced by the doc but should be explicit):

- [ ] If message says "attached": VA block is present below the response with the exact file_name and web_view_link.
- [ ] If VA block is present: message body references the attachment.
- [ ] No Drive URLs in the message body.
- [ ] No more than one case study attachment per message.
- [ ] warmup type: NO case study attachment, regardless of relevance.
