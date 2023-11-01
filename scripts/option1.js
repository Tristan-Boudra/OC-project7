import recipes from "../data/recipes.js";

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
    // Initialise un ensemble car un ensemble ne peut pas stocker des doublons
    const uniqueIngredients = new Set();

    // Parcour chaque recette
    recipes.forEach((recipe) => {
      // Parcour chaque ingrédient de la recette
      recipe.ingredients.forEach((ingredient) => {
        const oneIngredient = ingredient.ingredient;
        const itemIngredient = this.removeAccents(oneIngredient);
        uniqueIngredients.add(itemIngredient.toLowerCase());
      });
    });

    // Convertie l'ensemble en tableau
    const allIngredients = Array.from(uniqueIngredients);
    allIngredients.sort();

    return allIngredients;
  }

  // Récupération des appareils
  getUniqueAppareils() {
    const uniqueAppareils = new Set();

    recipes.forEach((recipe) => {
      uniqueAppareils.add(recipe.appliance);
    });

    const allAppareils = Array.from(uniqueAppareils);
    allAppareils.sort();

    return allAppareils;
  }

  // Récupération des ustensiles
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

  valueInput(callback) {
    const input = document.getElementById("search-input");
    const errorDiv = document.getElementById("error");
    const ul = document.getElementById("ul-list-recettes");

    const handleInput = () => {
      const inputValue = input.value;
      if (inputValue.length >= 3) {
        let searchResults = [];

        for (let i = 0; i < recipes.length; i++) {
          const recipe = recipes[i];
          const recipeName = recipe.name.toLowerCase();
          const searchInput = inputValue.toLowerCase();

          let found = false;

          for (let j = 0; j <= recipeName.length - searchInput.length; j++) {
            let match = true;
            for (let k = 0; k < searchInput.length; k++) {
              if (recipeName[j + k] !== searchInput[k]) {
                match = false;
                break;
              }
            }
            if (match) {
              found = true;
              break;
            }
          }

          if (found) {
            searchResults.push({
              name: recipe.name,
              image: recipe.image,
              time: recipe.time,
              description: recipe.description,
              ingredients: recipe.ingredients,
            });
          }
        }

        if (searchResults.length === 0) {
          const numbersRecipe = document.getElementById("numbers-recipe");
          numbersRecipe.textContent = 0;
          ul.style.display = "none";
          errorDiv.style.display = "block";
          errorDiv.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        } else {
          errorDiv.style.display = "none";
          callback(searchResults, inputValue.length);
        }
      } else {
        errorDiv.style.display = "none";
        ul.style.display = "flex";
      }
    };

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        handleInput();
      }
    });

    input.addEventListener("input", handleInput);
  }
}
