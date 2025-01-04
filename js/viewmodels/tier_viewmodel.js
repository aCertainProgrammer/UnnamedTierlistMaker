export default class TierViewModel {
	constructor(tierModel) {
		this.tierModel = tierModel;
	}

	addChampion(champion) {
		this.tierModel.addChampion(champion);
	}

	getChampions() {
		return this.tierModel.getChampions();
	}
}
