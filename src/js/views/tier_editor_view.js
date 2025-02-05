export default class TierEditorView {
	/**
	 * @constructor
	 * @param {TierlistViewModel} tierlistViewModel
	 * @param {*} tier
	 * @param {number} tierIndex
	 * @param {*} tierlistRenderSignal
	 */
	constructor(tierlistViewModel, tier, tierIndex, notificationCenter) {
		this.tierlistViewModel = tierlistViewModel;
		this.tier = tier;
		this.tierIndex = tierIndex;

		this.notificationCenter = notificationCenter;
		this.notificationCenter.subscribe(
			"key",
			this.handleKeyboardInput.bind(this),
		);

		this.tierEditorOverlay = null;

		this.render();
	}

	render() {
		this.tierEditorOverlay = document.createElement("div");

		this.tierEditorOverlay.id = "tier-editor-overlay";
		this.tierEditorOverlay.addEventListener("click", () => {
			this.die();
		});

		const tierEditor = this.createTierEditor(this.tier, this.tierIndex);
		this.tierEditorOverlay.appendChild(tierEditor);

		document.body.appendChild(this.tierEditorOverlay);
	}

	sendTierlistRenderSignal() {
		this.notificationCenter.publish("refreshTierlist");
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
		tierRemovalElement.id = "tier-removal-button";
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
			"deepskyblue",
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
		this.die();

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

	handleKeyboardInput(data) {
		if (data.target != "tierEditorOverlay") {
			return;
		}

		const tierNameEditor = document.querySelector(".tier-name-editor");

		const key = data.key;
		const letterRegex = /^[A-Za-z]$/;
		if (key.match(letterRegex)) {
			if (document.activeElement != tierNameEditor) {
				tierNameEditor.value = "";
			}
			tierNameEditor.focus();
			return;
		}

		if (key == "Escape") {
			this.die();
			return;
		}

		const numberRegex = /[0-9]/;
		const colorButtons =
			this.tierEditorOverlay.querySelectorAll(".tier-color-button");
		if (
			key.match(numberRegex) &&
			key.length == 1 &&
			this.activeElement != tierNameEditor &&
			key != 0 &&
			!(key - 1 >= colorButtons.length)
		) {
			colorButtons[key - 1].click();
		}
	}

	die() {
		this.tierEditorOverlay.innerHTML = "";
		this.tierEditorOverlay.remove();
		this.notificationCenter.unsubscribe(
			"key",
			this.handleKeyboardInput.bind(this),
		);
	}
}
