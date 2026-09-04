CAPI ATTRIBUTION

Straight answer before anything else: we are a paid media team, not a tracking engineering shop. We run Meta at real scale and we make optimization event and LTV decisions for a living. We have not personally built a server side GTM or Stape stack for a client, and we do not keep a redacted screenshot library of Events Manager work. If your first filter is proof of a bespoke CAPI build, we are the wrong applicant and nothing below changes that.

Where we would push back is the framing. You have written a spec for plumbing. The decision that actually moves your money is which event Meta learns from, and that is a media judgment.

Here is the part your description does not mention. Even with attribution surviving every hop, your Purchase event arrives 7 to 30 days late. Learning needs roughly 50 conversions per ad set per week inside the attribution window. A perfectly plumbed Purchase event that lands on day 21 is nearly useless as a steering signal. The real build is a value weighted proxy event fired at Qualified Engagement, carrying a predicted value calibrated against the cohorts that actually purchased, reconciled against true revenue monthly. Get that wrong and the tracking works while the algorithm still learns the wrong thing.

Closest proof we have on that exact call: a US replacement parts ecom account we ran had retargeting fragmented across six shallow signal campaigns, including Website Visits, Add to Cart, View Content and Time Spent on Site. We collapsed all of it into one conversions campaign. Cost per conversion went from $34.72 to $19.89 over the next three months while CPM stayed flat at roughly $8.10 to $8.18, which rules out the auction as the explanation. That is an optimization event decision, not a tracking one.

1 and 8. No bespoke build to claim. Our tracking work has been diagnosis and repair on live accounts: an account rebuilt off duplicate and conflicting conversion tracking, and an event architecture rebuilt for a healthcare client restricted to standard events only, where the constraint was which events were permissible rather than whether they fired.

2. Attribute on an ID you own. Stamp a unique click ID at the pre lander, store fbclid, fbc, fbp, IP, user agent and the dynamic campaign, adset and ad IDs against it server side. Pass that ID into the third party through whatever field it will carry, a sub ID or custom param. Take their postback, webhook or export, join on your ID, and fire the CAPI Purchase from your server with the stored fbc and fbp, value and currency. The pixel never touches their platform. Your database is the join.

3. fbclid is the click ID Meta appends to your URL. fbc is the first party cookie your pixel writes from it, timestamped, and it is the strongest deterministic match key available. fbp is a browser level first party cookie identifying the browser rather than the click, and it covers returning users arriving with no click ID.

4. Do not rely on the query string surviving. Capture at the first hop, persist server side against your click ID, and rebuild the string on each outbound redirect. To find the leak, walk the chain and read the Location header at every 3xx.

5. B, and it is not close. A costs $66.67 per purchaser at a 3 percent purchaser rate. B costs $30 at 10 percent. A is buying registrations, not customers. On the optimization event, 60 purchasers is too thin to feed ad set learning, so we would optimize toward the deepest event clearing roughly 50 per ad set per week, likely Qualified Engagement with a value parameter, and hold purchaser rate as the gate.

6. Report by acquisition cohort, not by conversion date. Every record carries its click ID and the campaign, adset and ad IDs from acquisition. Revenue joins in at 7, 14 and 30 days against the date the user was acquired. Reporting by conversion date makes every recent campaign look broken, and that is the most common way teams kill their winners.

7. Event Match Quality, deduplication rate with event_id matched across pixel and CAPI, Test Events confirming the server event arrives with fbc and fbp attached, event latency, the attribution window setting, and whether the intended optimization event has the weekly volume to exit learning.

9. Just over $114,000 in a single month on one Meta account, and roughly $266,000 a month across the book at peak.

10. Nothing redacted to send. What we can show is live account work.

The paid audit is the right first step and we would take it as a fixed scope engagement. If the audit concludes your attribution needs an engineer we do not have, you will read that in the audit rather than after paying for a quarter of management.
