import { capitalize } from "../util.js";
import TierViewModel from "../viewmodels/tier_viewmodel.js";
export default class TierView {
	/**
	 * @constructor
	 * @param {TierViewModel} tierViewModel
	 * @param {Object} tierContainer
	 * @param {*} tierlistRenderSignal
	 * @param {number} tierIndex
	 */
	constructor(tierViewModel, tierContainer, tierlistRenderSignal, tierIndex) {
		this.tierViewModel = tierViewModel;
		this.tierContainer = tierContainer;
		this.tierlistRenderSignal = tierlistRenderSignal;
		this.tierIndex = tierIndex;

		this.dragData = {
			championIndex: null,
			x: null,
			y: null,
		};

		this.championDragIndex = -1;

		this.imageSize = 80;
		this.tierNameSize = 90;
		this.borderSize = 1;

		this.dropFunction = function (index) {
			event.stopPropagation();
			const dropData = JSON.parse(
				event.dataTransfer.getData("text/plain"),
			);
			const champion = dropData.champion;

			this.tierViewModel.removeChampion("dummy");

			this.tierViewModel.addChampionAtIndex(
				champion,
				this.dragData.championIndex,
			);

			this.sendTierlistRenderSignal();
		};

		this.tierContainer.addEventListener(
			"drop",
			this.dropFunction.bind(this),
		);

		this.tierContainer.addEventListener("dragover", () => {
			event.preventDefault();

			const rect = this.tierContainer.getBoundingClientRect();

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
			const currentRow = this.findCurrentRow(this.dragData.y, tierHeight);
			const currentColumn = this.findCurrentColumn(
				this.dragData.x,
				tierLengthWithoutName,
			);

			let index = currentRow * championsPerRow + currentColumn;

			const tier = this.tierViewModel.getTier();
			const numberOfChampions = tier.champions.length;

			if (index > numberOfChampions) index = numberOfChampions;
			if (this.championDragIndex != index) {
				this.tierViewModel.removeChampion("dummy");
				this.tierViewModel.addChampionAtIndex("dummy", index);

				this.render();
			}

			this.championDragIndex = index;

			this.dragData.championIndex = index;
		});

		this.tierContainer.addEventListener("dragleave", () => {
			this.tierViewModel.removeChampion("dummy");
			this.dragData.championIndex = -1;
		});
	}

	render() {
		this.tierContainer.innerHTML = "";
		const tier = this.tierViewModel.getTier();

		console.log(tier);
		const tierName = document.createElement("div");
		tierName.classList = "tier-name";
		tierName.innerHTML = tier.name;
		tierName.style.backgroundColor = tier.color;

		this.tierContainer.appendChild(tierName);

		const tierChampions = document.createElement("div");
		tierChampions.classList = "tier-champions";

		for (let i = 0; i < tier.champions.length; i++) {
			const championIcon = this.createChampionIcon(
				this.tierIndex,
				tier.champions[i],
			);
			tierChampions.appendChild(championIcon);
		}

		this.tierContainer.appendChild(tierChampions);
		return this.tierContainer;
	}

	createChampionIcon(index, champion) {
		const championIcon = document.createElement("img");
		championIcon.classList = "champion-icon";
		championIcon.src =
			"./img/champion_icons/small_converted_to_webp_scaled/" +
			capitalize(champion) +
			".webp";

		championIcon.addEventListener("dragstart", () => {
			const dragImage = document.createElement("img");
			dragImage.src = event.target.src;
			dragImage.id = "drag-image";

			const width = event.target.offsetWidth;
			const height = event.target.offsetHeight;
			document.body.appendChild(dragImage);

			event.dataTransfer.setDragImage(dragImage, width / 2, height / 2);

			const dragData = JSON.stringify({
				tier: index,
				champion: champion,
			});
			console.log(dragData);

			event.dataTransfer.clearData();
			event.dataTransfer.setData("text/plain", dragData);

			this.tierViewModel.removeChampion(champion);
		});

		championIcon.addEventListener("dragend", () => {
			event.preventDefault();
			const dragImage = document.querySelector("#drag-image");
			document.body.removeChild(dragImage);
		});

		return championIcon;
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

	sendTierlistRenderSignal() {
		this.tierlistRenderSignal();
	}
}
