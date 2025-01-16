import { TierlistView } from "./tierlist_view.js";
import { ChampionSelectionView } from "./champion_selection_view.js";
import TierlistEditorView from "./tierlist_editor_view.js";

export default class MainScreenView {
	constructor(mainScreenViewModel) {
		this.mainScreenViewModel = mainScreenViewModel;

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
		this.tierlistEditorView = new TierlistEditorView(
			this.mainScreenViewModel.tierlistEditorViewModel,
			this.render.bind(this),
		);
	}

	render() {
		this.tierlistView.render();
		this.tierlistEditorView.render();
		this.championSelectionView.render();
	}

	dropFunction(event) {
		this.mainScreenViewModel.handleDrop(event);
		this.render();
	}
}
