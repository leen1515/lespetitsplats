import { allArticlesArray, allTags } from './index.js'
import { RecipesFactory } from './factory/RecipesFactory.js'
import { IngredientsFactory } from './factory/IngredientsFactory.js'
import { caseFirstLetterNormalize } from './utilsfunction.js'
import { recipes } from './data/recipes.js'
import { updateTag } from './tags.js'

export let allArticlesArrayUpdate = []
const searchBarInput = document.querySelector('#global-searchbar')
const inputIngredientTag = document.querySelector('#input-ingredients-tag')
const inputAppliancesTag = document.querySelector('#input-appareils-tag')
const inputUstensilsTag = document.querySelector('#input-ustensiles-tag')

export function matchRegexListTag (word, listTagDatas) {
  const searchUser = new RegExp(`${caseFirstLetterNormalize(word)}`, 'gi')
  const filteredTagDatas = listTagDatas.filter((data) => searchUser.test(data))
  return filteredTagDatas
}
export function testMatchRegexText (word, text) {
  const searchUser = new RegExp(`${caseFirstLetterNormalize(word)}`, 'gi')
  const filteredArticlesDatas = text.filter((data) => { return (searchUser.test(JSON.stringify(data))) })
  return filteredArticlesDatas
}

export function matchRegexTagText (tagList, textRecipes) {
  const checkTest = []
  let check = false
  tagList.forEach((tag) => {
    const tagUser = new RegExp(`${caseFirstLetterNormalize(tag)}`, 'gi');
    (tagUser.test(JSON.stringify(textRecipes)) ? checkTest.push(1) : checkTest.splice(0, 1))
  });
  (checkTest.length === tagList.length ? check = true : check = false)
  return check
}

// déclenche le filtrage des recettes avec en parametre les mots clés de la barre de recherche principal et
// les tags selectionnées
export function trigDisplayArticlesFiltred (searchUser) {
  // au lancement de la fonction, stock dans une variable en premier lieu le tableau à portée globale :
  // "allArticlesArray" après avoir été filtré par les mots clés récupérés depuis la barre de recherche principal
  allArticlesArrayUpdate = testMatchRegexText(searchUser, allArticlesArray)
  const arrayTagMatch = []
  // verifie s'il y a des tags dans le tableau des tags selectionnés par l'utilisateur : allTags, puis lance la boucle
  // pour ajouter chaque element qui correspond aux tags venant du tableau filtré auparavant
  // dans un nouveau tableau : arrayTagMatch
  if (allTags.length > 0) {
    allArticlesArrayUpdate.forEach((element) => {
      if (matchRegexTagText(allTags, element)) {
        arrayTagMatch.push(element)
      }
    })
    // le tableau précedent est remplacé par le nouveau tableau pushé des articles concordant avec les tags
    allArticlesArrayUpdate = arrayTagMatch
    // le tableau est envoyé pour la construction des recettes dans le DOM
    createArticles(allArticlesArrayUpdate)
  } else {
    // et même s'il y a zero tags selectionné, le tableau est tout de même récupéré
    // pour la construction des recettes dans le DOM
    allArticlesArrayUpdate = testMatchRegexText(searchUser, allArticlesArray)
    createArticles(allArticlesArrayUpdate)
  }
}
// construit les recettes filtrés dans le DOM, ainsi, il n'y aura que des recettes respectant la contrainte qui
// est affiché devant l'utilisateur
function createArticles (allArticlesArray) {
  // recupère le conteneur des recettes dans le DOM
  const allRecipes = document.querySelector('.recipes-contain')
  // initialise le conteneur en le vidant afin d'accueillir les recettes correspondantes
  allRecipes.innerHTML = ''
  // réordonne le tableau par lettre alphabétique des titres des recettes
  const allArticlesOrder = allArticlesArray.sort((a, b) => { return a[1].localeCompare(b[1], 'fr', { sensitivity: 'base' }) })
  // boucle le tableau final pour lancer la construction des balises des recettes filtrées
  allArticlesOrder.forEach((elementArticleUpdate) => {
    // un tableau vide pour récupérer les ingredients qui seront bouclés pour chaque recette
    const cardsIngredients = []
    // pour chaque élement est bouclé la liste des recettes, les construit et les rajoute dans ce tableau
    // pour pouvoir être incorpéré au sein de la div recette qui sera construite
    elementArticleUpdate[2].forEach((ingredientUnique) => {
      cardsIngredients.push(new IngredientsFactory(ingredientUnique.ingredient, ingredientUnique.quantity, ingredientUnique.unit).detailIngredients())
    })
    // construit la balise de chaque recette et l'ajoute dans le conteneur au sein du DOM
    const cardsRecipes = new RecipesFactory(elementArticleUpdate[0], elementArticleUpdate[1], cardsIngredients, elementArticleUpdate[3], elementArticleUpdate[4]).cardsFactory()
    allRecipes.appendChild(cardsRecipes)
  })
  const infos = document.createElement('div')
  infos.setAttribute('class', 'recipes-contain__infos')
  // injecte dans la balise de la variable infos un message pour l'utilisateur
  // dans le cas ou le tableau global des recettes serait vide
  if (allArticlesArray.length === 0) {
    infos.textContent = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc...'
    allArticlesArray = recipes.forEach((recipe) => {
      allArticlesArray.push([recipe.id, recipe.name, recipe.ingredients, recipe.time, recipe.description, recipe.appliance, recipe.ustensils])
      updateTag(inputIngredientTag.value, 'ingredients', true)
      updateTag(inputAppliancesTag.value, 'appareils', true)
      updateTag(inputUstensilsTag.value, 'ustensiles', true)
      // efface la valeur de l'input de la searchbar au bout de 5secondes
      setTimeout(() => { searchBarInput.value = '' }, 5000)
    })
    // rajoute le message dans le dom
    allRecipes.appendChild(infos)
  }
}
