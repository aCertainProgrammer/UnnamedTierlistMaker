export default class SnapshotsViewModel {
	constructor(snapshotsModel, notificationCenter) {
		this.snapshotsModel = snapshotsModel;
		this.notificationCenter = notificationCenter;
	}

	toggleSnapshots() {
		this.notificationCenter.publish("refreshAppView");
	}
}
