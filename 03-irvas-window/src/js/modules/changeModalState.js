import IMask from "imask";

const changeModalState = (state) => {
	const windowForm = document.querySelectorAll(".balcon_icons_img"),
		windowWidth = document.querySelectorAll("#width"),
		windowHeight = document.querySelectorAll("#height"),
		windowType = document.querySelectorAll("#view_type"),
		windowProfile = document.querySelectorAll(".checkbox");

	[...windowWidth, ...windowHeight].forEach((el) => {
		IMask(el, {
			mask: Number,
			scale: 0,
			thousandsSeparator: "",
			padFractionalZeros: false,
			normalizeZeros: true,
			radix: ",",
			mapToRadix: ["."],
			min: 100,
			max: 10000,
		});
	});

	function bindActionToElements(event, elements, prop) {
		elements.forEach((item, index) => {
			item.addEventListener(event, () => {
				switch (item.nodeName) {
					case "SPAN":
						state.set(prop, index);
						break;
					case "INPUT":
						if (item.getAttribute("type") === "checkbox") {
							index === 0 ? state.set(prop, "Холодное") : state.set(prop, "Теплое");

							elements.forEach((box, idx) => {
								box.checked = false;

								if (index === idx) {
									box.checked = true;
								}
							});
						} else {
							state.set(prop, Number(item.value));
						}
						break;
					case "SELECT":
						state.set(prop, item.value);
						break;
				}

				console.log(state);
			});
		});
	}

	bindActionToElements("click", windowForm, "form");
	bindActionToElements("input", windowHeight, "height");
	bindActionToElements("input", windowWidth, "width");
	bindActionToElements("change", windowType, "type");
	bindActionToElements("change", windowProfile, "profile");
};

export default changeModalState;
