import { TierlistView } from "./tierlist_view.js";
import { ChampionSelectionView } from "./champion_selection_view.js";

export default class MainScreenView {
	constructor(viewModel) {
		this.viewModel = viewModel;
		this.tierlistView = null;
		this.championSelectionView = null;

		this.mainScreen = document.getElementById("main-screen");
		this.initialize();
	}

	initialize() {
		this.tierlistView = new TierlistView(this.viewModel.tierlistModel);
		this.championSelectionView = new ChampionSelectionView(
			this.viewModel.championSelectionViewModel,
		);
	}

	render() {
		this.tierlistView.render();
		this.championSelectionView.render();
	}
}
