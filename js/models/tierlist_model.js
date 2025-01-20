export class TierlistModel {
	constructor() {
		this.tiers = [
			{
				name: "S",
				champions: ["camille", "renekton", "chogath"],
			},
			{
				name: "A",
				champions: [
					"aurora",
					"ahri",
					"aatrox",
					"lillia",
					"fiora",
					"kassadin",
				],
			},
			{
				name: "B",
				champions: ["leona", "irelia", "yuumi"],
			},
			{
				name: "F",
				champions: ["gnar", "udyr", "ivern"],
			},
		];
	}

	addTier() {
		this.tiers.push({ name: "X", champions: [] });
	}

	removeTier(index) {
		this.tiers.splice(index, 1);
	}

	getTiers() {
		return this.tiers;
	}

	addChampion(champion, index) {
		this.tiers[index].addChampion(champion);
	}

	addChampionAtIndex(tierIndex, championIndex, champion) {
		this.tiers[tierIndex].champions.splice(championIndex, 0, champion);
	}

	removeChampion(index, champion) {
		const champion_index = this.tiers[index].champions.findIndex(
			(element) => element == champion,
		);
		if (champion_index == -1) return;

		this.tiers[index].champions.splice(champion_index, 1);
	}

	changeTierName(index, name) {
		this.tiers[index].name = name;
	}
}
