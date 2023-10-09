/* slider */
import "./slider";

/* modules */
import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from "./modules/forms";
import changeModalState from "./modules/changeModalState";
import timer from "./modules/timer";
import images from "./modules/images";

window.addEventListener("DOMContentLoaded", () => {
	"use strict";

	const modalState = new Map();
	const deadline = "2023-08-23 13:00";

	modals();
	tabs(".glazing_slider", ".glazing_block", ".glazing_content", "active");
	tabs(".decoration_slider", ".no_click", ".decoration_content > .row > div", "after_click");
	tabs(".balcon_icons", ".balcon_icons_img", ".big_img > img", "do_image_more", "inline-block");
	changeModalState(modalState);
	forms(modalState);
	timer(".container1", deadline);
	images();
});
