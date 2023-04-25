import { allTags } from './index.js'

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
      if (!tagUser.test(classDiv.textContent)) { numberFalse.push(1) } else { numberFalse.splice(-1) }
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

export function appendChildTags (elementTag) {
  const tagContain = document.querySelector('.tag-contain')
  const iconeCross = document.createElement('i')
  iconeCross.setAttribute('class', 'fa-regular fa-circle-xmark')
  elementTag.appendChild(iconeCross)
  tagContain.appendChild(elementTag)
}
export function removeChildTags (elementTag) {
  const tagContain = document.querySelector('.tag-contain')
  tagContain.removeChild(elementTag)
}

export function arrayTextContentDiv (arrayDiv, className) {
  const arrayTextContent = []
  arrayDiv.forEach((div) => {
    const divIngredients = div.querySelectorAll(className)
    divIngredients.forEach((divIngredient) => {
      arrayTextContent.push(caseFirstLetter(divIngredient.textContent))
    }
    )
  })
  return doubleDatas(arrayTextContent)
}

export function trigDisplayArticlesFiltred (word) {
  const allArticles = document.querySelectorAll('.recipes-article')
  allArticles.forEach((elementArticle) => {
    const articleClass = 'recipes-article'
    if (matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle).length === 0) {
      elementArticle.className = articleClass
    } else if (matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle).length !== 0) {
      elementArticle.className = articleClass + ' hidden'
    } else if (!matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle).length === 0) {
      elementArticle.className = articleClass + ' hidden'
    } else if (!matchRegexText(word, elementArticle) && matchRegexTagText(allTags, elementArticle).length !== 0) {
      elementArticle.className = articleClass + ' hidden'
    }
  })
}
