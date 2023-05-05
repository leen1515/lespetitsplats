import { allTags } from './index.js'
import { caseFirstLetter, doubleDatas } from './utilsfunction.js'
import { TagFactory } from './factory/TagFactory.js'
import { matchRegex } from './search.js'

export function appendChildTags (elementTag, idTag, tagIngredients) {
  const tagContain = document.querySelector('.tag-contain')
  if (tagContain.querySelector(`#${idTag}`) === null) {
    allTags.push(tagIngredients)
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

export function arrayTextContentDiv (arrayDiv, className) {
  const arrayTextContent = []
  arrayDiv.forEach((div) => {
    const divIngredients = div.querySelectorAll(className)
    divIngredients.forEach((divIngredient) => {
      arrayTextContent.push(caseFirstLetter(divIngredient.textContent.toLowerCase()))
    }
    )
  })
  const orderTag = arrayTextContent.sort((a, b) => {
    return a.localeCompare(b, 'fr', { sensitivity: 'base' })
  })
  return doubleDatas(orderTag)
}

export function updateTag (word, type, order) {
  let classContainType
  let optionContain
  let classNameType
  if (type === 'ingredients') {
    classContainType = '.option-ingredients'
    optionContain = document.querySelector('.option-contain-ingredients')
    classNameType = '.ingredient'
  } else if (type === 'appareils') {
    classContainType = '.option-appareils'
    classNameType = '.appliance'
    optionContain = document.querySelector('.option-contain-appareils')
  } else if (type === 'ustensiles') {
    classContainType = '.option-ustensiles'
    classNameType = '.ustensil'
    optionContain = document.querySelector('.option-contain-ustensiles')
  }

  if (document.querySelector('article') !== null) {
    const recipesDisplay = document.querySelectorAll('article')
    const tagUpdateArray = arrayTextContentDiv(recipesDisplay, classNameType, order)
    matchRegex(word, tagUpdateArray).forEach((wordTag) => {
      optionContain.querySelector(classContainType).appendChild(new TagFactory(wordTag, type).tagDiv())
    })
  }
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
  input.placeholder = `${type}`
  input.style.width = '120px'
  input.style.opacity = '1'
  input.value = ''
  document.querySelector(`.option-${type}`).style.display = 'none'
  button.className = 'fa-solid fa-angle-down fa-xl icone-position col-1'
}
