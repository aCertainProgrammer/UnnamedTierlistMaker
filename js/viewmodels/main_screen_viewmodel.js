import { TierlistModel } from "../models/tierlist_model.js";
import TierlistViewModel from "./tierlist_viewmodel.js";
import { ChampionSelectionModel } from "../models/champion_selection_model.js";
import { ChampionSelectionViewModel } from "./champion_selection_viewmodel.js";

export default class MainScreenViewModel {
	constructor() {
		this.tierlistViewModel = new TierlistViewModel();

		const tiersOnLoad = 5;
		const colors = [
			"deepskyblue",
			"limegreen",
			"yellow",
			"orange",
			"tomato",
		];
		for (let i = 0; i < tiersOnLoad; i++) {
			this.tierlistViewModel.addTier();
			this.tierlistViewModel.changeTierColor(i, colors[i]);
		}

		this.tierlistViewModel.tierViewModels[tiersOnLoad - 1].setName("F");

		const championSelectionModel = new ChampionSelectionModel();
		this.championSelectionViewModel = new ChampionSelectionViewModel(
			championSelectionModel,
		);
	}

	handleDrop() {
		const dropData = JSON.parse(event.dataTransfer.getData("text/plain"));

		console.log(dropData);
		if (dropData.tier != null) {
			this.tierlistViewModel.removeChampion(
				dropData.tier,
				dropData.champion,
			);
		}
	}
}
