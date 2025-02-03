import localStorageStrings from "../constants.js";
export default class SettingsModel {
	constructor() {}

	saveSettings(settings) {
		localStorage.setItem(
			localStorageStrings.settingsSaveLocation,
			JSON.stringify(settings),
		);
	}
	getSettings() {
		const settings = localStorage.getItem(
			localStorageStrings.settingsSaveLocation,
		);

		const default_settings = {
			championIconPadding: "0",
		};
		if (settings == undefined) {
			return default_settings;
		} else {
			return JSON.parse(settings);
			//return this.validateSettings(JSON.parse(settings));
		}
	}

	validateSettings(settingsToValidate) {}
}
