
export class RecipesFactory {
  constructor (id, name, cardsIngredients, time, description, appliance, ustensil) {
    this.id = id
    this.name = name
    this.cardsIngredients = cardsIngredients
    this.time = time
    this.description = description
    this.appliance = appliance
    this.ustensil = ustensil
  }

  cardsFactory () {
    const articleRecipe = document.createElement('article')
    const imgContainRecipe = document.createElement('div')
    // const imgRecipe = document.createElement('img')
    const descriptionRecipe = document.createElement('div')
    const headRecipe = document.createElement('div')
    const h2Recipe = document.createElement('h2')
    const timeContainRecipe = document.createElement('div')
    const timeIcone = document.createElement('i')
    const timeRecipe = document.createElement('div')
    const bodyRecipe = document.createElement('div')
    const ingredientsRecipe = document.createElement('div')
    const indicationRecipe = document.createElement('div')

    articleRecipe.setAttribute('id', this.id)
    articleRecipe.setAttribute('class', 'recipes-article')
    imgContainRecipe.setAttribute('class', 'img-parent')
    descriptionRecipe.setAttribute('class', 'description-recipe')
    headRecipe.setAttribute('class', 'description-header row')
    h2Recipe.setAttribute('class', 'header-title col-9')
    timeContainRecipe.setAttribute('class', 'header__time-contain col-3 row justify-content-end align-self-top')
    timeIcone.setAttribute('class', 'fa-regular fa-clock col-2 align-self-top justify-content-end')
    timeRecipe.setAttribute('class', 'time col-3 align-self-top justify-content-end')
    bodyRecipe.setAttribute('class', 'body-description row')
    ingredientsRecipe.setAttribute('class', 'body-ingredient col-6')
    indicationRecipe.setAttribute('class', 'body-indication col-6')
    h2Recipe.textContent = this.name
    timeRecipe.textContent = this.time
    new Array(this.cardsIngredients)[0].forEach((ingredient) => { ingredientsRecipe.appendChild(ingredient) })
    indicationRecipe.textContent = this.description

    const appliances = document.createElement('div')
    const appliance = document.createElement('div')
    appliances.setAttribute('class', 'applianceContain row')
    appliance.setAttribute('class', 'appliance col-auto align-self-start')
    appliance.textContent = `${this.appliance}`
    appliances.appendChild(appliance)
    ingredientsRecipe.appendChild(appliances)

    const ustensiles = document.createElement('div')
    this.ustensil.forEach((ustensilOne) => {
      const ustensil = document.createElement('div')
      ustensiles.setAttribute('class', 'ustensilContain row')
      ustensil.setAttribute('class', 'ustensil col-auto align-self-start')
      ustensil.textContent = `${ustensilOne}`
      ustensiles.appendChild(ustensil)
      ingredientsRecipe.appendChild(ustensiles)
    })

    articleRecipe.appendChild(imgContainRecipe)
    articleRecipe.appendChild(descriptionRecipe)
    descriptionRecipe.appendChild(headRecipe)
    descriptionRecipe.appendChild(bodyRecipe)
    headRecipe.appendChild(h2Recipe)
    headRecipe.appendChild(timeContainRecipe)
    timeContainRecipe.appendChild(timeIcone)
    timeContainRecipe.appendChild(timeRecipe)
    bodyRecipe.appendChild(ingredientsRecipe)
    bodyRecipe.appendChild(indicationRecipe)

    return articleRecipe
  }
}
