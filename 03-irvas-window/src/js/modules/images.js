const images = () => {
	const imagePopup = document.createElement("div"),
		workSection = document.querySelector(".works"),
		bigImage = document.createElement("img");

	imagePopup.classList.add("popup");
	workSection.appendChild(imagePopup);

	imagePopup.style.justifyContent = "center";
	imagePopup.style.alignItems = "center";
	imagePopup.style.display = "none";

	imagePopup.appendChild(bigImage);

	workSection.addEventListener("click", (event) => {
		event.preventDefault();

		const target = event.target;

		if (target && target.classList.contains("preview")) {
			imagePopup.style.display = "flex";
			const path = target.parentNode.getAttribute("href");
			bigImage.setAttribute("src", path);
			document.body.style.overflow = "hidden";
		}

		if (target && target.matches("div.popup")) {
			imagePopup.style.display = "none";
			document.body.style.overflow = "";
		}
	});
};

export default images;
