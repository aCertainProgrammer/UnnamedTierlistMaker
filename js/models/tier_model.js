export class TierModel {
	constructor(name) {
		this.name = name;
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
