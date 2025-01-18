import TierView from "./tier_view.js";
import { capitalize } from "../util.js";
export class TierlistView {
	constructor(tierlistViewModel) {
		this.tierlistViewModel = tierlistViewModel;

		this.tierlistContainer = document.getElementById("tierlist");
		this.tierlistEditor = document.getElementById("tierlist-editor");

		this.tierViews = [];
		this.lastFocusOnEditor = null;
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

		if (this.lastFocusOnEditor != null) {
			this.tierlistEditor.children[
				this.lastFocusOnEditor
			].children[0].focus();
		}
	}

	createTierEditor(tier, index) {
		const tierEditorContainer = document.createElement("div");
		tierEditorContainer.classList.add("tier-editor-container");

		const tierNameEditor = document.createElement("input");
		tierNameEditor.type = "text";
		tierNameEditor.value = tier.name;
		tierNameEditor.classList.add("tier-name-editor");

		tierNameEditor.addEventListener(
			"input",
			this.changeTierName.bind(this, index),
		);

		tierNameEditor.addEventListener("focus", () => {
			this.lastFocusOnEditor = index;
		});

		tierNameEditor.addEventListener("blur", () => {
			this.lastFocusOnEditor = null;
		});

		tierEditorContainer.appendChild(tierNameEditor);

		const tierColorEditor = this.createTierColorEditor(index);
		tierEditorContainer.appendChild(tierColorEditor);

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

	changeTierColor(index, color) {
		this.tierlistViewModel.changeTierColor(index, color);

		this.render();
	}
	addTier() {
		this.tierlistViewModel.addTier();
		this.createTierContainer(this.tierViews.length);
		this.render();
	}

	removeTier(index) {
		this.tierlistViewModel.removeTier(index);
		this.tierViews.splice(index, 1);
		this.tierlistContainer.innerHTML = "";

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

	createTierColorEditor(index) {
		const tierColorEditorContainer = document.createElement("div");

		const colors = [
			"blueviolet",
			"limegreen",
			"greenyellow",
			"yellow",
			"orange",
			"tomato",
		];
		for (let i = 0; i < colors.length; i++) {
			const colorButton = document.createElement("input");
			colorButton.type = "button";
			colorButton.classList.add("tier-color-button");
			colorButton.style.backgroundColor = colors[i];

			colorButton.addEventListener(
				"click",
				this.changeTierColor.bind(this, index, colors[i]),
			);

			tierColorEditorContainer.appendChild(colorButton);
		}

		return tierColorEditorContainer;
	}
}
