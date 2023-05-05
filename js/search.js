import { allArticlesArray, allTags } from './index.js'

export function matchRegex (word, datas) {
  const searchUser = new RegExp(`^${word}`, 'gim')
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

export function trigDisplayArticlesFiltred (word) {
  const allRecipes = document.querySelector('.recipes-contain')
  allArticlesArray.forEach((elementArticle) => {
    console.log('article', allArticlesArray)
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
