export class ChampionSelectionModel {
	constructor() {
		this.champions = [];
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
