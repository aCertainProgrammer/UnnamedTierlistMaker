import TierView from "./tier_view.js";
export class TierlistView {
	constructor(tierlistViewModel) {
		this.tierlistViewModel = tierlistViewModel;
		this.notificationCenter = this.tierlistViewModel.notificationCenter;

		this.tierlistContainer = document.getElementById("tierlist");
		this.tierlistEditor = document.getElementById("tierlist-editor");

		this.tierViews = [];

		this.notificationCenter.subscribe(
			"refreshTierlist",
			this.render.bind(this),
		);
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

		const tierlistAdditionElement = document.createElement("input");

		tierlistAdditionElement.classList.add("tierlist-addition-element");
		tierlistAdditionElement.type = "button";
		tierlistAdditionElement.value = "+ Add tier";

		tierlistAdditionElement.addEventListener("click", () => {
			this.addTier();
		});

		this.tierlistContainer.appendChild(tierlistAdditionElement);
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
