import recipes from "../data/recipes.js";

document.addEventListener("DOMContentLoaded", function () {
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

  // Rotation chevron dropdown on click
  // Ingredients
  const dropdownButtonIngredients = document.getElementById(
    "dropdown-button-ingredients"
  );
  const chevronIconIngredients = document.getElementById(
    "dropdown-chevron-ingredients"
  );

  const dropdownMenuIngredients = document.getElementById(
    "dropdown-menu-ingredients"
  );
  dropdownMenuIngredients.classList.add("hidden");

  toggleDropdown(
    chevronIconIngredients,
    dropdownButtonIngredients,
    dropdownMenuIngredients
  );

  // Appareils
  const dropdownButtonAppareils = document.getElementById(
    "dropdown-button-appareils"
  );
  const chevronIconAppareils = document.getElementById(
    "dropdown-chevron-appareils"
  );

  const dropdownMenuAppareils = document.getElementById(
    "dropdown-menu-appareils"
  );
  dropdownMenuAppareils.classList.add("hidden");

  toggleDropdown(
    chevronIconAppareils,
    dropdownButtonAppareils,
    dropdownMenuAppareils
  );

  // Appareils
  const dropdownButtonUstensiles = document.getElementById(
    "dropdown-button-ustensiles"
  );
  const chevronIconUstensiles = document.getElementById(
    "dropdown-chevron-ustensiles"
  );

  const dropdownMenuUstensiles = document.getElementById(
    "dropdown-menu-ustensiles"
  );
  dropdownMenuUstensiles.classList.add("hidden");

  toggleDropdown(
    chevronIconUstensiles,
    dropdownButtonUstensiles,
    dropdownMenuUstensiles
  );

  function toggleDropdown(chevronIcon, dropdownButton, dropdownMenu) {
    dropdownButton.addEventListener("click", function () {
      chevronIcon.classList.toggle("rotate-0");
      chevronIcon.classList.toggle("rotate-180");
      dropdownMenu.classList.toggle("hidden");
    });
  }

  function countRecipes() {
    const numbersRecipe = document.getElementById("numbers-recipe");
    numbersRecipe.textContent = recipes.length;
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

  // Création d'une recette
  function createRecipe(time, image, name, description, ingredients) {
    if(image){
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
      console.log(img);
  
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("px-6", "pb-[61px]");
  
      const titleH4 = document.createElement("h4");
      titleH4.classList.add("font-anton", "color-[#1B1B1B]", "text-xl", "mt-8");
      titleH4.textContent = name;
  
      const recette = document.createElement("p");
      recette.classList.add("font-manrope", "color-[#7A7A7A]", "text-xs", "mt-8");
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
          ? (quantity.textContent = currentItem.quantity + " " + currentItem.unit)
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
    getRecipes();
    createRecipe();
    countRecipes();
  }

  init();
});
