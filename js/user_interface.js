import { capitalize } from "./util.js";

export default class UserInterface {
	constructor() {
		this.processSignal = null;
		this.championIconImagePath =
			"../img/champion_icons/small_converted_to_webp_scaled/";
		this.championIconFileExtension = ".webp";
		this.mainScreen = document.getElementById("main-screen");
		this.championSelection = document.getElementById("champion-selection");
		this.tierlist = document.getElementById("tierlist");
		this.championSelectionSearchBar = document.getElementById(
			"champion-selection-search-bar",
		);

		this.championSelectionSearchBar.addEventListener(
			"input",
			this.sendProcessSignal.bind(this),
		);

		document.addEventListener(
			"keydown",
			this.processKeyboardInput.bind(this),
		);

		document.documentElement.addEventListener("dragstart", () => {
			if (!event.target.draggable == true) event.preventDefault();
		});
	}

	sendProcessSignal() {
		this.processSignal();
	}

	processKeyboardInput(event) {
		this.processMainScreenInput();
	}

	processMainScreenInput() {
		this.championSelectionSearchBar.focus();
	}

	getSearchQuery() {
		return this.championSelectionSearchBar.value.trim();
	}

	/**
	 * @param {RenderingData} renderingData
	 * */
	render(renderingData) {
		// render champion selection
		this.championSelection.innerHTML = "";
		for (
			let i = 0;
			i < renderingData.championSelectionChampions.length;
			i++
		) {
			const champion = renderingData.championSelectionChampions[i];
			const championIcon = this.createChampionIcon(champion);
			this.championSelection.appendChild(championIcon);
		}

		// render the tierlist
		this.tierlist.innerHTML = "";
		for (let i = 0; i < renderingData.tiers.length; i++) {
			const tier = this.createTier(renderingData.tiers[i]);
			this.tierlist.appendChild(tier);
		}
	}

	createChampionIcon(champion) {
		const championIcon = document.createElement("img");
		championIcon.src =
			this.championIconImagePath +
			capitalize(champion) +
			this.championIconFileExtension;

		championIcon.dataset.champion = champion;

		championIcon.draggable = true;
		championIcon.addEventListener(
			"dragstart",
			this.dragFunction.bind(this),
		);
		championIcon.addEventListener(
			"dragend",
			this.dragendFunction.bind(this),
		);
		return championIcon;
	}

	dragFunction(event) {
		console.log(event.target.dataset.champion);
		event.dataTransfer.clearData();
		event.dataTransfer.setData("text/plain", event.target.dataset.champion);

		const dragImage = document.createElement("img");
		dragImage.src = event.target.src;
		dragImage.id = "drag-image";
		const width = event.target.offsetWidth;
		const height = event.target.offsetHeight;
		document.body.appendChild(dragImage);

		event.dataTransfer.setDragImage(dragImage, width / 2, height / 2);
	}

	dragendFunction() {
		const dragImage = document.querySelector("#drag-image");
		document.body.removeChild(dragImage);
	}

	createTier(tier) {
		const tierContainer = document.createElement("div");
		tierContainer.classList.add("tier-container");

		const tierName = document.createElement("div");
		tierName.classList.add("tier-name");
		tierName.innerHTML = tier.name;

		tierContainer.appendChild(tierName);

		const tierChampionsContainer = document.createElement("div");
		tierChampionsContainer.classList.add("tier-champions");

		for (let i = 0; i < tier.champions.length; i++) {
			const championIcon = this.createChampionIcon(tier.champions[i]);
			tierChampionsContainer.appendChild(championIcon);
		}

		tierContainer.appendChild(tierChampionsContainer);

		return tierContainer;
	}
}

/**
 *  @typedef {Object} RenderingData
 *  @property {Tier[]} tiers
 *  @property {string[]} championSelectionChampions
 * */

/**
 * @typedef {Object} Tier
 * @property {string} name
 * @property {string[]} champions
 */
