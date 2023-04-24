export function matchRegex (word, datas) {
  const searchUser = new RegExp(word, 'gi')
  const filteredDatas = datas.filter((data) => data.match(searchUser))
  return filteredDatas
}

export function matchRegexText (word, text) {
  const searchUser = new RegExp(word, 'gi')
  const filteredText = searchUser.test(text.innerText)
  return filteredText
}

export function matchRegexTagText (tagList, classDiv) {
  let filteredText = 0
  if (tagList !== null) {
    tagList.forEach((tag) => {
      const tagUser = new RegExp(tag, 'gi')
      if (!tagUser.test(classDiv.innerText)) {
        filteredText++
      }
    })
  }
  if (filteredText === 0) { return true } else { return false }
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
