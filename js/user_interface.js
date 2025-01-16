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
			const championIcon = this.createChampionSelectionIcon(champion);
			this.championSelection.appendChild(championIcon);
		}
	}

	createChampionSelectionIcon(champion) {
		const championContainer = document.createElement("img");
		championContainer.src =
			this.championIconImagePath +
			capitalize(champion) +
			this.championIconFileExtension;
		return championContainer;
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
