import MainScreenViewModel from "./main_screen_viewmodel.js";
import KeyboardViewModel from "./keyboard_viewmodel.js";
import KeyboardModel from "../models/keyboard_model.js";
export default class AppViewModel {
	constructor(notificationCenter) {
		this.notificationCenter = notificationCenter;

		this.mainScreenViewModel = new MainScreenViewModel(notificationCenter);

		const keyboardModel = new KeyboardModel();
		this.keyboardViewModel = new KeyboardViewModel(
			keyboardModel,
			notificationCenter,
		);
	}
}
