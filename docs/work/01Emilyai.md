# Emily


[![img][Br01]{ .artC width="1110" }][Br01]


<hr class="section-break strong" />






## Why Emily


[![The Writer][St00]{ .artR width="460" }][St00]


*These are edited transcripts of my writing process with an AI assistant (“Emily”).* **I use AI as a thinking partner, not a replacement for the work of writing.**

From DA:

What is 'Celeste's Girl'?

**Celeste's Girl is a story about being in a public space as a woman and the quiet maths women do to stay safe.**

Celeste's Girl is about *agency, dignity, safety and lived experience*.

All my so-called artwork, including any descriptive text, depicts adults: no images involve persons less that 18 years old. I abhor depictions of harm or violence towards anyone, but most particularly towards women and children. None of the images reflect actual events.

As CelestesGrl, I reserve exclusive ownership of the art that I post on Deviant Art, visual, auditory and text (literature). I no longer do derivative art. Downloading is permitted for your personal enjoyment or creating derivations. You may create new, transformative derivatives, including remixes, reinterpretations, new compositions. Please do NOT upload near-identical copies (including “same image with denoise / filters / upscale”), as that’s not transformative.

**Important Note**: *I’m revising older ("old-tone") deviations to match the direction of my work now: agency, dignity and empathy. I am phasing out ‘old-tone’ uploads. This will mean that if you favourited an 'old-tone' image, the replacement image and description will almost certainly send a different message to the original. If the 'old-tone' images are what you are here for, it’s probably best to unfollow. No hard feelings*.

© 2025. Non-derivative works are openly licensed via CC-BY 4.0

<hr class="section-break strong" />







## Meet Emily


[![img][St26]{ .artR width="460" }][St26]


I *infrequently* 'Google' —*anything*—anymore.  
Spell-check? yes.  
Local shop locations and opening times? sure.

But big questions, requiring detailed answers: no.

