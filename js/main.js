import MainScreenViewModel from "./viewmodels/main_screen_viewmodel.js";
import MainScreenView from "./views/main_screen_view.js";
document.addEventListener("DOMContentLoaded", () => {
	const main_screen_viewmodel = new MainScreenViewModel();
	const main_screen_view = new MainScreenView(main_screen_viewmodel);
	main_screen_view.render();
});
