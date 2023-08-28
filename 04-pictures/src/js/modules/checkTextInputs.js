const checkTextInputs = (inputSelector) => {
	const inputs = document.querySelectorAll(inputSelector);

	inputs.forEach((input) => {
		input.addEventListener("keypress", (event) => {
			if (event.key.match(/[^а-яё]/gi)) {
				event.preventDefault();
			}
		});
	});
};

export default checkTextInputs;
