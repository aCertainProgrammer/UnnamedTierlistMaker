export default class KeyboardView {
	constructor(keyboardViewModel) {
		this.keyboardViewModel = keyboardViewModel;

		document.addEventListener(
			"keydown",
			this.handleKeyboardInput.bind(this),
		);
	}

	handleKeyboardInput(event) {
		this.keyboardViewModel.handleKeyboardInput(event);
	}
}
