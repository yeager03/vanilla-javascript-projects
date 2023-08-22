export class Component {
	element = null;

	constructor(tag = "div") {
		this.element = document.createElement(tag);
	}

	render() {
		return this.element;
	}
}
