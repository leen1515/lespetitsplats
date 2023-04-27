import { trigDisplayArticlesFiltred, updateTag } from './utilsfunction.js'

export function interactionSearchListener () {
  const searchBarInput = document.querySelector('#global-searchbar')
  const buttonValidateSearch = document.querySelector('#searchValidate')

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
  })
}

export function interactionTagListener () {
  const inputIngredientTag = document.querySelector('#input-ingredients-tag')
  const inputAppliancesTag = document.querySelector('#input-appareils-tag')
  const inputUstensilsTag = document.querySelector('#input-ustensiles-tag')

  inputIngredientTag.addEventListener('input', (e) => {
    const word = e.target.value
    updateTag(word, 'ingredients')
  })

  inputIngredientTag.addEventListener('click', (e) => {
    const word = e.target.value
    updateTag(word, 'ingredients')
  })

  inputAppliancesTag.addEventListener('input', (e) => {
    const word = e.target.value
    updateTag(word, 'appareils')
  })

  inputAppliancesTag.addEventListener('click', (e) => {
    const word = e.target.value
    updateTag(word, 'appareils')
  })

  inputUstensilsTag.addEventListener('input', (e) => {
    const word = e.target.value
    updateTag(word, 'ustensiles')
  })

  inputUstensilsTag.addEventListener('click', (e) => {
    const word = e.target.value
    updateTag(word, 'ustensiles')
  }
  )
}
