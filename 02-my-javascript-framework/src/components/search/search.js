/* abstract component */
import { Component } from "../../common/component";
/* styles */
import "./search.css";

export class Search extends Component {
	#state = null;

	constructor(state) {
		super();

		this.#state = state;
	}

	search() {
		const value = this.element.querySelector(".search__input").value.trim();
		this.#state.searchQuery = value;
	}

	render() {
		this.element.classList.add("search");
		this.element.innerHTML = `
         <input type="text" placeholder="Найти книгу или автора...." class="search__input" value="${
				this.#state.searchQuery
			}" />
         <img src="/static/search.svg" class="search__icon" alt="Icon: Search icon" />
         <button class="search__button">
            <img src="/static/search.svg" alt="Icon: Search icon" />
         </button>
      `;
		this.element.querySelector(".search__button").addEventListener("click", this.search.bind(this));
		this.element.querySelector(".search__input").addEventListener("keydown", (event) => {
			if (event.code === "Enter") {
				this.search();
			}
		});

		return this.element;
	}
}
