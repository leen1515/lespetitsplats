import { appendChildTags, removeChildTags, trigDisplayArticlesFiltred } from '../utilsfunction.js'

export class TagFactory {
  constructor (tag, tagType) {
    this.tag = tag
    this.tagType = tagType
  }

  tagDiv () {
    let classTag
    switch (this.typeTag) {
      case 'ingredients':
        classTag = 'tag-ingredient'
        break; case 'appareils':
        classTag = 'tag-appareil'
        break
      case 'ustensiles':
        classTag = 'tag-ustensile'
        break
    }
    console.log(this.tag)
    let clickCheck = false
    const divTag = document.createElement('div')
    divTag.setAttribute('class', `${classTag} tag col-sm-auto`)
    divTag.textContent = this.tag
    const tagId = this.tag.replaceAll(' ', '-').replaceAll(')', '-').replaceAll('(', '-')
    divTag.setAttribute('id', tagId)
    divTag.addEventListener('click', () => {
      const searchBarInput = document.querySelector('#global-searchbar').value
      trigDisplayArticlesFiltred(searchBarInput)
      if (!clickCheck) {
        appendChildTags(divTag, tagId, this.tag); clickCheck = true
      } else {
        removeChildTags(divTag, this.tag); clickCheck = false
      }
    })
    return divTag
  }
}
