import { capitalize } from "../util.js";
export class TierlistView {
	constructor(tierlistViewModel) {
		this.tierlistViewModel = tierlistViewModel;

		this.tierlistContainer = document.getElementById("tierlist");

		this.dropFunction = function (index) {
			const dropData = JSON.parse(
				event.dataTransfer.getData("text/plain"),
			);
			const champion = dropData.champion;

			this.tierlistViewModel.addChampion(champion, index);
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
			});

			tier.addEventListener("dragover", () => {
				event.preventDefault();
			});

			tier.addEventListener("drop", this.dropFunction.bind(this, i));
		}
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
