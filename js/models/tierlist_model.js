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

	addTier(tier) {
		this.tiers.push(tier);
	}

	removeTier(index) {
		this.tiers.slice(index, 1);
	}

	getTiers() {
		return this.tiers;
	}

	addChampion(champion, index) {
		if (!this.tiers[index].champions.includes(champion)) {
			this.tiers[index].champions.push(champion);
		}
	}

	removeChampion(index, champion) {
		const champion_index = this.tiers[index].champions.findIndex(
			(element) => element == champion,
		);

		this.tiers[index].champions.splice(champion_index, 1);
	}
}
