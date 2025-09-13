Cypress.Commands.add('login', (email, senha) => {
  cy.visit('/minha-conta/')
  cy.get('#username').type(email)
  cy.get('#password').type(senha)
  cy.get('.woocommerce-form > .button').click()
})

Cypress.Commands.add('adicionarProduto', (index, tamanho, cor) => {
  cy.get('.products .product').eq(index).click()
  cy.get(`.button-variable-item-${tamanho}`).click()
  cy.get(`.button-variable-item-${cor}`).click()
  cy.get('.single_add_to_cart_button').click()
  cy.visit('/product-category/clothing/men/')
  cy.get('.products', { timeout: 10000 }).should('exist')
})