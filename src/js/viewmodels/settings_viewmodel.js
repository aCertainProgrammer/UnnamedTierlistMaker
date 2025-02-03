export default class SettingsViewModel {
	constructor(settingsModel, notificationCenter) {
		this.settingsModel = settingsModel;
		this.notificationCenter = notificationCenter;
	}

	getSettings() {
		return this.settingsModel.getSettings();
	}
	setChampionIconPadding(padding) {
		const settings = this.settingsModel.getSettings();
		settings.championIconPadding = padding;
		this.settingsModel.saveSettings(settings);

		this.notificationCenter.publish("championIconPaddingChanged");
	}
}
