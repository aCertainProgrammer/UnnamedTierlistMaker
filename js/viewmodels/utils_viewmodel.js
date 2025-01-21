export default class UtilsViewModel {
	constructor(utilsModel, notificationCenter) {
		this.utilsModel = utilsModel;
		this.notificationCenter = notificationCenter;
	}

	clearTierlist() {
		this.notificationCenter.publish("clearTierlist", {});
	}

	exportTierlist() {
		this.notificationCenter.publish("exportTierlist", {});
	}

	importTierlist(event) {
		this.notificationCenter.publish("importTierlist", {
			file: event.target.files[0],
		});
	}
}
