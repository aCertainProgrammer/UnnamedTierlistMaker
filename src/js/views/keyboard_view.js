export default class KeyboardView {
	constructor(keyboardViewModel) {
		this.keyboardViewModel = keyboardViewModel;
		this.notificationCenter = this.keyboardViewModel.notificationCenter;

		document.addEventListener(
			"keydown",
			this.handleKeyboardInput.bind(this),
		);
	}

	handleKeyboardInput(event) {
		const snapshotsContainer = document.getElementById(
			"snapshots-container",
		);

		if (document.getElementById("tier-editor-overlay") != null) {
			this.handleTierEditorInput(event);
		} else if (!snapshotsContainer.classList.contains("hidden")) {
			this.handleSnapshotInput(event);
		} else {
			this.handleMainScreenInput(event);
		}
	}

	handleTierEditorInput(event) {
		const target = "tierlistName";

		this.notificationCenter.publish("key", {
			key: event.key,
			shift: event.shiftKey,
			target: target,
		});
	}

	handleMainScreenInput(event) {
		const activeElement = document.activeElement;
		let target = "";

		if (activeElement == document.getElementById("tierlist-name"))
			target = "tierlistName";
		else target = "mainScreen";

		this.notificationCenter.publish("key", {
			key: event.key,
			shift: event.shiftKey,
			target: target,
		});
	}

	handleSnapshotInput(event) {
		const target = "snapshotsContainer";

		this.notificationCenter.publish("key", {
			key: event.key,
			shift: event.shiftKey,
			target: target,
		});
	}
}
