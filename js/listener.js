import { trigDisplayArticlesFiltred, updateTag } from './utilsfunction.js'

export function interactionSearchListener () {
  const searchBarInput = document.querySelector('#global-searchbar')
  const buttonValidateSearch = document.querySelector('#searchValidate')
  const optionContain = document.querySelectorAll('.option-contain')
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
  const searchBarInput = document.querySelector('#global-searchbar')
  const inputIngredientTag = document.querySelector('#input-ingredients-tag')
  const inputAppliancesTag = document.querySelector('#input-appareils-tag')
  const inputUstensilsTag = document.querySelector('#input-ustensiles-tag')
  const optionContain = document.querySelectorAll('.option-contain')

  const ingredientButtonActivation = document.querySelector('#display-ingredient-buttonclass')
  const applianceButtonActivation = document.querySelector('#display-appliance-buttonclass')
  const ustensileButtonActivation = document.querySelector('#display-ustensile-buttonclass')

  ingredientButtonActivation.addEventListener('click', () => {
    if (ingredientButtonActivation.className === 'fa-solid fa-angle-down fa-xl icone-position col-1') {
      document.querySelector('.option-ingredients').style.display = 'grid'
      ingredientButtonActivation.className = 'fa-solid fa-angle-up fa-xl icone-position col-1'
    } else {
      document.querySelector('.option-ingredients').style.display = 'none'
      ingredientButtonActivation.className = 'fa-solid fa-angle-down fa-xl icone-position col-1'
    }
  })
  applianceButtonActivation.addEventListener('click', () => {
    if (applianceButtonActivation.className === 'fa-solid fa-angle-down fa-xl icone-position col-1') {
      document.querySelector('.option-appareils').style.display = 'grid'
      applianceButtonActivation.className = 'fa-solid fa-angle-up fa-xl icone-position col-1'
    } else {
      document.querySelector('.option-appareils').style.display = 'none'
      applianceButtonActivation.className = 'fa-solid fa-angle-down fa-xl icone-position col-1'
    }
  })
  ustensileButtonActivation.addEventListener('click', () => {
    if (ustensileButtonActivation.className === 'fa-solid fa-angle-down fa-xl icone-position col-1') {
      document.querySelector('.option-ustensiles').style.display = 'grid'
      ustensileButtonActivation.className = 'fa-solid fa-angle-up fa-xl icone-position col-1'
    } else {
      document.querySelector('.option-ustensiles').style.display = 'none'
      ustensileButtonActivation.className = 'fa-solid fa-angle-down fa-xl icone-position col-1'
    }
  })

  inputIngredientTag.addEventListener('input', (e) => {
    if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
    const word = e.target.value
    updateTag(word, 'ingredients')
    if (ingredientButtonActivation.className === 'fa-solid fa-angle-down fa-xl icone-position col-1') {
      document.querySelector('.option-ingredients').style.display = 'grid'
      ingredientButtonActivation.className = 'fa-solid fa-angle-up fa-xl icone-position col-1'
    } else {
      document.querySelector('.option-ingredients').style.display = 'none'
      ingredientButtonActivation.className = 'fa-solid fa-angle-down fa-xl icone-position col-1'
    }
  })

  inputAppliancesTag.addEventListener('input', (e) => {
    if (applianceButtonActivation.className === 'fa-solid fa-angle-down fa-xl icone-position col-1') {
      document.querySelector('.option-appareils').style.display = 'grid'
      applianceButtonActivation.className = 'fa-solid fa-angle-up fa-xl icone-position col-1'
    } else {
      document.querySelector('.option-appareils').style.display = 'none'
      applianceButtonActivation.className = 'fa-solid fa-angle-down fa-xl icone-position col-1'
    }
  })
  inputUstensilsTag.addEventListener('input', (e) => {
    if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
    const word = e.target.value
    updateTag(word, 'ustensiles')
    if (ustensileButtonActivation.className === 'fa-solid fa-angle-down fa-xl icone-position col-1') {
      document.querySelector('.option-ustensiles').style.display = 'grid'
      ustensileButtonActivation.className = 'fa-solid fa-angle-up fa-xl icone-position col-1'
    } else {
      document.querySelector('.option-ustensiles').style.display = 'none'
      ustensileButtonActivation.className = 'fa-solid fa-angle-down fa-xl icone-position col-1'
    }
  })

  document.addEventListener('click', () => {
    const word = searchBarInput.value
    trigDisplayArticlesFiltred(word)
    if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
    updateTag(inputIngredientTag.value, 'ingredients')
    updateTag(inputAppliancesTag.value, 'appareils')
    updateTag(inputUstensilsTag.value, 'ustensiles')
  })
}
