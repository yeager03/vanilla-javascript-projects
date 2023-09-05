import Slider from "./slider";

export default class MiniSlider extends Slider {
	constructor(settings) {
		super(settings);
	}

	decorizeSlides() {
		for (const slide of this.slides) {
			slide.classList.remove(this.activeClass);

			if (this.animate) {
				slide.querySelector(".card__title").style.opacity = ".4";
				slide.querySelector(".card__controls").style.opacity = "0";
				slide.querySelector(".card__controls-arrow").style.opacity = "0";
			}
		}

		this.slides[0].classList.add(this.activeClass);

		if (this.animate) {
			this.slides[0].querySelector(".card__title").style.opacity = "1";
			this.slides[0].querySelector(".card__controls").style.opacity = "1";
			this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
		}
	}

	nextSlide() {
		this.container.appendChild(this.slides[0]);

		this.decorizeSlides();
	}

	bindTriggers() {
		this.nextButton.addEventListener("click", () => this.nextSlide());

		this.prevButton.addEventListener("click", () => {
			const slide = this.slides[this.slides.length - 1];
			this.container.insertBefore(slide, this.slides[0]);

			this.decorizeSlides();
		});
	}

	init() {
		try {
			this.container.style.cssText = `
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			align-items: flex-start;
		`;

			this.bindTriggers();
			this.decorizeSlides();

			if (this.autoplay) {
				setInterval(() => {
					this.nextSlide();
				}, 3000);
			}
		} catch (error) {}
	}
}
