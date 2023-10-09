export default class Slider {
	constructor({
		container = null,
		buttons = null,
		next = null,
		prev = null,
		activeClass = "",
		animate = false,
		autoplay = false,
	} = {}) {
		this.container = document.querySelector(container);
		this.buttons = document.querySelectorAll(buttons);

		this.prevButtons = document.querySelectorAll(prev);
		this.nextButtons = document.querySelectorAll(next);

		this.activeClass = activeClass;
		this.animate = animate;
		this.autoplay = autoplay;

		try {
			this.slides = this.container.children;
		} catch (error) {}

		this.slideIndex = 0;
	}
}
