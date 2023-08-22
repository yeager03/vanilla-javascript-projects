/* abstract component */
import { Component } from "../../common/component";
/* styles */
import "./pagination.css";

export class Pagination extends Component {
	#state = null;

	constructor(state) {
		super();

		this.#state = state;
	}

	nextPage() {
		this.#state.page = this.#state.page + 1;
	}

	prevPage() {
		this.#state.page = this.#state.page - 1;
	}

	render() {
		this.element.classList.add("pagination");

		if (!this.#state.books.length) {
			return this.element;
		}

		this.element.innerHTML = `
         <div class="pagination__wrapper">
            <button class="pagination__button pagination__button--prev" ${this.#state.page <= 1 && "disabled"}>
               <
            </button>
            <button class="pagination__button pagination__button--next" ${this.#state.books.length < 9 && "disabled"}>
               >
            </button>
         </div>
      `;

		this.element.querySelector(".pagination__button--prev").addEventListener("click", this.prevPage.bind(this));
		this.element.querySelector(".pagination__button--next").addEventListener("click", this.nextPage.bind(this));

		return this.element;
	}
}
