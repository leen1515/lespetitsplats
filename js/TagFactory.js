import { appendChildTags, removeChildTags } from './utilsfunction.js'
export class TagFactory {
  constructor (tagIngredients, tagAppareils, tagUstensiles) {
    this.tagIngredients = tagIngredients
    this.tagAppareils = tagAppareils
    this.tagUstensiles = tagUstensiles
  }

  tagDiv () {
    let clickCheck = false
    if (this.tagIngredients) {
      const divTagIngredient = document.createElement('div')
      divTagIngredient.setAttribute('class', 'tag-ingredient col-sm-auto')
      divTagIngredient.textContent = this.tagIngredients
      divTagIngredient.addEventListener('click', () => {
        if (!clickCheck) {
          appendChildTags(divTagIngredient); clickCheck = true
        } else { removeChildTags(divTagIngredient); clickCheck = false }
      })
      return divTagIngredient
    }
    if (this.tagAppareils) {
      const divTagAppareil = document.createElement('div')
      divTagAppareil.setAttribute('class', 'tag-appareil')
      divTagAppareil.textContent = this.tagAppareils
      return divTagAppareil
    }
    if (this.tagUstensiles) {
      const divTagUstensile = document.createElement('div')
      divTagUstensile.setAttribute('class', 'tag-ustensile')
      divTagUstensile.textContent = this.tagUstensiles
      return divTagUstensile
    }
  }
}
