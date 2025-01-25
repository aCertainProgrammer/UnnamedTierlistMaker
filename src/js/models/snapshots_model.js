import localStorageStrings from "../constants.js";
export default class SnapshotsModel {
	constructor() {}

	saveSnapshot() {
		const tierlist = JSON.parse(
			localStorage.getItem(localStorageStrings.tierlistSaveLocation),
		);

		const snapshots = this.getSnapshots();
		snapshots.push(tierlist);
		this.saveSnapshots(snapshots);
	}

	getSnapshots() {
		const snapshotsJson = localStorage.getItem(
			localStorageStrings.snapshotsSaveLocation,
		);
		if (snapshotsJson == null) {
			return [];
		} else return JSON.parse(snapshotsJson);
	}

	changeSnapshotName(index, name) {
		const snapshots = this.getSnapshots();

		snapshots[index].name = name;
		this.saveSnapshots(snapshots);
	}

	removeSnapshot(index) {
		const snapshots = this.getSnapshots();

		snapshots.splice(index, 1);
		this.saveSnapshots(snapshots);
	}

	clearAllSnapshots() {
		this.saveSnapshots([]);
	}

	importSnapshots(data) {
		const snapshots = this.getSnapshots();

		for (let i = 0; i < data.length; i++) {
			snapshots.push(data[i]);
		}
		this.saveSnapshots(snapshots);
	}

	saveSnapshots(snapshots) {
		localStorage.setItem(
			localStorageStrings.snapshotsSaveLocation,
			JSON.stringify(snapshots),
		);
	}
}
