export default class Difference {
	constructor(oldOfficer, newOfficer, items) {
		try {
			this.oldOfficer = document.querySelector(oldOfficer);
			this.newOfficer = document.querySelector(newOfficer);

			this.oldItems = this.oldOfficer.querySelectorAll(items);
			this.newItems = this.newOfficer.querySelectorAll(items);

			this.oldCounter = 0;
			this.newCounter = 0;
		} catch (error) {}
	}

	hideItems(items) {
		items.forEach((item, index, array) => {
			if (index !== array.length - 1) {
				item.style.display = "none";
			}
		});
	}

	bindTriggers(container, items, counter) {
		container.querySelector(".plus").addEventListener("click", () => {
			if (counter !== items.length - 2) {
				items[counter].style.display = "flex";
				counter++;
			} else {
				items[counter].style.display = "flex";
				items[items.length - 1].remove();
			}
		});
	}

	init() {
		try {
			this.hideItems(this.oldItems);
			this.hideItems(this.newItems);

			this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
			this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
		} catch (error) {}
	}
}
