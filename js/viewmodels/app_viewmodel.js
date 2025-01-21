import MainScreenViewModel from "./main_screen_viewmodel.js";
import KeyboardViewModel from "./keyboard_viewmodel.js";
export default class AppViewModel {
	constructor(notificationCenter) {
		this.notificationCenter = notificationCenter;

		this.mainScreenViewModel = new MainScreenViewModel(notificationCenter);

		this.keyboardViewModel = new KeyboardViewModel(notificationCenter);
	}
}
