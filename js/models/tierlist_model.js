export default class TierlistModel {
	constructor() {
		this.defaultData = [
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
	}

	getSavedTierlist() {
		let tierlistData = localStorage.getItem("tierlist");

		if (tierlistData == null) return this.defaultData;

		return JSON.parse(tierlistData);
	}

	saveTierlist(tiers) {
		localStorage.setItem("tierlist", JSON.stringify(tiers));
	}
}
