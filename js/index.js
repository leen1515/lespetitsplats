import { recipes } from './data/recipes.js'
import { interactionTagListener, interactionSearchListener } from './listener.js'

export const allTags = []
export const allArticlesArray = []

export async function getRecipes () {
  recipes.forEach((recipe) => {
    allArticlesArray.push([recipe.id, recipe.name, recipe.ingredients, recipe.time, recipe.description, recipe.appliance, recipe.ustensils])
  })
  interactionTagListener()
  interactionSearchListener()
}
getRecipes()
