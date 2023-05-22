import { allArticlesArray, allTags } from './index.js'
import { RecipesFactory } from './factory/RecipesFactory.js'
import { IngredientsFactory } from './factory/IngredientsFactory.js'
import { caseFirstLetterNormalize } from './utilsfunction.js'

export let allArticlesArrayUpdate = []

// parcours les données recettes ou un tableau tags placées en argument, le test avec un objet regex
// et retourne uniquement les éléments qui ont répondu positivement au test: utilisé pour filtrer les recettes
// ainsi que pour filtrer les tags présents dans les listes
export function testMatchRegexTextRecipes (word, text) {
  const searchUser = new RegExp(`${caseFirstLetterNormalize(word)}`, 'gi')
  const filteredArticlesDatas = text.filter((data) => {
    return (searchUser.test(JSON.stringify(data[1])) || searchUser.test(JSON.stringify(data[2])) || searchUser.test(JSON.stringify(data[4])))
  })
  return filteredArticlesDatas
}
export function testMatchRegexText (word, text) {
  const searchUser = new RegExp(`${caseFirstLetterNormalize(word)}`, 'gi')
  const filteredArticlesDatas = text.filter((data) => { return (searchUser.test(JSON.stringify(data))) })
  console.log('ee', filteredArticlesDatas)

  return filteredArticlesDatas
}
// test une recette et la test selon les tags sélectionnés par l'utilisateur.
// cette fonction est appelée uniquement s'il y a des tags selectionnés.
// elle apparait dans une boucle qui n'ajoute que la recette positive à un nouveau tableau
export function matchRegexTagText (tagList, textRecipes) {
  // initialise un tableau pour compter le nombre de retour vrai par tag
  const checkTest = []
  // initialise une variable par défaut sur faux
  let check = false
  // parcourt les tags, les test avec la recette en argument et push 1 au tableau checktest si vrai
  // à l'inverse, il enlève 1 à ce même tableau si faux
  tagList.forEach((tag) => {
    const tagUser = new RegExp(`${caseFirstLetterNormalize(tag)}`, 'gi');
    (tagUser.test(JSON.stringify(textRecipes[2])) ||// ingredients
     tagUser.test(JSON.stringify(textRecipes[5])) || // appareil et [6] ustensils
     tagUser.test(JSON.stringify(textRecipes[6]))
      ? checkTest.push(1)
      : checkTest.splice(0, 1))
  });
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
  allArticlesArrayUpdate = testMatchRegexTextRecipes(searchUser, allArticlesArray)
  const arrayTagMatch = []
  // verifie s'il y a des tags dans le tableau des tags selectionnés par l'utilisateur : allTags, puis lance la boucle
  // pour ajouter chaque element qui correspond aux tags venant du tableau filtré auparavant
  // dans un nouveau tableau : arrayTagMatch
  if (allTags.length > 0) {
    allArticlesArrayUpdate.forEach((element) => {
      // la fonction ci-dessous est appelée pour verifier chaque element à chaque tag, ainsi,
      // est ajouté uniquement la recette passant le test avec succès au nouveau tableau.
      if (matchRegexTagText(allTags, element)) {
        arrayTagMatch.push(element)
      }
    })
    // le tableau précedent est remplacé par le nouveau tableau pushé des articles concordant avec les tags
    if (arrayTagMatch.length === 0) {
      emptyArray()
    } else {
      allArticlesArrayUpdate = arrayTagMatch
      // le tableau est envoyé pour la construction des recettes dans le DOM
      createArticles(allArticlesArrayUpdate)
    }
  } else {
    // et s'il y a zero tags selectionné, le tableau uniquement filtré par les mots clés est récupéré
    // pour la construction des recettes dans le DOM
    // vérife si le tableau n'est pas vide pour lancer la fonction qui construit les balises sinon
    // en l'absence de recettes, appel la fonction du message à la place
    (allArticlesArrayUpdate.length === 0 ? emptyArray() : createArticles(allArticlesArrayUpdate))
  }
}

// construit les recettes filtrés dans le DOM, ainsi, il n'y aura que des recettes respectant la contrainte qui
// est affiché devant l'utilisateur
function createArticles (allArticlesArray) {
  // recupère le conteneur des recettes dans le DOM
  const allRecipes = document.querySelector('.recipes-contain')
  // initialise le conteneur en le vidant afin d'accueillir les recettes correspondantes
  allRecipes.innerHTML = ''
  // boucle le tableau final pour lancer la construction des balises des recettes filtrées
  allArticlesArray.forEach((elementArticleUpdate) => {
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
}

// quand le tableau dynamique des recettes est vide
function emptyArray () {
  const allRecipes = document.querySelector('.recipes-contain')
  allRecipes.innerHTML = ''
  const infos = document.createElement('div')
  infos.setAttribute('class', 'recipes-contain__infos')
  // injecte dans la balise de la variable infos, un message pour l'utilisateur
  // dans le cas ou le tableau global des recettes serait vide
  infos.textContent = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc...'
  // rajoute le message dans le dom
  allRecipes.appendChild(infos)
}
