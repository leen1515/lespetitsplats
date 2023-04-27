import { recipes } from './recipes.js'
import { RecipesFactory } from './factory/RecipesFactory.js'
import { IngredientsFactory } from './factory/IngredientsFactory.js'
import { interactionTagListener, interactionSearchListener } from './listener.js'

export const allTags = []
export const allTagsArray = []
export const allArticlesArray = []
export async function getRecipes () {
  const recipesArray = recipes

  recipesArray.forEach((recipe) => {
    const { id, name, ingredients, time, description, appliance, ustensils } = recipe
    const cardsIngredients = []
    ingredients.forEach((ingredientUnique) => {
      const { ingredient, quantity, unit } = ingredientUnique
      cardsIngredients.push(new IngredientsFactory(ingredient, quantity, unit).detailIngredients())
    })
    const cardsRecipes = new RecipesFactory(id, name, cardsIngredients, time, description, appliance, ustensils).cardsFactory()
    allArticlesArray.push(cardsRecipes)
  })

  interactionTagListener()
  interactionSearchListener()
}

getRecipes()
