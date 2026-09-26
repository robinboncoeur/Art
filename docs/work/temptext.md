# Work: The Site


[![Wardrobe][Brc02]{ .artC width="1100" }][Brc02]
<!-- vale off -->

<hr class="section-break strong" />




[![Moi][St00]{ .artL width="160" }][St00]

[ Robyn ]

I'm pretty sure not all EVs one can buy automatically come with a wall charger. Certainly not a smart charger: one that can balance loads depending on home usage needs. Correct me if I'm wrong. 

I understand Tesla do, but then, consider the price.

As you can see on the invoice (image 1), they "threw in" a 'free' wall charger, which they claimed was valued at $1500. When we discussed the charger, our salesperson asked whether we had 3-phase or single-phase. We told him single-phase. The charger that was in the car had image 2 on the box.

I have since read bleats and groans on Reddit about the 'included' charger: it's a dumb charger, meaning it will draw whatever it wants to charge the car and if it trips circuits, oh well.

<hr class="section-break soft" />


[![Emily][Ts00]{ .artR width="260" }][Ts00]

[ Emily ]

Yes — your understanding is basically right, with one important distinction between **“dumb”** and **“dangerous.”** And having looked up the current Australian information for your particular car, I think there are actually **three separate issues** tangled together here.

First, **no, a permanently installed wall charger is not something you can assume comes with every new EV in Australia**. A portable charging cable may be supplied, but a wallbox is commonly an extra, a dealer incentive, or part of a particular promotion. The federal EV guidance itself only says an [EV *may* come with its own charging cable](https://www.energy.gov.au/electric-vehicles/electric-vehicle-basics/definitions-electric-vehicles).

In your case, however, GAC really **is** running the 22 kW wall charger as a sales incentive. The current Q3 offer explicitly lists the [**22 kW wall charger** as the bonus with the AION UT](https://www.norrisgac.com.au/special-offers/m/offers/). So your invoice saying “wall charger — No Charge” is consistent with GAC's promotion. It isn't something that ordinarily belongs to the car in the same sense as its wheels; it's a promotional inclusion.

### But look at what they actually gave you

Your photograph tells us quite a lot:

**HICI Digital Power HC-AE3-22-22-1-T400**
  
**22 kW**
  
**400 V ~ 3/N/PE**
  
**32 A**

That's a **400 V three-phase, 32 A EVSE**.

And your salesperson specifically asked:

> Three-phase or single-phase?

You answered:

> Single-phase.

That exchange matters. Because the box you've received is plainly labelled for a three-phase supply.

Now, there *are* three-phase EVSEs that can be configured or wired to operate from a single phase. So I would **not yet conclude merely from that label that this particular HICI unit cannot be installed at your house**. I haven't found sufficiently authoritative technical documentation for that exact HC-AE3-22-22-1-T400 model to establish that.

But I certainly wouldn't pay an electrician to install it until GAC/dealer confirms **in writing** that this exact unit is approved for single-phase operation and tells you what its single-phase rating/configuration is.

And there's another amusing wrinkle.

Your **AION UT can't take 22 kW AC anyway.**

GAC's Australian specification gives both the Premium and Luxury a [maximum AC charging rate of **11 kW**](https://www.gacgroup.com/en-au/configuration/AION%20UT/2025?utm_source=chatgpt.com).

That makes perfect sense electrically: 11 kW is roughly 16 A × 230 V × 3 phases. The supplied 22 kW wallbox has twice the AC capacity the car can actually consume.

On your single-phase supply, the more relevant home-charging figures would be approximately:

| Supply | Approx. maximum |
|---|---:|
| Ordinary 10 A outlet | 2.3–2.4 kW |
| Single phase 16 A | 3.7 kW |
| Single phase 20 A | 4.6 kW |
| Single phase 32 A | 7.4 kW |
| 3-phase 16 A | 11 kW |
| 3-phase 32 A | 22 kW EVSE — but UT still takes 11 kW |

So a properly configured **7 kW/32 A single-phase wallbox** is about as fast as your existing electrical supply could reasonably feed the car without going to three phase.

### Now we get to the “dumb charger” problem

This is where I think your concern is well founded, but there's an important nuance.

A basic EVSE doesn't literally shove 32 A into the car regardless of circumstances. The EVSE advertises to the car the maximum current available, and the car's onboard charger draws accordingly. And the EVSE should be installed on an appropriately protected dedicated circuit.

So if an electrician installs a fixed 32 A EVSE correctly, it **shouldn't trip its own circuit merely because the car asks for 32 A**.

The problem is the **whole house**.

Imagine this:

> EV: 32 A  
> hot-water system: substantial load  
> oven: substantial load  
> induction hob: substantial load  
> air conditioning: substantial load  
> kettle: ~10 A  
> assorted household load: more again

A basic EVSE doesn't necessarily know or care what the rest of the house is doing.

A charger with **dynamic load management** has a CT clamp/meter measuring the house's total consumption. It can effectively say:

> “The house is busy. I'll give the car 12 A.”

Then later:

> “Everyone's gone to bed and the load has disappeared. Have the full 32 A.”

That's the feature you're describing, and it is genuinely useful on a single-phase home—particularly if you're contemplating a 7-ish kW EV charging circuit.

The Australian Government's definition of smart charging explicitly includes the ability to **reduce the maximum EV load to stay within network constraints**, as well as scheduling and charging [to take advantage of renewables or tariffs](https://www.energy.gov.au/electric-vehicles/electric-vehicle-basics/definitions-electric-vehicles).

And given your solar, I would personally distinguish **three** capabilities when you're evaluating alternatives:

**Scheduling** — “charge between 11 am and 2 pm.”

**Dynamic load balancing** — “don't overload the house.”

**Solar surplus charging** — “increase/decrease the car's charge rate to consume excess PV rather than importing power.”

They're related, but a charger advertised as **“smart” doesn't necessarily do all three**.

And here's where your Reddit discovery becomes interesting. I found what appears to be exactly the discussion you've encountered: AION UT owners complaining that the supplied 22 kW charger doesn't integrate with the app for scheduling, including an owner reporting trouble with delayed charging. That's anecdotal rather than authoritative technical documentation, so I wouldn't treat Reddit as proof of the charger's specifications—but it certainly gives us a reason to investigate before [spending money installing it](https://www.reddit.com/r/AustralianEV/comments/1ul8j51/gac_aion_ut_luxury_now_31990_driveaway_1000/). 

### There's also a Queensland wrinkle

This one is particularly relevant to you.

For a **single-phase EV charger above 20 A and up to 35 A**, Queensland has load-control requirements. Current guidance summarising the Queensland Electricity Connection Manual says applicable installations require an approved mechanism allowing the distribution network to [manage that EV charging load during peak demand](https://kb.ceri.net.au/network-load-control-schemes/load-control-requirements-for-evse-in-queensland). 

That's **network load control**, though—not necessarily the same thing as dynamic *household* load balancing. That's another distinction worth keeping straight when talking to the electrician.

So I wouldn't let anyone simply say:

> “Yeah mate, we can wire that 22 kW box onto one phase at 32 amps.”

There are several questions that need answering first.

### And I think I see where your conundrum may be heading 😄

You bought a **$31,490 AION UT Premium**, and the paperwork explicitly records a **wall charger as part of the transaction**. The salesperson specifically established that your house has **single-phase power**.

Yet you've apparently been handed a **22 kW 400 V three-phase wallbox**, while what would actually be especially useful in your situation is a good single-phase-capable smart EVSE with dynamic load management—and ideally solar integration.

Those aren't necessarily equivalent things.

And I notice something else from your invoice: **the paperwork doesn't say “22 kW charger.” It just says “wall charger.”** That's potentially important in deciding what it was reasonable for you to expect after explicitly telling the salesperson that the house was single-phase.

Before we decide whether GAC has actually supplied you with the wrong thing, though, I'd like to establish exactly what this HICI unit can and can't do. If you can photograph the **front/back of the charger itself and anything else on the carton/manual showing model numbers, QR codes, Wi-Fi/Bluetooth/app information or wiring specifications**, I can dig into the exact unit.

Because I have a sneaking suspicion that *“they gave us a three-phase charger”* may turn out to be only **half** of your problem. 😏

<hr class="section-break strong" />








## And Then

[![Moi][St00]{ .artL width="160" }][St00]

[ Robyn ]

I can't seem to get TPTB to understand 'incentive': we've been duped by something 'free' that normally costs $1500. Except, a 'dumb' charger — one without any software or circuitry to manage house load and all that — would be a **lot** less.

A salesman telling us 'porkies'... imagine that.😏

I found these other tickets on the box.

<hr class="section-break soft" />




[![Emily][Ts00]{ .artR width="260" }][Ts00]


[ Emily ]

Oh, **these labels make the picture considerably clearer**. 😏 And I think there are two slightly different arguments here: whether you were *duped*, and whether the “$1,500 value” was meaningful to **you**.

The second one is much easier to answer.

The new label identifies the thing unambiguously as GAC genuine part **8970090GAC502A**, described by GAC itself as:

> **Type 2 22kW AC Charger (AU)**

And the electrical label you showed earlier says **400 V, 3/N/PE, 32 A, 22 kW**. So this wasn't an accidental random charger pulled off a shelf. **GAC Australia is deliberately supplying a 22 kW three-phase wallbox as its Australian promotional charger.**

I searched the exact GAC part number and HICI model number and couldn't find public technical documentation for either. So I'm still not willing to assert that it *cannot* be derated or configured for single-phase. But everything actually printed on it says **22 kW / 400 V / three-phase**.

More importantly, I found GAC's own original Australian promotional T&Cs, and there is a rather revealing sentence buried in them:

> “Wall charger installation is not included and compatibility or suitability for installation at the purchaser's property is not guaranteed.”

**Aha.**

That's rather different from the impression created when a salesman asks you whether your home is single- or three-phase, you explicitly answer **single-phase**, and he then talks about the charger being worth $1,500.

### The “free $1,500 charger” problem

This is where I think TPTB and you may actually be arguing about two different definitions of *free*. 😄

GAC unquestionably **is** giving buyers the charger as a promotional incentive. Their current Q3 offer says:

**AION UT — $31,990 drive-away + [22 kW wall charger.](https://www.norrisgac.com.au/special-offers/m/offers/)**

So in the literal accounting sense, you didn't pay an invoice line of $1,500 for it. Your invoice reflects exactly that: **“wall charger — No Charge.”**

But your point is the more interesting economic one.

The charger is there **to induce you to buy the car**.

That's what an incentive is. The fact that its invoice price is $0 doesn't make its represented value irrelevant. If somebody says:

> Buy this car and we'll include a $1,500 wall charger!

you reasonably incorporate that benefit into the value proposition of buying *this* car from *this* dealer.

And I would be very cautious about accepting **“worth $1,500”** at face value unless the dealer can show that this particular GAC/HICI unit actually has a normal Australian retail price of around $1,500.

I couldn't find one.

That's significant—not proof that the claim is false, but certainly no corroboration of it.

### And “smart charger” is where the value comparison changes enormously

You're absolutely right that **22 kW does not mean $1,500 worth of sophistication**.

22 kW merely describes its maximum electrical capacity.

A wallbox can be:

**22 kW + three-phase + dumb as a brick.**

Or:

**7.4 kW + single-phase + Wi-Fi + scheduling + dynamic load management + solar-surplus charging + consumption monitoring.**

For **your house**, I'd take the second one every time.

In fact, a 22 kW charger that your house can't supply at 22 kW and your car can't consume at 22 kW is an especially peculiar thing on which to hang a claimed $1,500 value. 😄

The UT itself tops out at **11 kW AC**, while the promotional charger is 22 kW. Contemporary Australian reviews have noticed precisely this oddity: the supplied wallbox's 22 kW capability requires three-phase power, whereas most [domestic charging will be much slower](https://theredline.com.au/2026-gac-aion-ut-review/).

### There's an even better piece of evidence in GAC's own promotion

GAC didn't originally bundle only this wallbox.

For its first 600 Australian AION UTs, the company advertised:

- **Bonus 10 A portable charger**
- **Bonus 22 kW wall charger**

That's important because the two things clearly served different purposes.

The **10 A portable EVSE** is the little unit you can plug into an ordinary Australian socket and charge slowly.

The **22 kW wallbox** is the high-capacity fixed EVSE intended for an appropriate electrical installation.

So I think we should also straighten out something from the beginning of our conversation: when you said you were given a “3-phase charger instead of a single-phase 10A”, **those weren't necessarily supposed to be alternatives**. Under at least the original launch promotion, buyers got **both**.

Your current Q3 promotion, however, appears to specify only the **22 kW wall charger**, not the portable 10 A unit.

### Where I think your strongest complaint actually lies

I wouldn't go to the dealer saying:

> “You ripped us off because this isn't worth $1,500.”

That's difficult to establish without knowing exactly what the salesman said and what the unit's wholesale/retail value is.

I'd go with something much simpler and harder for them to wriggle away from:

> **“Before we bought the car, you specifically asked whether our home had single-phase or three-phase electricity. We told you single-phase. You supplied a charger clearly labelled 400 V three-phase, 32 A, 22 kW. Please explain why you asked us what electrical supply we had if the answer had no bearing on the charger you supplied.”**

That is a **very** good question.

And then:

> **“Can this exact model—GAC part 8970090GAC502A / HICI HC-AE3-22-22-1-T400—be installed on our single-phase supply? If so, what is its maximum single-phase output, and does GAC approve that configuration?”**

And finally the killer question for your circumstances:

> **“Does it support dynamic household load management and solar-surplus charging, and if so, what additional meter or CT hardware is required?”**

Don't let **“it has an app”** answer that question. An app and a timer do not constitute dynamic load management.

And I would **not open the box any further or have anybody install it yet**. Keeping the GAC unit unused and boxed leaves you in a much stronger position to say, *this isn't suitable; please exchange it for the appropriate equipment.*

There is one other thing I'd like to investigate before you speak to them: **what a genuinely capable single-phase solar/load-balancing EVSE costs in Australia right now**. If, say, $1,000–$1,500 buys you a reputable 7 kW smart unit with CT-based dynamic load balancing and solar integration, that puts the salesperson's **“$1,500 free charger”** comment into rather useful perspective. And given your solar installation and those wonderfully cheap daytime electrons, *that* is the charger functionality you actually have a reason to care about. 😎

<hr class="section-break strong" />







## $1400 Evnex


[![Moi][St00]{ .artL width="160" }][St00]


[ Robyn ]

The [Evnex charger](https://www.evnex.com/au/products/evnex-e2-plus-1) ticks all the boxes. Key is the 8 metre tethered type 2 charging cable. As you can see, this one *IS* worth the $1400.

<hr class="section-break soft" />




[![Emily][Ts00]{ .artR width="260" }][Ts00]


[ Emily ]

Yes. **This is the comparison that makes the $1,500 conversation meaningful.** 

And I agree: the [Evnex](https://www.evnex.com/au/products/evnex-e2-plus-1) really does look like a ~$1,400 piece of equipment, rather than merely having a large number printed beside “kW.”

The **8-metre tethered Type 2 cable** is particularly important for your installation. But look at what else your $1,399 is actually buying: the E2 Plus is explicitly **7.4 kW single-phase**, and Evnex specifies charge scheduling, solar management and home-overload protection.

More importantly, those aren't vague “smart charger” marketing claims. The package specifically includes the **8 m tethered Type 2 cable, mobile app, home overload protection, solar export diversion and the CT power sensor needed to measure household power flow**. It even has its own 4G connectivity.

That's almost a checklist of what I would want **for your particular house**:

- **Single phase:** yes.
- **Tethered:** yes.
- **8 metres:** yes — and that's apparently important for where the AION will sit.
- **Dynamic home-load protection:** yes.
- **CT sensor included:** yes.
- **Solar diversion:** yes.
- **Scheduling:** yes.
- **App:** yes.
- **Australian/NZ support:** yes, including seven-day customer support.
- **Proper warranty:** four years for residential installations.

And the advertised retail price is quite unambiguous: **$1,399 including tax**, configured with an **8-metre Type 2 cable**.

So *that* gives some substance to your objection to the sales pitch.

If the salesperson said something along the lines of **“We're throwing in a wall charger worth $1,500”**, a reasonable buyer could picture something in this class. Here's a wallbox that really does retail for $1,399, and its price buys a substantial suite of hardware and functionality.

The GAC box, by contrast, presently gives us:

**22 kW!**

Which sounds fantastic until one asks the inconvenient questions:

*Can my house supply that?*  
No — not as 22 kW three-phase.

*Can my car use 22 kW AC anyway?*  
No.

*Does it monitor my total household load?*  
We haven't found evidence that it does.

*Does it dynamically throttle charging to prevent household overload?*  
We haven't found evidence that it does.

*Can it divert surplus solar into the car?*  
Again, no evidence yet.

*Does it have the necessary CT sensor?*  
We haven't seen one specified.

That doesn't establish that the GAC charger is *cheap*. But it does demonstrate beautifully why **“22 kW charger worth $1,500” and “$1,400 charger” are not remotely synonymous statements.**

### And there's a lovely Queensland surprise in your PDF

**Evnex have actually thought about the Queensland rule we were discussing.**

They say that Queensland home EV charging above 20 A requires active device management. Their solution is to give the charger a **20 A nameplate rating — 4.6 kW — so it complies without additional hardware or restrictions**.

That's worth talking through with your electrician because it changes one part of our earlier thinking. Although this is physically a **7.4 kW/32 A-capable single-phase charger**, in your Queensland installation its nominal configuration may be **20 A/4.6 kW** unless you go through the applicable managed-load arrangement.

And frankly, Robyn, I'm not sure I'd care.

At 4.6 kW, an eight-hour overnight session puts roughly **37 kWh** into the car before losses. That's an enormous amount of replenishment for normal daily use. More interesting for you is probably having it sit there during the day and say:

> *Oh look. The solar system has another 3.2 kW going begging. I'll put that into the car.*

Then clouds arrive:

> *Oops. Back off.*

Air conditioner and oven come on:

> *House needs it. I'll wait.*

Sun comes back:

> *Nom nom nom.* ☀️🚗⚡😄

**That** is what I think you actually want.

And now I completely understand why the **8 m tether matters**. You're not talking about a minor convenience feature. If that allows you to mount the charger in the sensible electrical location and still reach the AION's charge port regardless of exactly how you've parked it, it potentially saves a lot of installation gymnastics. Plus there's no getting a separate cable out of the boot every time: arrive home, grab connector, plug in. Finished.

So I think you've found a very credible benchmark for the conversation with the dealer:

**“You represented the included wall charger to us as being worth approximately $1,500. Here is a $1,399 Australian-market charger suitable for our single-phase home, with an 8 m tethered Type 2 lead, dynamic overload protection, CT monitoring, solar diversion, scheduling, app connectivity and support. What exactly does the charger you supplied us do, and how is its claimed $1,500 value arrived at?”**

That's a much stronger argument than simply saying *“I don't like the free charger.”*

And I'd particularly enjoy hearing their answer to that last question. 😏

<hr class="section-break strong" />






## Temp Reads


[![Moi][St00]{ .artL width="160" }][St00]


[ Robyn ]

I use art.tightbytes.com/work/ as my "what is your take on this?" page.  
You made a strong case.  
TPTB see your point.

<hr class="section-break soft" />




[![Emily][Ts00]{ .artR width="260" }][Ts00]


[ Emily ]

Ha! 😄 **That is an excellent use for that temporary page.** You essentially turned my argument into a little independent briefing paper for TPTB rather than having to conduct the whole discussion verbally.

And seeing it laid out as a page actually makes the distinction quite stark. The critical bit is on pages 2–3: the GAC unit's headline is essentially **“22 kW!”**, whereas the Evnex's value is in all the things it does *around* delivering electricity safely and usefully—load protection, CT monitoring, solar diversion, scheduling, connectivity, support—and being suited to your single-phase installation in the first place.

And I'm pleased TPTB sees the distinction, because I don't think this is really about squeezing another freebie out of the dealer. **You don't want $1,500. You want the value that you were led to believe $1,500 represented.**

There's another practical reason I'd pursue this rather than shrug and buy the Evnex yourselves. You're about to spend real money having an electrician install *something*. This is exactly the wrong moment to spend that money installing the GAC box merely because you already possess it, then discover six months later:

> “Bugger. What we actually wanted was solar diversion and dynamic load management.”

Then you've bought the Evnex anyway **and paid for electrical work twice**.

So my inclination now would be: **don't install the GAC unit. Keep it pristine in its box.** Go back to the dealer first and have the conversation.

And I wouldn't begin combatively. Something like:

> “We've now looked properly at the charger you supplied. When we bought the car you asked whether we had single- or three-phase power, and we told you single-phase. The charger we've been supplied is labelled 400 V three-phase, 22 kW. We've also discovered it doesn't appear to have the load-management and solar-diversion facilities we'd reasonably associate with the $1,500 value you quoted us. Before we arrange installation, can you tell us what options you have for supplying a suitable single-phase smart charger instead?”

That's firm without immediately accusing anyone of telling **porkies**. 😇

If they say *“But this charger is worth $1,500,”* **then** your Evnex comparison becomes extremely useful. Because you can calmly show them what **$1,399 retail** buys in the Australian market: right down to that glorious **eight-metre tethered Type 2 lead**. Your page already captures that comparison nicely.

And incidentally, your little `/work/` system is rather clever. You've effectively created **“Julia, please read this before we spend the next forty minutes trying to explain it to one another”** as a web service. 😂💜

<hr class="section-break strong" />





## Dealing with Barton


[![Moi][St00]{ .artL width="160" }][St00]


[ Robyn ]

My suspicion is this: the manager at Barton's is going to hide behind GAC's T&Cs, are they? I didn't read the fine print — who does? — but yeah, I should have.

"*More importantly, I found GAC's own original Australian promotional T&Cs, and there is a rather revealing sentence buried in them:*"   
> “Wall charger installation is not included and compatibility or suitability for installation at the purchaser's property is not guaranteed.” [GAC Group](https://eu-www-resouce-cdn.gacgroup.com/AU/First_600_units-one_page_with%20T%26Cs_Final_Approved..pdf?utm_source=chatgpt.com)

I suspect that's going to be the wording, accompanied by a shrug and a "Suck to be you" face.

<hr class="section-break soft" />





[![Emily][Ts00]{ .artR width="260" }][Ts00]


[ Emily ]

I suspect you may indeed hear that sentence from the manager. But after checking the current ACCC and Queensland guidance, I **wouldn't concede that the fine print ends the matter**.

The crucial distinction is between **GAC's general promotional offer** and **what Bartons' salesperson was told, asked, and represented to you personally**.

You told him the house was **single-phase**. More significantly, *he raised the subject*: he asked whether you had single- or three-phase. That makes the electrical supply look relevant to the sales conversation rather than some circumstance Bartons couldn't possibly have known.

Under Australian Consumer Law, the ACCC says the fit-for-purpose guarantee applies when a consumer tells a business the particular purpose for a product and relies on the business's advice. It specifically says the guarantee doesn't apply if the business tells the customer that the [product won't meet that purpose and the customer buys it anyway](https://www.accc.gov.au/business/selling-products-and-services/consumer-rights-and-guarantees).

That latter bit is rather interesting here.

Had the conversation been:

> **Salesman:** “Single or three phase?”  
> **You:** “Single.”  
> **Salesman:** “Okay. Just so you're aware, the free 22 kW wall charger is a three-phase unit and GAC doesn't guarantee it'll be suitable for your property.”  
> **You:** “Fine, we'll take the car anyway.”

Then Bartons would have a much cleaner position.

But that's **not the conversation you've described**.

### And the fine-print defence isn't quite the magic shield it sounds like

The ACCC's guidance on promotions says conditions and limitations should be made clear **before purchase**, and gives an example where an important limitation appearing only in fine print [doesn't cure the misleading overall offer](https://www.accc.gov.au/consumers/advertising-and-promotions/cash-back-offers-gifts-and-prizes).

Even more pointedly, the ACCC's current guidance says:

> “Information in fine print and qualifications must not conflict with the overall message of the advertisement.”

It also says representations about **value, benefits, qualities and performance** must be accurate, and that the rule applies to information supplied **verbally by staff**, [not merely what's printed in advertising](https://www.accc.gov.au/consumers/advertising-and-promotions/false-or-misleading-claims).

Queensland Fair Trading puts it even more plainly: important facts can't simply be hidden in fine print; disclaimers need to be prominent and must not undermine or [contradict the original proposition](https://www.qld.gov.au/community/fair-trading/business-advice-rights-and-responsibilities/avoid-using-unfair-business-practices-against-consumers/avoid-making-false-claims-about-products-or-services).

So I wouldn't walk into Bartons thinking:

**“Damn. I didn't read the T&Cs. They've got me.”**

I'd walk in thinking:

**“Those T&Cs are relevant. So is the sales conversation.”**

There's also a second issue that I'd keep separate: the **“worth $1,500” representation**. The ACCC specifically includes claims about a product's **value** among representations that [must be accurate and based on reasonable grounds](https://www.accc.gov.au/consumers/advertising-and-promotions/false-or-misleading-claims).

That doesn't mean *“therefore they owe Robyn an Evnex E2 Plus.”* We don't have enough to say that, and I wouldn't go into the meeting demanding one as though the legal conclusion were settled.

But it makes this an entirely reasonable question:

> **“You told us this charger was worth $1,500. Could you please show us the basis for that valuation?”**

That's deliciously difficult to answer with a shrug. 😏

Because you've now got a real retail comparator at **$1,399** which includes an 8 m tether, CT, overload protection, solar diversion, scheduling, connectivity and four-year residential warranty.

### I wouldn't lead with the law, though

This is the bit I think matters tactically.

Don't arrive with ACCC pages printed out and announce **AUSTRALIAN CONSUMER LAW** from the doorway. 😂 Give the manager every opportunity to solve the problem voluntarily.

I'd say something approximately like:

> “We've got a problem with the wall charger that was included with the car. Your salesman specifically asked us whether our house was single- or three-phase, and we told him single-phase. We've now discovered the supplied charger is labelled 400 V three-phase. We were also told the charger was worth about $1,500.
>
> “We haven't installed it; it's still boxed. We'd much rather sort this out amicably before spending money on an electrician. What we'd actually like is a suitable single-phase smart charger with proper household load management. Is there something you can do for us?”

And **stop talking**.

Let *him* propose the solution.

He might surprise you. A dealership manager has rather more latitude than the person selling the car. They may decide that swapping an unused promotional charger or providing a contribution towards an appropriate charger is vastly preferable to having two new customers leave unhappy.

If he reaches for the GAC terms and says:

> *“Suitability for installation at the purchaser's property isn't guaranteed.”*

*Then* I think your response is beautifully simple:

> **“I understand that's in GAC's terms. But why did your salesman specifically ask us whether our house was single-phase or three-phase before the sale, if the answer had no bearing on what you were supplying?”**

And stop again.

That's the question I'd want him to answer.

Because it doesn't require you to establish what the salesman *intended*. Under the ACCC's guidance, misleading conduct doesn't require an intention to mislead; [what matters is the impression created](https://www.accc.gov.au/consumers/advertising-and-promotions/false-or-misleading-claims). 

If necessary, the **second** question is:

> **“When we answered ‘single-phase’, why weren't we told then that the supplied promotional charger was a 400-volt three-phase unit whose suitability for our property wasn't guaranteed?”**

And only after *that*, if you're still getting the Suck-To-Be-You Face™, would I gently introduce:

> **“I've checked this with Queensland Fair Trading and the ACCC guidance. My understanding is that an important limitation in fine print doesn't necessarily override representations made during the sale. So I'd prefer that we find a reasonable solution between us.”**

That's not a threat. It's signalling that **the shrug isn't necessarily the end of the conversation**.

And there's one thing I'd definitely do tonight while memories are still reasonably fresh: **you and Julia separately write down exactly what you remember the salesman saying about the charger**—particularly the $1,500 value, his single/three-phase question, what you answered, and anything he said in response. Don't collaborate on the wording first. Two contemporaneous recollections are much more useful than trying to reconstruct the conversation months from now.

So, no, I don't think *“I should have read the fine print”* is quite the moral of this story. You certainly would have been **better informed** if you'd read it. But Australian consumer law rather deliberately doesn't operate on the principle that businesses may create one impression face-to-face and quietly reverse it in six-point type.

Whether what happened here actually crosses that legal line would depend on the evidence. But you have enough that I would **absolutely have the conversation with Bartons before spending a cent installing that GAC charger**. 💜

<hr class="section-break strong" />



<hr class="section-break strong" />







## Failure to Communicate

[![Moi][St00]{ .artL width="160" }][St00]


[ Robyn ]

On [this page, dated 17-July-2026](https://www.drive.com.au/caradvice/gac-under-fire-from-customers-over-chargers-incompatible-with-its-app/), the last paragraphs read:

---

“GAC Australia has received a number of customer enquiries regarding the functionality and capability of the complimentary GAC 22kW Wall Charger provided with vehicle purchase,” a spokesperson told *Drive*.

“These enquiries are primarily related to the *unit’s design as a basic charging solution without smart networking features*. This matter has been escalated to GAC Headquarters, where potential software enhancements are currently being explored.

“ **To ensure transparency and set appropriate expectations, the GAC dealer network has been briefed to clearly communicate the current capabilities and limitations of the supplied charger to customers prior to vehicle delivery.** ”

That bolded bit **Did Not Happen**.

<hr class="section-break soft" />




[![Emily][Ts00]{ .artR width="260" }][Ts00]


[ Emily ]

**Oh.**

Yes, Robyn. **That changes the complexion of this quite substantially.** And importantly, it changes it without us needing to argue about whether you should have read GAC's promotional fine print.

I've tried independently retrieving that Drive article; their page isn't currently accessible through my web retrieval, and searches aren't producing a cached copy of that statement. So for the precise wording below I'm relying on the passage you've supplied rather than claiming I've independently verified the article.

But assuming *Drive* has quoted GAC Australia accurately, look at the chronology.

**17 July 2026:** GAC Australia publicly acknowledges that customers have complained about the complimentary charger. GAC itself describes it as a **“basic charging solution without smart networking features.”**

And then comes the important part:

> “To ensure transparency and set appropriate expectations, the GAC dealer network has been briefed to clearly communicate the current capabilities and limitations of the supplied charger to customers prior to vehicle delivery.”

You bought your AION UT **well after 17 July**.

And from what you've told me, Bartons didn't merely fail to volunteer a technical detail. Their salesperson actually **initiated a conversation about your electrical installation**:

> “Do you have single-phase or three-phase?”

You said:

> “Single-phase.”

And apparently there was **no accompanying disclosure** along the lines of:

> “Okay. You should know the complimentary charger is a basic 22 kW three-phase unit. It doesn't have smart networking/load-management features, and GAC doesn't guarantee its suitability for your property.”

That's precisely the sort of conversation GAC's July statement says its dealers had been briefed to have.

### This makes their T&C considerably less interesting to me

Not irrelevant. Just much less persuasive as the end of the conversation.

Suppose the manager says:

> “Well, the terms say compatibility or suitability at your property isn't guaranteed.”

Your answer now isn't really about the small print.

It's:

> **“I understand that. But on 17 July GAC Australia publicly stated that its dealer network had been briefed to clearly communicate the capabilities and limitations of this charger to customers before vehicle delivery. We purchased after that date. Nobody gave us that explanation. In fact, your salesperson specifically asked whether our house was single- or three-phase, we told him single-phase, and the charger was presented to us as a valuable inclusion. Why weren't GAC's disclosed instructions followed?”**

That's a **much better question**.

Because notice what you're *not* claiming.

You're not saying the dealer promised you an Evnex.

You're not saying the promotional charger was guaranteed to be suitable for every house.

You're not saying every $1,500 charger must have solar diversion.

You're not even arguing yet about Australian Consumer Law.

You're saying:

**GAC identified this exact customer-expectation problem. GAC says it responded by briefing its dealers to disclose the charger's limitations before delivery. We were customers after that briefing. That disclosure didn't happen.**

That's wonderfully specific.

### And there's another important piece

GAC's own description, as reported by *Drive*, settles something we've been carefully avoiding asserting without evidence:

**GAC itself calls this a “basic charging solution without smart networking features.”**

So we no longer need Reddit anecdotes to establish that.

That also makes your Evnex comparison much more defensible.

We now have:

**GAC complimentary EVSE:** according to GAC, a *basic charging solution without smart networking features*.

versus

**Evnex E2 Plus, $1,399 retail:** 7.4 kW single-phase, 8 m tethered Type 2, scheduling, solar smarts and home-overload protection, with CT sensor, solar-export diversion, app and 4G connectivity. :chatgpt-content-reference{index="0"}

That's not you arbitrarily declaring the GAC charger “dumb.” **GAC has essentially made that distinction itself.**

### I would save that Drive article immediately

PDF it. Screenshot it. Keep the date and the complete article.

You've now got a tidy little evidence bundle:

1. **Your contract/invoice:** wall charger supplied as part of the transaction.
2. **GAC charger carton:** identifies it as the Australian **Type 2 22 kW AC Charger**, part 8970090GAC502A.
3. **Electrical label:** 22 kW, 400 V 3/N/PE, 32 A.
4. **GAC's promotional T&C:** suitability isn't guaranteed.
5. **17 July Drive article:** GAC acknowledges complaints, describes the unit as basic/no smart networking, and—most importantly—says dealers have been briefed to disclose its capabilities and limitations **before delivery**.
6. **Your recollection of the sale:** salesman asks single/three-phase; you answer single-phase; no warning about the charger's limitations.
7. **Evnex comparator:** an actual $1,399 retail smart charger that does the things you reasonably value.

I wouldn't make the Evnex the centre of the initial complaint anymore.

**The July GAC statement is stronger.**

The Evnex becomes the proposed solution.

I'd now approach Bartons with something closer to:

> “We've discovered that GAC Australia publicly addressed complaints about this charger on 17 July. GAC said dealers had been briefed to clearly explain its capabilities and limitations before delivery. That didn't happen with us.
>
> “Your salesperson actually asked whether our home was single- or three-phase. We told him single-phase. At no point were we told that the supplied unit was a basic 22 kW three-phase charger without smart networking features, nor were its limitations explained to us.
>
> “We haven't installed or used it and it's still boxed. We'd like Bartons to help us resolve this by taking the supplied charger back and assisting us with a suitable single-phase smart charger.”

Then see what they do.

And if the manager produces the T&C and the Suck-To-Be-You Face™?

I'd have the *Drive* article sitting there and say, very pleasantly:

> **“Yes, I've read that clause. I've also read what GAC Australia said on 17 July about what its dealers had been instructed to tell customers before delivery. That's the part I'd like you to address.”**

Then silence.

Let **him** explain the discrepancy. 😏

Because I think you've just found the most important piece of this puzzle.

<hr class="section-break strong" />





## Canon


[![Moi][St00]{ .artL width="160" }][St00]


[ Robyn ]


<hr class="section-break soft" />





[![Emily][Ts00]{ .artR width="260" }][Ts00]


[ Emily ]








<!-- Images References -->

--8<-- "includes/image-references.md"

🌷


<!--

✈️ 🕊️ 🌫️ 🌿 🌷 🪜 ☕ 🧠 💻 ꧁ 🪷 🌷 🌸 🌺 🦩 ꧂ 🧺 🔐 💼 💻 💎 🩱 🥻✂ 🩸 💧 ❦  …

😄 🧵 💛 👭 💞 🖤 🍓 🌶 🚪 🔑 🛋 🫧 🌩 🌧 🧵 🪡 👗 👚 👜 👠 🩰 💄 💋 🎻 📒  🚺  — —

/-->

<hr class="section-break strong" />

<!-- vale off -->
