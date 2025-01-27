import MainScreenView from "./main_screen_view.js";
import SettingsView from "./settings_view.js";
import KeyboardView from "./keyboard_view.js";
import SnapshotsView from "./snapshots_view.js";

/** Container for the app views */
export default class AppView {
	constructor(appViewModel) {
		this.appViewModel = appViewModel;

		this.notificationCenter = this.appViewModel.notificationCenter;
		this.notificationCenter.subscribe(
			"refreshAppView",
			this.render.bind(this),
		);

		this.appContainer = document.getElementById("root");
		this.mainScreenView = new MainScreenView(
			this.appViewModel.mainScreenViewModel,
		);

		this.settingsView = new SettingsView(
			this.appViewModel.settingsViewModel,
		);

		this.keyboardView = new KeyboardView(
			this.appViewModel.keyboardViewModel,
		);

		this.snapshotsView = new SnapshotsView(
			this.appViewModel.snapshotsViewModel,
		);
	}

	render() {
		this.mainScreenView.render();
		this.settingsView.render();
		this.snapshotsView.render();
	}
}
