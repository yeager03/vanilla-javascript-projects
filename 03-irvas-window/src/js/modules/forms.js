import IMask from "imask";

const forms = (state) => {
	const forms = document.querySelectorAll("form"),
		inputs = document.querySelectorAll("input"),
		phoneInputs = document.querySelectorAll("input[name='user_phone']");

	phoneInputs.forEach((input) => {
		IMask(input, {
			mask: "+{7}(000)000-00-00",
		});
	});

	const message = {
		loading: "Загрузка...",
		success: "Спасибо! Скоро мы с вами свяжемся!",
		failure: "Что-то пошло не так...",
	};

	const clearInputs = () => inputs.forEach((input) => (input.value = ""));

	const postData = async (url, data) => {
		const statusMessage = document.querySelector(".status");

		try {
			statusMessage.textContent = message.loading;

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

			console.log(await response.json());
			statusMessage.textContent = message.success;
		} catch (error) {
			statusMessage.textContent = message.failure;
		} finally {
			clearInputs();

			setTimeout(() => {
				statusMessage.remove();
			}, 5000);

			state.clear();
		}
	};

	forms.forEach((form) => {
		form.addEventListener("submit", (event) => {
			event.preventDefault();

			const statusMessage = document.createElement("div");
			statusMessage.classList.add("status");
			form.appendChild(statusMessage);

			const data = new FormData(event.target);

			if (event.target.getAttribute("data-calc") === "end") {
				for (const [key, value] of state) {
					data.append(key, value);
				}
			}
			postData("http://irvas/server.php", data);
		});
	});
};

export default forms;
