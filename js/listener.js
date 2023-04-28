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

  document.addEventListener('click', () => {
    const word = searchBarInput.value
    trigDisplayArticlesFiltred(word)
    if (optionContain !== null) { optionContain.forEach((optionC) => { optionC.querySelector('.option').innerHTML = '' }) }
    updateTag(inputIngredientTag.value, 'ingredients')
    updateTag(inputAppliancesTag.value, 'appareils')
    updateTag(inputUstensilsTag.value, 'ustensiles')
  })
}
