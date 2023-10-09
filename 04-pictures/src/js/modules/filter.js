const filter = () => {
	const menu = document.querySelector(".portfolio-menu"),
		items = menu.querySelectorAll("li"),
		buttonAll = menu.querySelector(".all"),
		buttonLovers = menu.querySelector(".lovers"),
		buttonChef = menu.querySelector(".chef"),
		buttonGirl = menu.querySelector(".girl"),
		buttonGuy = menu.querySelector(".guy"),
		buttonGrandMother = menu.querySelector(".grandmother"),
		buttonGrandFather = menu.querySelector(".granddad"),
		wrapper = document.querySelector(".portfolio-wrapper"),
		markAll = wrapper.querySelectorAll(".all"),
		markGirl = wrapper.querySelectorAll(".girl"),
		markLovers = wrapper.querySelectorAll(".lovers"),
		markChef = wrapper.querySelectorAll(".chef"),
		markGuy = wrapper.querySelectorAll(".guy"),
		no = document.querySelector(".portfolio-no");

	const typeFilter = (markType) => {
		markAll.forEach((mark) => {
			mark.style.display = "none";
			mark.classList.remove("animated", "fadeIn");
		});

		no.style.display = "none";
		no.classList.remove("animated", "fadeIn");

		if (markType && markType.length) {
			markType.forEach((mark) => {
				mark.style.display = "block";
				mark.classList.add("animated", "fadeIn");
			});
		} else {
			no.style.display = "block";
			no.classList.add("animated", "fadeIn");
		}
	};

	buttonAll.addEventListener("click", () => {
		typeFilter(markAll);
	});

	buttonLovers.addEventListener("click", () => {
		typeFilter(markLovers);
	});

	buttonChef.addEventListener("click", () => {
		typeFilter(markChef);
	});

	buttonGuy.addEventListener("click", () => {
		typeFilter(markGuy);
	});

	buttonGirl.addEventListener("click", () => {
		typeFilter(markGirl);
	});

	buttonGrandMother.addEventListener("click", () => {
		typeFilter();
	});

	buttonGrandFather.addEventListener("click", () => {
		typeFilter();
	});

	menu.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.tagName === "LI") {
			items.forEach((button) => button.classList.remove("active"));

			target.classList.add("active");
		}
	});
};

export default filter;
