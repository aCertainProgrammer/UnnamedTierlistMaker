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
			championNamesDisplayOnHoverInTheTierlist: true,
			championNamesDisplayOnHoverInTheChampionSelection: true,
		};
		if (settings == undefined) {
			return default_settings;
		} else {
			return this.validateSettings(
				JSON.parse(settings),
				default_settings,
			);
		}
	}

	validateSettings(settingsToValidate, default_settings) {
		const properties = [
			"championIconPadding",
			"championNamesDisplayOnHoverInTheTierlist",
			"championNamesDisplayOnHoverInTheChampionSelection",
		];

		const validSettings = {};

		for (let i = 0; i < properties.length; i++) {
			const property = properties[i];
			if (settingsToValidate[property] == undefined) {
				validSettings[property] = default_settings[property];
			} else {
				validSettings[property] = settingsToValidate[property];
			}
		}

		return validSettings;
	}
}
