import { qase } from 'cypress-qase-reporter/dist/mocha'

describe('Regression Test - OrangeHRM', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
  })

  // Fluxo Principal
  qase(43, it('Login successfully', () => {
    cy.intercept('GET', '**/index').as('getIndex')
    cy.guiLogin()
    cy.wait('@getIndex')
    cy.contains('h6', 'Dashboard').should('be.visible')
  }))

  it('Logout', () => {
    cy.intercept('GET', '**/index').as('getIndex')
    cy.guiLogin()
    cy.wait('@getIndex')
    cy.contains('h6', 'Dashboard').should('be.visible')
  })

  // Fluxo Alternativo
  it('Forgot your password', () => {
    cy.intercept('GET', '**/index').as('getIndex')
    cy.forgotPassword()
    cy.contains('h6', 'Reset Password link sent successfully').should('be.visible')
  })

  // Fluxo de Exceção
  it('Invalid user', () => {
    cy.intercept('GET', '**/login').as('getLogin')
    cy.userInvalid()
    cy.wait('@getLogin')
    cy.get('.oxd-alert-content > .oxd-text').should('have.text', 'Invalid credentials')
  })

  it('Add administrator', () => {
    cy.intercept('GET', '**/index').as('getIndex')
    cy.sessionLogin()
    cy.addAdmin()
    cy.contains('.oxd-toast', 'Successfully Saved').should('be.visible')
  })

  it('Delete administrator', () => {
    cy.intercept('GET', '**/index').as('getIndex')
    cy.sessionLogin()
    cy.deleteAdmin()
    cy.contains('.oxd-toast', 'Successfully Deleted').should('be.visible')
    cy.contains('.oxd-toast', 'No Records Found').should('be.visible')
  })

})
