import { trigDisplayArticlesFiltred } from './search.js'
import { updateTag, displaySectionTag, hideSectionTag } from './tags.js'

const searchBarInput = document.querySelector('#global-searchbar')
const buttonValidateSearch = document.querySelector('#searchValidate')

const inputIngredientTag = document.querySelector('#input-ingredients-tag')
const inputAppliancesTag = document.querySelector('#input-appareils-tag')
const inputUstensilsTag = document.querySelector('#input-ustensiles-tag')
const optionContain = document.querySelectorAll('.option-contain')

const ingredientButtonActivation = document.querySelector('#display-ingredient-buttonclass')
const applianceButtonActivation = document.querySelector('#display-appliance-buttonclass')
const ustensileButtonActivation = document.querySelector('#display-ustensile-buttonclass')

export function interactionSearchListener () {
  trigDisplayArticlesFiltred('')
  searchBarInput.addEventListener('input', (e) => {
    const word = e.target.value
    console.log(word)
    if (word.length >= 0) {
      trigDisplayArticlesFiltred(word)
    }
    if (word === '') {
      trigDisplayArticlesFiltred(word)
    }
  })

  buttonValidateSearch.addEventListener('click', (e) => {
    const word = e.target.value
    trigDisplayArticlesFiltred(word)
  })
}

export function interactionTagListener () {
  ingredientButtonActivation.addEventListener('click', () => {
    updateDataDisplay('ingredients', false)
  })
  applianceButtonActivation.addEventListener('click', () => {
    updateDataDisplay('appareils', false)
  })
  ustensileButtonActivation.addEventListener('click', () => {
    updateDataDisplay('ustensiles', false)
  })

  inputIngredientTag.addEventListener('click', () => {
    updateDataDisplay('ingredients', false)
  })
  inputAppliancesTag.addEventListener('click', () => {
    updateDataDisplay('appareils', false)
  })

  inputUstensilsTag.addEventListener('click', () => {
    updateDataDisplay('ustensiles', false)
  })

  inputIngredientTag.addEventListener('input', (e) => {
    updateDataDisplay('ingredients', true)
  })

  inputAppliancesTag.addEventListener('input', (e) => {
    updateDataDisplay('appareils', true)
  })

  inputUstensilsTag.addEventListener('input', (e) => {
    updateDataDisplay('ustensiles', true)
  })

  const searchBarInput = document.querySelector('#global-searchbar')
  document.addEventListener('click', (e) => {
    console.log(e.target.getAttribute('name'))
    if (e.target.getAttribute('name') === 'tags') {
      updateDataDisplay('total')
    }
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

function updateDataDisplay (type, input) {
  switch (type) {
    case 'ingredients' :
      (!input ? displaySectionTag(ingredientButtonActivation, type, inputIngredientTag) : console.log(input))
      trigDisplayArticlesFiltred(searchBarInput.value)
      if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
      (inputIngredientTag.value.length > 0 ? updateTag(inputIngredientTag.value, type, false) : updateTag(inputIngredientTag.value, type, true))
      break
    case 'appareils' :
      (!input ? displaySectionTag(applianceButtonActivation, type, inputAppliancesTag) : console.log(input))
      trigDisplayArticlesFiltred(searchBarInput.value)
      if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
      (inputAppliancesTag.value.length > 0 ? updateTag(inputAppliancesTag.value, type, false) : updateTag(inputAppliancesTag.value, type, true))
      break
    case 'ustensiles':
      (!input ? displaySectionTag(ustensileButtonActivation, type, inputUstensilsTag) : console.log(input))
      trigDisplayArticlesFiltred(searchBarInput.value)
      if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
      (inputUstensilsTag.value.length > 0 ? updateTag(inputUstensilsTag.value, type, false) : updateTag(inputUstensilsTag.value, type, true))
      break
    case 'total':
      trigDisplayArticlesFiltred(searchBarInput.value)
      if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
      updateTag(inputIngredientTag.value, 'ingredients', true)
      updateTag(inputAppliancesTag.value, 'appareils', true)
      updateTag(inputUstensilsTag.value, 'ustensiles', true)
      break
  }
}
