import { allArticlesArray, allTags } from './index.js'
import { RecipesFactory } from './factory/RecipesFactory.js'
import { IngredientsFactory } from './factory/IngredientsFactory.js'
import { caseFirstLetterNormalize } from './utilsfunction.js'

export let allArticlesArrayUpdate = []

export function matchRegexListTag (word, listTagDatas) {
  const searchUser = new RegExp(`^${caseFirstLetterNormalize(word)}`, 'gi')
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

export function trigDisplayArticlesFiltred (searchUser) {
  allArticlesArrayUpdate = testMatchRegexText(searchUser, allArticlesArray)
  const arrayTagMatch = []
  if (allTags.length > 0) {
    allArticlesArrayUpdate.forEach((element) => {
      if (matchRegexTagText(allTags, element)) {
        arrayTagMatch.push(element)
      }
    })
    allArticlesArrayUpdate = arrayTagMatch
    createArticles(allArticlesArrayUpdate)
  } else {
    allArticlesArrayUpdate = testMatchRegexText(searchUser, allArticlesArray)
    createArticles(allArticlesArrayUpdate)
  }
}

function createArticles (allArticlesArray) {
  const allRecipes = document.querySelector('.recipes-contain')
  allRecipes.innerHTML = ''
  const allArticlesOrder = allArticlesArray.sort((a, b) => { return a[1].localeCompare(b[1], 'fr', { sensitivity: 'base' }) })
  allArticlesOrder.forEach((elementArticleUpdate) => {
    const cardsIngredients = []
    elementArticleUpdate[2].forEach((ingredientUnique) => {
      cardsIngredients.push(new IngredientsFactory(ingredientUnique.ingredient, ingredientUnique.quantity, ingredientUnique.unit).detailIngredients())
    })
    const cardsRecipes = new RecipesFactory(elementArticleUpdate[0], elementArticleUpdate[1], cardsIngredients, elementArticleUpdate[3], elementArticleUpdate[4]).cardsFactory()
    allRecipes.appendChild(cardsRecipes)
  })
}
