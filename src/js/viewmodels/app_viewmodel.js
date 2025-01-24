import MainScreenViewModel from "./main_screen_viewmodel.js";
import KeyboardViewModel from "./keyboard_viewmodel.js";
import SnapshotsModel from "../models/snapshots_model.js";
import SnapshotsViewModel from "./snapshots_viewmodel.js";
export default class AppViewModel {
	constructor(notificationCenter) {
		this.notificationCenter = notificationCenter;

		this.mainScreenViewModel = new MainScreenViewModel(notificationCenter);

		this.keyboardViewModel = new KeyboardViewModel(notificationCenter);

		const snapshotsModel = new SnapshotsModel();
		this.snapshotsViewModel = new SnapshotsViewModel(
			snapshotsModel,
			notificationCenter,
		);
	}
}
