import recipes from "../data/recipes.js";
import { Option1 } from "./option1.js";

document.addEventListener("DOMContentLoaded", function () {
	// Affichage des recettes par default
	displayRecipes(recipes);

	// Instanciation de l'option 1
	const option1 = new Option1();

	const searchInput = document.getElementById("search-input");
	searchInput.addEventListener("input", function () {
		option1.handleInputAndTags(function (results) {
			displayRecipes(results);
		});
	});

	function countRecipes(count) {
		const numbersRecipe = document.getElementById("numbers-recipe");
		numbersRecipe.textContent = count;
	}

	function displayRecipes(results) {
		const ul = document.getElementById("ul-list-recettes");
		const listRecettesDiv = document.getElementById("list-recettes");

		ul.style.display = "flex";
		ul.textContent = "";

		for (const result of results) {
			const li = document.createElement("li");
			li.classList.add(
				"flex",
				"w-[517px]",
				"flex-col",
				"rounded-[21px]",
				"bg-white",
				"relative"
			);

			const timeDiv = document.createElement("div");
			timeDiv.classList.add(
				"bg-[#FFD15B]",
				"rounded-full",
				"absolute",
				"top-3",
				"right-3"
			);

			const timeP = document.createElement("p");
			timeP.classList.add(
				"font-manrope",
				"text-[#1B1B1B]",
				"text-xs",
				"px-5",
				"py-1"
			);
			timeP.textContent = result.time + " min";

			const img = document.createElement("img");
			img.src = "./assets/images/" + `${result.image}`;
			img.classList.add(
				"w-full",
				"object-cover",
				"h-[253px]",
				"rounded-tl-[21px]",
				"rounded-tr-[21px]"
			);
			img.alt = result.name;

			const contentDiv = document.createElement("div");
			contentDiv.classList.add("px-6", "pb-[61px]");

			const titleH4 = document.createElement("h4");
			titleH4.classList.add("font-anton", "color-[#1B1B1B]", "text-xl", "mt-8");
			titleH4.textContent = result.name;

			const recette = document.createElement("p");
			recette.classList.add(
				"font-manrope",
				"color-[#7A7A7A]",
				"text-xs",
				"mt-8"
			);
			recette.textContent = "RECETTE";

			const descriptionP = document.createElement("p");
			descriptionP.classList.add(
				"font-manrope",
				"color-[#1B1B1B]",
				"text-sm",
				"mt-3"
			);
			descriptionP.textContent = result.description;

			const ingredientsTitle = document.createElement("p");
			ingredientsTitle.classList.add(
				"font-manrope",
				"color-[#7A7A7A]",
				"text-xs",
				"mt-8"
			);
			ingredientsTitle.textContent = "Ingrédients";

			const ingredientsUl = document.createElement("ul");
			ingredientsUl.classList.add("w-full", "flex", "flex-row", "flex-wrap");

			const ingredientsData = result.ingredients;

			for (const ingredient in ingredientsData) {
				const currentItem = ingredientsData[ingredient];

				const li = document.createElement("li");
				li.classList.add("w-1/2", "mt-5");

				const name = document.createElement("p");
				name.classList.add(
					"font-manrope",
					"color-[#1B1B1B]",
					"text-sm",
					"font-medium"
				);
				name.textContent = currentItem.ingredient;

				const quantity = document.createElement("p");
				quantity.classList.add("font-manrope", "color-[#7A7A7A]", "text-sm");
				currentItem.unit
					? (quantity.textContent =
              currentItem.quantity + " " + currentItem.unit)
					: (quantity.textContent = currentItem.quantity);

				li.appendChild(name);
				li.appendChild(quantity);
				ingredientsUl.appendChild(li);
			}
			// Ajoute les éléments à la structure DOM
			timeDiv.appendChild(timeP);
			li.appendChild(timeDiv);
			li.appendChild(img);
			contentDiv.appendChild(titleH4);
			contentDiv.appendChild(recette);
			contentDiv.appendChild(descriptionP);
			contentDiv.appendChild(ingredientsTitle);
			contentDiv.appendChild(ingredientsUl);
			li.appendChild(contentDiv);
			ul.appendChild(li);
			listRecettesDiv.appendChild(ul);
		}
		countRecipes(results.length);
	}

	// Suppression du texte de la barre de recherche dans le header
	const clearButton = document.getElementById("clear-button");

	clearButton.style.display = "none";

	searchInput.addEventListener("input", function () {
		clearInput(searchInput, clearButton);
	});

	// Suppression du texte de la barre de recherche dans la dropdown
	// Ingredients
	const searchInputDopdownIngredient = document.getElementById(
		"search-input-dropdown-ingredients"
	);
	const clearButtonDropdownIngredient = document.getElementById(
		"clear-button-dropdown-ingredients"
	);

	clearButtonDropdownIngredient.style.display = "none";

	searchInputDopdownIngredient.addEventListener("input", function () {
		clearInput(searchInputDopdownIngredient, clearButtonDropdownIngredient);
	});

	// Appareils
	const searchInputDopdownAppareils = document.getElementById(
		"search-input-dropdown-appareils"
	);
	const clearButtonDropdownAppareils = document.getElementById(
		"clear-button-dropdown-appareils"
	);

	clearButtonDropdownAppareils.style.display = "none";

	searchInputDopdownAppareils.addEventListener("input", function () {
		clearInput(searchInputDopdownAppareils, clearButtonDropdownAppareils);
	});

	// Ustensiles
	const searchInputDopdownUstensiles = document.getElementById(
		"search-input-dropdown-ustensiles"
	);
	const clearButtonDropdownUstensiles = document.getElementById(
		"clear-button-dropdown-ustensiles"
	);

	clearButtonDropdownUstensiles.style.display = "none";

	searchInputDopdownUstensiles.addEventListener("input", function () {
		clearInput(searchInputDopdownUstensiles, clearButtonDropdownUstensiles);
	});

	function clearInput(searchInput, clearButton) {
		searchInput.addEventListener("input", function () {
			searchInput.value.trim() === ""
				? (clearButton.style.display = "none")
				: (clearButton.style.display = "block");
		});

		clearButton.addEventListener("click", function () {
			searchInput.value = "";
			clearButton.style.display = "none";
			if(searchInput.value === "" && option1.getSelectedTags().length === 0) {
				option1.updateUI(recipes, searchInput, function (results) {
					displayRecipes(results);
				});
			} else if(searchInput.value === "" && option1.getSelectedTags().length > 0) {
				option1.valueTags(function (results) {
					displayRecipes(results);
				});
			}
		});
	}

	function setupDropdown(buttonId, menuId, chevronId) {
		const button = document.getElementById(buttonId);
		const menu = document.getElementById(menuId);
		const chevron = document.getElementById(chevronId);

		menu.style.display = "none";

		// Ouvrir/fermer la dropdown lors du clic sur le bouton
		button.addEventListener("click", function () {
			if (menu.style.display === "block") {
				menu.style.display = "none";
				chevron.classList.remove("rotate-180");
			} else {
				menu.style.display = "block";
				chevron.classList.add("rotate-180");
			}
		});

		// Fermer la dropdown lors d'un clic en dehors
		document.addEventListener("click", function (event) {
			if (!menu.contains(event.target) && !button.contains(event.target)) {
				menu.style.display = "none";
				chevron.classList.remove("rotate-180");
			}
		});
	}

	function createIngredientsDropdown() {
		const allIngredients = option1.getUniqueIngredients();
		const listIngredientsDiv = document.getElementById("list-ingredients");
		const ul = document.getElementById("ul-dropdown-ingredients");
		const input = document.getElementById("search-input-dropdown-ingredients");
		const clearButton = document.getElementById("clear-button-dropdown-ingredients");
	
		function displayRecipesAndTags(ingredient) {
			option1.addTags(ingredient, function (results) {
				displayRecipes(results);
			});
			option1.valueTags(function (results) {
				displayRecipes(results);
			});
		}
	
		function handleIngredientClick(ingredient) {
			console.log(ingredient);
			displayRecipesAndTags(ingredient);
		}
	
		function updateVisibility(inputValue) {
			allIngredients.forEach((ingredient) => {
				const ingredientElement = document.getElementById(ingredient);
				if (ingredientElement) {
					const includesInput = ingredient.includes(inputValue);
					ingredientElement.style.display = includesInput ? "block" : "none";
	
					// Supprimer les anciens écouteurs d'événements pour éviter les doublons
					ingredientElement.removeEventListener("click", () => {});
					
					if (includesInput) {
						ingredientElement.addEventListener("click", function () {
							handleIngredientClick(ingredient);
						});
					}
				}
			});
		}
	
		ul.addEventListener("click", function (event) {
			const target = event.target;
			if (target.tagName === "LI") {
				const ingredient = target.id;
				handleIngredientClick(ingredient);
			}
		});
	
		input.addEventListener("input", function () {
			const inputValue = input.value.toLowerCase();
			updateVisibility(inputValue);
		});
	
		input.addEventListener("blur", function () {
			input.value = "";
			clearButton.style.display = "none";
			allIngredients.forEach((ingredient) => {
				const ingredientElement = document.getElementById(ingredient);
				ingredientElement.style.display = "block";
			});
		});
	
		clearButton.addEventListener("click", function () {
			allIngredients.forEach((ingredient) => {
				const ingredientElement = document.getElementById(ingredient);
				ingredientElement.style.display = "block";
			});
		});
	
		allIngredients.forEach((ingredient) => {
			const li = document.createElement("li");
			li.classList.add(
				"block",
				"px-4",
				"py-2",
				"text-sm",
				"text-gray-700",
				"hover:bg-[#FFD15B]"
			);
			li.setAttribute("role", "menuitem");
			li.setAttribute("id", ingredient);
			li.textContent = capitalizeFirstLetter(ingredient);
	
			ul.appendChild(li);
			listIngredientsDiv.appendChild(ul);
		});
	}
	

	function createAppareilsDropdown() {
		const allAppareils = option1.getUniqueAppareils();
		const listIngredientsDiv = document.getElementById("list-appareils");
		const ul = document.getElementById("ul-dropdown-appareils");
		const input = document.getElementById("search-input-dropdown-appareils");
		const clearButton = document.getElementById("clear-button-dropdown-appareils");
	
		function displayRecipesAndTags(appareil) {
			option1.addTags(appareil, function (results) {
				displayRecipes(results);
			});
			option1.valueTags(function (results) {
				displayRecipes(results);
			});
		}
	
		function handleAppareilClick(appareil) {
			console.log(appareil);
			displayRecipesAndTags(appareil);
		}
	
		function updateVisibility(inputValue) {
			allAppareils.forEach((appareil) => {
				const appareilElement = document.getElementById(appareil);
				if (appareilElement) {
					const includesInput = appareil.includes(inputValue);
					appareilElement.style.display = includesInput ? "block" : "none";
				}
			});
		}
	
		ul.addEventListener("click", function (event) {
			const target = event.target;
			if (target.tagName === "LI") {
				const appareil = target.id;
				handleAppareilClick(appareil);
			}
		});
	
		input.addEventListener("input", function () {
			const inputValue = input.value.trim().toLowerCase();
			updateVisibility(inputValue);
		});
	
		input.addEventListener("blur", function () {
			input.value = "";
			clearButton.style.display = "none";
			allAppareils.forEach((appareil) => {
				const appareilElement = document.getElementById(appareil);
				appareilElement.style.display = "block";
			});
		});
	
		clearButton.addEventListener("click", function () {
			allAppareils.forEach((appareil) => {
				const appareilElement = document.getElementById(appareil);
				appareilElement.style.display = "block";
			});
		});
	
		allAppareils.forEach((appareil) => {
			const li = document.createElement("li");
			li.classList.add(
				"block",
				"px-4",
				"py-2",
				"text-sm",
				"text-gray-700",
				"hover:bg-[#FFD15B]"
			);
			li.setAttribute("role", "menuitem");
			li.setAttribute("id", appareil);
			li.textContent = capitalizeFirstLetter(appareil);
	
			ul.appendChild(li);
			listIngredientsDiv.appendChild(ul);
		});
	}
	
	function createUstensilesDropdown() {
		const allUstensiles = option1.getUniqueUstensiles();
		const listIngredientsDiv = document.getElementById("list-ustensiles");
		const ul = document.getElementById("ul-dropdown-ustensiles");
		const input = document.getElementById("search-input-dropdown-ustensiles");
		const clearButton = document.getElementById("clear-button-dropdown-ustensiles");
	
		function displayRecipesAndTags(ustensile) {
			option1.addTags(ustensile, function (results) {
				displayRecipes(results);
			});
			option1.valueTags(function (results) {
				displayRecipes(results);
			});
		}
	
		function handleUstensileClick(ustensile) {
			console.log(ustensile);
			displayRecipesAndTags(ustensile);
		}
	
		function updateVisibility(inputValue) {
			allUstensiles.forEach((ustensile) => {
				const ustensilElement = document.getElementById(ustensile);
				if (ustensilElement) {
					const includesInput = ustensile.includes(inputValue);
					ustensilElement.style.display = includesInput ? "block" : "none";
	
					// Supprimer les anciens écouteurs d'événements pour éviter les doublons
					ustensilElement.removeEventListener("click", () => {});
					
					if (includesInput) {
						ustensilElement.addEventListener("click", function () {
							handleUstensileClick(ustensile);
						});
					}
				}
			});
		}
	
		ul.addEventListener("click", function (event) {
			const target = event.target;
			if (target.tagName === "LI") {
				const ustensile = target.id;
				handleUstensileClick(ustensile);
			}
		});
	
		input.addEventListener("input", function () {
			const inputValue = input.value.toLowerCase();
			updateVisibility(inputValue);
		});
	
		input.addEventListener("blur", function () {
			input.value = "";
			clearButton.style.display = "none";
			allUstensiles.forEach((ustensile) => {
				const ustensileElement = document.getElementById(ustensile);
				ustensileElement.style.display = "block";
			});
		});
	
		clearButton.addEventListener("click", function () {
			allUstensiles.forEach((ustensile) => {
				const ustensileElement = document.getElementById(ustensile);
				ustensileElement.style.display = "block";
			});
		});
	
		allUstensiles.forEach((ustensile) => {
			const li = document.createElement("li");
			li.classList.add(
				"block",
				"px-4",
				"py-2",
				"text-sm",
				"text-gray-700",
				"hover:bg-[#FFD15B]"
			);
			li.setAttribute("role", "menuitem");
			li.setAttribute("id", ustensile);
			li.textContent = capitalizeFirstLetter(ustensile);
	
			ul.appendChild(li);
			listIngredientsDiv.appendChild(ul);
		});
	}

	function capitalizeFirstLetter(word) {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}

	function init() {
		// Création des dropwdowns
		createIngredientsDropdown();
		createAppareilsDropdown();
		createUstensilesDropdown();

		// Appel de la fonction pour configurer les trois dropdowns
		setupDropdown(
			"dropdown-button-ingredients",
			"dropdown-menu-ingredients",
			"dropdown-chevron-ingredients"
		);
		setupDropdown(
			"dropdown-button-appareils",
			"dropdown-menu-appareils",
			"dropdown-chevron-appareils"
		);
		setupDropdown(
			"dropdown-button-ustensiles",
			"dropdown-menu-ustensiles",
			"dropdown-chevron-ustensiles"
		);
	}
	init();
});
