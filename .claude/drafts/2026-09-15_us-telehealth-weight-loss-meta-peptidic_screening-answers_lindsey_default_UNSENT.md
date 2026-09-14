Q1. Meta prohibits implying or asserting a person's health condition. Write one GLP-1 ad opening line that violates this policy and one that does not, and explain the difference.

Doesn't pass: "Still can't lose the weight no matter what you try? GLP-1 treatment could be your answer."

Passes: "GLP-1 weight loss treatment, available online from licensed US providers."

The difference is who the sentence is about. The first line tells the person scrolling that they have a weight problem, which asserts something about their health, and Meta's personal attributes policy covers implied assertions as well as direct ones. The second describes the service and lets people decide it's for them. Meta draws the same line in its own examples: "New diabetes treatment available" is allowed, "Do you have diabetes?" is not. "You" on its own isn't the problem; "you" attached to a condition or to how someone looks is. My test is whether the line still makes sense to someone who doesn't have the condition. The compliant line still has to clear the rest too: because it names the treatment, LegitScript and Meta's prescription drug authorization need to be in place before it runs.

Q2. What targeting is available for a US weight-loss offer today, what was removed, and how do you build an audience strategy around that constraint?

Available today: location, down to state or ZIP, which at all 50 states means US-wide. Age 18 and up only, which Meta requires for both weight loss and prescription drug ads. Gender and language. Advantage+ audience, where anything you add is treated as a suggestion. And custom audiences from people who engaged with your own videos, Page, Instagram or lead forms, plus lookalikes of those.

What's gone: in January 2022 Meta removed detailed targeting tied to health causes and other sensitive topics (its examples included "Chemotherapy" and "World Diabetes Day"). In 2025 it removed detailed targeting exclusions from new ad sets. And telemedicine platforms and pharmacies are named examples of Meta's health and wellness data category, which can come with data sharing restrictions: Meta can block custom events that look like they carry health information, and it restricts certain custom audiences and custom conversions.

So I don't try to find patients through targeting. I build broad (US, 18 and up, Advantage+ audience) and let the creative do the selecting, with ad sets organized by angle rather than by interest stacks. Retargeting comes from video viewers and Page and Instagram engagers, which doesn't rely on intake-page data Meta can restrict. Every audience, event and conversion gets a neutral name, and no patient list gets uploaded without your compliance team's sign-off.

Q3. Which creative angles and formats have worked for you in this vertical, which look good but get rejected or underperform, and how do you test a new angle?

Straight answer first: I haven't run Meta for a weight-loss or telehealth brand, so nothing here is "what worked in this vertical." It's what I've seen on dental and aesthetics accounts and how that shapes testing for you.

Worked: on a dental implant group I ran Meta for, Spanish-language campaigns came in at $17.93 per lead against $26.38 for English between April 21 and July 15, 2026. That was on about a tenth of the English spend, so I read it as a lane worth testing rather than a guaranteed discount. A Spanish-language lane with its own creative would be one of my first tests for you.

Looked good, didn't hold up: last month on a small dental practice I run, an engagement campaign got nearly twice the impressions of the lead campaign beside it and no recorded enquiries, while the lead campaign came in at $15.77 a lead. Cheap reach reads healthy in Ads Manager.

What I'd be careful carrying over: our team has built cosmetic dental creative around confidence. Pointed at weight loss, that angle drifts fast toward the lines Meta draws: close-ups of a body area with pinched fat, negative statements about someone's appearance, and promised results in a set timeframe without qualifiers. Add "you" hooks about weight and any hint that compounded equals brand-name, and that's what I'd keep out of testing. I can't point to rejections of my own in this category.

How I test an angle: one angle per ad set, three executions of it with different hooks, the same offer and landing page, a broad audience, and a budget and read date set before launch. Every ad and its page get a policy check first. I judge on cost per completed intake from your own system, not click-through rate, and an angle that keeps drawing rejections gets cut even if it converts.

Q4. An ad account in this vertical gets restricted for unusual activity. What do you do after it happens, and what do you do before it happens to make it unlikely?

After: I find out exactly what's restricted in Business Support Home, whether that's a person's profile, the ad account, the Page or the business portfolio. It decides who can keep working, since other members of an ad account or Page can sometimes keep advertising when one person's profile is restricted.

I treat unusual activity as a possible security problem first: check who has access to the business portfolio and ad account, look for payment method changes or spend nobody recognizes, remove anyone who shouldn't be there, reset passwords and require two-factor for everyone. Meta says it may remove admins, pause ads or change payment methods when it sees suspicious activity, so I also check what Meta changed.

Then I work through the steps Meta lists under What you can do, like confirming identity, completing verification and securing the account, before requesting a review. Review requests are limited and the decision is final once made, so the first request needs to be the clean one. Ads don't restart on their own after reinstatement, so I bring them back in stages. What I won't do is open a new ad account, Business Manager or Page to keep running. Meta's account integrity rules treat accounts created to get around a previous removal as a violation, including ones tied to the same owners.

Before: LegitScript and Meta's prescription drug authorization in place before any ad mentions the medication. Business portfolio and domain verified. At least two real admins with two-factor required for everyone, because if the only person on an ad account is restricted, Meta can disable that ad account too. Access through business roles only, no shared logins, and old users removed. A business-owned payment method with a backup on file, and budgets raised in steps on a young account rather than in jumps. Every ad and its landing page checked before launch, with rejections fixed rather than resubmitted unchanged, because Meta can weigh an advertiser's past compliance when deciding which ads get extra review.

Q5. The medical intake is a multi-step form on a separate subdomain, and the pixel only registers the initial page view. How would you fix this?

Seeing only the first page view points to one of two things. Meta's pixel records a PageView automatically whenever a page changes its URL through the browser's history, so if each step changed the URL you'd already see more than one. Either the steps swap content without changing the URL, or the form runs inside an iframe or vendor widget that the pixel on your page can't see into.

How I'd fix it:
1. Confirm which one it is by walking through the intake with Meta Pixel Helper and the Test Events tool in Events Manager.
2. Have your developer push a small dataLayer event when each step is completed and when the form is submitted, carrying the step number and nothing else. Google Tag Manager then fires the pixel: a neutrally named custom event for each step and a standard event on submit. If the form sits in a vendor iframe, the vendor has to pass those events out of the frame, or the intake moves onto your own page.
3. Send the submit event from your server through the Conversions API too, with the same event ID as the browser event so Meta counts it once.
4. Run the same pixel on the main site and the subdomain so the browser ID and click ID should carry across your root domain, and verify that root domain in Business Manager.
5. Keep health data out of all of it: no intake answers, medications or conditions in event names, parameters or URLs. Telemedicine platforms are one of Meta's named examples of its health and wellness data category, which can come with data sharing restrictions, and Meta can block custom events that look like they contain health information. So check the category Meta assigned in Events Manager, confirm each new custom event there, choose the optimization event from what Meta actually accepts, and have your compliance team sign off on the event list before launch.
