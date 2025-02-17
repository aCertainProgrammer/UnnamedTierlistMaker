import { readFile, exportImage, exportData } from "../util";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver/src/FileSaver";
import JSZip from "jszip";

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

	clearAllSnapshots() {
		this.snapshotsModel.clearAllSnapshots();
	}

	importSnapshots(data) {
		this.snapshotsModel.importSnapshots(data);
	}
	exportSnapshotsAsImages() {
		// This violates MVVM. Too bad!
		const snapshots = document.querySelectorAll(".snapshot-tierlist");
		const zip = new JSZip();
		const promises = [];
		for (let i = 0; i < snapshots.length; i++) {
			const snapshot = snapshots[i];
			const promise = domtoimage.toBlob(snapshot).then(function (blob) {
				zip.file("tierlist" + i + ".png", blob);
			});
			promises.push(promise);
		}

		Promise.all(promises).then(() => {
			zip.generateAsync({ type: "blob" }).then(function (blob) {
				saveAs(blob, "tierlists.zip");
			});
		});
	}
}
