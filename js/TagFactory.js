import { appendChildTags, removeChildTags, trigDisplayArticlesFiltred } from './utilsfunction.js'
import { allTags } from './index.js'

export class TagFactory {
  tagDivIngredient (tagIngredients) {
    let clickCheck = false
    const divTagIngredient = document.createElement('div')
    divTagIngredient.setAttribute('class', 'tag-ingredient tag col-sm-auto')
    divTagIngredient.textContent = tagIngredients
    divTagIngredient.addEventListener('click', () => {
      if (!clickCheck) {
        appendChildTags(divTagIngredient); clickCheck = true
        allTags.push(tagIngredients)
      } else {
        removeChildTags(divTagIngredient); clickCheck = false
        const indexTagRemove = allTags.indexOf(tagIngredients)
        allTags.splice(indexTagRemove, 1)
      }
      const searchBarInput = document.querySelector('#global-searchbar').value
      trigDisplayArticlesFiltred(searchBarInput)
    })
    return divTagIngredient
  }

  tagDivAppliance (tagAppliance) {
    let clickCheck = false
    const divTagAppliance = document.createElement('div')
    divTagAppliance.setAttribute('class', 'tag-appareil tag col-sm-auto')
    divTagAppliance.textContent = tagAppliance
    divTagAppliance.addEventListener('click', () => {
      if (!clickCheck) {
        appendChildTags(divTagAppliance); clickCheck = true
        allTags.push(tagAppliance)
      } else {
        removeChildTags(divTagAppliance); clickCheck = false
        const indexTagRemove = allTags.indexOf(tagAppliance)
        allTags.splice(indexTagRemove, 1)
      }
      const searchBarInput = document.querySelector('#global-searchbar').value
      trigDisplayArticlesFiltred(searchBarInput)
    })
    return divTagAppliance
  }

  tagDivUstensil (tagUstensiles) {
    let clickCheck = false
    const divTagUstensile = document.createElement('div')
    divTagUstensile.setAttribute('class', 'tag-ustensile tag col-sm-auto')
    divTagUstensile.textContent = tagUstensiles
    divTagUstensile.addEventListener('click', () => {
      if (!clickCheck) {
        appendChildTags(divTagUstensile); clickCheck = true
        allTags.push(tagUstensiles)
      } else {
        removeChildTags(divTagUstensile); clickCheck = false
        const indexTagRemove = allTags.indexOf(tagUstensiles)
        allTags.splice(indexTagRemove, 1)
      }
      const searchBarInput = document.querySelector('#global-searchbar').value
      trigDisplayArticlesFiltred(searchBarInput)
    })
    return divTagUstensile
  }
}
