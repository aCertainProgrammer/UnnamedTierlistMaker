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

	addChampion(champion, tierName) {
		this.tierlistModel.addChampion(champion, tierName);
	}

	addTier(tier) {
		this.tierlistModel.addTier(tier);
	}

	getTiers() {
		return this.tierlistModel.getTiers();
	}
}
