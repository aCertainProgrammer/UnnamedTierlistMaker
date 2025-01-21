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
	}

	render() {}

	clearTierlist() {
		this.utilsViewModel.clearTierlist();
	}
}
