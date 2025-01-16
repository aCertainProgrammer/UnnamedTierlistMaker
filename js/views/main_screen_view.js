import { TierlistView } from "./tierlist_view.js";
import { ChampionSelectionView } from "./champion_selection_view.js";

export default class MainScreenView {
	constructor(mainScreenViewModel) {
		this.mainScreenViewModel = mainScreenViewModel;
		this.tierlistView = null;
		this.championSelectionView = null;

		this.mainScreen = document.getElementById("main-screen");
		this.mainScreen.addEventListener("drop", this.dropFunction.bind(this));
		this.mainScreen.addEventListener("dragover", () => {
			event.preventDefault();
		});

		this.tierlistView = new TierlistView(
			this.mainScreenViewModel.tierlistViewModel,
		);
		this.championSelectionView = new ChampionSelectionView(
			this.mainScreenViewModel.championSelectionViewModel,
		);
	}

	render() {
		this.tierlistView.render();
		this.championSelectionView.render();
	}

	dropFunction(event) {
		this.mainScreenViewModel.handleDrop(event);
		this.render();
	}
}
