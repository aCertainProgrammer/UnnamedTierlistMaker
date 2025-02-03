export default class SettingsView {
	constructor(settingsViewModel) {
		this.settingsViewModel = settingsViewModel;
		this.notificationCenter = this.settingsViewModel.notificationCenter;

		this.notificationCenter.subscribe(
			"openSettings",
			this.openSettings.bind(this),
		);
		this.notificationCenter.subscribe(
			"key",
			this.handleKeyInput.bind(this),
		);

		this.settingsContainer = document.getElementById("settings-container");
		this.visible = false;
		const settings = this.settingsViewModel.getSettings();

		this.closeSettingsButton = document.createElement("input");
		this.closeSettingsButton.type = "button";
		this.closeSettingsButton.classList.add("normal-button");
		this.closeSettingsButton.value = "Close settings";
		this.closeSettingsButton.addEventListener("click", () => {
			this.visible = false;
			this.render();
		});
		this.settingsContainer.appendChild(this.closeSettingsButton);

		this.championIconPaddingSetterLabel = document.createElement("label");
		this.championIconPaddingSetterLabel.innerText =
			"Set champion icon padding";
		this.settingsContainer.appendChild(this.championIconPaddingSetterLabel);

		this.championIconPaddingSetter = document.createElement("input");
		this.championIconPaddingSetter.type = "number";
		this.championIconPaddingSetter.value = settings.championIconPadding;
		this.championIconPaddingSetter.addEventListener(
			"input",
			this.changeChampionIconPadding.bind(this),
		);

		this.settingsContainer.appendChild(this.championIconPaddingSetter);
	}

	render() {
		if (this.visible == false) {
			if (!this.settingsContainer.classList.contains("hidden")) {
				this.settingsContainer.classList.add("hidden");
			}
			return;
		}

		if (this.settingsContainer.classList.contains("hidden")) {
			this.settingsContainer.classList.remove("hidden");
		}
	}

	openSettings() {
		this.visible = true;
		this.render();
	}

	handleKeyInput(data) {
		if (data.target != "settingsScreen") {
			return;
		}
		const key = data.key;
		const isShiftPressed = data.shift;

		if (!isShiftPressed) {
			return;
		}

		if (key.toLowerCase() == "s") {
			this.closeSettingsButton.click();
		}
	}

	changeChampionIconPadding() {
		const padding = event.target.value.trim();
		this.settingsViewModel.setChampionIconPadding(padding);
	}
}
