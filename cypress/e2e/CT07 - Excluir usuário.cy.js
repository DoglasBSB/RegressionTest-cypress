import { qase } from 'cypress-qase-reporter/dist/mocha'

describe('Login', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
  })

  qase(36,  it('Delete administrator', () => {
    cy.intercept('GET', '**/index').as('getIndex')
    cy.sessionLogin()
    cy.deleteAdmin()
    cy.contains('.oxd-toast', 'Successfully Deleted').should('be.visible')
    cy.contains('.oxd-toast', 'No Records Found').should('be.visible')
  }))

})
