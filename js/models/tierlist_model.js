export class TierlistModel {
	constructor() {
		this.tiers = [];
	}

	addTier(tier) {
		this.tiers.push(tier);
	}

	removeTier(index) {
		this.tiers.slice(index, 1);
	}

	getTiers() {
		return this.tiers;
	}
}
