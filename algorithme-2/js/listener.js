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
    if (word.length >= 3) {
      trigDisplayArticlesFiltred(word)
    } else if (word.length < 3) {
      trigDisplayArticlesFiltred('')
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
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })
  applianceButtonActivation.addEventListener('click', () => {
    updateDataDisplay('appareils', false)
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })
  ustensileButtonActivation.addEventListener('click', () => {
    updateDataDisplay('ustensiles', false)
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
  })

  inputIngredientTag.addEventListener('click', () => {
    updateDataDisplay('ingredients', false)
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })
  inputAppliancesTag.addEventListener('click', () => {
    updateDataDisplay('appareils', false)
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })

  inputUstensilsTag.addEventListener('click', () => {
    updateDataDisplay('ustensiles', false)
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
  })

  inputIngredientTag.addEventListener('input', (e) => {
    if (e.target.value.length >= 3 || e.target.value === '') {
      updateDataDisplay('ingredients', true)
    }
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })

  inputAppliancesTag.addEventListener('input', (e) => {
    if (e.target.value.length >= 3 || e.target.value === '') {
      updateDataDisplay('appareils', true)
    }
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })

  inputUstensilsTag.addEventListener('input', (e) => {
    if (e.target.value.length >= 3 || e.target.value === '') {
      updateDataDisplay('ustensiles', true)
    }
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
  })

  const searchBarInput = document.querySelector('#global-searchbar')
  document.addEventListener('click', (e) => {
    if (e.target.getAttribute('name') === 'tags' || e.target.classList.contains('closeTag')) {
      updateDataDisplay('total')
    }
  })
  const main = document.querySelector('.recipes-contain')
  main.addEventListener('click', () => {
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })
  searchBarInput.addEventListener('click', () => {
    hideSectionTag(ingredientButtonActivation, 'ingredients', inputIngredientTag)
    hideSectionTag(applianceButtonActivation, 'appareils', inputAppliancesTag)
    hideSectionTag(ustensileButtonActivation, 'ustensiles', inputUstensilsTag)
  })
}

function updateDataDisplay (type, input) {
  switch (type) {
    case 'ingredients' :
      if (!input){ displaySectionTag(ingredientButtonActivation, type, inputIngredientTag) }
      trigDisplayArticlesFiltred(searchBarInput.value)
      if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
      (inputIngredientTag.value.length > 0 ? updateTag(inputIngredientTag.value, type, false) : updateTag(inputIngredientTag.value, type, true))
      break
    case 'appareils' :
      if (!input){ displaySectionTag(applianceButtonActivation, type, inputAppliancesTag) }
      trigDisplayArticlesFiltred(searchBarInput.value)
      if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
      (inputAppliancesTag.value.length > 0 ? updateTag(inputAppliancesTag.value, type, false) : updateTag(inputAppliancesTag.value, type, true))
      break
    case 'ustensiles':
      if (!input){ displaySectionTag(ustensileButtonActivation, type, inputUstensilsTag) }
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
