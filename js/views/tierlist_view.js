import TierView from "./tier_view.js";
import { capitalize } from "../util.js";
export class TierlistView {
	constructor(tierlistViewModel) {
		this.tierlistViewModel = tierlistViewModel;

		this.tierlistContainer = document.getElementById("tierlist");
		this.tierlistEditor = document.getElementById("tierlist-editor");

		this.tierViews = [];
	}

	render() {
		this.tierViews = [];
		this.tierlistContainer.innerHTML = "";
		for (let i = 0; i < this.tierlistViewModel.tierViewModels.length; i++) {
			this.createTierContainer(i);
		}

		this.tierlistViewModel.removeDummies();
		for (let i = 0; i < this.tierViews.length; i++) {
			const tierContainer = this.tierViews[i].render();

			this.tierlistContainer.appendChild(tierContainer);
		}
	}

	addTier() {
		this.tierlistViewModel.addTier();
		this.createTierContainer(this.tierViews.length);
		this.render();
	}

	createTierContainer(index) {
		const tierContainer = document.createElement("div");
		tierContainer.classList.add("tier-container");

		this.tierlistContainer.appendChild(tierContainer);
		const tierView = new TierView(
			this.tierlistViewModel.tierViewModels[index],
			this.tierlistViewModel,
			tierContainer,
			this.render.bind(this),
			index,
		);

		this.tierViews.push(tierView);
	}
}
