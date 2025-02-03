import TierlistViewModel from "./tierlist_viewmodel.js";
import { ChampionSelectionModel } from "../models/champion_selection_model.js";
import { ChampionSelectionViewModel } from "./champion_selection_viewmodel.js";
import TierlistModel from "../models/tierlist_model.js";
import UtilsModel from "../models/utils_model.js";
import UtilsViewModel from "./utils_viewmodel.js";

export default class MainScreenViewModel {
	constructor(notificationCenter, settingsViewModel) {
		this.notificationCenter = notificationCenter;
		this.settingsViewModel = settingsViewModel;

		const utilsModel = new UtilsModel();
		this.utilsViewModel = new UtilsViewModel(
			utilsModel,
			this.notificationCenter,
		);

		const tierlistModel = new TierlistModel();
		this.tierlistViewModel = new TierlistViewModel(
			this.notificationCenter,
			tierlistModel,
			this.settingsViewModel,
		);

		const championSelectionModel = new ChampionSelectionModel();
		this.championSelectionViewModel = new ChampionSelectionViewModel(
			championSelectionModel,
			this.notificationCenter,
		);
	}

	handleDrop(event) {
		const dropData = JSON.parse(event.dataTransfer.getData("text/plain"));

		if (dropData.tier != null) {
			this.tierlistViewModel.removeChampion(
				dropData.tier,
				dropData.champion,
			);
		}
	}
}
