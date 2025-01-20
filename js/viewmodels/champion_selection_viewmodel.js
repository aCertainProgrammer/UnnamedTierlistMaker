export class ChampionSelectionViewModel {
	constructor(model, notificationCenter) {
		this.notificationCenter = notificationCenter;
		this.model = model;
		this.champions = [];

		this.notificationCenter.subscribe(
			"key",
			this.pickFirstChampion.bind(this),
		);
	}

	addChampion() {
		this.model.addChampion();
	}

	getChampions() {
		this.champions = this.model.getChampions();
		return this.champions;
	}

	searchChampions(search_query) {
		return this.model.searchChampions(search_query);
	}
	pickFirstChampion(data) {
		const key = data.key;
		const numberRegex = /[0-9]/;
		if (!(key.match(numberRegex) && key.length == 1)) return;
		if (this.champions.length == 0) return;
		this.notificationCenter.publish("pickChampion", {
			champion: this.champions[0],
			key: key,
		});
	}
}
