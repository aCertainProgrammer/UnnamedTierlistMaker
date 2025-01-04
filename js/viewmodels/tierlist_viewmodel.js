export class TierlistViewModel {
	constructor(tierlistModel) {
		this.tierlistModel = tierlistModel;
	}

	addChampion(champion, tierName) {
		this.tierlistModel.addChampion(champion, tierName);
	}

	getTiers() {
		return this.tierlistModel.getTiers();
	}
}
