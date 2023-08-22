"use strict";

let habits = [];
let currentActiveHabitId = null;

const HABIT_KEY = "HABIT_KEY";
const ACTIVE_HABIT_ID = "ACTIVE_HABIT_ID";

/* page */
const page = {
	menu: document.querySelector(".menu__list"),
	header: {
		title: document.querySelector(".header__title"),
		progressPercent: document.querySelector(".progress__percent"),
		progressBarLine: document.querySelector(".progress-bar__inner"),
	},
	content: {
		daysContainer: document.querySelector(".habit__items"),
		nextDay: document.querySelector(".habit__day"),
		input: document.querySelector(".habit-form__input"),
		addDayButton: document.querySelector(".habit__button--add"),
	},
	popup: {
		popupContainer: document.querySelector(".cover"),
		popupSelectItems: document.querySelectorAll(".popup__item"),
		habitInput: document.querySelector("[name='habit']"),
	},
};

/* utils */
function initDemoDate() {
	const demoData = [
		{
			id: 1,
			icon: "sport",
			title: "Отжимания",
			target: 10,
			days: [
				{
					comment: "Первый подход всегда даётся тяжело",
				},
				{
					comment: "Второй день уже проще",
				},
			],
		},
		{
			id: 2,
			icon: "food",
			title: "Правильное питание",
			target: 10,
			days: [
				{
					comment: "Круто!",
				},
			],
		},
	];

	if (localStorage.getItem(HABIT_KEY)) {
		return;
	}

	localStorage.setItem(HABIT_KEY, JSON.stringify(demoData));
}

function loadData() {
	const habitsString = localStorage.getItem(HABIT_KEY);
	const habitsArray = JSON.parse(habitsString);

	if (Array.isArray(habitsArray)) {
		habits = habitsArray;
	}
}

function saveData() {
	localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
}

/* render */
function renderMenu(activeHabit) {
	for (const habit of habits) {
		const exist = document.querySelector(`[menu-habit-id="${habit.id}"]`);

		if (!exist) {
			const element = document.createElement("li");

			element.setAttribute("menu-habit-id", habit.id);
			element.classList.add("menu__item");
			element.innerHTML = `<img src="images/${habit.icon}.svg" alt="Icon: ${habit.icon} icon" class="menu__icon" />`;

			element.addEventListener("click", () => rerender(habit.id));

			if (activeHabit.id === habit.id) {
				element.classList.add("menu__item--active");
			}

			page.menu.appendChild(element);

			continue;
		}

		if (activeHabit.id === habit.id) {
			exist.classList.add("menu__item--active");
		} else {
			exist.classList.remove("menu__item--active");
		}
	}
}

function renderHead(activeHabit) {
	page.header.title.innerHTML = activeHabit.title;

	const progress =
		activeHabit.days.length / activeHabit.target > 1 ? 100 : (activeHabit.days.length / activeHabit.target) * 100;
	const percent = `${progress.toFixed(0)}%`;
	page.header.progressPercent.innerHTML = percent;
	page.header.progressBarLine.style.width = percent;
}

function renderContent(activeHabit) {
	page.content.daysContainer.innerHTML = "";

	for (const index in activeHabit.days) {
		const element = document.createElement("div");
		const day = activeHabit.days[index];

		element.classList.add("habit", "habit__item");
		element.innerHTML = `
         <span class="habit__day">День ${+index + 1}</span>
         <div class="habit__comment">${day.comment}</div>
         <button class="habit__button habit__button--remove" onClick="removeDay(${+index})">
            <img src="images/delete.svg" alt="Icon: Remove day ${+index + 1} icon" />
         </button>
      `;

		page.content.daysContainer.appendChild(element);
	}

	page.content.nextDay.innerHTML = `День ${activeHabit.days.length + 1}`;
}

function rerender(activeHabitId) {
	const activeHabit = habits.find((habit) => habit.id === activeHabitId);

	if (!activeHabit) {
		return;
	}

	currentActiveHabitId = activeHabitId;
	localStorage.setItem(ACTIVE_HABIT_ID, activeHabitId);

	renderMenu(activeHabit);
	renderHead(activeHabit);
	renderContent(activeHabit);
}

