import AppView from "./views/app_view.js";
import AppViewModel from "./viewmodels/app_viewmodel.js";
import NotificationCenter from "./notification_center.js";

document.addEventListener("DOMContentLoaded", () => {
	const notification_center = new NotificationCenter();
	const appViewmodel = new AppViewModel(notification_center);
	const appView = new AppView(appViewmodel);
	appView.render();
});

document.documentElement.addEventListener("dragstart", () => {
	if (!event.target.draggable == true) event.preventDefault();
});
