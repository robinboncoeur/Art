# Work: The Site


[![Wardrobe][Brb02]{ .artC width="1100" }][Brb02]


<hr class="section-break strong" />






## Markdown Cheatsheet


[![Writer][St00]{ .artR width="340" }][St00]


This site uses MkDocs, which is a Super-Set of markdown. This section will serve as reminder on markdown syntax. As I get information from [Emily](../work/01Emilyai.md) on other tech -- tasks that are more involved -- that tech will be given its own dedicated page.

For full documentation on MkDocs markdown, visit [mkdocs.org](https://www.mkdocs.org).  
Here's the link for [the material theme](https://squidfunk.github.io/mkdocs-material/).

**Install Commands**

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

**Project layout**

```
mkdocs.yml    # The configuration file.
docs/
    index.md  # The documentation homepage.
    ...       # Other markdown pages, images and other files.
```

<hr class="section-break soft" />



### Editing Content

I write content directly into markdown, inserting the tags as needed. I use a very lightweight but also quite powerful plain text editor called 'Zed'. I can download [Zed from Here](https://zed.dev/) or in Terminal, simply enter:

```bash
curl -f https://zed.dev/install.sh | sh
```

<hr class="section-break strong" />








### Inline images


[![Writer][Stj1]{ .artR width="340" }][Stj1]


**Emily-Assisted**  
For externally-stored images (most will be stored on my image server or GitHub, for my pages)::

```
![Me](https://art.tightbytes.com/assets/images/blog25/06-16Office.jpg){: align=left width=300 }
```

and for those stored with the data files on GitHub::

```
![Celeste](images/C01-Aa.jpg){: align=left width=300 }
```

I currently use this approach:

```
[![Writer][Stj1]{ .artR width="340" }][Stj1]
```

There is an associated CSS page that allows that above string to act as a link, to create the rounded corners and a bit of 'pull-in' with a mouse hover, sizing and so forth. Also, image links are in an image-references page, which makes all images available all over the site.

<hr class="section-break soft" />


### Deprecated

HTML links:

```
<a href="/assets/images/blog25/06-16Office.jpg" target="_blank" rel="noopener">
<img src="/assets/images/blog25/06-16Office.jpg" alt="Me" width="300"align="right"></a>
```

<hr class="section-break strong" />







### Embedded Video

I am removing — and will no longer being using — YouTube videos, because of copyright risks. I will have links to my own videos. The link code looks like this:

```
<div class="video-card video-card--normal">
	<div class="video-frame">
		<video controls preload="metadata" playsinline>
			<source src="https://media.seabrae.org/videos/eu/AnneIsCooking.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video>
	</div>
	<p class="video-caption">
		<strong>Soldiers, à la Française</strong> Anne is cooking in Montmartre.
</div>
```

which produces:

<div class="video-card video-card--normal">
	<div class="video-frame">
		<video controls preload="metadata" playsinline>
			<source src="https://media.seabrae.org/videos/eu/AnneIsCooking.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video>
	</div>
	<p class="video-caption">
		<strong>Soldiers, à la Française</strong>. <br>
		Anne is cooking in Montmartre. One option that Chrome at least offers is to right-click on the video, and display it in a new tab — that is, full-sized in the browser.
</div>

---

<div class="video-card video-card--normal">
	<div class="video-frame">
		<video controls preload="metadata" playsinline>
			<source src="https://media.seabrae.org/audio/cg/music/TheWrongDoor-Ec.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video>
	</div>
	<p class="video-caption">
		<strong>Follow along on the score</strong>.<br> 
			One option that Chrome at least offers is to right-click on the video, and display it in a new tab — that is, full-sized in the browser.
</div>

<hr class="section-break strong" />








### Embedded Audio

This code:

```
<div class="music-card">
  <div>
    <p>The Wrong Door [vEc]</p>
    <audio controls preload="metadata" class="music-player">
      <source src="https://media.seabrae.org/audio/cg/music/TheWrongDoor-Ec.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</div>
```

...produces:

<div class="music-card">
  <div>
    <p>The Wrong Door [vEc]</p>
    <audio controls preload="metadata" class="music-player">
      <source src="https://media.seabrae.org/audio/cg/music/TheWrongDoor-Ec.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</div>

<hr class="section-break strong" />






## Text Formatting

### Creating Dot-points

This code:

```text
Once you've decided:

* Select A.  
* Select B.  
* To identify C.  
* Finally, click on D.  
```

Gives you the following text.

Once you've decided:

* Select A.  
* Select B.  
* To identify C.  
* Finally, click on D.  

Note: *setting things to italics like this makes more impact - these have yielded reasonable results. You will almost certainly find better settings, which is the whole point of sharing this*.

<hr class="section-break strong" />









### Links Management

Here's a typical example of embedding a link. This text:

```
Blender-for-Mac users, please refer to the [Mac user help](http://blender.stackexchange.com/questions/6173/where-does-console-output-go) page.
```

produces:

Blender-for-Mac users, please refer to the [Mac user help](http://blender.stackexchange.com/questions/6173/where-does-console-output-go) page.

<hr class="section-break strong" />








### Horizontal Separators

This tag:

```
<hr class="section-break strong" />
```

or

```
<hr class="section-break soft" />
```

...produces a separator bar like the one below.


You will need to add the following to your custom CSS page:

```css
/* ===== Section breaks ===== */

.md-typeset hr.section-break {
	clear: both;
	border: none !important;
	border-top: none !important;
	border-bottom: none !important;
	background: none;
	margin: 3rem 0 2rem;
	height: 1.5rem;
	position: relative;
}

.md-typeset hr.section-break::before {
	content: "";
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	height: 1px;
	background: linear-gradient(
		90deg,
		transparent,
		rgba(123, 30, 58, 0.55),
		transparent
	);
}

.md-typeset hr.section-break::after {
	content: "❦";
	position: relative;
	display: block;
	width: 3rem;
	margin: 0 auto;
	text-align: center;
	background: var(--md-default-bg-color);
	color: #7b1e3a;
	font-size: 1.1rem;
	line-height: 1.5rem;
}

.md-typeset hr.section-break.soft::after {
	content: "✦";
	color: rgba(123, 30, 58, 0.65);
}

.md-typeset hr.section-break.strong::before {
	height: 3px;
	border-radius: 999px;
	background: linear-gradient(
		90deg,
		transparent,
		#7b1e3a,
		#c991a2,
		#7b1e3a,
		transparent
	);
}

.md-typeset hr.section-break.strong::after {
	content: "❦";
	font-size: 1.25rem;
}
```

<hr class="section-break strong" />

<!-- Images References -->

--8<-- "includes/image-references.md"

🌷


<!--

✈️ 🕊️ 🌫️ 🌿 🌷 🪜 ☕ 🧠 💻 ꧁ 🪷 🌷 🌸 🌺 🦩 ꧂ 🧺 🔐 💼 💻 💎 🩱 🥻✂ 🩸 💧 ❦  …

😄 🧵 💛 👭 💞 🖤 🍓 🌶 🚪 🔑 🛋 🫧 🌩 🌧 🧵 🪡 👗 👚 👜 👠 🩰 💄 💋 🎻 📒  🚺  — —

/-->

<hr class="section-break strong" />

<!-- vale off -->
