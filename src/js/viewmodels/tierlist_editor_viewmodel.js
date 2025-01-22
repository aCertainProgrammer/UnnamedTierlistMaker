export default class TierlistEditorViewModel {
	constructor(tierlistModel) {
		this.tierlistModel = tierlistModel;
	}

	getTiers() {
		return this.tierlistModel.getTiers();
	}

	changeTierName(index, name) {
		this.tierlistModel.changeTierName(index, name);
	}

	addTier() {
		this.tierlistModel.addTier();
	}

	removeTier(index) {
		this.tierlistModel.removeTier(index);
	}
}
