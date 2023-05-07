
export function caseFirstLetterNormalize (letter) {
  const letterLowerCase = letter.toLowerCase().trim().replaceAll(')', '').replaceAll('(', '')
  return (letterLowerCase + '').charAt(0).toUpperCase() + letterLowerCase.substr(1)
}

export function doubleDatas (datas) {
  const oneData = datas.filter((data, index) => {
    return datas.indexOf(data) === index
  })

  return oneData
}
