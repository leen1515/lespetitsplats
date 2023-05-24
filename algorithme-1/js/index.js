import { recipes } from './data/recipes.js'
import { interactionTagListener, interactionSearchListener } from './listener.js'

// initialise en global le tableau qui stock les tags selectionnés
export const allTags = []
// initialise en global le tableau qui stock les recettes, il se met à jour avec push()
export let allArticlesArray = []

export async function getRecipes () {
  // rempli le tableau allArticlesArray car la fonction qui construit les recettes travaille uniquement avec ce
  // tableau qui est dynamique et se met à jour selon les évènements utilisateur
  allArticlesArray = [...recipes]
  // appelle les fonctions autour des écouteurs d'évènements utilisateur
  interactionTagListener()
  interactionSearchListener()
}
// appelle la fonction au chargement de la page
getRecipes()
