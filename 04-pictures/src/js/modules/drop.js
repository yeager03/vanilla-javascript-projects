const drop = () => {
	const fileInputs = document.querySelectorAll("[name='upload']");

	["dragenter", "dragleave", "dragover", "drop"].forEach((eventName) => {
		fileInputs.forEach((input) => {
			input.addEventListener(eventName, preventDefault, false);
		});
	});

	function preventDefault(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	function highLight(item) {
		item.closest(".file_upload").style.border = "5px solid yellow";
		item.closest(".file_upload").style.backgroundColor = "rgba(0, 0, 0, .7)";
	}

	function unHighLight(item) {
		item.closest(".file_upload").style.border = "none";

		if (item.closest(".calc_form")) {
			item.closest(".file_upload").style.backgroundColor = "#ffff";
		} else {
			item.closest(".file_upload").style.backgroundColor = "#ededed";
		}
	}

	["dragenter", "dragover"].forEach((eventName) => {
		fileInputs.forEach((input) => {
			input.addEventListener(
				eventName,
				() => {
					highLight(input);
				},
				false
			);
		});
	});

	["dragleave", "drop"].forEach((eventName) => {
		fileInputs.forEach((input) => {
			input.addEventListener(
				eventName,
				() => {
					unHighLight(input);
				},
				false
			);
		});
	});

	fileInputs.forEach((input) => {
		input.addEventListener("drop", (event) => {
			input.files = event.dataTransfer.files;

			const fileName = input.files[0].name.split(".")[0];
			const extension = input.files[0].name.split(".")[1];

			const name = fileName.length > 6 ? `${fileName.slice(0, 5)}...${extension}` : `${fileName}.${extension}`;

			input.previousElementSibling.textContent = name;
		});
	});
};

export default drop;
