import { capitalize } from "../util";

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

		const snapshotData = this.snapshotsViewModel.getSnapshots();

		for (let i = 0; i < snapshotData.length; i++) {
			const snapshotContainer = this.createSnapshotContainer(
				snapshotData[i],
				i,
			);
			this.snapshotsContainer.appendChild(snapshotContainer);
		}
	}

	createSnapshotContainer(snapshotData, index) {
		const snapshotContainer = document.createElement("div");
		snapshotContainer.classList.add("snapshot-container");
		snapshotContainer.addEventListener(
			"click",
			this.loadSnapshot.bind(this, index),
		);

		const snapshotTierlist = document.createElement("div");
		snapshotTierlist.classList.add("snapshot-tierlist");

		for (let i = 0; i < snapshotData.length; i++) {
			const tier = this.createSnapshotTier(snapshotData[i]);
			snapshotTierlist.appendChild(tier);
		}

		snapshotContainer.appendChild(snapshotTierlist);
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
}
