import { allTags, allArticlesArray } from './index.js'
import { TagFactory } from './factory/TagFactory.js'

export function matchRegex (word, datas) {
  const searchUser = new RegExp(word, 'gi')
  const filteredDatas = datas.filter((data) => data.match(searchUser))
  return filteredDatas
}
export function matchRegexText (word, text) {
  const searchUser = new RegExp(word, 'gi')
  const filteredTextDiv = searchUser.test(text.textContent)
  return filteredTextDiv
}

export function matchRegexTagText (tagList, classDiv) {
  const numberFalse = []
  if (tagList !== null) {
    tagList.forEach((tag) => {
      const tagUser = new RegExp(tag, 'gi')
      if (!tagUser.test(classDiv.textContent)) {
        numberFalse.push(1)
      } else { numberFalse.splice(1) }
    })
  }
  return numberFalse
}

export function caseFirstLetter (letter) {
  const letterLowerCase = letter.toLowerCase()
  return (letterLowerCase + '').charAt(0).toUpperCase() + letterLowerCase.substr(1)
}

export function doubleDatas (datas) {
  const oneData = datas.filter((data, index) => {
    return datas.indexOf(data) === index
  })

  return oneData
}

export function appendChildTags (elementTag, idTag, tagIngredients) {
  const tagContain = document.querySelector('.tag-contain')
  if (tagContain.querySelector(`#${idTag}`) === null) {
    allTags.push(tagIngredients)
    const iconeCross = document.createElement('i')
    iconeCross.setAttribute('class', 'fa-regular fa-circle-xmark')
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
  return doubleDatas(arrayTextContent)
}

export function trigDisplayArticlesFiltred (word) {
  const allRecipes = document.querySelector('.recipes-contain')
  allArticlesArray.forEach((elementArticle) => {
    if (matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle).length === 0) {
      allRecipes.appendChild(elementArticle)
    } else if (matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle).length !== 0) {
      if (elementArticle !== null) { elementArticle.remove() }
    } else if (!matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle).length === 0) {
      if (elementArticle !== null) { elementArticle.remove() }
    } else if (!matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle).length !== 0) {
      if (elementArticle !== null) { elementArticle.remove() }
    }
  })
}

export function updateTag (word, type) {
  let classContainType
  let optionContain
  let classNameType
  switch (type) {
    case 'ingredients':
      classContainType = '.option-ingredients'
      optionContain = document.querySelector('.option-contain-ingredient')
      classNameType = '.ingredient'
      break
    case 'appareils':
      classContainType = '.option-appareils'
      classNameType = '.appliance'
      optionContain = document.querySelector('.option-contain-appareils')
      break
    case 'ustensiles':
      classContainType = '.option-ustensiles'
      classNameType = '.ustensil'
      optionContain = document.querySelector('.option-contain-ustensiles')
      break
  }
  if (document.querySelector('article') !== null) {
    const recipesDisplay = document.querySelectorAll('article')
    const tagUpdateArray = arrayTextContentDiv(recipesDisplay, classNameType)
    matchRegex(word, tagUpdateArray).forEach((wordTag) => {
      optionContain.querySelector(classContainType).appendChild(new TagFactory(wordTag, type).tagDiv())
    })
  }
}
