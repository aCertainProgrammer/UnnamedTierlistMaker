export default class UtilsView {
	constructor(utilsViewModel) {
		this.utilsViewModel = utilsViewModel;

		this.notificationCenter = this.utilsViewModel.notificationCenter;
		this.notificationCenter.subscribe(
			"key",
			this.handleKeyInput.bind(this),
		);
		this.notificationCenter.subscribe(
			"clickSnapshotsToggle",
			this.toggleSnapshots.bind(this),
		);

		this.utilsContainer = document.querySelector("#utils");

		this.openSettingsButton = document.createElement("button");
		const settings_icon = document.createElement("img");
		this.openSettingsButton.classList += "util-icon";
		settings_icon.src = "./assets/img/settings-cog.webp";

		this.openSettingsButton.appendChild(settings_icon);

		this.openSettingsButton.addEventListener("click", () => {
			this.notificationCenter.publish("openSettings");
		});

		this.utilsContainer.appendChild(this.openSettingsButton);

		this.openManualButton = document.createElement("button");
		this.openManualButton.classList.add("util-icon");

		const manualIcon = document.createElement("img");
		manualIcon.src = "./assets/img/question-mark.webp";
		this.openManualButton.appendChild(manualIcon);

		this.openManualButton.addEventListener("click", () => {
			this.notificationCenter.publish("openManual");
		});

		this.utilsContainer.appendChild(this.openManualButton);

		this.exportPngButton = document.createElement("button");
		this.exportPngButton.classList.add("util-icon");

		const exportPngIcon = document.createElement("img");
		exportPngIcon.src = "./assets/img/screenshot.webp";
		this.exportPngButton.appendChild(exportPngIcon);

		this.exportPngButton.addEventListener(
			"click",
			this.exportPng.bind(this),
		);

		this.utilsContainer.appendChild(this.exportPngButton);

		this.clearTierlistButton = document.createElement("input");
		this.clearTierlistButton.type = "button";
		this.clearTierlistButton.value = "Reset tierlist";
		this.clearTierlistButton.classList.add("normal-button");

		this.clearTierlistButton.addEventListener(
			"click",
			this.clearTierlist.bind(this),
		);

		this.utilsContainer.appendChild(this.clearTierlistButton);

		this.exportTierlistButton = document.createElement("input");
		this.exportTierlistButton.type = "button";
		this.exportTierlistButton.value = "Export tierlist";
		this.exportTierlistButton.classList.add("normal-button");

		this.utilsContainer.appendChild(this.exportTierlistButton);

		this.exportTierlistButton.addEventListener(
			"click",
			this.exportTierlist.bind(this),
		);

		this.importTierlistInput = document.createElement("input");
		this.importTierlistInput.type = "file";
		this.importTierlistInput.classList.add("hidden");

		this.utilsContainer.appendChild(this.importTierlistInput);

		this.importTierlistInput.addEventListener(
			"input",
			this.importTierlist.bind(this),
		);

		this.importTierlistButton = document.createElement("input");
		this.importTierlistButton.type = "button";
		this.importTierlistButton.value = "Import tierlist";
		this.importTierlistButton.classList.add("normal-button");

		this.importTierlistButton.addEventListener(
			"click",
			this.clickInput.bind(this, this.importTierlistInput),
		);

		this.utilsContainer.appendChild(this.importTierlistButton);

		this.usePoolTemplateButton = document.createElement("input");
		this.usePoolTemplateButton.type = "button";
		this.usePoolTemplateButton.value = "Use draft pool template";
		this.usePoolTemplateButton.classList.add("normal-button");

		this.usePoolTemplateButton.addEventListener(
			"click",
			this.usePoolTemplate.bind(this),
		);

		this.utilsContainer.appendChild(this.usePoolTemplateButton);

		this.exportDraftPoolButton = document.createElement("input");
		this.exportDraftPoolButton.type = "button";
		this.exportDraftPoolButton.value = "Export draft pool";
		this.exportDraftPoolButton.classList.add("normal-button");

		this.exportDraftPoolButton.addEventListener(
			"click",
			this.exportPoolTemplate.bind(this),
		);

		this.utilsContainer.appendChild(this.exportDraftPoolButton);

		this.toggleSnapshotsButton = document.createElement("input");
		this.toggleSnapshotsButton.type = "button";
		this.toggleSnapshotsButton.id = "toggle-snapshots-button";
		this.toggleSnapshotsButton.value = "Show snapshots";
		this.toggleSnapshotsButton.classList.add("normal-button");

		this.toggleSnapshotsButton.addEventListener(
			"click",
			this.toggleSnapshots.bind(this),
		);

		this.utilsContainer.appendChild(this.toggleSnapshotsButton);

		this.saveSnapshotButton = document.createElement("input");
		this.saveSnapshotButton.type = "button";
		this.saveSnapshotButton.value = "Save snapshot";
		this.saveSnapshotButton.classList.add("normal-button");

		this.saveSnapshotButton.addEventListener(
			"click",
			this.saveSnapshot.bind(this),
		);

		this.utilsContainer.appendChild(this.saveSnapshotButton);
	}

	render() {}

	clearTierlist() {
		this.utilsViewModel.clearTierlist();
	}

	exportTierlist() {
		this.utilsViewModel.exportTierlist();
	}

	clickInput(button) {
		button.click();
	}

	importTierlist(event) {
		this.utilsViewModel.importTierlist(event);
	}

	usePoolTemplate() {
		this.utilsViewModel.usePoolTemplate();
	}

	exportPoolTemplate() {
		this.utilsViewModel.exportPoolTemplate();
	}

	exportPng() {
		this.utilsViewModel.exportPng();
	}

	toggleSnapshots() {
		this.toggleSnapshotsButton.value =
			this.toggleSnapshotsButton.value == "Show snapshots"
				? "Hide snapshots"
				: "Show snapshots";
		this.utilsViewModel.toggleSnapshots();
	}

	saveSnapshot() {
		this.utilsViewModel.saveSnapshot();
	}

	handleKeyInput(data) {
		if (data.target != "mainScreen") {
			return;
		}
		const key = data.key;
		const isShiftPressed = data.shift;

		if (data.target == "tierName") {
			return;
		}
		if (!isShiftPressed) {
			return;
		}
		if (key.toLowerCase() == "g") {
			this.clickInput(this.toggleSnapshotsButton);
		}
		if (key.toLowerCase() == "v") {
			this.clickInput(this.saveSnapshotButton);
		}
		if (key.toLowerCase() == "s") {
			this.clickInput(this.openSettingsButton);
		}
		if (key.toLowerCase() == "m") {
			this.clickInput(this.openManualButton);
		}
	}
}
