export default class Form {
	constructor(forms) {
		this.forms = document.querySelectorAll(forms);
		this.inputs = document.querySelectorAll("input");

		this.message = {
			loading: "Loading...",
			success: "Thanks! We will contact you soon!",
			failure: "Oops! Something went wrong...",
		};
		this.api = "http://localhost:3000/applications";
	}

	clearInputs() {
		this.inputs.forEach((input) => (input.value = ""));
	}

	checkMailInputs() {
		const mailInputs = document.querySelectorAll("[type='email']");

		mailInputs.forEach((input) => {
			input.addEventListener("keypress", (event) => {
				if (event.key.match(/[^a-z 0-9 @ \.]/gi)) {
					event.preventDefault();
				}
			});
		});
	}

	checkTelInputs() {
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
			let matrix = "+1 (___) ___ __ __",
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

		const inputs = document.querySelectorAll("[name='phone' ]");

		inputs.forEach((input) => {
			input.addEventListener("input", createMask);
			input.addEventListener("focus", createMask);
			input.addEventListener("blur", createMask);
		});
	}

	async postData(url, data) {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Object.fromEntries(data)),
		});

		if (!response.ok) {
			throw new Error(response.status);
		}

		return response.json();
	}

	init() {
		this.checkMailInputs();
		this.checkTelInputs();

		this.forms.forEach((form) => {
			form.addEventListener("submit", (event) => {
				event.preventDefault();

				const statusMessage = document.createElement("div");
				statusMessage.style.cssText = `
               margin-top: 15px;
               font-size: 20px;
               color: #fff;
					font-weight: #000;
            `;
				form.parentNode.appendChild(statusMessage);

				statusMessage.textContent = this.message.loading;

				const formData = new FormData(form);

				this.postData(this.api, formData)
					.then((result) => {
						console.log(result);
						statusMessage.textContent = this.message.success;
					})
					.catch((error) => {
						console.log(error);
						statusMessage.textContent = this.message.failure;
					})
					.finally(() => {
						this.clearInputs();

						setTimeout(() => {
							statusMessage.remove();
						}, 5000);
					});
			});
		});
	}
}
