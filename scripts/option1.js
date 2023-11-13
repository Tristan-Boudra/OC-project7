import recipes from "../data/recipes.js";

let allTags = [];

export class Option1 {
	removeAccents(input) {
		const accents = "ÀÁÂÃÄÅàáâãäåÇçèéêëÈÉÊËìíîïÌÍÎÏñÑÒÓÔÕÖØòóôõöøÙÚÛÜùúûüÝÿ";
		const accentsOut =
      "AAAAAAaaaaaaCcEEEEEEEEiiiiIIIIiiNNOOOOOOOooooooUUUUuuuuYy";
		return input
			.split("")
			.map((letter) => {
				const index = accents.indexOf(letter);
				return index !== -1 ? accentsOut[index] : letter;
			})
			.join("");
	}

	getUniqueIngredients() {
		const uniqueIngredients = new Set();

		recipes.forEach((recipe) => {
			recipe.ingredients.forEach((ingredient) => {
				const oneIngredient = ingredient.ingredient;
				const itemIngredient = this.removeAccents(oneIngredient);
				uniqueIngredients.add(itemIngredient.toLowerCase());
			});
		});

		const allIngredients = Array.from(uniqueIngredients);
		allIngredients.sort();

		return allIngredients;
	}

	getUniqueAppareils() {
		const uniqueAppareils = new Set();

		recipes.forEach((recipe) => {
			const oneRecipes = recipe.appliance;
			uniqueAppareils.add(oneRecipes.toLowerCase());
		});

		const allAppareils = Array.from(uniqueAppareils);
		allAppareils.sort();

		return allAppareils;
	}

	getUniqueUstensiles() {
		const uniqueUstensiles = new Set();

		recipes.forEach((recipe) => {
			if (Array.isArray(recipe.ustensils)) {
				recipe.ustensils.forEach((ustensil) => {
					const itemUstensil = this.removeAccents(ustensil);
					uniqueUstensiles.add(itemUstensil.toLowerCase());
				});
			}
		});

		const allUstensiles = Array.from(uniqueUstensiles);
		allUstensiles.sort();

		return allUstensiles;
	}

	handleInputAndTags(callback) {
		const inputValue = this.removeAccents(
			document.getElementById("search-input").value.toLowerCase()
		);
		const selectedTags = this.getSelectedTags().map((tag) =>
			this.removeAccents(tag.toLowerCase())
		);

		let searchResults = [];

		if (inputValue.length >= 3 || selectedTags.length > 0) {
			searchResults = recipes.filter((recipe) => {
				// Filter by name
				const recipeName = this.removeAccents(recipe.name.toLowerCase());

				// Filter by description
				const recipeDescription = this.removeAccents(
					recipe.description.toLowerCase()
				);

				// Filter by ingredients
				const ingredientList = recipe.ingredients.map((ingredient) => {
					return this.removeAccents(ingredient.ingredient.toLowerCase());
				});

				// Filter by appliance
				const applianceMatch = this.removeAccents(
					recipe.appliance.toLowerCase()
				);

				// Filter by ustensils
				const ustensilMatch = Array.isArray(recipe.ustensils)
					? recipe.ustensils.map((ustensil) =>
						this.removeAccents(ustensil.toLowerCase())
					)
					: [];

				const tagMatch = selectedTags.every((tag) => {
					return [
						recipeName,
						recipeDescription,
						...ingredientList,
						applianceMatch,
						...ustensilMatch,
					].some((item) => {
						const formattedItem = this.removeAccents(item.toLowerCase());
						return formattedItem.includes(tag);
					});
				});

				return (
					(recipeName.includes(inputValue) ||
            recipeDescription.includes(inputValue) ||
            ingredientList.some((ingredient) => ingredient.includes(inputValue)
            ) ||
            ustensilMatch.some((ustensil) => ustensil.includes(inputValue))) &&
          tagMatch
				);
			});
			this.updateUI(searchResults, inputValue, callback);
		} else if (inputValue.length === 0 && selectedTags.length === 0) {
			this.updateUI(recipes, inputValue, callback);
		}
	}

