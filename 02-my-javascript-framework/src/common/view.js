export class AbstractView {
	app = null;

	constructor() {
		this.app = document.getElementById("root");
	}

	setTitle(title) {
		document.title = title;
	}

	render() {
		return;
	}

	destroy() {
		return;
	}
}
