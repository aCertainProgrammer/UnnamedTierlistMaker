export class TierlistView {
	constructor(tierlistViewModel) {
		this.tierlistViewModel = tierlistViewModel;
		this.tierlistContainer = document.getElementById("tierlist");

		this.initialize();
	}

	initialize() {}

	render() {
		const tiers = this.tierlistViewModel.getTiers();
		for (let i = 0; i < tiers.length; i++) {
			tiers[i].render(this.tierlistContainer);
		}
	}
}
