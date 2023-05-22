// rend entre-autres, minuscule un texte et rend le premier mot de sa phrase en majuscule
export function caseFirstLetterNormalize (letter) {
  const letterLowerCase = letter.toLowerCase().trim().split('(')[0]
  return (letterLowerCase + '').charAt(0).toUpperCase() + letterLowerCase.substr(1)
}

// retourne qu'un element des multiples elements semblables, résout le problème des singuliers et pluriels
// utilisé pour la liste des tags
export function doubleDatas (datas) {
  // filtre les doublons
  const oneData = datas.filter((data, index) => {
    return datas.indexOf(data) === index
  })
  // initialise un nouveau tableau pour gerer les S
  const oneDataS = []
  oneData.forEach((data, index, parent) => {
    // si le dernier caractère de la donnée est S & que les avant-derniers caractère ne sont pas trouvé dans la liste parent
    if (data.charAt(data.length - 1) === 's' && parent.includes(data.substr(0, data.length - 1)) === false) {
      // ajoute la donnée avec son S car cela veut dire, qu'elle ne se rencontre jamais en double sans le S
      oneDataS.push(data)
    } else if (data.charAt(data.length - 1) !== 's') {
      // ajoute toutes les autres données sans S
      oneDataS.push(data)
    }
  })
  return oneDataS
}
