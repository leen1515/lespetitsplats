// rend entre-autres, minuscule un texte et rend le premier mot de sa phrase en majuscule
export function caseFirstLetterNormalize (letter) {
  const letterLowerCase = letter.toLowerCase().trim().replaceAll(')', '').replaceAll('(', '')
  return (letterLowerCase + '').charAt(0).toUpperCase() + letterLowerCase.substr(1)
}

// retourne qu'un element des multiples elements semblables
// utilisé pour la liste des tags
export function doubleDatas (datas) {
  const oneData = datas.filter((data, index) => {
    return datas.indexOf(data) === index
  })

  return oneData
}
