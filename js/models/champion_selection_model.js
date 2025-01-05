import { default_data } from "../default_data.js";

export class ChampionSelectionModel {
	constructor() {
		this.champions = default_data;
	}

	addChampion(champion) {
		this.champions.push(champion);
	}

	removeChampion(index) {
		this.champions.splice(index, 1);
	}

	getChampions() {
		return this.champions;
	}
}
