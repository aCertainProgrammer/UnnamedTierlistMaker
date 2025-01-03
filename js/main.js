import { TierlistView } from "./views/tierlist_view.js";
import { TierlistModel } from "./models/tierlist_model.js";
import { TierlistViewModel } from "./viewmodels/tierlist_viewmodel.js";
import { ChampionSelectionView } from "./views/champion_selection_view.js";
import { ChampionSelectionModel } from "./models/champion_selection_model.js";
import { ChampionSelectionViewModel } from "./viewmodels/champion_selection_viewmodel.js";

document.addEventListener("DOMContentLoaded", () => {
	const tierlist_model = new TierlistModel();
	const tierlist_viewmodel = new TierlistViewModel(tierlist_model);
	const tierlist_view = new TierlistView(tierlist_viewmodel);

	const champion_selection_model = new ChampionSelectionModel();
	const champion_selection_viewmodel = new ChampionSelectionViewModel(
		champion_selection_model,
	);
	const champion_selection_view = new ChampionSelectionView(
		champion_selection_viewmodel,
	);
});
