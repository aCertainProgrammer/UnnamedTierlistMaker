import MainScreenView from "./main_screen_view.js";
export default class AppView {
	constructor(viewmodel) {
		this.viewmodel = viewmodel;
		this.mainScreenView = null;

		this.appContainer = document.getElementById("root");
		this.initialize();
	}

	initialize() {
		this.mainScreenView = new MainScreenView(
			this.viewmodel.mainScreenViewModel,
		);
	}

	render() {
		this.mainScreenView.render();
	}
}
