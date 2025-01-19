import TierlistViewModel from "../viewmodels/tierlist_viewmodel.js";
export default class TierEditorView {
	/**
	 * @constructor
	 * @param {TierlistViewModel} tierlistViewModel
	 * @param {*} tier
	 * @param {number} tierIndex
	 * @param {*} tierlistRenderSignal
	 */
	constructor(tierlistViewModel, tier, tierIndex, tierlistRenderSignal) {
		this.tierlistViewModel = tierlistViewModel;
		this.tier = tier;
		this.tierIndex = tierIndex;
		this.tierlistRenderSignal = tierlistRenderSignal;
		this.tierEditorOverlay = null;

		this.render();
	}

	render() {
		this.tierEditorOverlay = document.createElement("div");

		this.tierEditorOverlay.id = "tier-editor-overlay";
		this.tierEditorOverlay.addEventListener("click", () => {
			this.tierEditorOverlay.remove();
		});

		const tierEditor = this.createTierEditor(this.tier, this.tierIndex);
		this.tierEditorOverlay.appendChild(tierEditor);

		document.body.appendChild(this.tierEditorOverlay);
	}

	sendTierlistRenderSignal() {
		this.tierlistRenderSignal();
	}

	createTierEditor(tier, index) {
		const tierEditorContainer = document.createElement("div");
		tierEditorContainer.classList.add("tier-editor-container");
		tierEditorContainer.addEventListener("click", () => {
			event.stopPropagation();
		});

		const tierNameEditor = document.createElement("input");
		tierNameEditor.type = "text";
		tierNameEditor.value = tier.name;
		tierNameEditor.classList.add("tier-name-editor");

		tierNameEditor.addEventListener(
			"input",
			this.changeTierName.bind(this, index),
		);

		tierEditorContainer.appendChild(tierNameEditor);

		const tierColorEditor = this.createTierColorEditor(index);
		tierEditorContainer.appendChild(tierColorEditor);

		const tierRemovalElement = document.createElement("input");
		tierRemovalElement.classList.add("normal-button");
		tierRemovalElement.type = "button";
		tierRemovalElement.value = "Remove tier";

		tierRemovalElement.addEventListener(
			"click",
			this.removeTier.bind(this, index),
		);

		tierEditorContainer.appendChild(tierRemovalElement);

		return tierEditorContainer;
	}

	createTierColorEditor(index) {
		const tierColorEditorContainer = document.createElement("div");

		const colors = [
			"plum",
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
			colorButton.classList.add("normal-button");
			colorButton.style.backgroundColor = colors[i];

			colorButton.addEventListener(
				"click",
				this.changeTierColor.bind(this, index, colors[i]),
			);

			tierColorEditorContainer.appendChild(colorButton);
		}

		return tierColorEditorContainer;
	}

	removeTier(index) {
		this.tierlistViewModel.removeTier(index);
		this.tierEditorOverlay.remove();

		this.sendTierlistRenderSignal();
	}

	changeTierName(index) {
		this.tierlistViewModel.changeTierName(index, event.target.value.trim());

		this.sendTierlistRenderSignal();
	}

	changeTierColor(index, color) {
		this.tierlistViewModel.changeTierColor(index, color);

		this.sendTierlistRenderSignal();
	}
}
