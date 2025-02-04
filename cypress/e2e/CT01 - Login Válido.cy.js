import { qase } from 'cypress-qase-reporter/mocha'

describe('Login', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
  })

  // Fluxo Principal
  qase(1, it('Login com sucesso', () => {
    cy.intercept('GET', '**/index').as('getIndex')
    cy.guiLogin()
    cy.wait('@getIndex')
    cy.contains('h6', 'Dashboard').should('be.visible')
  }))

})
