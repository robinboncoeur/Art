document.querySelectorAll(".artSlideshow").forEach((slideshow) => {
	const slides = Array.from(slideshow.querySelectorAll("figure"));

	if (slides.length === 0) return;

	let current = 0;

	// Create previous button
	const prev = document.createElement("button");
	prev.className = "artSlidePrev";
	prev.type = "button";
	prev.innerHTML = "‹";
	prev.setAttribute("aria-label", "Previous image");

	// Create next button
	const next = document.createElement("button");
	next.className = "artSlideNext";
	next.type = "button";
	next.innerHTML = "›";
	next.setAttribute("aria-label", "Next image");

	// Create navigation footer
	const nav = document.createElement("div");
	nav.className = "artSlideNav";

	const dots = document.createElement("div");
	dots.className = "artSlideDots";

	const count = document.createElement("span");
	count.className = "artSlideCount";

	nav.appendChild(dots);
	nav.appendChild(count);

	// Create one dot per slide
	const dotButtons = slides.map((slide, index) => {
		const dot = document.createElement("button");
		dot.className = "artSlideDot";
		dot.type = "button";
		dot.setAttribute("aria-label", `Show image ${index + 1}`);

		dot.addEventListener("click", () => {
			showSlide(index);
		});

		dots.appendChild(dot);
		return dot;
	});

	slideshow.appendChild(prev);
	slideshow.appendChild(next);
	slideshow.appendChild(nav);

	function showSlide(index) {
		current = (index + slides.length) % slides.length;

		slides.forEach((slide, i) => {
			slide.classList.toggle("is-active", i === current);
		});

		dotButtons.forEach((dot, i) => {
			dot.classList.toggle("is-active", i === current);
		});

		count.textContent = `${current + 1} / ${slides.length}`;
	}

	prev.addEventListener("click", () => {
		showSlide(current - 1);
	});

	next.addEventListener("click", () => {
		showSlide(current + 1);
	});

	// Keyboard navigation
	slideshow.setAttribute("tabindex", "0");

	slideshow.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") {
			showSlide(current - 1);
		}

		if (event.key === "ArrowRight") {
			showSlide(current + 1);
		}
	});

	// Touch / swipe navigation
	let touchStartX = 0;

	slideshow.addEventListener(
		"touchstart",
		(event) => {
			touchStartX = event.changedTouches[0].screenX;
		},
		{ passive: true }
	);

	slideshow.addEventListener(
		"touchend",
		(event) => {
			const touchEndX = event.changedTouches[0].screenX;
			const distance = touchEndX - touchStartX;

			if (Math.abs(distance) < 50) return;

			if (distance < 0) {
				showSlide(current + 1);
			} else {
				showSlide(current - 1);
			}
		},
		{ passive: true }
	);

	// Don't bother showing controls for a single image
	if (slides.length === 1) {
		prev.hidden = true;
		next.hidden = true;
		nav.hidden = true;
	}

	showSlide(0);
});
