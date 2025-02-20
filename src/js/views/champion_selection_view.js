import { capitalize, prettifyChampionName } from "../util.js";
export class ChampionSelectionView {
	constructor(championSelectionViewModel) {
		this.championSelectionViewModel = championSelectionViewModel;
		this.notificationCenter =
			this.championSelectionViewModel.notificationCenter;
		this.championSelection = document.getElementById("champion-selection");
		this.searchBar = document.getElementById(
			"champion-selection-search-bar",
		);
		this.searchBar.addEventListener(
			"input",
			this.searchChampions.bind(this),
		);
		if (this.searchBar.value != "") this.searchChampions();

		this.notificationCenter.subscribe(
			"key",
			this.handleKeyEvent.bind(this),
		);
		this.notificationCenter.subscribe(
			"championNamesDisplayOnHoverInTheChampionSelectionChanged",
			this.render.bind(this),
		);
	}

	render() {
		this.championSelection.innerHTML = "";

		const championNameContainers = document.querySelectorAll(
			".champion-name-container-on-hover",
		);
		if (championNameContainers != null) {
			for (let i = 0; i < championNameContainers.length; i++) {
				championNameContainers[i].remove();
			}
		}
		const champions = this.championSelectionViewModel.getChampions();

		const nameOnHover =
			this.championSelectionViewModel.getNameOnHoverSetting();
		for (let i = 0; i < champions.length; i++) {
			this.createChampionIcon(champions[i], nameOnHover);
		}
	}

	createChampionIcon(champion, nameOnHover) {
		const championIcon = document.createElement("img");

		championIcon.classList = "champion-icon";
		championIcon.src =
			"./assets/img/champion_icons/" + capitalize(champion) + ".webp";
		championIcon.alt = champion;

		championIcon.draggable = true;

		this.championSelection.appendChild(championIcon);

		championIcon.addEventListener("dragstart", () => {
			const dragImage = document.createElement("img");
			dragImage.src = event.target.src;
			dragImage.id = "drag-image";
			const width = event.target.offsetWidth;
			const height = event.target.offsetHeight;
			document.body.appendChild(dragImage);

			event.dataTransfer.setDragImage(dragImage, width / 2, height / 2);

			const dragData = JSON.stringify({
				tier: null,
				champion: champion,
			});
			event.dataTransfer.clearData();
			event.dataTransfer.setData("text/plain", dragData);
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
				const championNameContainer = document.querySelector(
					".champion-name-container-on-hover",
				);

				if (championNameContainer != null) {
					championNameContainer.remove();
				}
			});
		}
	}

	searchChampions() {
		const search_query = this.searchBar.value.trim().toLowerCase();
		this.championSelectionViewModel.searchChampions(search_query);

		this.render();
	}

	handleKeyEvent(data) {
		if (data.shift) {
			this.searchBar.blur();
			return;
		}
		if (data.target != "mainScreen") {
			this.searchBar.blur();
			return;
		}
		const key = data.key;
		const letterRegex = /^[A-Za-z]$/;
		if (key.match(letterRegex)) {
			if (document.activeElement != this.searchBar) {
				this.searchBar.value = "";
			}
			this.searchBar.focus();
			return;
		} else if (key == "Backspace") {
			if (document.activeElement != this.searchBar) {
				this.searchBar.focus();
				const length = this.searchBar.value.length;
				this.searchBar.setSelectionRange(length, length);
			}
		} else {
			this.searchBar.blur();
		}
	}
}
