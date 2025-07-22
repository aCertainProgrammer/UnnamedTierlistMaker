import TierModel from "../models/tier_model.js";
import TierViewModel from "./tier_viewmodel.js";
import { readFile, exportData, exportImage } from "../util.js";
import domtoimage from "dom-to-image";

export default class TierlistViewModel {
	constructor(notificationCenter, tierlistModel, settingsViewModel) {
		this.tierlistModel = tierlistModel;
		this.settingsViewModel = settingsViewModel;

		this.notificationCenter = notificationCenter;
		this.notificationCenter.subscribe(
			"pickChampion",
			this.pickChampion.bind(this),
		);
		this.notificationCenter.subscribe(
			"clearTierlist",
			this.clearTierlist.bind(this),
		);
		this.notificationCenter.subscribe(
			"exportTierlist",
			this.exportTierlist.bind(this),
		);
		this.notificationCenter.subscribe(
			"importTierlist",
			this.importTierlist.bind(this),
		);
		this.notificationCenter.subscribe(
			"usePoolTemplate",
			this.usePoolTemplate.bind(this),
		);
		this.notificationCenter.subscribe(
			"exportPoolTemplate",
			this.exportPoolTemplate.bind(this),
		);
		this.notificationCenter.subscribe(
			"key",
			this.handleKeyboardInput.bind(this),
		);
		this.notificationCenter.subscribe(
			"exportPng",
			this.exportTierlistAsPng.bind(this),
		);
		this.notificationCenter.subscribe(
			"loadSnapshot",
			this.loadSnapshot.bind(this),
		);

		this.tierViewModels = null;
		this.name = "";
		this.loadTiers();
	}

	loadTiers() {
		const tierViewModels = [];

		const tierlistData = this.tierlistModel.getSavedTierlist();
		const tiers = tierlistData.tiers;
		const name = tierlistData.name;
		for (let i = 0; i < tiers.length; i++) {
			const tierModel = new TierModel(tiers[i].name);
			tierModel.champions = tiers[i].champions;
			tierModel.color = tiers[i].color;
			const tierViewModel = this.createTierViewModel(tierModel);
			tierViewModels.push(tierViewModel);
		}

		this.tierViewModels = tierViewModels;
		console.log(tierViewModels);
		this.name = name;
	}

	saveTierlist() {
		const tiersToSave = [];

		for (let i = 0; i < this.tierViewModels.length; i++) {
			const tierData = this.tierViewModels[i].getTier();
			tiersToSave.push(tierData);
		}

		this.tierlistModel.saveTierlist(tiersToSave, this.name);
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
		const tierViewModel = this.createTierViewModel(tierModel);

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

	exportTierlist() {
		const tierlist = this.tierlistModel.getSavedTierlist();
		exportData(tierlist, "tierlist.json");
	}

	async importTierlist(data) {
		const text = await readFile(data.file);

		try {
			const json = JSON.parse(text);
			this.tierlistModel.saveTierlist(json.tiers, json.name);
			this.loadTiers();
			this.notificationCenter.publish("refreshTierlist");
		} catch (e) {
			console.log(e);
		}
	}

	usePoolTemplate() {
		const tierViewModels = [];

		const tierlistData = this.tierlistModel.loadPoolTemplate();
		for (let i = 0; i < tierlistData.length; i++) {
			const tierModel = new TierModel(tierlistData[i].name);
			tierModel.champions = tierlistData[i].champions;
			tierModel.color = tierlistData[i].color;
			const tierViewModel = this.createTierViewModel(tierModel);
			tierViewModels.push(tierViewModel);
		}

		this.tierViewModels = tierViewModels;
		this.saveTierlist();
		this.notificationCenter.publish("refreshTierlist");
	}

	exportPoolTemplate() {
		const tiers = this.getTiers();
		const template = {
			top: tiers[0].champions,
			jungle: tiers[1].champions,
			mid: tiers[2].champions,
			adc: tiers[3].champions,
			support: tiers[4].champions,
		};

		exportData(template, "team_pool.json");
	}

	handleKeyboardInput(data) {
		const key = data.key;
		const target = data.target;
		if (key == "Delete" && target == "mainScreen") {
			this.clearTierlist();
		}
	}

	exportTierlistAsPng() {
		// This violates MVVM. Too bad!
		const tierlist = document.getElementById("tierlist");
		const rect = tierlist.getBoundingClientRect();
		domtoimage
			.toPng(tierlist, {
				filter: function (node) {
					if (node.classList == undefined) return true;
					if (node.classList.contains("tier-swapping-container"))
						return false;
					if (node.classList.contains("tierlist-addition-element"))
						return false;
					return true;
				},
				height: parseInt(rect.height) - 80,
				width: parseInt(rect.width),
			})
			.then(function (dataUrl) {
				exportImage(dataUrl, "tierlist.png");
			});
	}

	loadSnapshot(data) {
		const snapshot = data.snapshot;
		this.tierlistModel.saveTierlist(snapshot.tiers, snapshot.name);
		this.name = snapshot.name;
		this.loadTiers();
		this.notificationCenter.publish("refreshTierlist");
	}

	changeTierlistName(name) {
		this.name = name;
		this.saveTierlist();
	}

	createTierViewModel(tierModel) {
		const tierViewModel = new TierViewModel(
			tierModel,
			this.notificationCenter,
			this.settingsViewModel,
		);
		return tierViewModel;
	}
}
