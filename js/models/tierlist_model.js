export default class TierlistModel {
	constructor() {}

	getSavedTierlist() {
		const defaultData = [
			{
				name: "S",
				champions: [],
				color: "deepskyblue",
			},
			{
				name: "A",
				champions: [],
				color: "limegreen",
			},
			{
				name: "B",
				champions: [],
				color: "yellow",
			},
			{
				name: "C",
				champions: [],
				color: "orange",
			},
			{
				name: "F",
				champions: [],
				color: "tomato",
			},
		];

		const tierlistData = localStorage.getItem("tierlist");

		if (tierlistData == null) {
			return defaultData;
		}

		return JSON.parse(tierlistData);
	}

	saveTierlist(tiers) {
		localStorage.setItem("tierlist", JSON.stringify(tiers));
	}

	clearTierlist() {
		localStorage.removeItem("tierlist");
	}
}