/* alerts */
function showAlert(title, description, time = 3000, type = "error") {
	const element = document.createElement("div");

	element.classList.add("alert", type === "success" ? "alert--success" : "alert--error");
	element.innerHTML = `
		<h3 class="alert__title">${title}</h3>
		<p class="alert__description">${description}</p>
	`;

	document.body.appendChild(element);

	let timeout;
	new Promise((resolve, reject) => {
		timeout = setTimeout(() => {
			element.classList.add("alert--out");
			setTimeout(() => {
				element.remove();
				resolve();
			}, time);
		}, time - 500);
	}).then(() => clearTimeout(timeout));
}

/* work with days */
function addDay() {
	const button = page.content.addDayButton;
	const input = page.content.input;

	input.addEventListener("input", (e) => {
		if (e.target.value.trim().length) {
			e.target.setAttribute("is-correct", 1);
		} else {
			e.target.setAttribute("is-correct", 0);
		}
	});

	const observer = new MutationObserver((mutations) => {
		mutations.forEach(({ attributeName }) => {
			switch (attributeName) {
				case "is-correct":
					const isCorrect = Boolean(+input.getAttribute("is-correct"));

					if (isCorrect) {
						button.disabled = false;
					} else {
						button.disabled = true;
					}
					break;
				case "disabled":
					const value = input.value.trim();

					if (!value.length && !button.disabled) {
						button.disabled = true;
					}

					break;
			}
		});
	});

	[input, button].forEach((target) => {
		observer.observe(target, {
			attributes: true,
			childList: false,
			characterData: false,
		});
	});

	button.addEventListener("click", (e) => {
		const comment = input.value.trim();

		if (comment.length) {
			input.value = "";
			habits = habits.map((habit) => {
				if (habit.id === currentActiveHabitId) {
					return {
						...habit,
						days: [...habit.days, { comment }],
					};
				}

				return habit;
			});

			rerender(currentActiveHabitId);
			saveData();
		} else {
			showAlert("Ошибка", "Комментарий не может быть пустым!", 5000);
			if (!button.disabled) {
				button.disabled = true;
			}
		}
	});
}

function removeDay(dayIndex) {
	habits = habits.map((habit) => {
		if (habit.id === currentActiveHabitId) {
			return {
				...habit,
				days: habit.days.filter((el, index) => index !== dayIndex),
			};
		}

		return habit;
	});
	rerender(currentActiveHabitId);
	showAlert("Успех", `${dayIndex + 1} день успешно удален`, 4000, "success");
	saveData();
}

/* working with popup */
function togglePopup() {
	page.popup.popupContainer.classList.toggle("cover--hidden");
}

function selectHabit(context, habit) {
	page.popup.habitInput.value = habit;

	document.querySelector(".popup__item.popup__item--active").classList.remove("popup__item--active");
	context.classList.add("popup__item--active");
}

function resetForm(form, fields) {
	for (const field of fields) {
		form[field].value = "";
	}
}

function validateForm(form, fields) {
	const formData = new FormData(form);
	const result = {};

	for (const field of fields) {
		const fieldValue = formData.get(field).trim();
		form[field].classList.remove("error");

		if (!fieldValue) {
			form[field].classList.add("error");
		}
		result[field] = fieldValue;
	}

	let isValid = true;
	for (const field of fields) {
		if (!result[field]) {
			isValid = false;
		}
	}

	if (!isValid) {
		return;
	}

	return result;
}

function addHabit(event) {
	event.preventDefault();
	const data = validateForm(event.target, ["title", "target", "habit"]);
	if (!data) {
		return;
	}
	const maxId = habits.reduce((accum, habit) => (accum > habit.id ? accum : habit.id), 0);
	habits.push({
		id: maxId + 1,
		title: data.title,
		icon: data.habit,
		target: data.target,
		days: [],
	});
	resetForm(event.target, ["title", "target"]);
	togglePopup();
	saveData();
	rerender(maxId + 1);
}

/* init */
(function () {
	initDemoDate();
	loadData();
	rerender(localStorage.getItem(ACTIVE_HABIT_ID) ? +localStorage.getItem(ACTIVE_HABIT_ID) : habits[0].id);

	addDay();
})();
