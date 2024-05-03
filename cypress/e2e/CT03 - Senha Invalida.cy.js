import { qase } from 'cypress-qase-reporter/dist/mocha'

describe('Login', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
  })

  qase(6, it('Invalid user', () => {
    cy.intercept('GET', '**/login').as('getLogin')
    cy.userInvalid()
    cy.wait('@getLogin')
    cy.get('.oxd-alert-content > .oxd-text').should('have.text', 'Invalid credentials')
  }))

})
