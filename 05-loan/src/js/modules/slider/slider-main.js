import Slider from "./slider";

export default class MainSlider extends Slider {
	constructor(settings) {
		super(settings);
	}

	showSlide(index) {
		if (index >= this.slides.length) {
			this.slideIndex = 0;
		}

		if (index < 0) {
			this.slideIndex = this.slides.length - 1;
		}

		if (this.hanson) {
			this.hanson.style.opacity = 0;

			if (index === 2) {
				this.hanson.classList.add("animated");

				setTimeout(() => {
					this.hanson.style.opacity = 1;
					this.hanson.classList.add("slideInUp");
				}, 2000);
			} else {
				this.hanson.classList.remove("slideInUp");
			}
		}

		for (const slide of this.slides) {
			slide.style.display = "none";
			slide.classList.add("animated", "fadeIn");
		}

		this.slides[this.slideIndex].style.display = "block";
	}

	nextSlide(n) {
		this.showSlide((this.slideIndex += n));
	}

	bindTriggers(items, n) {
		items.forEach((button) => {
			button.addEventListener("click", (event) => {
				event.preventDefault();
				event.stopPropagation();
				this.nextSlide(n);
			});
		});
	}

	init() {
		if (this.container) {
			try {
				this.hanson = document.querySelector(".hanson");
			} catch (error) {}

			this.showSlide(this.slideIndex);

			this.buttons.forEach((button) => {
				button.addEventListener("click", () => {
					this.nextSlide(1);
				});

				button.parentNode.previousElementSibling.addEventListener("click", (event) => {
					event.preventDefault();

					this.slideIndex = 0;
					this.showSlide(this.slideIndex);
				});
			});

			if (this.nextButtons.length && this.prevButtons.length) {
				this.bindTriggers(this.nextButtons, 1);
				this.bindTriggers(this.prevButtons, -1);
			}
		}
	}
}
