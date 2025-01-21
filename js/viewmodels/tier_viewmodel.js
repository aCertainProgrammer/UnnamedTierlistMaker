export default class TierViewModel {
	constructor(tierModel) {
		this.tierModel = tierModel;
	}

	addChampion(champion) {
		this.tierModel.addChampion(champion);
	}

	addChampionAtIndex(champion, index) {
		this.tierModel.addChampionAtIndex(champion, index);
	}

	removeChampion(champion) {
		this.tierModel.removeChampion(champion);
	}

	setName(name) {
		this.tierModel.setName(name);
	}

	setColor(color) {
		this.tierModel.setColor(color);
	}

	getTier() {
		return this.tierModel.getTier();
	}

	clearTier() {
		this.tierModel.clearTier();
	}
}
