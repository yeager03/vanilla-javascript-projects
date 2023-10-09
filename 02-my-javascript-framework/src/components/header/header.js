/* abstract component */
import { Component } from "../../common/component";
/* styles */
import "./header.css";

export class Header extends Component {
	#globalState = null;

	constructor(globalState) {
		super("header");

		this.#globalState = globalState;
	}

	render() {
		this.element.classList.add("header");
		this.element.innerHTML = `
         <a href="#" class="logo">
            <img src="/static/logo.svg" alt="icon: Logo icon" />
         </a>
         <nav class="menu">
            <ul class="menu__list">
               <li class="menu__item">
                  <a href="#" class="menu__link">
                     <img src="/static/search.svg" alt="icon: Search icon" class="menu__icon"/>
                     Поиск книг
                  </a>
               </li>
               <li class="menu__item">
                  <a href="#favorites" class="menu__link">
                     <img src="/static/favorites.svg" alt="icon: Favorites icon" class="menu__icon"/>
                     Избранное
                  </a>
               </li>
               <li class="menu__item">
                  <span class="menu__counter">
                     ${this.#globalState.favorites.length}
                  </span>
               </li>
            </ul>
         </nav>
      `;

		return this.element;
	}
}
