import { allTags } from './index.js'
import { caseFirstLetterNormalize, doubleDatas } from './utilsfunction.js'
import { TagFactory } from './factory/TagFactory.js'
import { testMatchRegexText, allArticlesArrayUpdate } from './search.js'

// cree le tag selectionné et l'ajoute dans le tableau à portée global : allTags
// il ajoute aussi dans le conteneur div des tags selectionnés côté DOM
// cette fonction est appelé dans le cas de l'évenement utilisateur lors de son click.
// un tag cliqué devient un tag selectionné
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
// permet d'effacer le tag, le déselectionné
export function removeChildTags (elementTag, tag) {
  const tagContain = document.querySelector('.tag-contain')
  // récupère l'index du tag
  const indexTagRemove = allTags.indexOf(tag)
  // l'élimine du tableau des tags selectionné
  allTags.splice(indexTagRemove, 1)
  // l'élimine du DOM, gràce à son id, il est communiqué en argument
  tagContain.removeChild(elementTag)
}

// met à jour les listes de tags des recettes presentent sur la page
export function listTextTagContent (allArticlesArrayUpdate, type, order) {
  // initialise les tableau en vide.
  const arrayTextContentIngredients = []
  const arrayTextContentAppliances = []
  const arrayTextContentUstensils = []
  // parcours le tableau des recettes à jour et instaure une boucle à l'index 2 pour parcourir
  // la liste des ingrédients et les ajoute au tableau correspondant
  if (type === 'ingredients') {
    allArticlesArrayUpdate.forEach((articleArray) => {
      articleArray[2].forEach((textIngredient) => {
        arrayTextContentIngredients.push(caseFirstLetterNormalize(textIngredient.ingredient).replaceAll(/\d/g, '').replaceAll('Viande hachée % de matière grasse', 'Viande hachée'))
      }
      )
    })// pareil mais pour appareil
  } else if (type === 'appareils') {
    allArticlesArrayUpdate.forEach((articleArray) => {
      arrayTextContentAppliances.push(caseFirstLetterNormalize(articleArray[5]).replaceAll(/\d/g, ''))
    })// pareil
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
  // création de nouvelles constantes par liste pour pouvoir traiter les doublons et les réordonner
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
    // creer les constantes sans les ordonner
    treatmentTextContentIngredients = doubleDatas(arrayTextContentIngredients)
    treatmentTextContentAppliances = doubleDatas(arrayTextContentAppliances)
    treatmentextContentUstensils = doubleDatas(arrayTextContentUstensils)
  }
  return [treatmentTextContentIngredients, treatmentTextContentAppliances, treatmentextContentUstensils]
}

// cette fonction est appelée à l'evenement utilisateur, un tag cliqué ou un input tag cliqué
// le type du tag est communiqué avec l'argument type, l'argument word est le mot clé que l'utilisateur
// entre dans la barre de recherche de la liste des tags
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
  // injecte la liste tag dans un nouveau tableau
  // le type de la liste a injecter est communiqué : ingredient : (0) ou appareil : (1) etc...
  const tagUpdateArray = listTextTagContent(allArticlesArrayUpdate, type, order)[typeNumber]
  // appelle la fonction pour avoir un nouveau tableau filtré de la liste des tags
  // le parcourt avec la boucle forEach et construit pour chaque mot un bouton tag
  // qui s'ajoute et qui s'efface du DOM au click
  testMatchRegexText(word, tagUpdateArray).forEach((wordTag) => {
    optionContain.querySelector(classContainType).appendChild(new TagFactory(wordTag, type).tagDiv())
  })
}

// gestion du comportement des tags sur l'interface
// affiche la liste des tags active
export function displaySectionTag (button, type, input) {
  input.placeholder = `Rechercher des ${type}`
  input.style.width = '250px'
  input.style.opacity = '0.5'
  if (button.className === 'fa-solid fa-angle-down fa-xl icone-position col-1') {
    document.querySelector(`.option-${type}`).style.display = 'grid'
    button.className = 'fa-solid fa-angle-up fa-xl icone-position col-1'
  }
}
// cache la liste des tags désactivée
export function hideSectionTag (button, type, input) {
  input.placeholder = `${caseFirstLetterNormalize(type)}`
  input.style.width = '120px'
  input.style.opacity = '1'
  input.value = ''
  document.querySelector(`.option-${type}`).style.display = 'none'
  button.className = 'fa-solid fa-angle-down fa-xl icone-position col-1'
}
