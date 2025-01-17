import TierModel from "../models/tier_model.js";
import TierViewModel from "./tier_viewmodel.js";

export class TierlistViewModel {
	constructor() {
		this.tierViewModels = [];
	}

	addChampion(champion, tierIndex) {
		this.tierViewModels[tierIndex].removeChampion(champion);
		this.tierViewModels[tierIndex].addChampion(champion);
	}

	addChampionAtIndex(tierIndex, championIndex, champion) {
		this.tierViewModels[tierIndex].removeChampion(champion);
		this.tierViewModels[tierIndex].addChampionAtIndex(
			champion,
			championIndex,
		);
	}

	addTier(name) {
		const tierModel = new TierModel(name);
		const tierViewModel = new TierViewModel(tierModel);

		this.tierViewModels.push(tierViewModel);
	}

	getTiers() {
		const tierData = [];
		for (let i = 0; i < this.tierViewModels.length; i++) {
			const data = this.tierViewModels[i].getTier();
			tierData.push(data);
		}

		return tierData;
	}

	removeChampion(tierIndex, champion) {
		this.tierViewModels[tierIndex].removeChampion(champion);
		return true;
	}

	removeDummies() {
		for (let i = 0; i < this.tierViewModels.length; i++) {
			this.tierViewModels[i].removeChampion("dummy");
		}
	}
}
