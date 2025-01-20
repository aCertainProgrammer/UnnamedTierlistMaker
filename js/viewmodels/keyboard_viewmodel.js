import KeyboardModel from "../models/keyboard_model.js";
export default class KeyboardViewModel {
	constructor(keyboardModel, notificationCenter) {
		this.keyboardModel = keyboardModel;
		this.notificationCenter = notificationCenter;
	}

	handleKeyboardInput(event) {
		let target = "championSelectionSearchBar";
		const tierEditorOverlay = document.getElementById(
			"tier-editor-overlay",
		);
		if (tierEditorOverlay != null) target = "tierEditorOverlay";

		this.notificationCenter.publish("key", {
			key: event.key,
			target: target,
		});
	}
}
