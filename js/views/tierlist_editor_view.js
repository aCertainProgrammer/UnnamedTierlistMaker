export default class TierlistEditorView {
	constructor(tierlistEditorViewmodel, renderSignal) {
		this.tierlistEditorViewmodel = tierlistEditorViewmodel;

		this.tierlistEditor = document.getElementById("tierlist-editor");

		this.renderSignal = renderSignal;
	}

	render() {
		this.tierlistEditor.innerHTML = "";

		const tiers = this.tierlistEditorViewmodel.getTiers();
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

	sendRenderSignal() {
		this.renderSignal();
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
		this.tierlistEditorViewmodel.changeTierName(
			index,
			event.target.value.trim(),
		);

		this.sendRenderSignal();
	}

	addTier() {
		this.tierlistEditorViewmodel.addTier();
		this.sendRenderSignal();
	}

	removeTier(index) {
		this.tierlistEditorViewmodel.removeTier(index);

		this.sendRenderSignal();
	}
}
