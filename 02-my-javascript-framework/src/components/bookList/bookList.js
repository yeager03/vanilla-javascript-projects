/* abstract component */
import { Component } from "../../common/component";
import { BookItem } from "../bookItem/bookItem";
/* styles */
import "./bookList.css";

export class BookList extends Component {
	#globalState = null;
	#state = null;
	#title = "";

	constructor(globalState, state, title) {
		super();

		this.#globalState = globalState;
		this.#state = state;
		this.#title = title;
	}

	render() {
		this.element.classList.add("book-list");

		if (this.#state.loading) {
			this.element.classList.add("book-list--loading");
			this.element.innerHTML = `<img src="/static/spinner.svg" alt="Icon: Spinner icon" />`;

			return this.element;
		}
		const bookGrid = document.createElement("div");
		bookGrid.classList.add("book-grid");

		const bookTitle = document.createElement("h1");
		bookTitle.classList.add("book-list__title");
		bookTitle.textContent = this.#title;

		for (const book of this.#state.books) {
			bookGrid.appendChild(new BookItem(this.#globalState, book).render());
		}

		this.element.append(bookTitle, bookGrid);

		return this.element;
	}
}
