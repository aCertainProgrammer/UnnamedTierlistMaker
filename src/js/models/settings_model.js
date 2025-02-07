import localStorageStrings from "../constants.js";
export default class SettingsModel {
	constructor() {
		this.default_settings = {
			championIconPadding: "0",
			championNamesDisplayOnHoverInTheTierlist: true,
			championNamesDisplayOnHoverInTheChampionSelection: true,
		};
	}

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

		if (settings == undefined) {
			return this.default_settings;
		} else {
			return this.validateSettings(JSON.parse(settings));
		}
	}

	validateSettings(settingsToValidate) {
		const properties = [
			"championIconPadding",
			"championNamesDisplayOnHoverInTheTierlist",
			"championNamesDisplayOnHoverInTheChampionSelection",
		];

		const validSettings = {};

		for (let i = 0; i < properties.length; i++) {
			const property = properties[i];
			if (settingsToValidate[property] == undefined) {
				validSettings[property] = this.default_settings[property];
			} else {
				validSettings[property] = settingsToValidate[property];
			}
		}

		return validSettings;
	}

	resetSettings() {
		this.saveSettings(this.default_settings);
	}
}
