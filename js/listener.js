import { matchRegex, arrayTextContentDiv, trigDisplayArticlesFiltred } from './utilsfunction.js'
import { TagFactory } from './TagFactory.js'

export function interactionTagListener () {
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
    if (tagContainOptionIngredient !== null) { tagContainOptionIngredient.innerHTML = '' }
    const recipesDisplay = document.querySelectorAll('article:not(.hidden)')
    const ingredientUpdateArray = arrayTextContentDiv(recipesDisplay, '.ingredient')
    matchRegex(word, ingredientUpdateArray).forEach((wordIngredientTag) => {
      tagContainOptionIngredient.appendChild(new TagFactory().tagDivIngredient(wordIngredientTag))
    })
  })

  inputAppliancesTag.addEventListener('input', (e) => {
    const word = e.target.value
    if (tagContainOptionAppliance !== null) { tagContainOptionAppliance.innerHTML = '' }
    const recipesDisplay = document.querySelectorAll('article:not(.hidden)')
    const applianceUpdateArray = arrayTextContentDiv(recipesDisplay, '.appliance')
    matchRegex(word, applianceUpdateArray).forEach((wordApplianceTag) => {
      tagContainOptionAppliance.appendChild(new TagFactory().tagDivAppliance(wordApplianceTag))
    })
  })

  inputUstensilsTag.addEventListener('input', (e) => {
    const word = e.target.value
    if (tagContainOptionUstensil !== null) { tagContainOptionUstensil.innerHTML = '' }
    const recipesDisplay = document.querySelectorAll('article:not(.hidden)')
    const ustensilsUpdateArray = arrayTextContentDiv(recipesDisplay, '.ustensil')
    matchRegex(word, ustensilsUpdateArray).forEach((wordUstensilTag) => {
      tagContainOptionUstensil.appendChild(new TagFactory().tagDivUstensil(wordUstensilTag))
    })
  })
}

export function interactionSearchListener () {
  const searchBarInput = document.querySelector('#global-searchbar')
  const buttonValidateSearch = document.querySelector('#searchValidate')

  searchBarInput.addEventListener('input', (e) => {
    const word = e.target.value
    if (word.length >= 3) {
      trigDisplayArticlesFiltred(word)
    }
  })

  buttonValidateSearch.addEventListener('click', (e) => {
    const word = e.target.value
    trigDisplayArticlesFiltred(word)
  })
}
