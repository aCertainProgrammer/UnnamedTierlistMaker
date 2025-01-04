export class TierView {
	constructor(viewModel, tierContainer) {
		this.viewModel = viewModel;

		this.tierContainer = null;
		this.initialize();
	}

	render(container) {
		tierContainer.innerHTML = "tier";
		container.appendChild;
	}

	initialize() {
		this.tierContainer = document.createElement("div");
		this.tierContainer.classList.add("tier");
	}
}
