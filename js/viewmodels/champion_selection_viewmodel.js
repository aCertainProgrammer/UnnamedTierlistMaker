export class ChampionSelectionViewModel {
	constructor(model) {
		this.model = model;
		this.champions = [];
	}

	addChampion() {
		this.model.addChampion();
	}

	getChampions() {
		return this.model.getChampions();
	}

	searchChampions(search_query) {
		return this.model.searchChampions(search_query);
	}
}
