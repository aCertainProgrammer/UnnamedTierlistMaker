import localStorageStrings from "../constants.js";
export default class TierlistModel {
	constructor() {}

	getSavedTierlist() {
		const defaultData = {
			name: "My tierlist",
			tiers: [
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
			],
		};

		const tierlistData = localStorage.getItem(
			localStorageStrings.tierlistSaveLocation,
		);

		if (tierlistData == null) {
			return defaultData;
		}

		return JSON.parse(tierlistData);
	}

	saveTierlist(tiers, name) {
		const tierlist = {
			name: name,
			tiers: tiers,
		};
		localStorage.setItem(
			localStorageStrings.tierlistSaveLocation,
			JSON.stringify(tierlist),
		);
	}

	clearTierlist() {
		localStorage.removeItem(localStorageStrings.tierlistSaveLocation);
	}

	loadPoolTemplate() {
		const poolTemplate = [
			{
				name: "Top",
				champions: [],
				color: "deepskyblue",
			},
			{
				name: "Jungle",
				champions: [],
				color: "limegreen",
			},
			{
				name: "Mid",
				champions: [],
				color: "yellow",
			},
			{
				name: "Bottom",
				champions: [],
				color: "orange",
			},
			{
				name: "Support",
				champions: [],
				color: "tomato",
			},
		];

		return poolTemplate;
	}
}
