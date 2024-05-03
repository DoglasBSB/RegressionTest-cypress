/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/unsafe-to-chain-command */

//Login successfully
Cypress.Commands.add('guiLogin', (
  username = Cypress.env('USER_NAME'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.intercept('GET', '**/index').as('getIndex')
  cy.visit('/')
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait('@getIndex')
  cy.title().should('eq', 'OrangeHRM')
})

//Session
Cypress.Commands.add('sessionLogin', (
  username = Cypress.env('USER_NAME'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.guiLogin(username, password)
  cy.session(username, login)
})

// Forgot your password
Cypress.Commands.add('forgotPassword', () => {
  cy.visit('/')
  cy.get('.orangehrm-login-forgot').should('have.text', 'Forgot your password? ').click()
  cy.get('input[name="username"]').type('TestAdmin')
  cy.contains('button', 'Reset Password').click()
})

// Invalid user
Cypress.Commands.add('userInvalid', (
  username = Cypress.env('USER_INVALIDO'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.visit('/')
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password, { log: false })
  cy.contains('button', 'Login').click()
  cy.title().should('eq', 'OrangeHRM')
})

// Add Admin
Cypress.Commands.add('addAdmin', (
  password = Cypress.env('NEW_USER_PASSWORD')
) => {
  cy.intercept('GET', '**/web/index.php/admin/viewSystemUsers').as('getAdmin')
  cy.visit('/web/index.php/admin/viewSystemUsers')

  // Add
  cy.contains('button', 'Add').click()

  cy.get('.oxd-select-wrapper').should('exist').eq(0).click()
    .type('Cypress.io{upArrow}')
  cy.get('.--focused').click()


  cy.get('.oxd-autocomplete-text-input > input').type('Orange Test')
    .type('{upArrow}')
  cy.wait(2000)
  cy.get('.oxd-autocomplete-option').click()

  cy.get('.oxd-select-wrapper').should('exist').eq(1).click()
    .type('Cypress.io{upArrow}')
  cy.get('.--focused').click()

  cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input')
    .type('QATest')

  cy.get('[type=password]').eq(0).click()
    .type(password, { log: false })

  cy.get('[type=password]').eq(1).click()
    .type(password, { log: false })

  cy.get('.oxd-button--secondary').click()
  cy.wait('@getAdmin')

})

// Delet Admin
Cypress.Commands.add('deleteAdmin', () => {
  cy.intercept('GET', '**/web/index.php/admin/viewSystemUsers').as('getAdmin')
  cy.visit('/web/index.php/admin/viewSystemUsers')


  // Search
  cy.get(':nth-child(2) > .oxd-input').type('QATest')
  cy.get('.oxd-select-wrapper').should('exist').eq(0).click()
    .type('Cypress.io{upArrow}')
  cy.get('.--focused').click()

  cy.get('.oxd-autocomplete-text-input > input').type('Orange Test')
    .type('{upArrow}')
  cy.wait(2000)
  cy.get('.oxd-autocomplete-option').click()

  // eslint-disable-next-line cypress/unsafe-to-chain-command
  cy.get('.oxd-select-wrapper').should('exist').eq(1).click()
    .type('Cypress.io{upArrow}')
  cy.get('.--focused').click()


  cy.findByRole('button', {name: /Search/i}).click()
  cy.wait('@getAdmin')

  // Delet
  cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').click()
  cy.get('.orangehrm-modal-header > .oxd-text').contains('p', 'Are you Sure?')
  cy.get('.oxd-button--label-danger').click()
})

