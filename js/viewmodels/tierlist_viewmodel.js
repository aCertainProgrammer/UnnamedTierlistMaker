export class TierlistViewModel {
	constructor(tierlistModel) {
		this.tierlistModel = tierlistModel;
		this.tiers = [];

		this.initialize();
	}

	initialize() {
		const default_tiers = [
			{ name: "S" },
			{ name: "A" },
			{ name: "B" },
			{ name: "C" },
			{ name: "D" },
			{ name: "E" },
			{ name: "F" },
		];
	}

	addChampion(champion, tierIndex) {
		this.tierlistModel.removeChampion(tierIndex, champion);
		this.tierlistModel.addChampion(champion, tierIndex);
	}

	addChampionAtIndex(tierIndex, championIndex, champion) {
		this.tierlistModel.removeChampion(tierIndex, champion);
		this.tierlistModel.addChampionAtIndex(
			tierIndex,
			championIndex,
			champion,
		);
	}

	addTier(tier) {
		this.tierlistModel.addTier(tier);
	}

	getTiers() {
		return this.tierlistModel.getTiers();
	}

	removeChampion(tierIndex, champion) {
		this.tierlistModel.removeChampion(tierIndex, champion);
		return true;
	}
}