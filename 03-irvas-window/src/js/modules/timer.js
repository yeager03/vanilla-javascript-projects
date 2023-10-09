const timer = (id, deadline) => {
	const getTimeRemaining = (endtime) => {
		const total = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((total / 1000) % 60),
			minutes = Math.floor((total / 1000 / 60) % 60),
			hours = Math.floor((total / (1000 * 60 * 60)) % 24),
			days = Math.floor(total / (1000 * 60 * 60 * 24));

		return {
			total,
			days,
			hours,
			minutes,
			seconds,
		};
	};

	const addZero = (number) => (number < 10 ? `0${number}` : number);

	const setClock = (selector, endtime) => {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timerInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const time = getTimeRemaining(endtime);

			days.textContent = addZero(time.days);
			hours.textContent = addZero(time.hours);
			minutes.textContent = addZero(time.minutes);
			seconds.textContent = addZero(time.seconds);

			if (time.total <= 0) {
				days.textContent = "00";
				hours.textContent = "00";
				minutes.textContent = "00";
				seconds.textContent = "00";

				clearInterval(timerInterval);
			}
		}
	};

	setClock(id, deadline);
};

export default timer;
