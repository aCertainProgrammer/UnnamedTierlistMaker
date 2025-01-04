export class ChampionSelectionView {
	constructor(viewModel) {
		this.viewModel = viewModel;
		this.championSelection = document.getElementById("champion-selection");
	}

	render() {
		this.championSelection.innerHTML = "championSelection";
	}
}
