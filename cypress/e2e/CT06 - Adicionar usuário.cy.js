import { qase } from 'cypress-qase-reporter/dist/mocha'

describe('Login', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
  })

  qase(35,  it('Add administrator', () => {
    cy.intercept('GET', '**/index').as('getIndex')
    cy.sessionLogin()
    cy.addAdmin()
    cy.contains('.oxd-toast', 'Successfully Saved').should('be.visible')
  }))

})
