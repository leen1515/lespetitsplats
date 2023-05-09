import { allTags } from './index.js'
import { caseFirstLetterNormalize, doubleDatas } from './utilsfunction.js'
import { TagFactory } from './factory/TagFactory.js'
import { matchRegexListTag, allArticlesArrayUpdate } from './search.js'

export function appendChildTags (elementTag, idTag, tag) {
  const tagContain = document.querySelector('.tag-contain')
  if (tagContain.querySelector(`#${idTag}`) === null) {
    allTags.push(tag)
    const iconeCross = document.createElement('i')
    iconeCross.setAttribute('class', 'fa-regular fa-circle-xmark fa-x-position')
    elementTag.appendChild(iconeCross)
    tagContain.appendChild(elementTag)
  }
}
export function removeChildTags (elementTag, tag) {
  const tagContain = document.querySelector('.tag-contain')
  const indexTagRemove = allTags.indexOf(tag)
  allTags.splice(indexTagRemove, 1)
  tagContain.removeChild(elementTag)
}

export function listTextTagContent (allArticlesArrayUpdate, type, order) {
  const arrayTextContentIngredients = []
  const arrayTextContentAppliances = []
  const arrayTextContentUstensils = []

  if (type === 'ingredients') {
    allArticlesArrayUpdate.forEach((articleArray) => {
      articleArray[2].forEach((textIngredient) => {
        arrayTextContentIngredients.push(caseFirstLetterNormalize(textIngredient.ingredient).replaceAll(/\d/g, '').replaceAll('Viande hachée % de matière grasse', 'Viande hachée'))
      }
      )
    })
  } else if (type === 'appareils') {
    allArticlesArrayUpdate.forEach((articleArray) => {
      arrayTextContentAppliances.push(caseFirstLetterNormalize(articleArray[5]).replaceAll(/\d/g, ''))
    })
  } else if (type === 'ustensiles') {
    allArticlesArrayUpdate.forEach((articleArray) => {
      articleArray[6].forEach((textUstensils) => {
        arrayTextContentUstensils.push(caseFirstLetterNormalize(textUstensils).replaceAll(/\d/g, ''))
      }
      )
    })
  }
  let treatmentTextContentIngredients
  let treatmentTextContentAppliances
  let treatmentextContentUstensils
  if (order === true) {
    treatmentTextContentIngredients = doubleDatas(arrayTextContentIngredients).sort((a, b) => {
      return a.localeCompare(b, 'fr', { sensitivity: 'base' })
    })
    treatmentTextContentAppliances = doubleDatas(arrayTextContentAppliances).sort((a, b) => {
      return a.localeCompare(b, 'fr', { sensitivity: 'base' })
    })
    treatmentextContentUstensils = doubleDatas(arrayTextContentUstensils).sort((a, b) => {
      return a.localeCompare(b, 'fr', { sensitivity: 'base' })
    })
  } else {
    treatmentTextContentIngredients = doubleDatas(arrayTextContentIngredients)
    treatmentTextContentAppliances = doubleDatas(arrayTextContentAppliances)
    treatmentextContentUstensils = doubleDatas(arrayTextContentUstensils)
  }
  return [treatmentTextContentIngredients, treatmentTextContentAppliances, treatmentextContentUstensils]
}
export function updateTag (word, type, order) {
  let typeNumber
  let classContainType
  let optionContain
  if (type === 'ingredients') {
    classContainType = '.option-ingredients'
    optionContain = document.querySelector('.option-contain-ingredients')
    typeNumber = 0
  } else if (type === 'appareils') {
    classContainType = '.option-appareils'
    optionContain = document.querySelector('.option-contain-appareils')
    typeNumber = 1
  } else if (type === 'ustensiles') {
    classContainType = '.option-ustensiles'
    optionContain = document.querySelector('.option-contain-ustensiles')
    typeNumber = 2
  }

  const tagUpdateArray = listTextTagContent(allArticlesArrayUpdate, type, order)[typeNumber]
  matchRegexListTag(word, tagUpdateArray).forEach((wordTag) => {
    optionContain.querySelector(classContainType).appendChild(new TagFactory(wordTag, type).tagDiv())
  })
}

export function displaySectionTag (button, type, input) {
  input.placeholder = `Rechercher des ${type}`
  input.style.width = '250px'
  input.style.opacity = '0.5'
  if (button.className === 'fa-solid fa-angle-down fa-xl icone-position col-1') {
    document.querySelector(`.option-${type}`).style.display = 'grid'
    button.className = 'fa-solid fa-angle-up fa-xl icone-position col-1'
  } else {
    hideSectionTag(button, type, input)
  }
}
export function hideSectionTag (button, type, input) {
  input.placeholder = `${caseFirstLetterNormalize(type)}`
  input.style.width = '120px'
  input.style.opacity = '1'
  input.value = ''
  document.querySelector(`.option-${type}`).style.display = 'none'
  button.className = 'fa-solid fa-angle-down fa-xl icone-position col-1'
}
