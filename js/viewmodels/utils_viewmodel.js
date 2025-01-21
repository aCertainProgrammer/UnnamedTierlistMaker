export default class UtilsViewModel {
	constructor(utilsModel, notificationCenter) {
		this.utilsModel = utilsModel;
		this.notificationCenter = notificationCenter;
	}

	clearTierlist() {
		this.notificationCenter.publish("clearTierlist", {});
	}
}
