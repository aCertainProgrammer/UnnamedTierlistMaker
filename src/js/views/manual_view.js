import ZeroMd, { STYLES } from "zero-md";
export default class ManualView {
	constructor(manualViewModel) {
		this.manualViewModel = manualViewModel;
		this.notificationCenter = this.manualViewModel.notificationCenter;

		this.notificationCenter.subscribe(
			"openManual",
			this.openManual.bind(this),
		);
		this.notificationCenter.subscribe(
			"key",
			this.handleKeyInput.bind(this),
		);

		this.manualContainer = document.getElementById("manual-container");
		this.visible = false;

		this.closeManualButton = document.createElement("input");
		this.closeManualButton.id = "close-manual-button";
		this.closeManualButton.type = "button";
		this.closeManualButton.classList.add("normal-button");
		this.closeManualButton.value = "Close manual";
		this.closeManualButton.addEventListener("click", () => {
			this.visible = false;
			this.render();
		});
		this.manualContainer.appendChild(this.closeManualButton);

		customElements.define(
			"zero-md",
			class extends ZeroMd {
				async load() {
					await super.load();
					this.template = STYLES.preset("dark");
				}
			},
		);
	}

	render() {
		if (this.visible == false) {
			if (!this.manualContainer.classList.contains("hidden")) {
				this.manualContainer.classList.add("hidden");
			}
			return;
		}

		if (this.manualContainer.classList.contains("hidden")) {
			this.manualContainer.classList.remove("hidden");
		}
	}

	openManual() {
		this.visible = true;
		this.render();
	}

	handleKeyInput(data) {
		if (data.target != "manualScreen") {
			return;
		}

		const key = data.key;
		const isShiftPressed = data.shift;

		if (!isShiftPressed) {
			return;
		}

		if (key.toLowerCase() == "m") {
			this.closeManualButton.click();
		}
	}
}
