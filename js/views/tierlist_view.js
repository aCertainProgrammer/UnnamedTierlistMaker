import { capitalize } from "../util.js";
export class TierlistView {
	constructor(tierlistViewModel) {
		this.tierlistViewModel = tierlistViewModel;

		this.dragData = {
			tierIndex: null,
			championIndex: null,
			x: null,
			y: null,
		};

		this.imageSize = 80;
		this.tierNameSize = 90;
		this.borderSize = 1;

		this.tierlistContainer = document.getElementById("tierlist");

		this.dropFunction = function (index) {
			const dropData = JSON.parse(
				event.dataTransfer.getData("text/plain"),
			);
			const champion = dropData.champion;
			if (dropData.tier == index) event.stopPropagation();

			this.tierlistViewModel.addChampionAtIndex(
				index,
				this.dragData.championIndex,
				champion,
			);

			this.tierlistViewModel.removeChampion(index, "dummy");
			this.render();
		};
	}

	render() {
		const tiers = this.tierlistViewModel.getTiers();

		this.tierlistContainer.innerHTML = "";
		for (let i = 0; i < tiers.length; i++) {
			const tier = this.createTier(tiers[i], i);

			this.tierlistContainer.appendChild(tier);

			tier.addEventListener("dragenter", () => {
				event.preventDefault();
				this.dragData.tierIndex = i;
			});

			tier.addEventListener("dragover", () => {
				event.preventDefault();

				const rect = tier.getBoundingClientRect();

				this.dragData.x = parseInt(
					event.clientX - rect.left - this.tierNameSize,
				);
				this.dragData.y = event.clientY - rect.top;

				const tierLengthWithoutName = parseInt(
					rect.right -
						rect.left -
						this.tierNameSize -
						2 * this.borderSize,
				);
				const championsPerRow = parseInt(
					tierLengthWithoutName / this.imageSize,
				);

				const tierHeight = parseInt(
					rect.bottom - rect.top - 2 * this.borderSize,
				);
				const currentRow = this.findCurrentRow(
					this.dragData.y,
					tierHeight,
				);
				const currentColumn = this.findCurrentColumn(
					this.dragData.x,
					tierLengthWithoutName,
				);

				let index = currentRow * championsPerRow + currentColumn;

				const tiers = this.tierlistViewModel.getTiers();
				const numberOfChampions = tiers[i].champions.length;

				if (index > numberOfChampions) index = numberOfChampions;

				//console.log(
				//	"Here fit: " +
				//		+championsPerRow +
				//		" champions / row, we are in the " +
				//		currentRow +
				//		" row, " +
				//		currentColumn +
				//		" column, meaning we are at the " +
				//		index +
				//		" index",
				//);

				this.tierlistViewModel.removeChampion(i, "dummy");
				this.tierlistViewModel.addChampionAtIndex(i, index, "dummy");

				this.render();

				this.dragData.championIndex = index;
			});

			tier.addEventListener("dragleave", () => {
				const tiers = this.tierlistViewModel.getTiers();
				while (tiers[i].champions.includes("dummy")) {
					this.tierlistViewModel.removeChampion(i, "dummy");
				}
			});

			tier.addEventListener("drop", this.dropFunction.bind(this, i));
		}
	}

	findCurrentRow(pos_y, height) {
		const offset = this.imageSize / 2;
		for (let i = 0; i * this.imageSize <= height; i++) {
			if (
				i * this.imageSize - offset < pos_y &&
				(i + 1) * this.imageSize - offset >= pos_y
			) {
				return i;
			}
		}
		return 0;
	}

	findCurrentColumn(pos_x, width) {
		const offset = this.imageSize / 2;
		for (let i = 0; i * this.imageSize <= width; i++) {
			if (
				i * this.imageSize - offset < pos_x &&
				(i + 1) * this.imageSize - offset >= pos_x
			) {
				return i;
			}
		}
		return 0;
	}

	createTier(tier, index) {
		const tierContainer = document.createElement("div");
		tierContainer.classList = "tier-container";

		const tierName = document.createElement("div");
		tierName.classList = "tier-name";
		tierName.innerHTML = tier.name;

		tierContainer.appendChild(tierName);

		const tierChampions = document.createElement("div");
		tierChampions.classList = "tier-champions";

		tierContainer.appendChild(tierChampions);

		for (let i = 0; i < tier.champions.length; i++) {
			const championIcon = document.createElement("img");
			championIcon.classList = "champion-icon";
			championIcon.src =
				"./img/champion_icons/small_converted_to_webp_scaled/" +
				capitalize(tier.champions[i]) +
				".webp";
			tierChampions.appendChild(championIcon);

			championIcon.addEventListener("dragstart", () => {
				const dragImage = document.createElement("img");
				dragImage.src = event.target.src;
				dragImage.id = "drag-image";

				const width = event.target.offsetWidth;
				const height = event.target.offsetHeight;
				document.body.appendChild(dragImage);

				event.dataTransfer.setDragImage(
					dragImage,
					width / 2,
					height / 2,
				);

				const dragData = JSON.stringify({
					tier: index,
					champion: tier.champions[i],
				});

				event.dataTransfer.clearData();
				event.dataTransfer.setData("text/plain", dragData);

				this.tierlistViewModel.removeChampion(index, tier.champions[i]);
			});

			championIcon.addEventListener("dragend", () => {
				event.preventDefault();
				const dragImage = document.querySelector("#drag-image");
				document.body.removeChild(dragImage);
			});
		}

		return tierContainer;
	}
}
