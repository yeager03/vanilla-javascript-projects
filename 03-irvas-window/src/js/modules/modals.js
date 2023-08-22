const modals = () => {
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
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

				windows.forEach((window) => (window.style.display = "none"));

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
			if (event.target === modal && closeClickOverlay) {
				windows.forEach((window) => (window.style.display = "none"));

				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = "0px";
			}
		});
	}

	function showModalByTime(modalSelector, time) {
		setTimeout(() => {
			document.querySelector(modalSelector).style.display = "block";
			document.body.style.overflow = "hidden";
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

	bindModal(".popup_engineer_btn", ".popup_engineer", ".popup_close");
	bindModal(".phone_link", ".popup", ".popup_close");

	/* calc popup */
	bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
	bindModal(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close", false);
	bindModal(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close", false);

	showModalByTime(".popup", 60000);
};

export default modals;
