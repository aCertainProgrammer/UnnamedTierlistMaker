import AppView from "./views/app_view.js";
import AppViewModel from "./viewmodels/app_viewmodel.js";
document.addEventListener("DOMContentLoaded", () => {
	const appViewmodel = new AppViewModel();
	const appView = new AppView(appViewmodel);
	appView.render();
});

document.documentElement.addEventListener("dragstart", () => {
	if (!event.target.draggable == true) event.preventDefault();
});
