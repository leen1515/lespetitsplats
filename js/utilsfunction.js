export function matchRegex (word, datas) {
  const searchUser = new RegExp(word, 'gi')
  console.log('dataavant', datas)
  const filteredDatas = datas.filter((data) => data.match(searchUser))
  console.log('filterDatas', filteredDatas)
  return filteredDatas
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
