const accordion = (triggerSelector) => {
	const buttons = document.querySelectorAll(triggerSelector);
	// const blocks = document.querySelectorAll(itemSelector);

	// blocks.forEach((block) => {
	// 	block.classList.add("animated", "fadeInDown");
	// });

	// buttons.forEach((button) => {
	// 	button.addEventListener("click", function () {
	// 		if (!this.classList.contains("active")) {
	// 			buttons.forEach((button) => button.classList.remove("active", "active-style"));

	// 			this.classList.add("active", "active-style");
	// 		} else {
	// 			this.classList.remove("active", "active-style");
	// 		}
	// 	});
	// });

	buttons.forEach((button) => {
		button.addEventListener("click", function () {
			const accordionBlock = this.nextElementSibling;

			if (!this.classList.contains("active-style")) {
				this.classList.add("active-style");

				accordionBlock.classList.add("active-content");
				accordionBlock.style.maxHeight = accordionBlock.scrollHeight + 80 + "px";
			} else {
				this.classList.remove("active-style");

				accordionBlock.classList.remove("active-content");
				accordionBlock.style.maxHeight = 0 + "px";
			}
		});
	});
};

export default accordion;
