import { TierlistModel } from "../models/tierlist_model.js";
import { TierlistViewModel } from "./tierlist_viewmodel.js";
import { ChampionSelectionModel } from "../models/champion_selection_model.js";
import { ChampionSelectionViewModel } from "./champion_selection_viewmodel.js";

export default class MainScreenViewModel {
	constructor() {
		this.tierlistViewModel = new TierlistViewModel();

		this.tierlistViewModel.addTier("S");
		this.tierlistViewModel.addTier("A");
		this.tierlistViewModel.addTier("B");
		this.tierlistViewModel.addTier("F");

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
