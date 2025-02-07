import MainScreenViewModel from "./main_screen_viewmodel.js";
import KeyboardViewModel from "./keyboard_viewmodel.js";
import SnapshotsModel from "../models/snapshots_model.js";
import SnapshotsViewModel from "./snapshots_viewmodel.js";
import SettingsViewModel from "./settings_viewmodel.js";
import SettingsModel from "../models/settings_model.js";
import ManualViewModel from "./manual_viewmodel.js";
export default class AppViewModel {
	constructor(notificationCenter) {
		this.notificationCenter = notificationCenter;

		const settingsModel = new SettingsModel();
		this.settingsViewModel = new SettingsViewModel(
			settingsModel,
			this.notificationCenter,
		);

		this.mainScreenViewModel = new MainScreenViewModel(
			notificationCenter,
			this.settingsViewModel,
		);

		this.manualViewModel = new ManualViewModel(this.notificationCenter);

		this.keyboardViewModel = new KeyboardViewModel(this.notificationCenter);

		const snapshotsModel = new SnapshotsModel();
		this.snapshotsViewModel = new SnapshotsViewModel(
			snapshotsModel,
			this.notificationCenter,
		);
	}
}
