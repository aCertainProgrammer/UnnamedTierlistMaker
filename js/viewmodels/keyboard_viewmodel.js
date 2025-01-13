import KeyboardModel from "../models/keyboard_model.js";
export default class KeyboardViewModel {
	constructor(keyboardModel) {
		this.keyboardModel = keyboardModel;
	}

	handleKeyboardInput(event) {
		this.keyboardModel.setLastKey(event.key);
	}
}
