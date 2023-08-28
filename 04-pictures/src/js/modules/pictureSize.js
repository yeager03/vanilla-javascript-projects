const pictureSize = (imageSelector) => {
	const images = document.querySelectorAll(imageSelector);

	function showImage(block) {
		const image = block.querySelector("img");
		image.classList.add("animated", "fadeIn");

		image.src = image.src.split(".")[0] + "-1." + image.src.split(".")[1];

		block.querySelectorAll("p:not(.sizes-hit)").forEach((paragraph) => {
			paragraph.style.display = "none";
		});
	}

	function hideImage(block) {
		const image = block.querySelector("img");
		image.classList.remove("animated", "fadeIn");

		image.src = image.src.split(".")[0].slice(0, -2) + "." + image.src.split(".")[1];

		block.querySelectorAll("p:not(.sizes-hit)").forEach((paragraph) => {
			paragraph.style.display = "block";
		});
	}

	images.forEach((image) => {
		image.addEventListener("mouseover", () => {
			showImage(image);
		});

		image.addEventListener("mouseout", () => {
			hideImage(image);
		});
	});
};

export default pictureSize;
