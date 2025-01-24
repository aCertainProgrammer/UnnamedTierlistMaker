import MainScreenView from "./main_screen_view.js";
import KeyboardView from "./keyboard_view.js";

/** Container for the app views */
export default class AppView {
	constructor(appViewModel) {
		this.appViewModel = appViewModel;
		this.mainScreenView = null;

		this.appContainer = document.getElementById("root");
		this.mainScreenView = new MainScreenView(
			this.appViewModel.mainScreenViewModel,
		);

		this.keyboardView = new KeyboardView(
			this.appViewModel.keyboardViewModel,
		);
	}

	render() {
		this.mainScreenView.render();
	}
}
