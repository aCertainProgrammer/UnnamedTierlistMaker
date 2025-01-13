import { default_data } from "../default_data.js";

export class ChampionSelectionModel {
	constructor() {
		this.champions = default_data;
	}

	addChampion(champion) {
		this.champions.push(champion);
	}

	removeChampion(index) {
		this.champions.splice(index, 1);
	}

	getChampions() {
		return this.champions;
	}

	searchChampions(search_query) {
		if (search_query == "") {
			this.champions = default_data;
			return;
		}

		let data = default_data;

		const new_data = [];
		data = data.sort();

		for (let i = 0; i < data.length; i++) {
			if (data[i] == search_query) new_data.push(data[i]);
		}

		for (let i = 0; i < data.length; i++) {
			if (data[i].includes(search_query) && !new_data.includes(data[i]))
				new_data.push(data[i]);
		}
		let query_index = 0;
		for (let i = 0; i < data.length; i++) {
			query_index = 0;
			for (let j = 0; j < data[i].length; j++) {
				if (search_query[query_index] === data[i][j]) {
					query_index += 1;
				}
				if (
					query_index === search_query.length &&
					!new_data.includes(data[i])
				) {
					new_data.push(data[i]);
					break;
				}
			}
		}
		this.champions = new_data;
	}
}
