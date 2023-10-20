document.addEventListener("DOMContentLoaded", function () {
  // Suppression du texte de la barre de recherche dans le header
  const searchInput = document.getElementById("search-input");
  const clearButton = document.getElementById("clear-button");

  clearButton.style.display = "none";

  searchInput.addEventListener("input", function () {
    clearInput(searchInput, clearButton);
  })

  // Suppression du texte de la barre de recherche dans la dropdown
  // Ingredients
  const searchInputDopdownIngredient = document.getElementById("search-input-dropdown-ingredients");
  const clearButtonDropdownIngredient = document.getElementById("clear-button-dropdown-ingredients");

  clearButtonDropdownIngredient.style.display = "none";

  searchInputDopdownIngredient.addEventListener("input", function () {
    clearInput(searchInputDopdownIngredient, clearButtonDropdownIngredient);
  })

  // Appareils
  const searchInputDopdownAppareils = document.getElementById("search-input-dropdown-appareils");
  const clearButtonDropdownAppareils = document.getElementById("clear-button-dropdown-appareils");

  clearButtonDropdownAppareils.style.display = "none";

  searchInputDopdownAppareils.addEventListener("input", function () {
    clearInput(searchInputDopdownAppareils, clearButtonDropdownAppareils);
  })

  // Ustensiles
  const searchInputDopdownUstensiles = document.getElementById("search-input-dropdown-ustensiles");
  const clearButtonDropdownUstensiles = document.getElementById("clear-button-dropdown-ustensiles");

  clearButtonDropdownUstensiles.style.display = "none";

  searchInputDopdownUstensiles.addEventListener("input", function () {
    clearInput(searchInputDopdownUstensiles, clearButtonDropdownUstensiles);
  })

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
  const dropdownButtonIngredients = document.getElementById("dropdown-button-ingredients");
  const chevronIconIngredients = document.getElementById("dropdown-chevron-ingredients");

  const dropdownMenuIngredients = document.getElementById("dropdown-menu-ingredients");
  dropdownMenuIngredients.classList.add("hidden");

  toggleDropdown(chevronIconIngredients, dropdownButtonIngredients, dropdownMenuIngredients);

  // Appareils
  const dropdownButtonAppareils = document.getElementById("dropdown-button-appareils");
  const chevronIconAppareils = document.getElementById("dropdown-chevron-appareils");

  const dropdownMenuAppareils = document.getElementById("dropdown-menu-appareils");
  dropdownMenuAppareils.classList.add("hidden");

  toggleDropdown(chevronIconAppareils, dropdownButtonAppareils, dropdownMenuAppareils);

  // Appareils
  const dropdownButtonUstensiles = document.getElementById("dropdown-button-ustensiles");
  const chevronIconUstensiles = document.getElementById("dropdown-chevron-ustensiles");

  const dropdownMenuUstensiles = document.getElementById("dropdown-menu-ustensiles");
  dropdownMenuUstensiles.classList.add("hidden");

  toggleDropdown(chevronIconUstensiles, dropdownButtonUstensiles, dropdownMenuUstensiles);


  function toggleDropdown(chevronIcon, dropdownButton, dropdownMenu) {
    dropdownButton.addEventListener("click", function () {
      chevronIcon.classList.toggle("rotate-0");
      chevronIcon.classList.toggle("rotate-180");
      dropdownMenu.classList.toggle("hidden");
    })
  }
});
