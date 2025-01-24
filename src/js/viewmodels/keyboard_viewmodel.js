export default class KeyboardViewModel {
	constructor(notificationCenter) {
		this.notificationCenter = notificationCenter;
	}

	handleKeyboardInput(event) {
		let target = "mainScreen";
		const tierEditorOverlay = document.getElementById(
			"tier-editor-overlay",
		);
		if (tierEditorOverlay != null) target = "tierEditorOverlay";

		this.notificationCenter.publish("key", {
			key: event.key,
			shift: event.shiftKey,
			target: target,
		});
	}
}
