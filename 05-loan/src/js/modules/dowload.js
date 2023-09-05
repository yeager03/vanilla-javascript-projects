export default class Download {
	constructor(trigger) {
		this.buttons = document.querySelectorAll(trigger);
		this.path = "assets/img/mainbg.jpg";
	}

	downloadItem(path) {
		const link = document.createElement("a");

		link.href = path;
		link.download = "nice_picture";
		link.style.display = "none";

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	init() {
		this.buttons.forEach((button) => {
			button.addEventListener("click", () => {
				this.downloadItem(this.path);
			});
		});
	}
}
