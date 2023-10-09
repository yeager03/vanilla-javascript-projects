const sliders = (slideSelector, direction, autoplay, prevSelector, nextSelector) => {
	let slideIndex = 0,
		pausedIntervalId = null;

	const slides = document.querySelectorAll(slideSelector);

	const showSlides = (index) => {
		if (index >= slides.length) {
			slideIndex = 0;
		}

		if (index < 0) {
			slideIndex = slides.length - 1;
		}

		slides.forEach((slide) => {
			slide.classList.add("animated", "fadeIn");
			slide.style.display = "none";
		});

		slides[slideIndex].style.display = "block";
	};

	showSlides(slideIndex);

	const nextSlide = (index) => showSlides((slideIndex += index));
	const prevSlide = (index) => showSlides((slideIndex -= index));

	try {
		const nextButton = document.querySelector(nextSelector),
			prevButton = document.querySelector(prevSelector);

		nextButton.addEventListener("click", () => nextSlide(1));
		prevButton.addEventListener("click", () => prevSlide(-1));
	} catch (error) {}

	const activateAnimation = () => {
		if (autoplay) {
			if (direction === "vertical") {
				pausedIntervalId = setInterval(() => {
					nextSlide(1);
				}, 3000);
			} else {
				pausedIntervalId = setInterval(() => {
					nextSlide(1);
				}, 3000);
			}
		}
	};

	activateAnimation();

	slides[0].parentNode.addEventListener("mouseenter", () => clearInterval(pausedIntervalId));
	slides[0].parentNode.addEventListener("mouseleave", () => activateAnimation());
};

export default sliders;
