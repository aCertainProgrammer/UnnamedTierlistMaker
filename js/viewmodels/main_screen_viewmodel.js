import TierlistViewModel from "./tierlist_viewmodel.js";
import { ChampionSelectionModel } from "../models/champion_selection_model.js";
import { ChampionSelectionViewModel } from "./champion_selection_viewmodel.js";
import TierlistModel from "../models/tierlist_model.js";

export default class MainScreenViewModel {
	constructor(notificationCenter) {
		this.notificationCenter = notificationCenter;

		const tierlistModel = new TierlistModel();
		this.tierlistViewModel = new TierlistViewModel(
			this.notificationCenter,
			tierlistModel,
		);

		const championSelectionModel = new ChampionSelectionModel();
		this.championSelectionViewModel = new ChampionSelectionViewModel(
			championSelectionModel,
			this.notificationCenter,
		);
	}

	handleDrop() {
		const dropData = JSON.parse(event.dataTransfer.getData("text/plain"));

		if (dropData.tier != null) {
			this.tierlistViewModel.removeChampion(
				dropData.tier,
				dropData.champion,
			);
		}
	}
}
