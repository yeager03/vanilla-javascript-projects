/* abstract component */
import { Component } from "../../common/component";
/* styles */
import "./bookItem.css";

export class BookItem extends Component {
	#globalState = null;
	#state = null;

	constructor(globalState, state) {
		super();

		this.#globalState = globalState;
		this.#state = state;
	}

	#addToFavorite() {
		this.#globalState.favorites.push(this.#state);
		this.#saveFavorites();
	}

	#removeFromFavorite() {
		this.#globalState.favorites = this.#globalState.favorites.filter((favorite) => favorite.key !== this.#state.key);
		this.#saveFavorites();
	}

	#saveFavorites() {
		if (this.#globalState.favorites.length) {
			localStorage.setItem("favorites", JSON.stringify(this.#globalState.favorites));
		} else {
			localStorage.removeItem("favorites");
		}
	}

	render() {
		const isFavorite = this.#globalState.favorites.find((book) => book.key === this.#state.key),
			hasImage = this.#state.cover_edition_key
				? `<img src="https://covers.openlibrary.org/b/olid/${this.#state.cover_edition_key}-M.jpg" alt="Обложка" />`
				: "Нет изображения",
			hasTag = this.#state.subject ? this.#state.subject[0] : "Не задано",
			hasAuthor = this.#state.author_name ? this.#state.author_name[0] : "Не указан";

		this.element.classList.add("book-item");
		this.element.innerHTML = `
         <div class="book-item__image">
				${hasImage}
			</div>
			<div class="book-item__info">
				<span class="book-item__tag">
					${hasTag}
				</span>
				<h3 class="book-item__title">
					${this.#state.title}
				</h3>
				<strong class="book-item__author">
					${hasAuthor}
				</strong>
				<button class="book-item__button ${isFavorite ? "book-item__button--favorite" : ""}">
					${
						isFavorite
							? `<img src="/static/favorites.svg" alt="Icon: Favorite icon" />`
							: `<img src="/static/favorites-white.svg" alt="Icon: In favorite icon" />`
					}
				</button>
			</div>
      `;

		if (isFavorite) {
			this.element
				.querySelector(".book-item__button--favorite")
				.addEventListener("click", this.#removeFromFavorite.bind(this));
		} else {
			this.element.querySelector(".book-item__button").addEventListener("click", this.#addToFavorite.bind(this));
		}

		return this.element;
	}
}
