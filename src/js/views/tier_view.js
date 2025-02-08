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

		const tier = this.tierViewModel.getTier();

		this.tierName = document.createElement("div");
		this.tierName.classList = "tier-name";
		this.tierName.innerHTML = tier.name;
		this.tierName.style.backgroundColor = tier.color;

		this.tierName.addEventListener(
			"click",
			this.createTierEditor.bind(this),
		);

		this.tierContainer.appendChild(this.tierName);

		this.tierChampions = document.createElement("div");
		this.tierChampions.classList = "tier-champions";
		this.tierContainer.appendChild(this.tierChampions);

		this.tierSwappingContainer = document.createElement("div");
		this.tierSwappingContainer.classList.add("tier-swapping-container");

		this.tierUpArrow = document.createElement("img");
		this.tierUpArrow.classList.add("tier-swapping-arrow");
		this.tierUpArrow.src = "./assets/img/up-arrow.png";
		this.tierUpArrow.draggable = false;

		this.tierUpArrow.addEventListener("click", this.swapTierUp.bind(this));

		this.tierSwappingContainer.appendChild(this.tierUpArrow);

		this.tierDownArrow = document.createElement("img");
		this.tierDownArrow.classList.add("tier-swapping-arrow");
		this.tierDownArrow.src = "./assets/img/down-arrow.png";
		this.tierDownArrow.draggable = false;

		this.tierDownArrow.addEventListener(
			"click",
			this.swapTierDown.bind(this),
		);

		this.tierSwappingContainer.appendChild(this.tierDownArrow);

		this.tierContainer.appendChild(this.tierSwappingContainer);

		this.dragData = {
			championIndex: null,
			x: null,
			y: null,
		};
		this.currentDummy = null;

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

		this.tierChampions.addEventListener(
			"drop",
			this.dropFunction.bind(this),
		);

		this.tierChampions.addEventListener("dragover", () => {
			event.preventDefault();
			const dragData = JSON.parse(
				event.dataTransfer.getData("text/plain"),
			);
			this.currentDummy = dragData.champion;

			const rect = this.tierChampions.getBoundingClientRect();

			this.dragData.x = parseInt(event.clientX - rect.left);
			this.dragData.y = event.clientY - rect.top;

			const championsPerRow = parseInt(rect.width / this.imageSize);

			const tierHeight = parseInt(rect.bottom - rect.top);
			const currentRow = this.findCurrentRow(this.dragData.y, tierHeight);
			const currentColumn = this.findCurrentColumn(
				this.dragData.x,
				rect.width,
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

		this.tierChampions.addEventListener("dragleave", () => {
			this.tierViewModel.removeChampion("dummy");
			const rect = this.tierChampions.getBoundingClientRect();
			const drag_x = parseInt(event.clientX - rect.left);
			const drag_y = event.clientY - rect.top;
			if (
				drag_y <= 0 ||
				drag_x <= 0 ||
				drag_x >= rect.width ||
				drag_y >= rect.height
			) {
				const dummies = document.querySelectorAll(
					"[data-champion='dummy']",
				);
				if (dummies != undefined) {
					for (let i = 0; i < dummies.length; i++) {
						dummies[i].remove();
					}
				}
			}
			this.dragData.championIndex = -1;
		});
	}

	render() {
		const championIconPadding = this.getChampionIconPadding();
		const nameOnHover = this.getNameOnHoverSetting();
		const tier = this.tierViewModel.getTier();
		this.tierChampions.innerHTML = "";
		for (let i = 0; i < tier.champions.length; i++) {
			const championIcon = this.createChampionIcon(
				this.tierIndex,
				tier.champions[i],
				championIconPadding,
				nameOnHover,
			);
			this.tierChampions.appendChild(championIcon);
		}

		return this.tierContainer;
	}

	createChampionIcon(index, champion, padding, nameOnHover) {
		const championIcon = document.createElement("img");
		championIcon.classList = "champion-icon";
		championIcon.dataset.champion = champion;
		if (champion == "dummy") {
			champion = this.currentDummy;
			championIcon.style.opacity = "0.5";
		}
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

		if (nameOnHover) {
			championIcon.addEventListener("mouseenter", () => {
				const championNameContainer = document.createElement("div");
				championNameContainer.classList.add(
					"champion-name-container-on-hover",
				);
				championNameContainer.innerText =
					prettifyChampionName(champion);

				document.body.appendChild(championNameContainer);

				const rect = championIcon.getBoundingClientRect();
				const nameRect = championNameContainer.getBoundingClientRect();
				const width = parseInt(nameRect.width);
				championNameContainer.style.top = parseInt(rect.y - 30) + "px";
				championNameContainer.style.left =
					parseInt(rect.x + 40 - width / 2) + "px";
			});

			championIcon.addEventListener("mouseleave", () => {
				const championNameContainers = document.querySelectorAll(
					".champion-name-container-on-hover",
				);

				if (championNameContainers != null) {
					for (let i = 0; i < championNameContainers.length; i++) {
						championNameContainers[i].remove();
					}
				}
			});
		}

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

	getNameOnHoverSetting() {
		return this.tierViewModel.getNameOnHoverSetting();
	}

	createTierEditor() {
		const tier = this.tierViewModel.getTier();
		new TierEditorView(
			this.tierlistViewModel,
			tier,
			this.tierIndex,
			this.tierViewModel.notificationCenter,
		);
	}
}
