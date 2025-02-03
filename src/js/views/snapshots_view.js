import { capitalize, exportData, readFile } from "../util";

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
		this.notificationCenter.subscribe(
			"key",
			this.processKeyInput.bind(this),
		);

		this.snapshotsContainer = document.getElementById(
			"snapshots-container",
		);

		this.searchQuery = "";
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

		const snapshotUtils = this.createSnapshotUtils();
		this.snapshotsContainer.appendChild(snapshotUtils);

		const searchBar = document.getElementById("snapshot-search-bar");
		searchBar.value = this.searchQuery;
		if (searchBar.value != "") searchBar.focus();

		const searchQuery = this.searchQuery.trim().toLowerCase();

		const snapshotData = this.snapshotsViewModel.getSnapshots();

		for (let i = 0; i < snapshotData.length; i++) {
			if (snapshotData[i].name.toLowerCase().includes(searchQuery)) {
				const snapshotContainer = this.createSnapshotContainer(
					snapshotData[i],
					i,
				);
				this.snapshotsContainer.appendChild(snapshotContainer);
			}
		}
	}

	createSnapshotContainer(snapshotData, index) {
		const snapshotContainer = document.createElement("div");
		snapshotContainer.classList.add("snapshot-container");
		snapshotContainer.addEventListener(
			"click",
			this.loadSnapshot.bind(this, index),
		);

		const snapshotName = document.createElement("input");
		snapshotName.type = "text";
		snapshotName.id = "snapshot-name";
		snapshotName.value = snapshotData.name;

		snapshotName.addEventListener("input", () => {
			this.changeSnapshotName(index, event.target.value);
		});

		snapshotName.addEventListener("click", () => {
			event.stopPropagation();
		});

		snapshotContainer.appendChild(snapshotName);

		const snapshotTierlist = document.createElement("div");
		snapshotTierlist.classList.add("snapshot-tierlist");

		for (let i = 0; i < snapshotData.tiers.length; i++) {
			const tier = this.createSnapshotTier(snapshotData.tiers[i]);
			snapshotTierlist.appendChild(tier);
		}

		snapshotContainer.appendChild(snapshotTierlist);

		const snapshotRemovalElement = document.createElement("img");
		snapshotRemovalElement.src = "./assets/img/trash.png";
		snapshotRemovalElement.classList = "snapshot-removal-element";
		snapshotRemovalElement.addEventListener("click", (event) => {
			event.stopPropagation();
			this.removeSnapshot(index);
		});
		snapshotContainer.appendChild(snapshotRemovalElement);

		return snapshotContainer;
	}

	createSnapshotTier(tierData) {
		const tierContainer = document.createElement("div");
		tierContainer.classList.add("snapshot-tier-container");

		const tierName = document.createElement("div");
		tierName.classList.add("snapshot-tier-name");
		tierName.style.backgroundColor = tierData.color;
		tierName.innerText = tierData.name;

		tierContainer.appendChild(tierName);

		const tierChampions = document.createElement("div");
		tierChampions.classList.add("snapshot-tier-champions");

		for (let i = 0; i < tierData.champions.length; i++) {
			const championIcon = this.createSnapshotChampionIcon(
				tierData.champions[i],
			);
			tierChampions.appendChild(championIcon);
		}

		tierContainer.appendChild(tierChampions);

		return tierContainer;
	}

	createSnapshotChampionIcon(champion) {
		const container = document.createElement("div");
		container.classList.add("snapshot-champion-icon-container");
		const championIcon = document.createElement("img");
		championIcon.src =
			"./assets/img/champion_icons/" + capitalize(champion) + ".webp";

		container.appendChild(championIcon);
		return container;
	}

	toggleSnapshots() {
		this.visible = !this.visible;
		this.snapshotsViewModel.toggleSnapshots();
	}

	loadSnapshot(index) {
		this.snapshotsViewModel.loadSnapshot(index);
	}

	processKeyInput(data) {
		if (data.target != "snapshotsContainer") {
			return;
		}

		if (!data.shift) {
			return;
		}

		if (data.key.toLowerCase() == "g") {
			this.notificationCenter.publish("clickSnapshotsToggle");
		}
	}

	changeSnapshotName(index, name) {
		this.snapshotsViewModel.changeSnapshotName(index, name);
	}

	removeSnapshot(index) {
		this.snapshotsViewModel.removeSnapshot(index);
		this.render();
	}

	createSnapshotUtils() {
		const snapshotUtils = document.createElement("div");
		snapshotUtils.classList.add("snapshot-utils");

		const closeButton = document.createElement("input");
		closeButton.type = "button";
		closeButton.value = "Close";
		closeButton.classList.add("normal-button");
		closeButton.addEventListener("click", this.toggleSnapshots.bind(this));
		snapshotUtils.appendChild(closeButton);

		const clearAllButton = document.createElement("input");
		clearAllButton.type = "button";
		clearAllButton.value = "Clear all";
		clearAllButton.classList.add("normal-button");
		clearAllButton.addEventListener(
			"click",
			this.clearAllSnapshots.bind(this),
		);
		snapshotUtils.appendChild(clearAllButton);

		const snapshotSearchBar = document.createElement("input");
		snapshotSearchBar.type = "text";
		snapshotSearchBar.placeholder = "Search by name...";
		snapshotSearchBar.id = "snapshot-search-bar";
		snapshotSearchBar.addEventListener(
			"input",
			this.searchSnapshots.bind(this),
		);
		snapshotUtils.appendChild(snapshotSearchBar);

		const exportButton = document.createElement("input");
		exportButton.type = "button";
		exportButton.value = "Export";
		exportButton.classList.add("normal-button");
		exportButton.addEventListener("click", this.exportSnapshots.bind(this));
		snapshotUtils.appendChild(exportButton);

		const importFileInput = document.createElement("input");
		importFileInput.type = "file";
		importFileInput.classList = "hidden";
		importFileInput.addEventListener(
			"input",
			this.importSnapshots.bind(this),
		);

		snapshotUtils.appendChild(importFileInput);
		const importButton = document.createElement("input");
		importButton.type = "button";
		importButton.value = "Import";
		importButton.classList.add("normal-button");
		importButton.addEventListener("click", () => {
			importFileInput.click();
		});
		snapshotUtils.appendChild(importButton);

		const exportImages = document.createElement("input");
		exportImages.type = "button";
		exportImages.classList.add("normal-button");
		exportImages.value = "Export images";
		exportImages.addEventListener(
			"click",
			this.exportSnapshotsAsImages.bind(this),
		);

		snapshotUtils.appendChild(exportImages);

		return snapshotUtils;
	}

	clearAllSnapshots() {
		const ok = confirm("Clear all snapshots?");
		if (ok == false) return;

		this.snapshotsViewModel.clearAllSnapshots();
		this.render();
	}

	searchSnapshots() {
		this.searchQuery = event.target.value.trim().toLowerCase();
		this.render();
	}

	async exportSnapshots() {
		const snapshots = this.snapshotsViewModel.getSnapshots();
		exportData(snapshots, "UTM_Snapshots.json");
	}

	async importSnapshots() {
		const data = await readFile(event.target.files[0]);
		const json = JSON.parse(data);
		this.snapshotsViewModel.importSnapshots(json);
		this.render();
	}

	exportSnapshotsAsImages() {
		this.snapshotsViewModel.exportSnapshotsAsImages();
	}
}
