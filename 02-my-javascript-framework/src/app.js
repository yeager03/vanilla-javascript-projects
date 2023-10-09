/* views */
import { MainView } from "./views/main/main";
import { FavoritesView } from "./views/favorites/favorites";

class App {
	#currentView = null;
	#routes = [
		{
			path: "",
			view: MainView,
		},
		{
			path: "#favorites",
			view: FavoritesView,
		},
	];
	#globalState = {
		favorites: [],
	};

	constructor() {
		window.addEventListener("hashchange", this.route.bind(this));
		this.initFavorites();
		this.route();
	}

	route() {
		if (this.#currentView) {
			this.#currentView.destroy();
		}

		const route = this.#routes.find((route) => route.path === location.hash);

		if (!route) {
			return;
		}

		this.#currentView = new route.view(this.#globalState);
		this.#currentView.render();
	}

	initFavorites() {
		const favorites = localStorage.getItem("favorites");

		if (favorites && favorites.length) {
			this.#globalState.favorites = JSON.parse(favorites);
		}
	}
}

new App();
