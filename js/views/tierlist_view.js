import TierView from "./tier_view.js";
import { capitalize } from "../util.js";
export class TierlistView {
	constructor(tierlistViewModel) {
		this.tierlistViewModel = tierlistViewModel;

		this.tierlistContainer = document.getElementById("tierlist");

		this.tierViews = [];
		for (let i = 0; i < this.tierlistViewModel.tierViewModels.length; i++) {
			const tierContainer = document.createElement("div");
			tierContainer.classList.add("tier-container");

			this.tierlistContainer.appendChild(tierContainer);
			const tierView = new TierView(
				this.tierlistViewModel.tierViewModels[i],
				tierContainer,
				this.render.bind(this),
				i,
			);

			this.tierViews.push(tierView);
		}
	}

	render() {
		this.tierlistViewModel.removeDummies();
		for (let i = 0; i < this.tierViews.length; i++) {
			this.tierViews[i].render();
		}
	}
}
