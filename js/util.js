/** Capitalizes a string
 * @param {string}
 * @returns {string}
 */
export function capitalize(string) {
	if (string == null) return "";
	let newString = "";
	newString += string[0].toUpperCase();
	for (let i = 1; i < string.length; i++) {
		newString += string[i];
	}
	return newString;
}

/**
 * Prettifies champion names
 * @param {string} name
 * @returns {string} pretty_name
 */
export function prettifyChampionName(name) {
	switch (name) {
		case "aurelionsol":
			name = "Aurelion Sol";
			break;
		case "belveth":
			name = "Bel'Veth";
			break;
		case "chogath":
			name = "Cho'Gath";
			break;
		case "drmundo":
			name = "Dr. Mundo";
			break;
		case "ksante":
			name = "K'Sante";
			break;
		case "kaisa":
			name = "Kai'sa";
			break;
		case "khazix":
			name = "Kha'Zix";
			break;
		case "kogmaw":
			name = "Kog'Maw";
			break;
		case "leesin":
			name = "Lee Sin";
			break;
		case "masteryi":
			name = "Master Yi";
			break;
		case "missfortune":
			name = "Miss Fortune";
			break;
		case "reksai":
			name = "Rek'Sai";
			break;
		case "tahmkench":
			name = "Tahm Kench";
			break;
		case "twistedfate":
			name = "Twisted Fate";
			break;
		case "velkoz":
			name = "Vel'Koz";
			break;
		case "xinzhao":
			name = "Xin Zhao";
			break;
		default:
			name = capitalize(name);
	}
	return name;
}
