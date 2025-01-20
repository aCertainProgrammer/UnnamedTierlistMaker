import TierModel from "../models/tier_model.js";
import TierViewModel from "./tier_viewmodel.js";

export default class TierlistViewModel {
	constructor(notificationCenter) {
		this.tierViewModels = [];
		this.notificationCenter = notificationCenter;
		this.notificationCenter.subscribe(
			"pickChampion",
			this.pickChampion.bind(this),
		);
	}

	pickChampion(data) {
		const champion = data.champion;
		const index = parseInt(data.key) - 1;

		if (index < 0) return;
		if (this.tierViewModels.length <= index) return;

		this.addChampion(champion, index);
		this.notificationCenter.publish("refreshTierlist", {});
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

	addTier() {
		let name = "Z";
		if (this.tierViewModels.length == 0) name = "S";
		else if (this.tierViewModels.length == 1) name = "A";
		else {
			const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			const lastTier =
				this.tierViewModels[this.tierViewModels.length - 1].getTier();
			const lastName = lastTier.name;

			for (let i = 0; i < alphabet.length - 1; i++) {
				if (lastName.toUpperCase() == alphabet[i])
					name = alphabet[i + 1];
			}
		}

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

	removeTier(index) {
		this.tierViewModels.splice(index, 1);
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

	changeTierName(tierIndex, name) {
		this.tierViewModels[tierIndex].setName(name);
	}

	changeTierColor(tierIndex, color) {
		this.tierViewModels[tierIndex].setColor(color);
	}

	swapTierUp(tierIndex) {
		if (tierIndex == 0) return;

		const temp = this.tierViewModels[tierIndex];
		this.tierViewModels[tierIndex] = this.tierViewModels[tierIndex - 1];
		this.tierViewModels[tierIndex - 1] = temp;
	}

	swapTierDown(tierIndex) {
		if (tierIndex == this.tierViewModels.length - 1) return;

		const temp = this.tierViewModels[tierIndex];
		this.tierViewModels[tierIndex] = this.tierViewModels[tierIndex + 1];
		this.tierViewModels[tierIndex + 1] = temp;
	}
}
