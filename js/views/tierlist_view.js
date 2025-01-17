import TierView from "./tier_view.js";
import { capitalize } from "../util.js";
export class TierlistView {
	constructor(tierlistViewModel) {
		this.tierlistViewModel = tierlistViewModel;

		this.tierlistContainer = document.getElementById("tierlist");
		this.tierlistEditor = document.getElementById("tierlist-editor");

		this.tierViews = [];
		for (let i = 0; i < this.tierlistViewModel.tierViewModels.length; i++) {
			this.createTierContainer(i);
		}
	}

	render() {
		this.tierlistViewModel.removeDummies();
		for (let i = 0; i < this.tierViews.length; i++) {
			const tierContainer = this.tierViews[i].render();

			this.tierlistContainer.appendChild(tierContainer);
		}

		this.tierlistEditor.innerHTML = "";

		const tiers = this.tierlistViewModel.getTiers();
		for (let i = 0; i < tiers.length; i++) {
			const tierEditor = this.createTierEditor(tiers[i], i);
			this.tierlistEditor.appendChild(tierEditor);
		}

		const tierAdditionElement = document.createElement("input");
		tierAdditionElement.type = "button";
		tierAdditionElement.value = "Create a new tier";

		tierAdditionElement.addEventListener("click", this.addTier.bind(this));

		this.tierlistEditor.appendChild(tierAdditionElement);
	}

	createTierEditor(tier, index) {
		const tierEditorContainer = document.createElement("div");

		const tierEditorName = document.createElement("input");
		tierEditorName.type = "text";
		tierEditorName.value = tier.name;

		tierEditorName.addEventListener(
			"input",
			this.changeTierName.bind(this, index),
		);

		tierEditorContainer.appendChild(tierEditorName);

		const tierRemovalElement = document.createElement("input");
		tierRemovalElement.type = "button";
		tierRemovalElement.value = "Remove tier";

		tierRemovalElement.addEventListener(
			"click",
			this.removeTier.bind(this, index),
		);

		tierEditorContainer.appendChild(tierRemovalElement);

		return tierEditorContainer;
	}

	changeTierName(index) {
		this.tierlistViewModel.changeTierName(index, event.target.value.trim());

		this.render();
	}

	addTier() {
		this.tierlistViewModel.addTier("X");
		this.createTierContainer(this.tierViews.length);
		this.render();
	}

	removeTier(index) {
		this.tierlistViewModel.removeTier(index);
		this.tierViews.splice(index, 1);
		this.tierlistContainer.innerHTML = "";
		console.log(this.tierViews);

		this.render();
	}

	createTierContainer(index) {
		const tierContainer = document.createElement("div");
		tierContainer.classList.add("tier-container");

		this.tierlistContainer.appendChild(tierContainer);
		const tierView = new TierView(
			this.tierlistViewModel.tierViewModels[index],
			tierContainer,
			this.render.bind(this),
			index,
		);

		this.tierViews.push(tierView);
	}
}
