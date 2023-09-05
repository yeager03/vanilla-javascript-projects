export default class ShowInfo {
	constructor(trigger) {
		this.buttons = document.querySelectorAll(trigger);
	}

	init() {
		this.buttons.forEach((button) => {
			button.addEventListener("click", () => {
				const sibling = button.closest(".module__info-show").nextElementSibling;

				if (getComputedStyle(sibling).display === "block") {
					sibling.style.display = "none";
				} else {
					sibling.style.display = "block";
				}
			});
		});
	}
}
