export default class SnapshotsViewModel {
	constructor(snapshotsModel, notificationCenter) {
		this.snapshotsModel = snapshotsModel;
		this.notificationCenter = notificationCenter;

		this.notificationCenter.subscribe(
			"saveSnapshot",
			this.saveSnapshot.bind(this),
		);
	}

	toggleSnapshots() {
		this.notificationCenter.publish("refreshAppView");
	}

	saveSnapshot() {
		this.snapshotsModel.saveSnapshot();
	}

	getSnapshots() {
		return this.snapshotsModel.getSnapshots();
	}

	loadSnapshot(index) {
		const snapshots = this.getSnapshots();
		this.notificationCenter.publish("loadSnapshot", {
			snapshot: snapshots[index],
		});
	}

	changeSnapshotName(index, name) {
		this.snapshotsModel.changeSnapshotName(index, name);
	}

	removeSnapshot(index) {
		this.snapshotsModel.removeSnapshot(index);
	}
}
