# GPS Folder Map

Creekside's Gmail Productivity System. Five folders. Inbox is always empty.

## The Five Folders

### For Peterson
**Purpose:** Urgent, personal, or requires Peterson's judgment / response.

Route here when:
- Sender is Sweet Hands (business), Kade (strategy), Tony/Aura Displays (URGENT), Lindsay, Google Performance Marketing Team, Ahmed (technical replies for Peterson review)
- Bank/Square "action needed" alerts
- Invoice confusion or discrepancies
- New client onboarding / signed contracts
- Direct job applications (not Online Jobs platform)
- CC'd strategy conversations with no clear VA action
- New partnership or business opportunity
- Replies to Awaiting Responses threads
- Client cancellation / churn signals
- Lead/prospect emails (respond within 2 hours)
- Client technical question

### To Review
**Purpose:** Important but not urgent. Peterson reads when he has time.

Route here when:
- ChatGPT product updates (not invitations)
- Industry news or reports that touch strategy
- Classification confidence was low but content seems relevant
- "Unsure" category from general routing rules

### VA Handling
**Purpose:** Routine tasks the VA can execute (<15 min each).

Route here when:
- Client-related with clear routine action (<15 min)
- Platform invitations (FB Business, Google Tag Manager, GMB transfer, Drive access)
- Denise / FirstUp Marketing website design inquiries (forward to Denise)
- Ad Management Agreements from Kade (Cyndi signs, Kade pre-verified pricing)
- Admin / operational follow-ups

### Done
**Purpose:** Informational, no further action, archived record.

Route here when:
- Spam/noise missed by the Python classifier
- Calendar cancellations from team members (informational)
- Kade scheduling-only emails (already on calendar)
- Routine successful payments (NO discrepancy)
- Completed task confirmations

### Info
**Purpose:** Reference material worth keeping but not acting on.

Route here when:
- Newsletters (Info/Newsletter sub-label if applicable)
- Personal finance (mortgage, tax, credit) → Info/Finance
- Fathom meeting recaps (real meeting content)
- Gemini meeting notes (auto-generated Google Meet)
- Platform digests Peterson hasn't opted out of

## The "Inbox Always Empty" Rule

**ALL emails get `removeLabelIds: ["INBOX"]`.** Every time. No exceptions.

- If something sits in the inbox, it means the VA hasn't handled it yet.
- Peterson checks his "For Peterson" and "To Review" labels directly — not the inbox.
- Do NOT leave anything in the inbox "just in case."

## Routing Summary Table

| Scenario | Folder | Remove from Inbox? |
|----------|--------|--------------------|
| Urgent/personal/needs Peterson | For Peterson | Yes |
| Important, not urgent | To Review | Yes |
| Routine, VA can handle | VA Handling | Yes |
| Informational, done | Done | Yes |
| Reference, keep | Info | Yes |
| Spam/noise missed by filter | Done | Yes |
| Unknown/low confidence | To Review + client label if identifiable | Yes |
