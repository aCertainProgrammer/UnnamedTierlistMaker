export class ChampionSelectionViewModel {
	constructor(model, notificationCenter) {
		this.notificationCenter = notificationCenter;
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
