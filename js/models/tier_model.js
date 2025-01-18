export default class TierModel {
	constructor(name) {
		this.name = name;
		this.champions = [];
		this.color = "tomato";
	}

	addChampion(champion) {
		this.removeChampion(champion);
		this.champions.push(champion);
	}

	addChampionAtIndex(champion, index) {
		this.removeChampion(champion);
		this.champions.splice(index, 0, champion);
	}

	removeChampion(champion) {
		const champion_index = this.champions.findIndex(
			(element) => element == champion,
		);
		if (champion_index == -1) return;

		this.champions.splice(champion_index, 1);
	}

	setName(name) {
		this.name = name;
	}

	setColor(color) {
		this.color = color;
	}

	getTier() {
		return {
			name: this.name,
			champions: this.champions,
			color: this.color,
		};
	}
}
