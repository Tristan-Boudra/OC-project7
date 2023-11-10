import recipes from "../data/recipes.js";
import { Option2 } from "./option2.js";

document.addEventListener("DOMContentLoaded", function () {

  const option2 = new Option2();

  // Suppression du texte de la barre de recherche dans le header
  const searchInput = document.getElementById("search-input");
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
  // Nombres totales de recettes
  function countRecipes() {
    const numbersRecipe = document.getElementById("numbers-recipe");
    numbersRecipe.textContent = recipes.length;
  }

  // Récupération des ingrédients
  function getUniqueIngredients(recipes) {
    // Initialise un ensemble car un ensemble ne peut pas stocker des doublons
    const uniqueIngredients = new Set();

    // Parcour chaque recette
    recipes.forEach((recipe) => {
      // Parcour chaque ingrédient de la recette
      recipe.ingredients.forEach((ingredient) => {
        const oneIngredient = ingredient.ingredient;
        const itemIngredient = removeAccents(oneIngredient);
        uniqueIngredients.add(itemIngredient.toLowerCase());
      });
    });

    // Convertie l'ensemble en tableau
    const allIngredients = Array.from(uniqueIngredients);
    allIngredients.sort();

    return allIngredients;
  }

  // Récupération des appareils
  function getUniqueAppareils(recipes) {
    const uniqueAppareils = new Set();

    recipes.forEach((recipe) => {
      uniqueAppareils.add(recipe.appliance);
    });

    const allAppareils = Array.from(uniqueAppareils);
    allAppareils.sort();

    return allAppareils;
  }

  // Récupération des ustensiles
  function getUniqueUstensiles(recipes) {
    const uniqueUstensiles = new Set();

    recipes.forEach((recipe) => {
      if (Array.isArray(recipe.ustensils)) {
        recipe.ustensils.forEach((ustensil) => {
          const itemUstensil = removeAccents(ustensil);
          uniqueUstensiles.add(itemUstensil.toLowerCase());
        });
      }
    });

    const allUstensiles = Array.from(uniqueUstensiles);
    allUstensiles.sort();

    return allUstensiles;
  }

  // Récupération des recettes
  function getRecipes() {
    for (const recipe of recipes) {
      createRecipe(
        recipe.time,
        recipe.image,
        recipe.name,
        recipe.description,
        recipe.ingredients
      );
    }
    return recipes;
  }

  function removeAccents(input) {
    const accents = 'ÀÁÂÃÄÅàáâãäåÇçèéêëÈÉÊËìíîïÌÍÎÏñÑÒÓÔÕÖØòóôõöøÙÚÛÜùúûüÝÿ';
    const accentsOut = 'AAAAAAaaaaaaCcEEEEEEEEiiiiIIIIiiNNOOOOOOOooooooUUUUuuuuYy';
    return input
      .split('')
      .map((letter) => {
        const index = accents.indexOf(letter);
        return index !== -1 ? accentsOut[index] : letter;
      })
      .join('');
  }

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  function createIngredientsDropdown() {
    const allIngredients = getUniqueIngredients(recipes);

    allIngredients.forEach((ingredient) => {
      const listIngredientsDiv = document.getElementById("list-ingredients");
      const ul = document.getElementById("ul-dropdown-ingredients");
      var li = document.createElement("li");

      li.addEventListener("click", function () {
        addTags(ingredient, li);
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

      li.textContent = capitalizeFirstLetter(ingredient);

      ul.appendChild(li);
      listIngredientsDiv.appendChild(ul);
    });
  }

  function createAppareilsDropdown() {
    const allAppareils = getUniqueAppareils(recipes);

    allAppareils.forEach((appareil) => {
      const listIngredientsDiv = document.getElementById("list-appareils");
      const ul = document.getElementById("ul-dropdown-appareils");
      var li = document.createElement("li");

      li.addEventListener("click", function () {
        addTags(appareil, li);
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

      li.textContent = capitalizeFirstLetter(appareil);

      ul.appendChild(li);
      listIngredientsDiv.appendChild(ul);
    });
  }

  function createUstensilesDropdown() {
    const allUstensiles = getUniqueUstensiles(recipes);

    allUstensiles.forEach((ustensile) => {
      const listIngredientsDiv = document.getElementById("list-ustensiles");
      const ul = document.getElementById("ul-dropdown-ustensiles");
      var li = document.createElement("li");

      li.addEventListener("click", function () {
        addTags(ustensile, li);
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

      li.textContent = capitalizeFirstLetter(ustensile);

      ul.appendChild(li);
      listIngredientsDiv.appendChild(ul);
    });
  }

  let allTags = [];

  function addTags(items) {
    if (!allTags.includes(items)) {
      const li = document.createElement("li");
      li.className =
        "flex items-center bg-[#FFD15B] w-max px-4 py-2 rounded-md";

      const paragraph = document.createElement("p");
      paragraph.textContent = capitalizeFirstLetter(items);
      allTags.push(items);

      const button = document.createElement("button");

      const icon = document.createElement("i");
      icon.className = "fas fa-times ml-5";
      icon.addEventListener("click", function () {
        // On enlève le tags du tableau allTags
        const index = allTags.indexOf(items);
        if (index !== -1) {
          allTags.splice(index, 1);
        }
        li.remove();
      });

      button.appendChild(icon);

      li.appendChild(paragraph);
      li.appendChild(button);

      const container = document.getElementById("ul-list-tags");
      container.appendChild(li);
    }
  }

  // Création d'une recette
  function createRecipe(time, image, name, description, ingredients) {
    if (image) {
      const ul = document.getElementById("ul-list-recettes");
      const listRecettesDiv = document.getElementById("list-recettes");

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
      timeP.textContent = time + " min";

      const img = document.createElement("img");
      img.src = "./assets/images/" + `${image}`;
      img.classList.add(
        "w-full",
        "object-cover",
        "h-[253px]",
        "rounded-tl-[21px]",
        "rounded-tr-[21px]"
      );
      img.alt = name;

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("px-6", "pb-[61px]");

      const titleH4 = document.createElement("h4");
      titleH4.classList.add("font-anton", "color-[#1B1B1B]", "text-xl", "mt-8");
      titleH4.textContent = name;

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
      descriptionP.textContent = description;

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

      const ingredientsData = ingredients;

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
  }

  function init() {
    // Récupeère toutes les recettes
    getRecipes();

    // Créer une recette
    createRecipe();

    // Nombre total de recettes
    countRecipes();

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
