export class TierlistView {
	constructor(viewModel) {
		this.viewModel = viewModel;
		this.tierlistContainer = document.getElementById("tierlist");
	}

	render() {
		this.tierlistContainer.innerHTML = "tierlist";
	}
}
