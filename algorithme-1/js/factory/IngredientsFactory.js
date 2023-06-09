export class IngredientsFactory {
  constructor (ingredient, quantity, unit) {
    this.ingredient = ingredient
    this.quantity = quantity
    this.unit = unit
  }

  detailIngredients () {
    const ingredients = document.createElement('div')
    const ingredient = document.createElement('div')
    const quantity = document.createElement('div')
    const unit = document.createElement('div')

    ingredients.setAttribute('class', 'ingredientsContain row')
    ingredient.setAttribute('class', 'ingredient col-auto align-self-start')
    quantity.setAttribute('class', 'quantity col-auto align-self-start')
    unit.setAttribute('class', 'unit col-auto align-self-start')

    ingredient.textContent = `${this.ingredient}`
    if (this.quantity !== undefined) {
      quantity.textContent = `: ${this.quantity} `
    } else {
      quantity.textContent = ''
    }
    if (this.unit !== undefined) {
      unit.textContent = this.unit.replace('grammes', 'g')
    }

    ingredients.appendChild(ingredient)
    ingredients.appendChild(quantity)
    ingredients.appendChild(unit)

    return ingredients
  }
}
