export class ChampionSelectionViewModel {
	constructor(model) {
		this.model = model;
		this.champions = [];
	}

	addChampion() {
		this.model.addChampion();
	}
}
