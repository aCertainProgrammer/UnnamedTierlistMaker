import localStorageStrings from "../constants.js";
export default class SettingsModel {
	constructor() {}

	saveSettings() {}
	getSettings() {
		const settings = localStorage.getItem(
			localStorageStrings.settingsSaveLocation,
		);

		const default_settings = {};
		if (settings == undefined) {
			return default_settings;
		} else {
			return this.validateSettings(JSON.parse(settings));
		}
	}

	validateSettings(settingsToValidate) {}
}
