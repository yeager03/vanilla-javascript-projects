/* modules */
import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/player";
import Difference from "./modules/difference";
import Form from "./modules/form";
import ShowInfo from "./modules/showInfo";
import Download from "./modules/dowload";

window.addEventListener("DOMContentLoaded", () => {
	"use strict";

	/* Video player */
	new VideoPlayer(".showup .play", ".overlay").init();

	/* Sliders */
	// Main Sliders
	new MainSlider({ container: ".page", buttons: ".next" }).init();
	new MainSlider({ container: ".moduleapp", buttons: ".next", prev: ".prevmodule", next: ".nextmodule" }).init();

	// Mini Sliders
	new MiniSlider({
		container: ".showup__content-slider",
		next: ".showup__next",
		prev: ".showup__prev",
		activeClass: "card-active",
		animate: true,
		autoplay: true,
	}).init();

	new MiniSlider({
		container: ".modules__content-slider",
		next: ".modules__info-btns .slick-next",
		prev: ".modules__info-btns .slick-prev",
		activeClass: "card-active",
		animate: true,
	}).init();

	new MiniSlider({
		container: ".feed__slider",
		next: ".feed__slider-btns .slick-next",
		prev: ".feed__slider-btns .slick-prev",
		activeClass: "feed__item-active",
	}).init();

	/* Difference */
	new Difference(".officerold", ".officernew", ".officer__card-item").init();

	/* Form */
	new Form(".form").init();

	/* ShowInfo */
	new ShowInfo(".plus__content").init();

	/* Download */
	new Download(".download").init();
});
