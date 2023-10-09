/* proxy lib */
import onChange from "on-change";
/* abstract view */
import { AbstractView } from "../../common/view.js";
/* components view */
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { BookList } from "../../components/bookList/bookList.js";
import { Pagination } from "../../components/pagination/pagination.js";

export class MainView extends AbstractView {
	#globalState = null;
	#state = {
		loading: false,
		books: [],
		booksFound: 0,
		searchQuery: "",
		page: 1,
		limit: 9,
	};

	constructor(globalState) {
		super();
		this.setTitle("Поиск книг");

		this.#globalState = onChange(globalState, this.globalStateHook.bind(this));
		this.#state = onChange(this.#state, this.stateHook.bind(this));
	}

	destroy() {
		onChange.unsubscribe(this.#globalState);
		onChange.unsubscribe(this.#state);
	}

	async globalStateHook(path) {
		if (path === "favorites") {
			this.render();
		}
	}

	async stateHook(path) {
		if (path === "searchQuery") {
			this.#state.page = 1;
		}

		if (path === "searchQuery" || path === "page") {
			this.#state.loading = true;
			const data = await this.loadBooks(this.#state.searchQuery, this.#state.page, this.#state.limit);
			this.#state.loading = false;
			this.#state.booksFound = data.numFound;
			this.#state.books = data.docs;
		}

		if (path === "loading" || path === "books") {
			this.render();
		}
	}

	async loadBooks(query, page, limit) {
		const response = await fetch(`https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${limit}`);
		return response.json();
	}

	render() {
		const main = document.createElement("main");

		this.app.innerHTML = "";
		this.app.appendChild(main);
		this.renderHeader();

		main.classList.add("main");
		main.appendChild(new Search(this.#state).render());
		main.appendChild(
			new BookList(this.#globalState, this.#state, `Найдено книг - ${this.#state.booksFound}`).render()
		);
		main.appendChild(new Pagination(this.#state).render());
	}

	renderHeader() {
		const header = new Header(this.#globalState).render();
		this.app.prepend(header);
	}
}