	updateUI(searchResults, inputValue, callback) {
		const errorDiv = document.getElementById("error");
		const ul = document.getElementById("ul-list-recettes");

		if (searchResults.length === 0) {
			const numbersRecipe = document.getElementById("numbers-recipe");
			numbersRecipe.textContent = 0;
			ul.style.display = "none";
			errorDiv.style.display = "block";
			errorDiv.textContent = `Aucune recette ne contient ${inputValue}. Vous pouvez chercher par nom ou ingrédient.`;
			if (inputValue) {
				errorDiv.textContent = `Aucune recette ne contient ${inputValue}. Vous pouvez chercher par nom ou ingrédient.`;
			} else {
				errorDiv.textContent = "Aucune recette ne correspond à votre recherche. Vous pouvez chercher par nom ou ingrédient.";
			}

			callback(searchResults);
		} else {
			errorDiv.style.display = "none";
			ul.style.display = "flex";
			const numbersRecipe = document.getElementById("numbers-recipe");
			numbersRecipe.textContent = searchResults.length;

			callback(searchResults);
		}

		this.updateAdvancedSearchFields(searchResults);
		this.updateIngredientsDropdown(searchResults, callback);
		this.updateAppareilsDropdown(searchResults, callback);
		this.updateUstensilesDropdown(searchResults, callback);
	}

	updateIngredientsDropdown(searchResults, callback) {
		const uniqueIngredients = new Set();

		searchResults.forEach((recipe) => {
			recipe.ingredients.forEach((item) => {
				uniqueIngredients.add(
					this.removeAccents(item.ingredient.toLowerCase())
				);
			});
		});

		const sortedIngredients = Array.from(uniqueIngredients).sort();

		const ulDropdownIngredients = document.getElementById(
			"ul-dropdown-ingredients"
		);
		ulDropdownIngredients.innerHTML = "";

		sortedIngredients.forEach((ingredient) => {
			const li = document.createElement("li");
			li.addEventListener("click", () => {
				this.addTags(ingredient, callback);
			});
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
			li.textContent = this.capitalizeFirstLetter(ingredient);
			ulDropdownIngredients.appendChild(li);
		});
	}

	updateAppareilsDropdown(searchResults, callback) {
		const uniqueAppareils = new Set();

		searchResults.forEach((recipe) => {
			uniqueAppareils.add(this.removeAccents(recipe.appliance.toLowerCase()));
		});

		const sortedAppareils = Array.from(uniqueAppareils).sort();

		const ulDropdownAppareils = document.getElementById(
			"ul-dropdown-appareils"
		);
		ulDropdownAppareils.innerHTML = "";

		sortedAppareils.forEach((appareil) => {
			const li = document.createElement("li");
			li.addEventListener("click", () => {
				this.addTags(appareil, callback);
			});
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
			li.textContent = this.capitalizeFirstLetter(appareil);
			ulDropdownAppareils.appendChild(li);
		});
	}

	updateUstensilesDropdown(searchResults, callback) {
		const uniqueUstensiles = new Set();

		searchResults.forEach((recipe) => {
			recipe.ustensils.forEach((item) => {
				uniqueUstensiles.add(this.removeAccents(item.toLowerCase()));
			});
		});

		const sortedUstensiles = Array.from(uniqueUstensiles).sort();

		const ulDropdownUstensiles = document.getElementById(
			"ul-dropdown-ustensiles"
		);
		ulDropdownUstensiles.innerHTML = "";

		sortedUstensiles.forEach((ustensile) => {
			const li = document.createElement("li");
			li.addEventListener("click", () => {
				this.addTags(ustensile, callback);
			});
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
			li.textContent = this.capitalizeFirstLetter(ustensile);
			ulDropdownUstensiles.appendChild(li);
		});
	}

