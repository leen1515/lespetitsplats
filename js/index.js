import { recipes } from './recipes.js'
import { RecipesFactory } from './RecipesFactory.js'
import { IngredientsFactory } from './IngredientsFactory.js'
import { interactionTagListener } from './listener.js'
import { doubleDatas, caseFirstLetter } from './utilsfunction.js'

export async function getRecipes () {
  const recipesArray = recipes
  const allRecipes = document.querySelector('.recipes-contain')

  const ingredientsArray = []
  const applianceArray = []
  const ustensilsArray = []
  recipesArray.forEach((recipe) => {
    const { id, name, ingredients, time, description, appliance, ustensils } = recipe
    const cardsIngredients = []
    applianceArray.push(appliance)
    ustensilsArray.push(ustensils)

    ingredients.forEach((ingredientUnique) => {
      const { ingredient, quantity, unit } = ingredientUnique
      ingredientsArray.push(caseFirstLetter(ingredient))
      cardsIngredients.push(new IngredientsFactory(ingredient, quantity, unit).detailIngredients())
    })
    const cardsRecipes = new RecipesFactory(id, name, cardsIngredients, time, description).cardsFactory()
    allRecipes.appendChild(cardsRecipes)
  })
  const oneDatasIngredients = doubleDatas(ingredientsArray)
  const oneDatasAppliance = doubleDatas(applianceArray)
  const oneDatasUstensils = doubleDatas(ustensilsArray)

  interactionTagListener(oneDatasIngredients, oneDatasAppliance, oneDatasUstensils)
}

getRecipes()
