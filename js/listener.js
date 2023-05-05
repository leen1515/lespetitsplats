import { trigDisplayArticlesFiltred } from './search.js'
import { updateTag, displaySectionTag, hideSectionTag } from './tags.js'
export function interactionSearchListener () {
  const searchBarInput = document.querySelector('#global-searchbar')
  const buttonValidateSearch = document.querySelector('#searchValidate')
  const optionContain = document.querySelectorAll('.option-contain')
  trigDisplayArticlesFiltred('')
  searchBarInput.addEventListener('input', (e) => {
    const word = e.target.value
    if (word.length >= 3) {
      trigDisplayArticlesFiltred(word)
    }
    if (word === '') {
      trigDisplayArticlesFiltred(word)
    }
  })

  buttonValidateSearch.addEventListener('click', (e) => {
    const word = e.target.value
    trigDisplayArticlesFiltred(word)
    if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
    const wordEmpty = ''
    updateTag(wordEmpty, 'ingredients')
    updateTag(wordEmpty, 'appareils')
    updateTag(wordEmpty, 'ustensiles')
  })
}

export function interactionTagListener () {
  const inputIngredientTag = document.querySelector('#input-ingredients-tag')
  const inputAppliancesTag = document.querySelector('#input-appareils-tag')
  const inputUstensilsTag = document.querySelector('#input-ustensiles-tag')
  const optionContain = document.querySelectorAll('.option-contain')

  const ingredientButtonActivation = document.querySelector('#display-ingredient-buttonclass')
  const applianceButtonActivation = document.querySelector('#display-appliance-buttonclass')
  const ustensileButtonActivation = document.querySelector('#display-ustensile-buttonclass')

  ingredientButtonActivation.addEventListener('click', () => {
    displaySectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
  })
  applianceButtonActivation.addEventListener('click', () => {
    displaySectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
  })
  ustensileButtonActivation.addEventListener('click', () => {
    displaySectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })
  inputIngredientTag.addEventListener('click', () => {
    displaySectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
  })
  inputAppliancesTag.addEventListener('click', () => {
    displaySectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
  })
  inputUstensilsTag.addEventListener('click', () => {
    displaySectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })
  inputIngredientTag.addEventListener('input', (e) => {
    if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
    const word = e.target.value
    updateTag(word, 'ingredients')
  })

  inputAppliancesTag.addEventListener('input', (e) => {
    if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
    const word = e.target.value
    updateTag(word, 'appareils')
  })
  inputUstensilsTag.addEventListener('input', (e) => {
    if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
    const word = e.target.value
    updateTag(word, 'ustensiles')
  })

  const searchBarInput = document.querySelector('#global-searchbar')
  document.addEventListener('click', () => {
    const word = searchBarInput.value
    trigDisplayArticlesFiltred(word)
    if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
    updateTag(inputIngredientTag.value, 'ingredients')
    updateTag(inputAppliancesTag.value, 'appareils')
    updateTag(inputUstensilsTag.value, 'ustensiles')
  })
  const main = document.querySelector('.recipes-contain')
  main.addEventListener('mouseover', () => {
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })
  searchBarInput.addEventListener('mouseover', () => {
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })
}
