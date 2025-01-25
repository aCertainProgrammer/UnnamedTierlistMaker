import localStorageStrings from "../constants.js";
export default class SnapshotsModel {
	constructor() {}

	saveSnapshot() {
		const tierlist = JSON.parse(
			localStorage.getItem(localStorageStrings.tierlistSaveLocation),
		);

		const snapshots = this.getSnapshots();
		snapshots.push(tierlist);
		localStorage.setItem(
			localStorageStrings.snapshotsSaveLocation,
			JSON.stringify(snapshots),
		);
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
		localStorage.setItem(
			localStorageStrings.snapshotsSaveLocation,
			JSON.stringify(snapshots),
		);
	}

	removeSnapshot(index) {
		const snapshots = this.getSnapshots();

		snapshots.splice(index, 1);
		localStorage.setItem(
			localStorageStrings.snapshotsSaveLocation,
			JSON.stringify(snapshots),
		);
	}
}
