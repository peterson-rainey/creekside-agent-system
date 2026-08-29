1.

A dental implant group in the Sacramento area is the closest match to what you are describing. We ran their Meta lead forms on a $20,000 per month budget, and over one 90 day stretch that produced 2,558 leads at $25.31 per lead. The relevant part for you is that we deliberately made the form harder. We added qualifying questions up front, accepted a higher cost per lead in exchange for better ones, and throttled spend to match what their call center could actually dial, because leads that sit uncalled are just a more expensive way to lose people.

At the other end of the budget range, we currently run Google Ads for a naturopathic clinic on roughly $1,900 a month. Over the last twelve months that has been 580 booked conversions at a blended $39 cost per conversion. Smaller budget, same principle. A local calendar-based business does not need scale, it needs the right forty people a month.

2.

The click identifiers are the whole game. Google passes a gclid and Meta passes an fbclid on the inbound click, and those get written onto the CRM record at the moment the form is submitted, before any redirect happens. From there the CRM stages carry the rest, so contacted, booked, showed and purchased all hang off a record that still knows which ad produced it.

Two things break this in practice and both are worth knowing before we start. Duplicate contact merges will silently overwrite a stored click ID, so the same person inquiring twice can erase their own attribution. And most third party booking tools drop the parameter at the handoff, which is why the ID has to be written to the record up front rather than carried through the session.

The return leg is where I would set expectations honestly. Booked and showed events can be sent back to Google as offline conversion imports and to Meta through the Conversions API, but at your likely volume that data is more useful for steering budget and audiences by hand than for letting the algorithm bid on it.

3.

Cost per qualified lead first, because it separates a cheap form fill from someone who actually wants to dance. Then contact rate and speed to lead, cost per booked intro class, and show rate, since those three explain almost every gap between lead volume and studio traffic. Above that, CAC measured against what a student is worth over their full enrollment rather than their first month of tuition.

I also read lead to enrollment rate broken out by campaign and by individual ad, not just at the account level. A campaign with a worse cost per lead is frequently the cheapest source of students who actually stay, and account level reporting hides that completely.

4.

Conversion tracking before anything else. What is actually counted as a conversion, whether the same action is being double counted through both the pixel and the Conversions API, and whether things like short phone calls or button clicks are inflating the numbers. Optimizing an account on top of bad conversion data just teaches the platform to buy more of the wrong thing faster, and it is the most common thing I find.

After that, where the money actually went rather than where it was assigned. Search terms report, placements, and how much of the budget Performance Max and Advantage campaigns are quietly routing to broad or low intent inventory. Then structure, geo radius, audience exclusions, and whether you are paying to retarget people who already enrolled.

We took over a telehealth account that had duplicate conversion tracking and was essentially only bidding on its own brand name. Rebuilding the tracking and the targeting took it to 10x ROAS within thirty days, and almost none of that was clever media buying.

5.

Speed to lead and contact rate, before touching the ads at all. A large share of what gets called a bad lead is really an uncalled lead, so the first thing I want to see is how many were contacted, how fast, and how many attempts each got. If the average first touch is hours later, the ads are not the problem.

If contact rate is healthy, then it is a lead quality problem and I would work through it in order. Instant forms with autofill produce high volume and low intent, so adding one or two qualifying questions usually fixes it. Placements come next, since Audience Network and broad Advantage placements generate cheap leads that never show. Then the geo radius, because people thirty minutes away rarely drive to a class twice a week no matter what they told the form.

Last is the offer itself. A free trial class attracts browsers, and a small paid intro offer filters them out before they ever hit your calendar. That single change often looks like a worse cost per lead and a much better cost per enrolled student.
