export default class TierViewModel {
	constructor(tierModel, notificationCenter, settingsViewModel) {
		this.tierModel = tierModel;
		this.notificationCenter = notificationCenter;
		this.settingsViewModel = settingsViewModel;
	}

	addChampion(champion) {
		this.tierModel.addChampion(champion);
	}

	addChampionAtIndex(champion, index) {
		this.tierModel.addChampionAtIndex(champion, index);
	}

	removeChampion(champion) {
		this.tierModel.removeChampion(champion);
	}

	setName(name) {
		this.tierModel.setName(name);
	}

	setColor(color) {
		this.tierModel.setColor(color);
	}

	getTier() {
		return this.tierModel.getTier();
	}

	clearTier() {
		this.tierModel.clearTier();
	}

	getChampionIconPadding() {
		const settings = this.settingsViewModel.getSettings();
		return settings.championIconPadding;
	}
	getNameOnHoverSetting() {
		const settings = this.settingsViewModel.getSettings();
		return settings.championNamesDisplayOnHoverInTheTierlist;
	}
}
