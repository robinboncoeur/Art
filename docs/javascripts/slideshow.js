// ============================================================
// slideshow.js
//
// This script supports TWO kinds of slideshow:
//
// 1. A slideshow whose <figure> elements are written directly
//    into the Markdown / HTML.
//
// 2. A slideshow whose images are listed in a JSON file:
//
//      <div
//          class="artSlideshow"
//          data-gallery="https://.../gallery.json">
//      </div>
//
// In the second case, we fetch the JSON, create the <figure>
// elements, and then hand the finished slideshow to exactly
// the same navigation code.
// ============================================================


// ------------------------------------------------------------
// Build the actual slideshow controls and behaviour.
//
// This is mostly our ORIGINAL slideshow code, moved into a
// function so that we can call it AFTER JSON images have been
// loaded.
//
// "slideshow" is the <div class="artSlideshow"> element.
// ------------------------------------------------------------

function initialiseSlideshow(slideshow) {

	// Find every <figure> inside this particular slideshow.
	//
	// querySelectorAll() returns a NodeList. Array.from()
	// converts that into an ordinary JavaScript array, which
	// makes operations such as .map() convenient.
	//
	const slides = Array.from(
		slideshow.querySelectorAll("figure")
	);

	// Nothing to show? Stop processing this slideshow.
	//
	// "return" exits this function immediately.
	//
	if (slides.length === 0) return;


	// Keep track of which slide is currently visible.
	//
	// Arrays are numbered from zero:
	//
	//     slides[0] = first image
	//     slides[1] = second image
	//     slides[2] = third image
	//
	let current = 0;


	// --------------------------------------------------------
	// Create previous button
	// --------------------------------------------------------

	const prev = document.createElement("button");

	prev.className = "artSlidePrev";
	prev.type = "button";
	prev.innerHTML = "‹";

	prev.setAttribute(
		"aria-label",
		"Previous image"
	);


	// --------------------------------------------------------
	// Create next button
	// --------------------------------------------------------

	const next = document.createElement("button");

	next.className = "artSlideNext";
	next.type = "button";
	next.innerHTML = "›";

	next.setAttribute(
		"aria-label",
		"Next image"
	);


	// --------------------------------------------------------
	// Create navigation footer
	// --------------------------------------------------------

	const nav = document.createElement("div");
	nav.className = "artSlideNav";

	const dots = document.createElement("div");
	dots.className = "artSlideDots";

	const count = document.createElement("span");
	count.className = "artSlideCount";

	nav.appendChild(dots);
	nav.appendChild(count);


	// --------------------------------------------------------
	// Create one navigation dot per slide
	// --------------------------------------------------------

	const dotButtons = slides.map((slide, index) => {

		const dot = document.createElement("button");

		dot.className = "artSlideDot";
		dot.type = "button";

		dot.setAttribute(
			"aria-label",
			`Show image ${index + 1}`
		);

		dot.addEventListener("click", () => {
			showSlide(index);
		});

		dots.appendChild(dot);

		// .map() builds a new array from the values returned
		// here. Therefore dotButtons becomes an array containing
		// all the buttons we've just created.
		//
		return dot;
	});


	// Put our newly created controls into the slideshow <div>.
	//
	slideshow.appendChild(prev);
	slideshow.appendChild(next);
	slideshow.appendChild(nav);


	// --------------------------------------------------------
	// Display one particular slide
	// --------------------------------------------------------

	function showSlide(index) {

		// This slightly cryptic expression makes the slideshow
		// wrap around at both ends.
		//
		// For example, going "previous" from slide zero gives
		// us -1. Adding slides.length makes that positive before
		// the remainder (%) operation is performed.
		//
		current =
			(index + slides.length) % slides.length;


		// Give ONLY the current figure the class "is-active".
		//
		// classList.toggle(name, condition) means:
		//
		//     add the class if condition is true
		//     remove it if condition is false
		//
		slides.forEach((slide, i) => {
			slide.classList.toggle(
				"is-active",
				i === current
			);
		});


		// Do exactly the same thing to the navigation dots.
		//
		dotButtons.forEach((dot, i) => {
			dot.classList.toggle(
				"is-active",
				i === current
			);
		});


		// Humans count from 1 rather than zero, hence + 1.
		//
		count.textContent =
			`${current + 1} / ${slides.length}`;
	}


	// --------------------------------------------------------
	// Previous / next buttons
	// --------------------------------------------------------

	prev.addEventListener("click", () => {
		showSlide(current - 1);
	});

	next.addEventListener("click", () => {
		showSlide(current + 1);
	});


	// --------------------------------------------------------
	// Keyboard navigation
	// --------------------------------------------------------

	// A normal <div> cannot usually receive keyboard focus.
	//
	// tabindex="0" makes this one focusable so that left/right
	// arrow keys can control it.
	//
	slideshow.setAttribute("tabindex", "0");

	slideshow.addEventListener("keydown", (event) => {

		if (event.key === "ArrowLeft") {
			showSlide(current - 1);
		}

		if (event.key === "ArrowRight") {
			showSlide(current + 1);
		}
	});


	// --------------------------------------------------------
	// Touch / swipe navigation
	// --------------------------------------------------------

	let touchStartX = 0;

	slideshow.addEventListener(
		"touchstart",
		(event) => {

			// Remember where the finger started horizontally.
			//
			touchStartX =
				event.changedTouches[0].screenX;
		},
		{ passive: true }
	);


	slideshow.addEventListener(
		"touchend",
		(event) => {

			const touchEndX =
				event.changedTouches[0].screenX;

			const distance =
				touchEndX - touchStartX;


			// Ignore tiny movements. Otherwise an ordinary tap
			// could accidentally become a "swipe".
			//
			if (Math.abs(distance) < 50) return;


			if (distance < 0) {

				// Finger moved left:
				// show the next image.
				//
				showSlide(current + 1);

			} else {

				// Finger moved right:
				// show the previous image.
				//
				showSlide(current - 1);
			}
		},
		{ passive: true }
	);


	// --------------------------------------------------------
	// A one-image slideshow doesn't need navigation.
	// --------------------------------------------------------

	if (slides.length === 1) {
		prev.hidden = true;
		next.hidden = true;
		nav.hidden = true;
	}


	// Finally, display the first image.
	//
	showSlide(0);
}



