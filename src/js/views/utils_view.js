export default class UtilsView {
	constructor(utilsViewModel) {
		this.utilsViewModel = utilsViewModel;

		this.notificationCenter = this.utilsViewModel.notificationCenter;
		this.notificationCenter.subscribe(
			"key",
			this.handleKeyInput.bind(this),
		);

		this.utilsContainer = document.querySelector("#utils");

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

		this.exportPngButton = document.createElement("input");
		this.exportPngButton.type = "button";
		this.exportPngButton.value = "Export image";
		this.exportPngButton.classList.add("normal-button");

		this.exportPngButton.addEventListener(
			"click",
			this.exportPng.bind(this),
		);

		this.utilsContainer.appendChild(this.exportPngButton);

		this.toggleSnapshotsButton = document.createElement("input");
		this.toggleSnapshotsButton.type = "button";
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
		const key = data.key;
		const isShiftPressed = data.shift;

		if (!isShiftPressed) {
			return;
		}
		if (key.toLowerCase() == "g") {
			this.clickInput(this.toggleSnapshotsButton);
		}
		if (key.toLowerCase() == "v") {
			this.clickInput(this.saveSnapshotButton);
		}
	}
}
