---
name: upwork-ooo-responder
description: Every 30 min (launchd com.creekside.upwork-ooo). Out-of-office auto-responder for unanswered Upwork client messages outside business hours.
schedule: every 30 minutes (com.creekside.upwork-ooo launchd)
status: DRAFT -- not loaded/armed yet. Peterson must review OOO message and run launchctl load.
---

Run the OOO script:

```bash
python3 /Users/petersonrainey/upwork-api/upwork_ooo.py
```

This script is fully deterministic. No Claude calls. See the script for full logic.

Log: `~/logs/upwork-ooo.log`
Ledger: `~/upwork-api/.ooo-ledger.json`

To arm after Peterson approves:
```bash
launchctl load ~/Library/LaunchAgents/com.creekside.upwork-ooo.plist
```
