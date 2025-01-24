export default class SnapshotsView {
	/**
	 * @constructor
	 * @param {SnapshotsViewModel} snapshotsViewModel
	 */
	constructor(snapshotsViewModel) {
		this.visible = false;
		this.snapshotsViewModel = snapshotsViewModel;

		this.notificationCenter = this.snapshotsViewModel.notificationCenter;
		this.notificationCenter.subscribe(
			"toggleSnapshots",
			this.toggleSnapshots.bind(this),
		);

		this.snapshotsContainer = document.getElementById(
			"snapshots-container",
		);
	}

	render() {
		this.snapshotsContainer.innerHTML = "";
		if (this.visible == false) {
			this.snapshotsContainer.classList.add("hidden");
			return;
		}
		if (this.snapshotsContainer.classList.contains("hidden")) {
			this.snapshotsContainer.classList.remove("hidden");
		}
		this.snapshotsContainer.innerHTML = "";

		this.snapshotsContainer.innerHTML = "gagagagagaga";
	}

	toggleSnapshots() {
		this.visible = !this.visible;
		this.snapshotsViewModel.toggleSnapshots();
	}
}