// ============================================================
// Load a gallery from JSON
// ============================================================
//
// This is the NEW part.
//
// "async" tells JavaScript that this function will perform
// operations which may take time -- in our case, downloading
// gallery.json.
//
// Importantly, the browser does NOT freeze while it waits.
// ============================================================

async function loadGallery(slideshow, galleryUrl) {

	try {

		// ----------------------------------------------------
		// Ask the server for gallery.json
		// ----------------------------------------------------
		//
		// "await" means:
		//
		//     wait here until fetch() has received a response
		//
		// without blocking the whole browser.
		//
		const response = await fetch(galleryUrl);


		// A server can respond successfully at the network
		// level while still saying:
		//
		//     404 Not Found
		//     500 Server Error
		//
		// response.ok is true for successful HTTP responses.
		//
		if (!response.ok) {
			throw new Error(
				`Gallery request failed: ${response.status}`
			);
		}


		// ----------------------------------------------------
		// Convert the downloaded JSON into JavaScript data
		// ----------------------------------------------------
		//
		// Our JSON:
		//
		// [
		//   {
		//     "file": "0000-Emily.jpg",
		//     "caption": ""
		//   },
		//   ...
		// ]
		//
		// becomes an ordinary JavaScript array of objects.
		//
		const images = await response.json();


		// ----------------------------------------------------
		// Work out where the actual images live
		// ----------------------------------------------------
		//
		// This is rather nice:
		//
		// galleryUrl is:
		//
		// https://media.seabrae.org/images/gallery/gallery.json
		//
		// new URL(".", galleryUrl) means:
		//
		//     "the directory containing that URL"
		//
		// giving us:
		//
		// https://media.seabrae.org/images/gallery/
		//
		// Consequently we DON'T have to hard-code the Seamedia
		// image directory separately.
		//
		const imageBaseUrl =
			new URL(".", galleryUrl);


		// ----------------------------------------------------
		// Create one <figure> for every JSON entry
		// ----------------------------------------------------

		images.forEach((item) => {

			const figure =
				document.createElement("figure");

			const image =
				document.createElement("img");


			// new URL(filename, directory) safely combines:
			//
			//     .../gallery/
			//
			// and:
			//
			//     B-017-SheKnows.jpg
			//
			image.src =
				new URL(
					item.file,
					imageBaseUrl
				).href;


			// We don't yet have proper descriptions for every
			// image. An empty alt attribute is preferable to
			// using the filename as meaningless screen-reader
			// chatter.
			//
			// Later we can add a separate "alt" field to JSON.
			//
			image.alt = "";


			// Ask the browser not to download every gallery
			// image immediately.
			//
			// With 30 images now -- and potentially many more
			// later -- this is worth doing.
			//
			image.loading = "lazy";


			figure.appendChild(image);


			// ------------------------------------------------
			// Add caption ONLY when one actually exists.
			// ------------------------------------------------
			//
			// An empty string ("") is false-like in JavaScript,
			// so this block simply doesn't execute for our
			// currently empty captions.
			//
			if (item.caption) {

				const caption =
					document.createElement("figcaption");

				caption.textContent =
					item.caption;

				figure.appendChild(caption);
			}


			slideshow.appendChild(figure);
		});


		// The figures now exist.
		//
		// Hand the slideshow to our original navigation code.
		//
		initialiseSlideshow(slideshow);


	} catch (error) {

		// If fetching or interpreting the JSON fails, don't
		// leave the user staring at an inexplicably empty box.
		//
		console.error(
			"Could not load gallery:",
			error
		);

		slideshow.textContent =
			"Gallery currently unavailable.";
	}
}



// ============================================================
// Find all slideshows on the page
// ============================================================

document
	.querySelectorAll(".artSlideshow")
	.forEach((slideshow) => {

		// dataset.gallery reads the HTML attribute:
		//
		//     data-gallery="something"
		//
		// So:
		//
		//     data-gallery
		//
		// becomes:
		//
		//     dataset.gallery
		//
		const galleryUrl =
			slideshow.dataset.gallery;


		if (galleryUrl) {

			// This slideshow gets its figures from JSON.
			//
			loadGallery(
				slideshow,
				galleryUrl
			);

		} else {

			// No data-gallery attribute:
			//
			// this must be one of our old manually written
			// slideshows. Initialise it exactly as before.
			//
			initialiseSlideshow(slideshow);
		}
	});
