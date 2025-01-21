import TierModel from "../models/tier_model.js";
import TierViewModel from "./tier_viewmodel.js";

export default class TierlistViewModel {
	constructor(notificationCenter, tierlistModel) {
		this.tierlistModel = tierlistModel;
		this.notificationCenter = notificationCenter;
		this.notificationCenter.subscribe(
			"pickChampion",
			this.pickChampion.bind(this),
		);
		this.notificationCenter.subscribe(
			"clearTierlist",
			this.clearTierlist.bind(this),
		);

		this.tierViewModels = null;
		this.loadTiers();
	}

	loadTiers() {
		const tierViewModels = [];

		const tierlistData = this.tierlistModel.getSavedTierlist();
		for (let i = 0; i < tierlistData.length; i++) {
			const tierModel = new TierModel(tierlistData[i].name);
			tierModel.champions = tierlistData[i].champions;
			tierModel.color = tierlistData[i].color;
			const tierViewModel = new TierViewModel(tierModel);
			tierViewModels.push(tierViewModel);
		}

		this.tierViewModels = tierViewModels;
	}

	saveTierlist() {
		const tiersToSave = [];

		for (let i = 0; i < this.tierViewModels.length; i++) {
			const tierData = this.tierViewModels[i].getTier();
			tiersToSave.push(tierData);
		}

		this.tierlistModel.saveTierlist(tiersToSave);
	}

	pickChampion(data) {
		const champion = data.champion;
		const index = parseInt(data.key) - 1;

		if (index < 0) return;
		if (this.tierViewModels.length <= index) return;

		this.addChampion(champion, index);
		this.notificationCenter.publish("refreshTierlist", {});

		this.saveTierlist();
	}

	addChampion(champion, tierIndex) {
		this.tierViewModels[tierIndex].removeChampion(champion);
		this.tierViewModels[tierIndex].addChampion(champion);
		this.saveTierlist();
	}

	addChampionAtIndex(tierIndex, championIndex, champion) {
		this.tierViewModels[tierIndex].removeChampion(champion);
		this.tierViewModels[tierIndex].addChampionAtIndex(
			champion,
			championIndex,
		);
		this.saveTierlist();
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
		this.saveTierlist();
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
		this.saveTierlist();
	}

	removeChampion(tierIndex, champion) {
		this.tierViewModels[tierIndex].removeChampion(champion);
		this.saveTierlist();
	}

	removeDummies() {
		for (let i = 0; i < this.tierViewModels.length; i++) {
			this.tierViewModels[i].removeChampion("dummy");
		}
		this.saveTierlist();
	}

	changeTierName(tierIndex, name) {
		this.tierViewModels[tierIndex].setName(name);
		this.saveTierlist();
	}

	changeTierColor(tierIndex, color) {
		this.tierViewModels[tierIndex].setColor(color);
		this.saveTierlist();
	}

	swapTierUp(tierIndex) {
		if (tierIndex == 0) return;

		const temp = this.tierViewModels[tierIndex];
		this.tierViewModels[tierIndex] = this.tierViewModels[tierIndex - 1];
		this.tierViewModels[tierIndex - 1] = temp;
		this.saveTierlist();
	}

	swapTierDown(tierIndex) {
		if (tierIndex == this.tierViewModels.length - 1) return;

		const temp = this.tierViewModels[tierIndex];
		this.tierViewModels[tierIndex] = this.tierViewModels[tierIndex + 1];
		this.tierViewModels[tierIndex + 1] = temp;
		this.saveTierlist();
	}

	clearTierlist() {
		this.tierlistModel.clearTierlist();

		this.loadTiers();
		this.saveTierlist(this.tierViewModels);
		this.notificationCenter.publish("refreshTierlist");
	}
}
