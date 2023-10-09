import { getData } from "../services/requests";

const showMoreStyles = (triggerSelector, wrapperSelector) => {
	const button = document.querySelector(triggerSelector),
		wrapper = document.querySelector(wrapperSelector);

	function createCard(data) {
		data.forEach((item) => {
			const div = document.createElement("div");

			div.classList.add("animated", "fadeInUp", "col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
			div.innerHTML = `
            <div class="styles-block">
               <img src="${item.src}" alt="styles image" />
               <h4>${item.title}</h4>
               <a href="${item.link}">Подробнее</a>
            </div>
         `;

			wrapper.appendChild(div);
		});
	}

	button.addEventListener("click", function () {
		getData("http://localhost:3000/styles")
			.then((data) => createCard(data))
			.catch((error) => console.log(error));

		this.remove();
	});
};

export default showMoreStyles;
