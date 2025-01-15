import { TierlistModel } from "../models/tierlist_model.js";
import { TierlistViewModel } from "./tierlist_viewmodel.js";
import { ChampionSelectionModel } from "../models/champion_selection_model.js";
import { ChampionSelectionViewModel } from "./champion_selection_viewmodel.js";

export default class MainScreenViewModel {
	constructor() {
		const tierlistModel = new TierlistModel();
		this.tierlistViewModel = new TierlistViewModel(tierlistModel);

		const championSelectionModel = new ChampionSelectionModel();
		this.championSelectionViewModel = new ChampionSelectionViewModel(
			championSelectionModel,
		);
	}

	handleDrop() {}
}
