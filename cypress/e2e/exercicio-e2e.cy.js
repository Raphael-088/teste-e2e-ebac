/// <reference types="cypress" />

context('Fluxo de pedido - E2E', () => {
  beforeEach(() => {
    cy.fixture('usuario').as('usuario')
  })

  it('Deve realizar um pedido completo na loja EBAC', function () {
    cy.login(this.usuario.email, this.usuario.senha)

    cy.visit('/produtos')
    cy.adicionarProduto(1, 'XS', 'Yellow')
    cy.adicionarProduto(2, '36', 'Brown')
    cy.adicionarProduto(3, 'XS', 'Green')
    cy.adicionarProduto(6, 'XL', 'Gray') // Ajuste conforme a cor correta

    cy.get('.dropdown-toggle > .text-skin').click()
    cy.visit('/checkout')

    cy.get('#billing_first_name').clear().type(this.usuario.nome)
    cy.get('#billing_last_name').clear().type(this.usuario.sobrenome)
    cy.get('#billing_address_1').clear().type(this.usuario.endereco)
    cy.get('#billing_city').clear().type(this.usuario.cidade)
    cy.get('#billing_postcode').clear().type(this.usuario.cep)

    cy.get('#select2-billing_country-container').click()
    cy.get('.select2-search__field').type(this.usuario.pais)
    cy.get('.select2-results__option').contains(this.usuario.pais).click()

    cy.get('#select2-billing_state-container').click()
    cy.get('.select2-search__field').type(this.usuario.estado)
    cy.get('.select2-results__option').contains(this.usuario.estado).click()

    cy.get('#billing_phone').clear().type(this.usuario.telefone)
    cy.get('#billing_email').clear().type(this.usuario.email)

    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()

    cy.contains('Obrigado. Seu pedido foi recebido.', { timeout: 10000 }).should('be.visible')
    cy.screenshot('pedido-finalizado-com-sucesso')
  })
})