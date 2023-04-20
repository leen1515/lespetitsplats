import { recipes } from './recipes.js'
import { RecipesFactory } from './RecipesFactory.js'
import { IngredientsFactory } from './IngredientsFactory.js'

export async function getRecipes () {
  const recipesArray = recipes
  const allRecipes = document.querySelector('.recipes-contain')
  recipesArray.forEach((recipe) => {
    const { id, name, ingredients, time, description } = recipe
    const cardsIngredients = []
    ingredients.forEach((ingredientUnique) => {
      const { ingredient, quantity, unit } = ingredientUnique
      cardsIngredients.push(new IngredientsFactory(ingredient, quantity, unit).detailIngredients())
    })
    const cardsRecipes = new RecipesFactory(id, name, cardsIngredients, time, description).cardsFactory()
    allRecipes.appendChild(cardsRecipes)
  })
}

getRecipes()
