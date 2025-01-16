import DataController from "./data_controller.js";
import UserInterface from "./user_interface.js";

export default class Controller {
	/** @constructor
	 *  @param {UserInterface} userInterface
	 * */
	constructor(userInterface) {
		this.userInterface = userInterface;
		this.userInterface.processSignal = this.process.bind(this);
	}

	process() {
		const request = {
			searchQuery: this.userInterface.getSearchQuery(),
		};
		const championSelectionChampions =
			DataController.getChampionSelectionChampions(request);

		const tiers = DataController.getTiers();
		/** @type {RenderingData}*/
		const renderingData = {
			tiers: tiers,
			championSelectionChampions: championSelectionChampions,
		};
		this.userInterface.render(renderingData);
	}
}
