import { capitalize } from "../util.js";
export default class SettingsView {
	constructor(settingsViewModel) {
		this.settingsViewModel = settingsViewModel;
		this.notificationCenter = this.settingsViewModel.notificationCenter;

		this.notificationCenter.subscribe(
			"openSettings",
			this.openSettings.bind(this),
		);
		this.notificationCenter.subscribe(
			"key",
			this.handleKeyInput.bind(this),
		);

		this.settingsContainer = document.getElementById("settings-container");
		this.visible = false;
		const settings = this.settingsViewModel.getSettings();

		this.closeSettingsButton = document.getElementById(
			"close-settings-button",
		);
		this.closeSettingsButton.addEventListener("click", () => {
			this.visible = false;
			this.render();
		});

		this.championIconPaddingSetter = document.getElementById(
			"champion-icon-padding-setter",
		);
		this.championIconPaddingSetter.value = settings.championIconPadding;
		this.championIconPaddingSetter.addEventListener(
			"input",
			this.setChampionIconPadding.bind(this),
		);

		this.championNamesOnHoverTierlistToggle = document.getElementById(
			"champion-names-on-hover-tierlist-toggle",
		);
		this.championNamesOnHoverTierlistToggle.addEventListener(
			"click",
			this.setChampionNamesOnHoverInTheTierlist.bind(this),
		);

		this.championNamesOnHoverChampionSelectionToggle =
			document.getElementById(
				"champion-names-on-hover-champion-selection-toggle",
			);
		this.championNamesOnHoverChampionSelectionToggle.addEventListener(
			"click",
			this.setChampionNamesOnHoverInTheChampionSelection.bind(this),
		);

		this.tierlistPreview = this.createTierlistPreview();
		this.notSettingsUtils = document.getElementById("not-settings-utils");
		this.notSettingsUtils.appendChild(this.tierlistPreview);
	}

	render() {
		if (this.visible == false) {
			if (!this.settingsContainer.classList.contains("hidden")) {
				this.settingsContainer.classList.add("hidden");
			}
			return;
		}

		if (this.settingsContainer.classList.contains("hidden")) {
			this.settingsContainer.classList.remove("hidden");
		}

		this.tierlistPreview.remove();
		this.tierlistPreview = this.createTierlistPreview();
		this.notSettingsUtils.appendChild(this.tierlistPreview);
		this.colorSettingsButtons();
	}

	openSettings() {
		this.visible = true;
		this.render();
	}

	handleKeyInput(data) {
		if (data.target != "settingsScreen") {
			return;
		}
		const key = data.key;
		const isShiftPressed = data.shift;

		if (!isShiftPressed) {
			return;
		}

		if (key.toLowerCase() == "s") {
			this.closeSettingsButton.click();
		}
	}

	setChampionIconPadding() {
		let padding = event.target.value.trim();
		if (padding < 0) {
			event.target.value = 0;
			padding = 0;
		}
		if (padding > 40) {
			event.target.value = 40;
			padding = 40;
		}
		this.settingsViewModel.setChampionIconPadding(padding);
		this.render();
	}

	setChampionNamesOnHoverInTheTierlist() {
		this.settingsViewModel.setChampionNamesOnHoverInTheTierlist();
		this.colorSettingsButtons();
	}

	setChampionNamesOnHoverInTheChampionSelection() {
		this.settingsViewModel.setChampionNamesOnHoverInTheChampionSelection();
		this.colorSettingsButtons();
	}

	colorSettingsButtons() {
		const settings = this.settingsViewModel.getSettings();
		const buttons = [
			this.championNamesOnHoverTierlistToggle,
			this.championNamesOnHoverChampionSelectionToggle,
		];
		const properties = [
			settings.championNamesDisplayOnHoverInTheTierlist,
			settings.championNamesDisplayOnHoverInTheChampionSelection,
		];

		for (let i = 0; i < buttons.length; i++) {
			if (properties[i] == true) {
				buttons[i].dataset.state = "on";
				buttons[i].value = "On";
			} else {
				buttons[i].dataset.state = "off";
				buttons[i].value = "Off";
			}
		}
	}

	createTierlistPreview() {
		const tierlistPreviewContainer = document.createElement("div");
		tierlistPreviewContainer.classList.add("tierlist-container");
		tierlistPreviewContainer.classList.add("tierlist-preview-container");

		const tierlistPreviewData = {
			name: "SKT tierlist",
			tiers: [
				{
					name: "Toplane",
					champions: ["camille", "ornn", "renekton", "jayce"],
					color: "deepskyblue",
				},
				{
					name: "Jungle",
					champions: ["vi", "wukong", "lillia"],
					color: "limegreen",
				},
				{
					name: "Midlane",
					champions: ["syndra", "viktor", "azir"],
					color: "yellow",
				},
				{
					name: "Botlane",
					champions: ["missfortune", "kaisa", "xayah"],
					color: "orange",
				},
				{
					name: "Support",
					champions: [
						"rell",
						"leona",
						"nautilus",
						"alistar",
						"rakan",
					],
					color: "tomato",
				},
			],
		};

		const tierlistName = document.createElement("input");
		tierlistName.type = "text";
		tierlistName.classList.add("tierlist-name");
		tierlistName.value = tierlistPreviewData.name;
		tierlistPreviewContainer.appendChild(tierlistName);

		const tierlistPreviewTierlist = document.createElement("div");
		tierlistPreviewTierlist.classList.add("tierlist");

		for (let i = 0; i < tierlistPreviewData.tiers.length; i++) {
			const tier = this.createTierlistPreviewTier(
				tierlistPreviewData.tiers[i],
			);
			tierlistPreviewTierlist.appendChild(tier);
		}

		tierlistPreviewContainer.appendChild(tierlistPreviewTierlist);

		return tierlistPreviewContainer;
	}

	createTierlistPreviewTier(tierData) {
		const tierContainer = document.createElement("div");
		tierContainer.classList.add("tier-container");

		const tierName = document.createElement("div");
		tierName.classList.add("tier-name");
		tierName.style.backgroundColor = tierData.color;
		tierName.innerText = tierData.name;

		tierContainer.appendChild(tierName);

		const tierChampions = document.createElement("div");
		tierChampions.classList.add("tier-champions");

		const settings = this.settingsViewModel.getSettings();
		const padding = settings.championIconPadding;

		for (let i = 0; i < tierData.champions.length; i++) {
			const championIcon = this.createChampionIcon(
				tierData.champions[i],
				padding,
			);
			tierChampions.appendChild(championIcon);
		}

		tierContainer.appendChild(tierChampions);

		return tierContainer;
	}

	createChampionIcon(champion, padding) {
		const championIcon = document.createElement("img");
		championIcon.classList.add("champion-icon");
		championIcon.src =
			"./assets/img/champion_icons/" + capitalize(champion) + ".webp";
		championIcon.style.padding = padding + "px";
		championIcon.draggable = false;
		return championIcon;
	}
}
