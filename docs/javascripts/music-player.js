document.querySelectorAll(".randomMusicPlayer").forEach(async (player) => {
	const playlistUrl =
		"https://media.seabrae.org/audio/ytdl/playlist.json";

	const musicBaseUrl =
		"https://media.seabrae.org/audio/ytdl/";

	let playlist = [];
	let current = 0;

	/*
	 * Shuffle an array using Fisher-Yates.
	 * This gives us a shuffled deck rather than choosing
	 * a random track each time.
	 */
	function shuffle(array) {
		const shuffled = [...array];

		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] =
				[shuffled[j], shuffled[i]];
		}

		return shuffled;
	}

	/*
	 * Turn:
	 *
	 *     Finzi-ClarinetC2.mp3
	 *
	 * into something slightly more civilised:
	 *
	 *     Finzi — Clarinet C2
	 *
	 * We can improve the titles later.
	 */
	function displayName(filename) {
		return filename
			.replace(/\.mp3$/i, "")
			.replace("-", " — ")
			.replace(/-/g, " ");
	}

	/*
	 * Build the player.
	 */
	player.innerHTML = `
		<div class="musicRandomNowPlaying">
			<span class="musicRandomLabel">Now playing</span>
			<strong class="musicRandomTitle">Ready to play</strong>
		</div>

		<audio
			class="musicRandomAudio"
			preload="metadata">
		</audio>

		<div class="musicRandomProgress">
			<span class="musicRandomElapsed">0:00</span>

			<input
				class="musicRandomSeek"
				type="range"
				min="0"
				max="100"
				value="0"
				step="0.1"
				aria-label="Playback position">

			<span class="musicRandomDuration">0:00</span>
		</div>

		<div class="musicRandomControls">
			<button
				type="button"
				class="musicRandomPrevious"
				aria-label="Previous track">
				⏮
			</button>

			<button
				type="button"
				class="musicRandomPlay"
				aria-label="Play">
				▶
			</button>

			<button
				type="button"
				class="musicRandomNext"
				aria-label="Next track">
				⏭
			</button>
		</div>

		<div class="musicRandomFooter">
			<span class="musicRandomCount"></span>

			<label class="musicRandomVolume">
				<span>🔊</span>
				<input
					type="range"
					min="0"
					max="1"
					value="0.8"
					step="0.05"
					aria-label="Volume">
			</label>
		</div>
	`;

	const audio = player.querySelector(".musicRandomAudio");
	const title = player.querySelector(".musicRandomTitle");

	const playButton =
		player.querySelector(".musicRandomPlay");

	const previousButton =
		player.querySelector(".musicRandomPrevious");

	const nextButton =
		player.querySelector(".musicRandomNext");

	const seek =
		player.querySelector(".musicRandomSeek");

	const elapsed =
		player.querySelector(".musicRandomElapsed");

	const duration =
		player.querySelector(".musicRandomDuration");

	const count =
		player.querySelector(".musicRandomCount");

	const volume =
		player.querySelector(".musicRandomVolume input");

	/*
	 * Convert seconds to m:ss.
	 */
	function formatTime(seconds) {
		if (!Number.isFinite(seconds)) {
			return "0:00";
		}

		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);

		return `${minutes}:${secs.toString().padStart(2, "0")}`;
	}

	/*
	 * Load one track into the audio element.
	 */
	function loadTrack(index) {
		current = index;

		const filename = playlist[current];

		audio.src =
			musicBaseUrl + encodeURIComponent(filename);

		title.textContent = displayName(filename);

		count.textContent =
			`${current + 1} / ${playlist.length}`;

		seek.value = 0;
		elapsed.textContent = "0:00";
		duration.textContent = "0:00";
	}

	/*
	 * Start playback.
	 */
	async function play() {
		try {
			await audio.play();

			playButton.textContent = "⏸";
			playButton.setAttribute(
				"aria-label",
				"Pause"
			);
		} catch (error) {
			console.error(
				"Could not play audio:",
				error
			);
		}
	}

	/*
	 * Play / pause.
	 */
	playButton.addEventListener("click", () => {
		if (audio.paused) {
			play();
		} else {
			audio.pause();

			playButton.textContent = "▶";
			playButton.setAttribute(
				"aria-label",
				"Play"
			);
		}
	});

	/*
	 * Previous track.
	 */
	previousButton.addEventListener("click", () => {
		current--;

		if (current < 0) {
			current = playlist.length - 1;
		}

		loadTrack(current);
		play();
	});

	/*
	 * Next track.
	 */
	nextButton.addEventListener("click", () => {
		current++;

		/*
		 * We've reached the end of the shuffled deck.
		 * Shuffle everything again.
		 */
		if (current >= playlist.length) {
			playlist = shuffle(playlist);
			current = 0;
		}

		loadTrack(current);
		play();
	});

	/*
	 * Automatically advance when a piece finishes.
	 */
	audio.addEventListener("ended", () => {
		nextButton.click();
	});

	/*
	 * Update progress display.
	 */
	audio.addEventListener("timeupdate", () => {
		if (!audio.duration) {
			return;
		}

		seek.value =
			(audio.currentTime / audio.duration) * 100;

		elapsed.textContent =
			formatTime(audio.currentTime);

		duration.textContent =
			formatTime(audio.duration);
	});

	/*
	 * Metadata gives us the track duration.
	 */
	audio.addEventListener("loadedmetadata", () => {
		duration.textContent =
			formatTime(audio.duration);
	});

	/*
	 * Allow the listener to seek through the piece.
	 */
	seek.addEventListener("input", () => {
		if (!audio.duration) {
			return;
		}

		audio.currentTime =
			(seek.value / 100) * audio.duration;
	});

	/*
	 * Volume.
	 */
	audio.volume = volume.value;

	volume.addEventListener("input", () => {
		audio.volume = volume.value;
	});

	/*
	 * Fetch the playlist.
	 */
	try {
		const response = await fetch(playlistUrl);

		if (!response.ok) {
			throw new Error(
				`Playlist request failed: ${response.status}`
			);
		}

		const files = await response.json();

		playlist = shuffle(files);

		if (playlist.length === 0) {
			throw new Error("Playlist is empty");
		}

		loadTrack(0);

	} catch (error) {
		console.error(
			"Could not load music playlist:",
			error
		);

		title.textContent =
			"Music currently unavailable";

		playButton.disabled = true;
		previousButton.disabled = true;
		nextButton.disabled = true;
	}
});
