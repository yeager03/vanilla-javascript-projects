import { postData } from "../services/requests";

const forms = () => {
	const forms = document.querySelectorAll("form"),
		inputs = document.querySelectorAll("input"),
		uploads = document.querySelectorAll("[name='upload']");

	const url = "http://localhost:3000";

	const message = {
		loading: {
			src: "assets/img/spinner.gif",
			text: "Загрузка...",
		},
		success: {
			src: "assets/img/ok.png",
			text: "Спасибо! Скоро мы с вами свяжемся!",
		},
		failure: {
			src: "assets/img/fail.png",
			text: "Упс! Что-то пошло не так...",
		},
	};

	const clearInputs = () => {
		inputs.forEach((input) => (input.value = ""));
		uploads.forEach((input) => (input.previousElementSibling.textContent = "Файл не выбран"));
	};
	uploads.forEach((input) =>
		input.addEventListener("input", () => {
			const fileName = input.files[0].name.split(".")[0];
			const extension = input.files[0].name.split(".")[1];

			const name = fileName.length > 6 ? `${fileName.slice(0, 5)}...${extension}` : `${fileName}.${extension}`;

			input.previousElementSibling.textContent = name;
		})
	);

	forms.forEach((form) => {
		form.addEventListener("submit", (event) => {
			event.preventDefault();

			const statusMessage = document.createElement("div"),
				statusMessageImage = document.createElement("img"),
				statusMessageText = document.createElement("p");

			form.classList.add("animated", "fadeOut");
			setTimeout(() => (form.style.display = "none"), 400);

			statusMessage.classList.add("status");
			statusMessageImage.classList.add("animated", "fadeIn");
			statusMessageText.classList.add("animated", "fadeIn");

			statusMessageImage.src = message.loading.src;
			statusMessageText.textContent = message.loading.text;

			statusMessage.append(statusMessageImage, statusMessageText);

			form.parentNode.appendChild(statusMessage);

			const data = new FormData(event.target);
			const API = `${url}/${
				form.closest(".popup-design") || form.classList.contains("calc_form") ? "designer" : "applications"
			}`;

			postData(API, data)
				.then((data) => {
					console.log(data);

					statusMessageImage.src = message.success.src;
					statusMessageText.textContent = message.success.text;
				})
				.catch(() => {
					statusMessageImage.src = message.failure.src;
					statusMessageText.textContent = message.failure.text;
				})
				.finally(() => {
					clearInputs();

					form.classList.remove("fadeOut");
					form.classList.add("fadeIn");

					setTimeout(() => {
						statusMessage.remove();
						form.style.display = "block";
					}, 5000);
				});
		});
	});
};

export default forms;
