export default class UtilsView {
	constructor(utilsViewModel) {
		this.utilsViewModel = utilsViewModel;
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
}
