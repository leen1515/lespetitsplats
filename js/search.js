import { allArticlesArray, allTags } from './index.js'
import { RecipesFactory } from './factory/RecipesFactory.js'
import { IngredientsFactory } from './factory/IngredientsFactory.js'
import { caseFirstLetterNormalize } from './utilsfunction.js'

export let allArticlesArrayUpdate = []

// parcours les données recettes ou un tableau tags glissé en argument, le test avec un objet regex
// et retourne uniquement les éléments qui ont répondu positivement au test: utilisé pour filtrer les recettes
// ainsi que pour filtrer les tags présents dans les listes
export function testMatchRegexText (word, text) {
  const searchUser = new RegExp(`${caseFirstLetterNormalize(word)}`, 'gi')
  const filteredArticlesDatas = []
  for (let i = 0; i < text.length; i++) {
    if (searchUser.test(JSON.stringify(text[i]))) {
      filteredArticlesDatas.push(text[i])
    }
  }
  return filteredArticlesDatas
}
// test une recette et la test selon les tags sélectionnés par l'utilisateur.
// cette fonction est appelée uniquement s'il y a des tags selectionnés.
// elle apparait dans une boucle qui n'ajoute que la recette positive à un nouveau tableau
export function matchRegexTagText (tagList, textRecipe) {
  // initialise un tableau pour compter le nombre de retour vrai par tag
  const checkTest = []
  // initialise une variable par défaut sur faux
  let check = false
  // parcourt les tags, les test avec la recette en argument et push 1 au tableau checktest si vrai
  // à l'inverse, il enlève 1 à ce même tableau si faux
  tagList.forEach((tag) => {
    const tagUser = new RegExp(`${caseFirstLetterNormalize(tag)}`, 'gi');
    (tagUser.test(JSON.stringify(textRecipe)) ? checkTest.push(1) : checkTest.splice(0, 1))
  }
  );
  // compte le tableau checkTest et le compare au nombre de tag selectionné, s'ils sont égaux,
  // cela veut dire que la recette correspond à tous les tags que l'utilisateur à coché, cela
  // retourne vrai et valide notre recette.
  (checkTest.length === tagList.length ? check = true : check = false)
  return check
}

// déclenche le filtrage des recettes avec en parametre les mots clés de la barre de recherche principal
export function trigDisplayArticlesFiltred (searchUser) {
  // au lancement de la fonction, stock dans une variable en premier lieu le tableau à portée globale :
  // "allArticlesArray" après avoir été filtré par les mots clés récupérés depuis la barre de recherche principal
  allArticlesArrayUpdate = testMatchRegexText(searchUser, allArticlesArray)

  const arrayTagMatch = []
  // verifie s'il y a des tags dans le tableau des tags selectionnés par l'utilisateur : allTags, puis lance la boucle
  // pour ajouter chaque element qui correspond aux tags venant du tableau filtré auparavant
  // dans un nouveau tableau : arrayTagMatch
  if (allTags.length > 0) {
    for (let i = 0; i < allArticlesArrayUpdate.length; i++) {
      // la fonction ci-dessous est appelée pour verifier chaque element à chaque tag, ainsi,
      // est ajouté uniquement la recette passant le test avec succès au nouveau tableau.
      if (matchRegexTagText(allTags, allArticlesArrayUpdate[i])) {
        arrayTagMatch.push(allArticlesArrayUpdate[i])
      }
    }
    allArticlesArrayUpdate = arrayTagMatch
    // le tableau est envoyé pour la construction des recettes dans le DOM
    createArticles(allArticlesArrayUpdate)
  } else {
    // et s'il y a zero tags selectionné, le tableau uniquement filtré par les mots clés est récupéré
    // pour la construction des recettes dans le DOM
    createArticles(allArticlesArrayUpdate)
  }
}
// construit les recettes filtrés dans le DOM, ainsi, il n'y aura que des recettes respectant la contrainte qui
// est affiché devant l'utilisateur
function createArticles (allArticlesArrayFilter) {
  // recupère le conteneur des recettes dans le DOM
  const allRecipes = document.querySelector('.recipes-contain')
  // initialise le conteneur en le vidant afin d'accueillir les recettes correspondantes
  allRecipes.innerHTML = ''
  // boucle le tableau final pour lancer la construction des balises des recettes filtrées
  for (let i = 0; i < allArticlesArrayFilter.length; i++) {
    // un tableau vide pour récupérer les ingredients qui seront bouclés pour chaque recette
    const cardsIngredients = []

    // pour chaque élement est bouclé la liste des recettes, les construit et les rajoute dans ce tableau
    // pour pouvoir être incorpéré au sein de la div recette qui sera construite
    allArticlesArrayFilter[i][2].forEach((ingredientUnique) => {
      cardsIngredients.push(new IngredientsFactory(ingredientUnique.ingredient, ingredientUnique.quantity, ingredientUnique.unit).detailIngredients())
    })
    // construit la balise de chaque recette et l'ajoute dans le conteneur au sein du DOM
    const cardsRecipes = new RecipesFactory(allArticlesArrayFilter[i][0], allArticlesArrayFilter[i][1], cardsIngredients, allArticlesArrayFilter[i][3], allArticlesArrayFilter[i][4]).cardsFactory()
    allRecipes.appendChild(cardsRecipes)
  }
  const infos = document.createElement('div')
  infos.setAttribute('class', 'recipes-contain__infos')
  // injecte dans la balise de la variable infos, un message pour l'utilisateur
  // dans le cas ou le tableau global des recettes serait vide
  if (allArticlesArrayFilter.length === 0) {
    infos.textContent = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc...'
    // efface la valeur de l'input de la searchbar au bout de 5secondes
    const searchBarInput = document.querySelector('#global-searchbar')
    setTimeout(() => { searchBarInput.value = '' }, 5000)
    // rajoute le message dans le dom
    allRecipes.appendChild(infos)
  }
}
