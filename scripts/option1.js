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
      const oneRecipes = recipe.appliance;
      uniqueAppareils.add(oneRecipes.toLowerCase());
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

  // updateRecipeList () {
  //   this.handleInput();
  // }
  
  handleInput (callback) {
    const input = document.getElementById("search-input");
    const errorDiv = document.getElementById("error");
    const ul = document.getElementById("ul-list-recettes");

    const inputValue = input.value.toLowerCase();
    const selectedTags = this.getSelectedTags();
    let searchResults = [];

    if (inputValue.length >= 3) {
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const recipeName = recipe.name.toLowerCase();
        const ingredients = recipe.ingredients;

        if (selectedTags.length > 0) {
          for (let j = 0; j < selectedTags.length; j++) {
            const selectedTag = selectedTags[j];
            if (recipeName.includes(selectedTag) || recipeName.includes(selectedTag)) {
              searchResults.push({
                name: recipe.name,
                image: recipe.image,
                time: recipe.time,
                description: recipe.description,
                ingredients: recipe.ingredients,
              });
              break;
            }
            else {
              for (let j = 0; j < ingredients.length; j++) {
                const ingredient = ingredients[j].ingredient.toLowerCase();
                if (ingredient.includes(inputValue) || ingredient.includes(selectedTag)) {
                  searchResults.push({
                    name: recipe.name,
                    image: recipe.image,
                    time: recipe.time,
                    description: recipe.description,
                    ingredients: recipe.ingredients,
                  });
                  break;
                }
              }
            }
          }
        } else {
          if (recipeName.includes(inputValue)) {
            searchResults.push({
              name: recipe.name,
              image: recipe.image,
              time: recipe.time,
              description: recipe.description,
              ingredients: recipe.ingredients,
            });
          } else {
            for (let j = 0; j < ingredients.length; j++) {
              const ingredient = ingredients[j].ingredient.toLowerCase();
              if (ingredient.includes(inputValue)) {
                searchResults.push({
                  name: recipe.name,
                  image: recipe.image,
                  time: recipe.time,
                  description: recipe.description,
                  ingredients: recipe.ingredients,
                });
                break;
              }
            }
          }
        }
      }

      if (searchResults.length === 0) {
        const numbersRecipe = document.getElementById("numbers-recipe");
        numbersRecipe.textContent = 0;
        ul.style.display = "none";
        errorDiv.style.display = "block";
        errorDiv.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher par nom ou ingrédient.`;
      } else {
        errorDiv.style.display = "none";
        callback(searchResults);
      }
    } else {
      errorDiv.style.display = "none";
      ul.style.display = "flex";
    }
  };

  getSelectedTags = () => {
    const input = document.getElementById("search-input");
    const tagElements = document.querySelectorAll("#ul-list-tags li");
    const selectedTags = [];

    for (let i = 0; i < tagElements.length; i++) {
      const tagElement = tagElements[i];
      selectedTags.push(tagElement.textContent.toLowerCase());
    }

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        this.handleInput();
      }
    });

    return selectedTags;
  };

  valueInput(callback) {
    const input = document.getElementById("search-input");
    const errorDiv = document.getElementById("error");
    const ul = document.getElementById("ul-list-recettes");

    const tagList = document.getElementById("ul-list-tags");
    const tagElements = tagList.querySelectorAll("li");
    for (let i = 0; i < tagElements.length; i++) {
      const tagElement = tagElements[i];
    }
  
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleInput(callback);
      }
    });
    
    input.addEventListener("input", () =>{
      this.handleInput(callback);
    });
  }
}
