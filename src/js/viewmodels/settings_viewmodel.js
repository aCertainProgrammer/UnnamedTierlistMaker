export default class SettingsViewModel {
	constructor(settingsModel, notificationCenter) {
		this.settingsModel = settingsModel;
		this.notificationCenter = notificationCenter;
	}

	getSettings() {
		return this.settingsModel.getSettings();
	}
	setChampionIconPadding(padding) {
		const settings = this.getSettings();
		settings.championIconPadding = padding;
		this.settingsModel.saveSettings(settings);

		this.notificationCenter.publish("championIconPaddingChanged");
	}

	setChampionNamesOnHoverInTheTierlist() {
		const settings = this.getSettings();
		settings.championNamesDisplayOnHoverInTheTierlist =
			!settings.championNamesDisplayOnHoverInTheTierlist;
		this.settingsModel.saveSettings(settings);

		this.notificationCenter.publish(
			"championNamesDisplayOnHoverInTheTierlistChanged",
		);
	}

	setChampionNamesOnHoverInTheChampionSelection() {
		const settings = this.getSettings();
		settings.championNamesDisplayOnHoverInTheChampionSelection =
			!settings.championNamesDisplayOnHoverInTheChampionSelection;
		this.settingsModel.saveSettings(settings);
		this.notificationCenter.publish(
			"championNamesDisplayOnHoverInTheChampionSelectionChanged",
		);
	}
}
