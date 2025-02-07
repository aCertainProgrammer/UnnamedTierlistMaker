import { capitalize, prettifyChampionName } from "../util.js";
import TierEditorView from "./tier_editor_view.js";
export default class TierView {
	/**
	 * @constructor
	 * @param {TierViewModel} tierViewModel
	 * @param {TierlistViewModel} tierlistViewModel
	 * @param {Object} tierContainer
	 * @param {*} tierlistRenderSignal
	 * @param {number} tierIndex
	 */
	constructor(
		tierViewModel,
		tierlistViewModel,
		tierContainer,
		tierlistRenderSignal,
		tierIndex,
	) {
		this.tierViewModel = tierViewModel;
		this.tierlistViewModel = tierlistViewModel;
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
		this.tierNameSize = 80;
		this.swapArrowsSize = 80;

		this.dropFunction = function () {
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

			const tierChampions = this.tierContainer.children[1];
			const tierChampionsRect = tierChampions.getBoundingClientRect();
			const tierLengthWithoutNameAndSwapArrows = parseInt(
				tierChampionsRect.width,
			);
			const championsPerRow = parseInt(
				tierLengthWithoutNameAndSwapArrows / this.imageSize,
			);

			const tierHeight = parseInt(rect.bottom - rect.top);
			const currentRow = this.findCurrentRow(this.dragData.y, tierHeight);
			const currentColumn = this.findCurrentColumn(
				this.dragData.x,
				tierLengthWithoutNameAndSwapArrows,
			);

			let index = currentRow * championsPerRow + currentColumn;

			const tier = this.tierViewModel.getTier();
			const numberOfChampions = tier.champions.length;

			if (index > numberOfChampions) index = numberOfChampions;
			if (this.championDragIndex != index) {
				this.tierViewModel.removeChampion("dummy");
				this.tierViewModel.addChampionAtIndex("dummy", index);

				this.render();
				//console.log(
				//	`We are in row ${currentRow} and column ${currentColumn}, there are currently ${championsPerRow} championsPerRow, meaning our index is ${index}`,
				//);
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

		const tierName = document.createElement("div");
		tierName.classList = "tier-name";
		tierName.innerHTML = tier.name;
		tierName.style.backgroundColor = tier.color;

		tierName.addEventListener("click", () => {
			new TierEditorView(
				this.tierlistViewModel,
				tier,
				this.tierIndex,
				this.tierViewModel.notificationCenter,
			);
		});

		this.tierContainer.appendChild(tierName);

		const tierChampions = document.createElement("div");
		tierChampions.classList = "tier-champions";

		const championIconPadding = this.getChampionIconPadding();

		for (let i = 0; i < tier.champions.length; i++) {
			const championIcon = this.createChampionIcon(
				this.tierIndex,
				tier.champions[i],
				championIconPadding,
			);
			tierChampions.appendChild(championIcon);
		}

		this.tierContainer.appendChild(tierChampions);

		const tierSwappingContainer = document.createElement("div");
		tierSwappingContainer.classList.add("tier-swapping-container");

		const tierUpArrow = document.createElement("img");
		tierUpArrow.classList.add("tier-swapping-arrow");
		tierUpArrow.src = "./assets/img/up-arrow.png";
		tierUpArrow.draggable = false;

		tierUpArrow.addEventListener("click", this.swapTierUp.bind(this));

		tierSwappingContainer.appendChild(tierUpArrow);

		const tierDownArrow = document.createElement("img");
		tierDownArrow.classList.add("tier-swapping-arrow");
		tierDownArrow.src = "./assets/img/down-arrow.png";
		tierDownArrow.draggable = false;

		tierDownArrow.addEventListener("click", this.swapTierDown.bind(this));

		tierSwappingContainer.appendChild(tierDownArrow);

		this.tierContainer.appendChild(tierSwappingContainer);

		return this.tierContainer;
	}

	createChampionIcon(index, champion, padding) {
		const championIcon = document.createElement("img");
		championIcon.classList = "champion-icon";
		championIcon.src =
			"./assets/img/champion_icons/" + capitalize(champion) + ".webp";
		championIcon.style.padding = padding + "px";

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

			event.dataTransfer.clearData();
			event.dataTransfer.setData("text/plain", dragData);

			this.tierViewModel.removeChampion(champion);
		});

		championIcon.addEventListener("dragend", () => {
			event.preventDefault();
			const dragImage = document.querySelector("#drag-image");
			document.body.removeChild(dragImage);
		});

		championIcon.addEventListener("mouseenter", () => {
			const championNameContainer = document.createElement("div");
			championNameContainer.classList.add(
				"champion-name-container-on-hover",
			);
			championNameContainer.innerText = prettifyChampionName(champion);

			document.body.appendChild(championNameContainer);

			const rect = championIcon.getBoundingClientRect();
			const nameRect = championNameContainer.getBoundingClientRect();
			const width = parseInt(nameRect.width);
			championNameContainer.style.top = parseInt(rect.y - 30) + "px";
			championNameContainer.style.left =
				parseInt(rect.x + 40 - width / 2) + "px";
		});

		championIcon.addEventListener("mouseleave", () => {
			const championNameContainer = document.querySelector(
				".champion-name-container-on-hover",
			);

			if (championNameContainer != null) {
				championNameContainer.remove();
			}
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

	swapTierUp() {
		this.tierlistViewModel.swapTierUp(this.tierIndex);

		this.sendTierlistRenderSignal();
	}

	swapTierDown() {
		this.tierlistViewModel.swapTierDown(this.tierIndex);

		this.sendTierlistRenderSignal();
	}

	getChampionIconPadding() {
		return this.tierViewModel.getChampionIconPadding();
	}
}
