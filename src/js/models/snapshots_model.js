export default class SnapshotsModel {
	constructor() {}

	saveSnapshot() {
		const tierlist = JSON.parse(localStorage.getItem("tierlist"));

		const snapshots = this.getSnapshots();
		snapshots.push(tierlist);
		localStorage.setItem("snapshots", JSON.stringify(snapshots));
	}

	getSnapshots() {
		const snapshotsJson = localStorage.getItem("snapshots");
		if (snapshotsJson == null) {
			return [];
		} else return JSON.parse(snapshotsJson);
	}

	changeSnapshotName(index, name) {
		const snapshots = this.getSnapshots();

		console.log(snapshots);
		snapshots[index].name = name;
		localStorage.setItem("snapshots", JSON.stringify(snapshots));
	}
}
