import { qase } from 'cypress-qase-reporter/mocha'

describe('Login', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
  })

  qase(2, it('Forgot your password', () => {
    cy.intercept('GET', '**/index').as('getIndex')
    cy.forgotPassword()
    cy.contains('h6', 'Reset Password link sent successfully').should('be.visible')
  }))

})
