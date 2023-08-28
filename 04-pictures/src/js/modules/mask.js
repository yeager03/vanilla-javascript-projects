const mask = (inputSelector) => {
	function setCursorPosition(position, element) {
		element.focus();

		if (element.setSelectionRange) {
			element.setSelectionRange(position, position);
		} else if (element.createTextRange) {
			const range = element.createTextRange();

			range.collapse(true);
			range.moveEnd("character", position);
			range.moveStart("character", position);
			range.select();
		}
	}

	function createMask(event) {
		let matrix = "+7 (___) ___ __ __",
			iterator = 0,
			def = matrix.replace(/\D/g, ""),
			value = this.value.replace(/\D/g, "");

		if (def.length >= value.length) {
			value = def;
		}

		this.value = matrix.replace(/./g, (symbol) => {
			return /[_\d]/.test(symbol) && iterator < value.length
				? value.charAt(iterator++)
				: iterator >= value.length
				? ""
				: symbol;
		});

		if (event.type === "blur") {
			if (this.value.length === 2) {
				this.value = "";
			}
		} else {
			setCursorPosition(this.value.length, this);
		}
	}

	const inputs = document.querySelectorAll(inputSelector);

	inputs.forEach((input) => {
		input.addEventListener("input", createMask);
		input.addEventListener("focus", createMask);
		input.addEventListener("blur", createMask);
	});
};

export default mask;
