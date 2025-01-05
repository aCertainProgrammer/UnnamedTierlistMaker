import { capitalize } from "../util.js";
export class ChampionSelectionView {
	constructor(viewModel) {
		this.viewModel = viewModel;
		this.championSelection = document.getElementById("champion-selection");
	}

	render() {
		this.championSelection.innerHTML = [];
		const champions = this.viewModel.getChampions();

		console.log(champions);
		for (let i = 0; i < champions.length; i++) {
			this.createChampionIcon(champions[i]);
		}
	}

	createChampionIcon(champion) {
		const championIcon = document.createElement("img");

		championIcon.classList = "champion-icon";
		championIcon.src =
			"./img/champion_icons/small_converted_to_webp_scaled/" +
			capitalize(champion) +
			".webp";
		championIcon.alt = champion;

		championIcon.draggable = true;

		this.championSelection.appendChild(championIcon);

		championIcon.addEventListener("dragstart", () => {
			let dragImage = document.createElement("img");
			dragImage.src = event.target.src;
			dragImage.id = "drag-image";
			let width = event.target.offsetWidth;
			let height = event.target.offsetHeight;
			document.body.appendChild(dragImage);

			event.dataTransfer.setDragImage(dragImage, width / 2, height / 2);
			event.dataTransfer.setData("text/plain", champion);
		});

		championIcon.addEventListener("dragend", () => {
			event.preventDefault();
			const dragImage = document.querySelector("#drag-image");
			document.body.removeChild(dragImage);
		});
	}
}
