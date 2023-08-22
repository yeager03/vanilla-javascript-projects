/* proxy lib */
import onChange from "on-change";
/* abstract view */
import { AbstractView } from "../../common/view.js";
/* components view */
import { Header } from "../../components/header/header.js";
import { BookList } from "../../components/bookList/bookList.js";

export class FavoritesView extends AbstractView {
	#globalState = null;

	constructor(globalState) {
		super();
		this.setTitle("Избранные книги");

		this.#globalState = onChange(globalState, this.globalStateHook.bind(this));
	}

	destroy() {
		onChange.unsubscribe(this.#globalState);
	}

	async globalStateHook(path) {
		if (path === "favorites") {
			this.render();
		}
	}

	render() {
		const favorites = document.createElement("div");

		this.app.innerHTML = "";
		this.app.appendChild(favorites);
		this.renderHeader();

		favorites.classList.add("favorites");
		favorites.appendChild(
			new BookList(
				this.#globalState,
				{
					books: this.#globalState.favorites,
				},
				`Избранные книги - ${this.#globalState.favorites.length}`
			).render()
		);
	}

	renderHeader() {
		const header = new Header(this.#globalState).render();
		this.app.prepend(header);
	}
}
