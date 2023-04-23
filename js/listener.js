import { matchRegex } from './utilsfunction.js'
import { TagFactory } from './TagFactory.js'

export function interactionTagListener (datasIngredients, datasAppliances, dataUstensils) {
  const inputIngredientTag = document.querySelector('#input-ingredients-tag')
  const optionContainIngredient = document.querySelector('.option-contain-ingredient')
  const tagContainOptionIngredient = optionContainIngredient.querySelector('.option-ingredients')

  inputIngredientTag.addEventListener('input', (e) => {
    const word = e.target.value
    tagContainOptionIngredient.appendChild(new TagFactory(datasIngredients).tagDiv())
    if (word.length >= 3) {
      if (tagContainOptionIngredient !== null) { tagContainOptionIngredient.innerHTML = '' }
      console.log('input', word)
      console.log('input2', matchRegex(word, datasIngredients))
      matchRegex(word, datasIngredients).forEach((wordIngredientTag) => {
        tagContainOptionIngredient.appendChild(new TagFactory(wordIngredientTag).tagDiv())
      })
    }
  })
}
