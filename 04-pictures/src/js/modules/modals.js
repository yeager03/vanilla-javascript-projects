const modals = () => {
	let buttonPressed = false;

	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
		const triggers = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = modal.querySelector(closeSelector),
			windows = document.querySelectorAll("[data-modal]"),
			scroll = calcScroll();

		triggers.forEach((trigger) => {
			trigger.addEventListener("click", (event) => {
				if (event.target) {
					event.preventDefault();
				}

				if (destroy) {
					trigger.remove();
				}

				buttonPressed = true;

				windows.forEach((window) => {
					window.style.display = "none";
					window.classList.add("animated", "fadeIn");
				});

				modal.style.display = "block";
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${scroll}px`;
			});
		});

		close.addEventListener("click", () => {
			windows.forEach((window) => (window.style.display = "none"));

			modal.style.display = "none";
			document.body.style.overflow = "";
			document.body.style.marginRight = "0px";
		});

		modal.addEventListener("click", (event) => {
			if (event.target === modal) {
				windows.forEach((window) => (window.style.display = "none"));

				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = "0px";
			}
		});
	}

	function showModalByTime(modalSelector, time) {
		setTimeout(() => {
			let isModalOpened = false;

			document.querySelectorAll("[data-modal]").forEach((item) => {
				if (getComputedStyle(item).display !== "none") {
					isModalOpened = true;
					return;
				}
			});

			if (!isModalOpened) {
				document.querySelector(modalSelector).style.display = "block";
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${calcScroll()}px`;
			}
		}, time);
	}

	function calcScroll() {
		const div = document.createElement("div");

		div.style.width = "50px";
		div.style.height = "50px";
		div.style.overflowY = "scroll";
		div.style.visibility = "hidden";

		document.body.appendChild(div);

		const scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	function openByScroll(selector) {
		window.addEventListener("scroll", () => {
			let footerHeight = Number.parseInt(getComputedStyle(document.querySelector("#footer")).height),
				scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - footerHeight;

			if (!buttonPressed && Math.round(window.pageYOffset + document.documentElement.clientHeight) >= scrollHeight) {
				document.querySelector(selector).click();
			}
		});
	}

	bindModal(".button-design", ".popup-design", ".popup-close");
	bindModal(".button-consultation", ".popup-consultation", ".popup-close");
	bindModal(".fixed-gift", ".popup-gift", ".popup-close", true);

	openByScroll(".fixed-gift");
	showModalByTime(".popup-consultation", 60000);
};

export default modals;
