import { default_data } from "./default_data.js";

export default class DataController {
	constructor() {}
	static getChampionSelectionChampions(request) {
		let data = default_data;

		data = this.filterChampionsBySearchQuery(data, request.searchQuery);
		data = this.removeDuplicates(data);

		return data;
	}

	static filterChampionsBySearchQuery(data, searchQuery) {
		if (searchQuery == "") return data;

		const newData = [];
		data = data.sort();

		for (let i = 0; i < data.length; i++) {
			if (data[i] == searchQuery) newData.push(data[i]);
		}

		for (let i = 0; i < data.length; i++) {
			if (data[i].includes(searchQuery)) newData.push(data[i]);
		}
		let query_index = 0;
		for (let i = 0; i < data.length; i++) {
			query_index = 0;
			for (let j = 0; j < data[i].length; j++) {
				if (searchQuery[query_index] === data[i][j]) {
					query_index += 1;
				}
				if (query_index === searchQuery.length) {
					newData.push(data[i]);
					break;
				}
			}
		}
		return newData;
	}

	static removeDuplicates(data) {
		const newData = [];

		for (let i = 0; i < data.length; i++) {
			if (!newData.includes(data[i])) {
				newData.push(data[i]);
			}
		}

		return newData;
	}
}
