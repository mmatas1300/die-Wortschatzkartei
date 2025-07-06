// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('signUp', (email, password, passwordConfirmation) => {
  const delay = 1000;
  cy.get("form#signup > input[name=email]").type(email);
  cy.wait(delay);
  cy.get("form#signup > input[name=password]").type(password);
  cy.wait(delay);
  cy.get("form#signup > input[name=confirmPassword]").type(passwordConfirmation);
  cy.wait(delay);
  cy.get("form#signup > button").click();
  cy.wait(delay);
  cy.contains("Erfolgreiche Registrierung!")
})

Cypress.Commands.add('signIn', (email, password) => {
  cy.visit('http://localhost:3000/')
  cy.viewport(1920, 1080);
  cy.getDataTest('NavLinkLogin').click()
  cy.url().should('eq', 'http://localhost:3000/login')
  cy.get("form#signin > [name=email]").type(email)
  cy.get("form#signin > [name=password]").type(password)
  cy.get("form#signin > button").click();
  cy.wait(2000);
  cy.url().should('eq', 'http://localhost:3000/konto')
})

Cypress.Commands.add('getDataTest', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})