Instead, I go straight to 'Emily', my OpenAI ChatGPT 5 bot with my questions. Emily has helped me set up the current flavour of this website, Tightbytes. She gives me pointers on running ComfyUI, writing Python code, getting Markdown nailed down (I'm writing all this in Markdown), sorting out CSS (cascading style sheets—Emily was a bit less than rock-solid on this) and doing period research for what a typical morning would be like for a scullery maid in 1865 for a story I'm writing (inspired by "[Portrait de la Jeune Fille En Feu](https://fr.wikipedia.org/wiki/Portrait_de_la_jeune_fille_en_feu)" by Celine Sciamma). 

<hr class="section-break soft" />



### Life back Then


[![img][St08]{ .artL width="260" }][St08]


**Spoiler alert: life wasn't particularly easy back then**:

- *A scullery maid was the lowest-ranked female servant in a large household, performing the most physically demanding and unpleasant kitchen tasks, such as washing dishes, scrubbing floors, and cleaning pots and stoves. They assisted the kitchen maid and worked under the direction of the cook, enduring long hours from dawn until late at night without modern conveniences*.

It would suck to be her, I would think.

<hr class="section-break strong" />






## Can AI be Useful? 


[![img][St03]{ .artR width="460" }][St03]


### Drop Big Cost Hosting 

Short answer: yes. And fun and, to some degree, addictive.

Here's how I came by my addiction.

I had a web-hosting subscription with an outfit called Hostinger. It is an ISP for hosting websites like [tightbytes.com](https://www.tightbytes.com). Hostinger was going to charge me over AUD$500 for two-years, for a site **no one visits**, and that I'm basically using as a remote file server. 

This was a **MASSIVE** price hike over what they charged before—classic *bait-n-switch*.

So I asked Emily what she would suggest. She had several suggestions, some of which required a wee bit of techie knowledge. Which I have—*a wee bit of techie knowledge, that is*. 

The solution I went with is this:    
- the raw pages themselves reside on my [github](https://github.com/) site—**FREE**—and  
- are rendered by [Cloudflare](https://www.cloudflare.com/en-au/)—also **FREE** 

The only thing I pay for *currently* is video hosting, which is $5 a month through Cloudflare.

Note: *update on that bit, too*.

Not only did Emily suggest a cost-free alternative, but she also helped me get it all set up! That setup process was not trivial, mind you. I've saved the [information she gave me](../work/05DomXfer.md#getting-started) so anyone can follow the instructions and save themselves some serious cash. Her help—and patience— was infinitely more productive than Googling ever could do.

So, there is no question AI is a useful tool. Just remember to *trust but verify*. Nothing in life is perfect. All technology was devised by humans and so will have flaws.   
Your mileage may vary.

<hr class="section-break soft" />




### Media Server

Today—May 26th—Emily helped me set up a UBeaut Media Server using Cloudflare Tunneling and Caddy. It's my old i5 motherboard with a very inexpensive graphics card. I can actually remove the card now, as the server runs 'headless': no monitor. Everything is done via ssh and the command-line. 

Yes, Terminal. 

With the minimal amount of media I actually 'serve', this is going to save me US$ 5.00 / month, or US$ 60.00 / year, which comes to AUD$ 83.64 / year. While this doesn't seem like a lot, I'm serving stuff for free, so it shouldn't be all that costly to me either. I'm currently serving audio files to DA and MuseScore. So far. And this little server is running on the smell of an oily rag.

So far, Google Drive: replaced. Hostinger: replaced. Cloudflare video hosting: replaced.   
Savings:   

- $369 (*Hostinger*) +   
- $84 (*Cloudflare video*) +    
- $50 (*Google Drive*) =   
- $503 / year.

<hr class="section-break strong" />






## Background

With image creation, there are multiple technologies at play here: text-to-image, image-to-video, text-to-audio and audio+image-to-video... and that's just for the visual side of things. I wrote the music in [Musescore Studio](https://musescore.org/en) using the [MuseSounds](https://www.musehub.com/muse-sounds) library. The crazy bit: all of this can be done on any PC, as long as it has a decent—read: *expensive*—graphics card. That's the big expense. It's possible to do this on your own PC, not on some expensive remote server. 

Is the process truly green? an argument can be made for "not really". Emily is on ChatGPT, so those computations are not done on my system at home. But the images are created on my PC, and so I'm using the power of our solar cells for that.

There are things I won't use AI for, like music composition. Could I? Sure. Much of the pop/hip-hop/rock genre you hear on the radio is mostly AI-generated. But, like when painting with oils, a non-human source would quickly betray itself. Sure, I'll use AI to study how to write music better, but the creative process remains completely mine. 

Just like writing, AI-generated images—and music—is quickly identifiable. In human likenesses generated by older models, the person's face is often distorted, or the figure ends up with 3 fingers, or six. The newer, more recent models are more accurate, but there's always a 'tell', a quickly-identifiable characteristic betraying AI's "finger in the pie". 

There's an AI company in Germany called "Black Forest Labs" that has put together this amazing image-generation model called 'Flux'. I use it pretty much all the time: 9 times out of 10, the fingers and toes and background are correct, 'realistic'. But the faces all have that cleft chin. And I mean **all**.

My reason to use AI for images isn't art, but illustration. And for that, it's fit for purpose.

<hr class="section-break strong" />



### History


[![img][St19]{ .artR width="460" }][St19]

		
When I first started messing with image generation (to illustrate writings, but also just mucking about) I used [Midjourney](https://www.midjourney.com/explore?tab=video_top). This was in the days when AI-video wasn't a thing: it was just about images. You type in a prompt—you had to follow a certain formula for that prompt—and you made some images.

There were limits as to how many images one could create based on subscription, so I switched to [LeonardoAI](https://leonardo.ai/), a cheaper option. It wasn't long before I ran into the image count limit there as well. I wanted to just make images without limit, to zero in on a specific image goal.

And then, I heard about[ Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion), something I could run on my own PC. Unlimited images, do-your-own-thing. Best thing was: no app/program to run... you run it in your browser, like Chrome or Firefox, using the [Automatic1111](https://en.wikipedia.org/wiki/Automatic1111) interface. Sure, it was a bit meh after a while, much-of-a-muchness, poor control of image quality, but at least there was no limit on images.

<hr class="section-break soft" />



### ComfyUI

And then [ComfyUI](https://www.comfy.org/gallery) appeared on the scene.

I've pretty-much stayed with [ComfyUI](https://www.comfy.org/about) ever since. A bit about the outfit behind ComfyUI, from their FAQ:

Q: Is ComfyUI free?   
- **Yes! ComfyUI is 100% free and open-source, and always will be.**

Q: Who is behind ComfyUI?  
- **ComfyUI is built and maintained by the original core team, organised as an independent company. They’re here to keep it evolving for the long term.**

Q: How can I contribute?   
- **Join their Discord, contribute on GitHub, build custom nodes, or share your workflows!**

Q: What are their future plans?  
- **They aim to grow ComfyUI while staying true to their open, flexible, community-driven philosophy.**

<hr class="section-break strong" />






## 2025 AI Exploring
### Sept 19 Hardware


<!-- GRAPHICS CARD 4060ti  /-->
[![img][St22]{ .artR width="460" }][St22]


ComfyUI is an interface to create images and video that runs in the browser, similar to A1111. However, ComfyUI offers control over image generation that is infinitely more granular. To run ComfyUI requires:  

- a decent graphics card (6-8 gig VRAM NVidia min., 16-24 gig VRAM NVidia ideal): **the** high $ item
- models: Stable Diffusion 1x / 1.5x / SDXL / SD3; Flux1 (Dev/Snell);
- decent internet access: those models can run up to 24 gig or more to download

I invested in a 16 gig VRAM 4060ti NVidia card, which was **expensive**: AUD$ 750.00. An 8 gig card will still set you back a good AUD$ 350.00 and you will soon feel a bit limited as to what you can do.

However, the rest of the PC is older, inexpensive tech. You don't need an expensive processor (CPU). *Saying that, I recently invested in 64 gig RAM and an older i7 CPU in order to run Large Language Models (LLMs). This is text-based work, like ChatGPT, but running all on your own PC. I was using it to translate Dad's book. To be honest, though, I've gone back to ChatGPT 5 for that project*.

<hr class="section-break soft" />



### Sept 20 The Start

The language for AI to 'generate' images and video and text is called a "prompt". Prompting is very much a model-specific thing: I "talk" to Emily in a completely different manner, using different sentence structure and syntax, than the language I use in a prompt for an image. And even prompting for that—imaging—has changed over the past years, and even months. 

A Midjourney prompt would include formatting-specific instructions formatted a certain way. 

Stable Diffusion and SDXL need to be told what **NOT** to show as well as what to show and there are special boxes for each.

<!-- GRAPHICS CARD 4060ti  /-->
[![img][St23]{ .artL width="460" }][St23]


The ComfyUI interface is made up of 'nodes': each node performs a specific function and is connected to other nodes using 'noodles' in a collection or 'graph'. This collection is called a 'workflow'. For example, the 'Load Checkpoint' node loads the imaging model, which in this case is 'Realistic Vision version 5.1'. There are literally **thousands** of imaging models out there, downloadable for free from a variety of websites, the best of which is [HuggingFace](https://huggingface.co/models).

The green and 'red' nodes are the text encode prompts: 'green' for what you **want** to see, and 'red' for what you **DO NOT** want to see. The empty latent image node is a bit difficult to explain... it is basically random 'noise' which is essentially what gets turned into a viewable image by the KSampler, which is sort-of the heart of the thing.


[![img][St24]{ .artL width="460" }][St24]


It uses the model, the positive and negative prompts and the latent image (as well as other bits-n-bobs) to create an image.

Well, paradoxically, the reason I wanted to be able to do this is to prevent copyright-infringement issues when using images to illustrate a book, or a web-page or whatever. *Incidentally, it's why I started writing my own music as well, so I'd have licence-free music for my videos.* I want to be able to create illustrations easily and quickly for whatever I need it for. I needed an image of a waterfall for the cover page of my little piece [Waterfall](https://musescore.com/user/29275325/scores/20905957). 

AI / ComfyUI was able to provide the image. I did have to generate almost a dozen waterfall images before I had something I liked. By the way, image-making is referred to as 'queue' in ComfyUI. I suppose that might be as it is assumed you're going to be generating a **LOT** of images—one after the other, i.e., **queue**—until you get something you like. I had created a lot of images in A1111, but they were pretty much all rubbish, or so extremely poor they were not really worth saving: I've deleted them. *Not worth the hard-disk space. By the way, did the same to all my Poser stuff: it's embarrassing now how awful that was*!

Illustrations for a story is a bit trickier. So, a bit of background... I wanted to write a period piece, set in the Victorian era or before. 

<hr class="section-break soft" />






<img src="/assets/images/emily/05-Screenshot.jpg" alt="Workflow" style="float: right; width: 360px;
        margin-left: 20px; margin-bottom: 10px;" />

The idea is to create characters. Um, people. 

Early days: ComfyUI quickly got complicated. Here's a workflow from then (right-click and open in a new tab for a closer look). I know: a dog's breakfast. 🥴 

By the way, that *workflow*—that bunch of interconnected nodes—was actually **STORED** within an image file! Yes, when you queue an image, it actually stores all that information on how it was made within the image itself. Wild, huh? So, say someone liked how you created an image (and had a working copy of ComfyUI), you could simply send them the image and they would drop it into ComfyUI and magically your whole workflow would be there.  
Pretty neat, huh?

---

Here's the prompt from that workflow:

<img src="/assets/images/emily/06-Screenshot.jpg" alt="Positive prompt" style="width: 600px;"/>

I essentially wanted an image of a girl sitting in a French cafe. I got this:

<img src="/assets/images/emily/07-ComfyUI_3.jpg" alt="Girl at a cafe" style="width: 450px;"/>

So, wonky left leg, right hand has 3 fingers, nonsensical text on signs... and where the heck is she sitting? on the sidewalk?!? Also, what about that necklace?

Yeah, not perfect. Not even close.

But the technology has very, very quickly improved. ComfyUI itself dramatically improved and **KEEPS** improving. Everything is become better, faster, more accurate, more flexible whilst offering more possibilities... and the best bit? **It is all FREE**!! Yes: no-cost. Once you have purchased your graphics card, you're good to go.

<hr class="section-break soft" />



### Sept 21 Kaimu

I would like to highlight what **ELSE** can be done with this process: image repair. Here's an original image I found online of Kalapana (the way I remember it, the original **Kaimu Beach**). This image has scratches, artifact blotches... in short, it's a really poor photograph (or possibly scan) of an old photograph:

<img src="/assets/images/emily/18-KalapanaO.jpg" alt="Kaimu Beach" style="width: 850px;"/>

...and here is how it looks, after ComfyUI fixed it:

<img src="/assets/images/emily/19-KalapanaF.jpg" alt="Kaimu Beach" style="width: 850px;"/>

So, there's that. 

---

<img src="/assets/images/emily/20-AliceMaryO.jpg" alt="AMSmith" style="float: right; width: 250px;
        margin-left: 20px; margin-bottom: 10px;" />

Helps to know how to tell the model what to do... a lot of the magic is in the **prompt**. I wanted to restore an old, rather poor photograph of Alice Mary Smith. Here's my prompt:

- *Restore this damaged vintage portrait by removing scratches and stains, then add realistic period-appropriate colors, including existing dress textures. Maintain the same facial features of the blonde young woman and enhance the texture of white-dotted silk fabric of her dress*.

I did have to tweak the prompt a bit, as you do. (*In Aussie parlance, a 'bit' usually means 'a lot'*). This was for a cover image of Alice for her overture ["Lalla Rookh"](https://musescore.com/user/29275325/scores/26630581), a massive half-year transcription project, The original picture was, let's say, detail-poor. There are so few photographs of this accomplished composer, so I decided to try to work [with this image](https://en.wikipedia.org/wiki/Alice_Mary_Smith).

Earlier this year, January 11th, to be exact, I tried to 'fix' this image. I was using this state-of-the-art tech at the time called 'SUPIR'. 

<img src="/assets/images/emily/20-AliceMaryBW.jpg" alt="AMSmith" style="width: 400px;"/>

Overall, it seems pretty accurate, although the left eye still seems a bit off. Of course, the whole ComfyUI technology has moved on. No mention is made about SUPIR anymore on the ComfyUI subreddit. After all, SUPIR relied on SDXL tech, and we're now—Sept '25—in the Flux era. *Actually, even the Flux era appears to be waning*. This time, using the *original image* as input, Flux1 Kontext yielded this:

<img src="/assets/images/emily/21-AliceMaryF.jpg" alt="AMSmith" style="width: 400px;"/>

The difference between the original, the SUPIR version and the Flux Kontext version is what keeps me addicted to this tech. No, it isn't perfect, but 🌟 **MY STARS** ✨ it is *head, shoulders and belly-button* above even expensive pay-for tech like [Topaz Labs](https://www.topazlabs.com/topaz-photo), which used to be a stand-alone installed program on your PC, but which they have now made an 'app'. Interestingly, the hardware requirements are virtually the same, so you are 'renting' their node-system for $17-$21 a month.

All of which I get for free, because I took the time to learn the tech. Being lazy tends to be expensive. Just like transcribing [this marvelous work of Alice's,](https://musescore.com/user/29275325/scores/26630581) putting in a little extra effort makes it so worth it.

So, is this what Alice actually looked like? Who knows. Perhaps a newer, better, more accurate model will do better. Until then, I'm pretty happy.

By the way, sometimes it helps to change the sampler and scheduler. Her dress had these dots on it in the original picture, and the **deis** sampler and **kl_optimal** scheduler wasn't doing the dress right. So, I went with bog-standard **euler** sampler and **ddim_uniform** scheduler to get this:

<img src="/assets/images/emily/22-AliceMaryF2.jpg" alt="AMSmith" style="width: 400px;"/>

And today (Sept 26th), as I revisit my workflows to convert them all to 'Sub-Graphs', I tried the **deis** sampler and **beta** scheduler and got this:

<img src="/assets/images/emily/23-AliceMaryF4.jpg" alt="AMSmith" style="width: 500px;"/>

Just for shits-n-giggles, tried the SRPO model on this process... **and ended up with a massive ___ F A I L**! 

As in, a completely blurry horrid blob of nothing recognisable. Conclusion: **SRPO** is not the same sort of image-to-image tool as Flux Kontext. The key is in the word 'Kontext', I believe.

---

Whilst mucking around with all this, I'm listening to [Serenade #4 by Robert Fuchs](https://www.youtube.com/watch?v=l8ERA4HnxRc). I hear the first movement of this piece on repeat in my head, in my dreams, in my imaginings. This should define a lot of who I am... how my head is shaped.

Two horns and string section: that is my next piece. Yeah, there will be a bit for the english horn in there, somewhere.

---

Oh, by the way, there are these modified versions of models that come under the 'gguf' umbrella. What is a 'gguf'? Technically speaking, it is *a binary format that is optimized for quick loading and saving of models, making it highly efficient for inference purposes*.  
Yep, I'm there with you. Pretty much all of the descriptors of this tech is couched it that language. It's English. Sort-of. How can words mean so *little*?? 

**From a practical perspective, it's a more usable version of a model for someone who doesn't have a graphics card with insane amounts of VRAM.**

My graphics card has 16gig of VRAM. Respectable. Decent amount. But there are cards out the that cost **tens of thouands of dollars** that have, um, more. LOTS more. 

---

The last Flux1 Kontext model was a GGUF model. It was an 8-bit model. 'Bit' is a term about quantization. What is 'quantization'? 

Well, *quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values. In the context of simulation and embedded computing, it is about approximating real-world values with a digital representation that introduces limits on the precision and range of a value*.

Answer for mere mortals like us: it's about accuracy, detail and approximation. 8-bit approximates (is a bit more accurate) a bit better than 4-bit or 2-bit. Still, whilst the 8-bit model created that last image, a 4-bit model created this:

<img src="/assets/images/emily/23-AliceMaryF3.jpg" alt="AMSmith" style="width: 400px;"/>

Not a shabby effort. Not as stellar as 8-bit but still heaps better than the original. Who know which one is the most accurate. Not from that time period, so it's likely to remain anyone's guess, for now.

<hr class="section-break soft" />



### Sept 26 Sub Graphs

Hope a bit of a deep-dive might prove beneficial at this stage. At the outset of this exploration of ComfyUI, I mentioned *nodes*. Allow me to explain what a node is: it is basically a visual representation of code that performs a specific function. To load an image into a workflow, for example, I need the *Load Image* node. The code for that node lives in a file called "nodes.py", which is a core part of ComfyUI. The file extension '.py' gives a clue as to the code's language: **Python**.

The node collection on a graph called a *workflow* can become quite complex. Even my own little workflows got fairly messy after a while: it was a challenge to remember what values of which nodes to tweak. I used colour to indicate which nodes I should look at, but it was still a mess.

Then, the bright minds at ComfyUI came up with the concept of **Sub-Graph**. The name doesn't really do the magic justice. Consider this workflow (right-click and open in new tab to see it properly) :

<img src="/assets/images/emily/33-SDXL-i2i.jpg" alt="SDXL WkFl" style="width: 950px;"/>

Of course, this did a lot back in the SDXL days. But it was a nightmare to navigate.

That same workflow has, through the magic of *Sub Graph*, been simplified to this:

<img src="/assets/images/emily/34-SDXL-i2i-SG.jpg" alt="SDXL SG" style="width: 950px;"/>

Whole-buncha-nodes into 1 node. ⚡️

And everything I might want to change right out front. 💥

**Sub Graph** is still in development, so I look forward to improvements from here, even. No telling what will come out next month, next week, tomorrow or a few hours from now! 🥂

---

Oh, and by the way, that workflow I ran Alice through? Tamara followed:


[![img][St25]{ .artL width="460" }][St25]



<hr class="section-break strong" />



[Back to the Index](../index.md)










## Notes

I think that approach is exactly how you reclaim the steering wheel.

Keeping the same images but changing the captions works because, on DA, **the caption is the frame**: it tells the algorithm *and* the reader what they’re supposed to be seeing. If you swap “body/embarrassment/coercion” language for “identity/social optics/choice/relationship,” the very same picture stops reading like a setup and starts reading like a scene.

A few guardrails that will keep it subtle *and* still sharp:

## What to lean into

### 1) Make it about *social meaning*, not anatomy

Instead of “you have boobs / can’t hide,” go for:

* “You can’t hide behind oversized clothes anymore.”
* “You’re becoming visible in a way you didn’t plan for.”
* “The line between costume and self is thinning.”

It keeps the theme while removing the fetish “body-fixation” hooks.

### 2) Keep Celeste’s power in *interpretation*

Celeste doesn’t need to say “wear this.” She can say:

* “That look says something. Decide what you want it to say.”
* “You’re not being punished. You’re being edited.”

That reads as confident and psychologically astute rather than kink-coded.

### 3) Keep the humour, but aim it upward

Mock the *social script*, not Charlie’s embarrassment.

* “People will label you either way. Pick the label you can live with.”
* “If you’re going to be stared at, at least be intentional.”

That’s the kind of wit that tends to land with women readers.

## What to avoid (the “subtlety killers”)

These are the words/beats that turn subtle into “oh, it’s that genre”:

* underwear talk
* “reluctant / forced / punishment / training”
* humiliation beats (“exposed,” “everyone will laugh,” etc.)
* parent/authority coercion as the engine (“mum made you,” “teacher insisted,” etc.)

## A simple template you can reuse

For each captioned image, try this 3-line structure:

1. **Observation** (neutral, visual)
2. **Meaning** (social/psychological)
3. **Choice** (agency line)

Example:

* “She stared at the mirror too long.”
* “Not because she looked wrong — because she looked *different*.”
* “And different meant she’d have to decide who got to name it.”

That’s subtle, but still unmistakably your theme.

If you paste one of your current “old style” captions and tell me what you want the *new* takeaway to be, I’ll rewrite it in 3–5 variants: (a) wry, (b) tender, (c) icy Celeste, (d) minimalist.



Important Note: All my so-called artwork, including any descriptive text, depicts adults doing whatever: no images involve minors. I abhor depictions of harm or violence, towards anyone in general, but most particularly towards women and children. None of the images reflect actual events: all depictions are imaginary.
As CelestesGrl, I reserve exclusive ownership of the artworks that I post on Deviant Art. Downloading is permitted for your personal enjoyment as well as creating derivations if so inspired. Please be kind and acknowledge where your derivative was inspired.
© 2025. Some non-derivative works are openly licensed via CC-BY 4.0
Saying all that, please STEAL. You like the idea: it's YOURS. Run with it.








<!--           Image Links         /-->

[Br01]: ../assets/images/base/Bnr04a.jpg
[St00]: ../assets/images/base/00Writer.jpg
[St08]: ../assets/images/base/08maiden.jpg
[St19]: ../assets/images/base/19charlotte.jpg
[St22]: ../assets/images/base/22ti4060.jpg
[St23]: ../assets/images/base/23workflow.jpg
[St24]: ../assets/images/base/24purple.jpg
[St25]: ../assets/images/base/25Tamara.jpg

[St03]: ../assets/images/story/Scene03a.jpg
[St05]: ../assets/images/story/Scene05a.jpg
[St06]: ../assets/images/story/Scene06a.jpg
[St07]: ../assets/images/story/Scene07a.jpg
[St09]: ../assets/images/story/Scene09a.jpg
[St10]: ../assets/images/story/Scene10a.jpg
[St26]: ../assets/images/story/Scene26c.jpg
[St27]: ../assets/images/story/Scene27a.jpg
[St28]: ../assets/images/story/Scene28a.jpg
[St29]: ../assets/images/story/Scene29a.jpg

<hr class="section-break strong" />