	addTags = (items, callback) => {
		if (!allTags.includes(items)) {
			const container = document.getElementById("ul-list-tags");
			const li = document.createElement("li");
			li.className =
        "flex items-center bg-[#FFD15B] w-max px-4 py-2 rounded-md";

			const paragraph = document.createElement("p");
			paragraph.textContent = this.capitalizeFirstLetter(items);
			allTags.push(items);

			const button = document.createElement("button");

			const icon = document.createElement("i");
			icon.className = "fas fa-times ml-5";

			icon.addEventListener("click", () => {
				const index = allTags.indexOf(items);
				if (index !== -1) {
					allTags.splice(index, 1);
				}
				li.remove();

				const searchInput = document.getElementById("search-input");
				if (searchInput.value === "" && this.getSelectedTags().length === 0) {
					const errorDiv = document.getElementById("error");
					errorDiv.style.display = "none";
					callback(recipes);
					this.updateIngredientsDropdown(recipes, callback);
					this.updateAppareilsDropdown(recipes, callback);
					this.updateUstensilesDropdown(recipes, callback);
				}

				this.handleInputAndTags(callback);
			});

			button.appendChild(icon);

			li.appendChild(paragraph);
			li.appendChild(button);

			container.appendChild(li);

			this.handleInputAndTags(callback);
		}
	};

	capitalizeFirstLetter(word) {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}

	clearSearchResults(callback) {
		const ul = document.getElementById("ul-list-recettes");
		ul.style.display = "none";
		const errorDiv = document.getElementById("error");
		errorDiv.style.display = "none";
		const numbersRecipe = document.getElementById("numbers-recipe");
		numbersRecipe.textContent = 0;
		callback([]);
	}

	updateAdvancedSearchFields(searchResults) {
		const uniqueIngredients = new Set();
		searchResults.forEach((recipe) => {
			recipe.ingredients.forEach((item) => {
				uniqueIngredients.add(
					this.removeAccents(item.ingredient.toLowerCase())
				);
			});
		});

		const uniqueAppareils = new Set();
		searchResults.forEach((recipe) => {
			uniqueAppareils.add(this.removeAccents(recipe.appliance.toLowerCase()));
		});

		const uniqueUstensiles = new Set();
		searchResults.forEach((recipe) => {
			if (Array.isArray(recipe.ustensils)) {
				recipe.ustensils.forEach((ustensil) => {
					uniqueUstensiles.add(this.removeAccents(ustensil.toLowerCase()));
				});
			}
		});

		this.updateSearchField(
			document.getElementById("ingredient-search-field"),
			uniqueIngredients
		);
		this.updateSearchField(
			document.getElementById("appliance-search-field"),
			uniqueAppareils
		);
		this.updateSearchField(
			document.getElementById("ustensile-search-field"),
			uniqueUstensiles
		);
	}

	updateSearchField(fieldElement, options) {
		if (fieldElement) {
			fieldElement.innerHTML = "";

			options.forEach((option) => {
				const optionElement = document.createElement("option");
				optionElement.value = option;
				optionElement.textContent = option;
				fieldElement.appendChild(optionElement);
			});
		}
	}

	getSelectedTags() {
		const tagElements = document.querySelectorAll("#ul-list-tags li");
		const selectedTags = [];

		for (let i = 0; i < tagElements.length; i++) {
			const tagElement = tagElements[i];
			selectedTags.push(tagElement.textContent.toLowerCase());
		}

		return selectedTags;
	}

	valueInput(callback) {
		const input = document.getElementById("search-input");

		input.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				this.handleInputAndTags(callback);
			}
		});

		input.addEventListener("input", () => {
			this.handleInputAndTags(callback);
		});
	}

	valueTags(callback) {
		this.handleInputAndTags(callback);
	}
}