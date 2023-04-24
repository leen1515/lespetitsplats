import { matchRegex, matchRegexText, matchRegexTagText } from './utilsfunction.js'
import { TagFactory } from './TagFactory.js'
import { allTags } from './index.js'
// import { RecipesFactory } from './RecipesFactory.js'
// import { IngredientsFactory } from './IngredientsFactory.js'

export function interactionTagListener (datasIngredients, datasAppliances, datasUstensils) {
  const inputIngredientTag = document.querySelector('#input-ingredients-tag')
  const inputAppliancesTag = document.querySelector('#input-appareils-tag')
  const inputUstensilsTag = document.querySelector('#input-ustensiles-tag')

  const optionContainIngredient = document.querySelector('.option-contain-ingredient')
  const tagContainOptionIngredient = optionContainIngredient.querySelector('.option-ingredients')
  const optionContainAppliance = document.querySelector('.option-contain-appareils')
  const tagContainOptionAppliance = optionContainAppliance.querySelector('.option-appareils')
  const optionContainUstensil = document.querySelector('.option-contain-ustensiles')
  const tagContainOptionUstensil = optionContainUstensil.querySelector('.option-ustensiles')

  inputIngredientTag.addEventListener('input', (e) => {
    const word = e.target.value
    datasIngredients.forEach((dataIngredient) => {
      tagContainOptionIngredient.appendChild(new TagFactory().tagDivIngredient(dataIngredient))
    })
    if (word.length >= 3) {
      if (tagContainOptionIngredient !== null) { tagContainOptionIngredient.innerHTML = '' }
      matchRegex(word, datasIngredients).forEach((wordIngredientTag) => {
        tagContainOptionIngredient.appendChild(new TagFactory().tagDivIngredient(wordIngredientTag))
      })
    }
  })

  inputAppliancesTag.addEventListener('input', (e) => {
    const word = e.target.value
    datasAppliances.forEach((dataAppliance) => {
      tagContainOptionAppliance.appendChild(new TagFactory().tagDivAppliance(dataAppliance))
    })
    if (word.length >= 3) {
      if (tagContainOptionIngredient !== null) { tagContainOptionIngredient.innerHTML = '' }
      matchRegex(word, datasAppliances).forEach((wordIngredientTag) => {
        tagContainOptionAppliance.appendChild(new TagFactory().tagDivAppliance(wordIngredientTag))
      })
    }
  })

  inputUstensilsTag.addEventListener('input', (e) => {
    const word = e.target.value
    datasUstensils.forEach((dataUstensil) => {
      tagContainOptionUstensil.appendChild(new TagFactory().tagDivUstensil(dataUstensil))
    })
    if (word.length >= 3) {
      if (tagContainOptionUstensil !== null) { tagContainOptionUstensil.innerHTML = '' }
      matchRegex(word, datasUstensils).forEach((wordUstensilTag) => {
        tagContainOptionUstensil.appendChild(new TagFactory().tagDivUstensil(wordUstensilTag))
      })
    }
  })
}

export function interactionSearchListener () {
  const searchBarInput = document.querySelector('#global-searchbar')
  const allArticles = document.querySelectorAll('.recipes-article')
  const buttonValiadateSearch = document.querySelector('#searchValidate')

  searchBarInput.addEventListener('input', (e) => {
    const word = e.target.value
    if (word.length >= 3) {
      allArticles.forEach((elementArticle) => {
        const articleClass = 'recipes-article'
        if (matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle)) {
          elementArticle.className = articleClass
        } else if (matchRegexText(word, elementArticle) && !matchRegexTagText(allTags, elementArticle)) {
          elementArticle.className = articleClass + ' hidden'
        } else if (!matchRegexText(word, elementArticle) && !matchRegexTagText(allTags, elementArticle)) {
          elementArticle.className = articleClass + ' hidden'
        } else if (!matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle)) {
          elementArticle.className = articleClass + ' hidden'
        }
      })
    }
  })

  buttonValiadateSearch.addEventListener('click', (e) => {
    const word = e.target.value
    allArticles.forEach((elementArticle) => {
      const articleClass = 'recipes-article'
      if (matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle)) {
        elementArticle.className = articleClass
      } else if (matchRegexText(word, elementArticle) && !matchRegexTagText(allTags, elementArticle)) {
        elementArticle.className = articleClass + ' hidden'
      } else if (!matchRegexText(word, elementArticle) && !matchRegexTagText(allTags, elementArticle)) {
        elementArticle.className = articleClass + ' hidden'
      } else if (!matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle)) {
        elementArticle.className = articleClass + ' hidden'
      }
    })
  })
}
