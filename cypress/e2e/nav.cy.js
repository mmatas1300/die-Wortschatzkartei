describe('navigate desk - unauth', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080)
    })

    it('redirects to worterbuch', () => {
        cy.getDataTest('NavLinkWorterbuch').click()
        cy.url().should('eq', 'http://localhost:3000/worterbuch')
        cy.contains("h1", "Wörterbuch");
    })

    it('redirects to hilfe', () => {
        cy.getDataTest('NavLinkHilfe').click()
        cy.url().should('eq', 'http://localhost:3000/hilfe')
        cy.contains("h1", "Hilfe");
    })

    it('redirects to Login', () => {
        cy.getDataTest('NavLinkLogin').click()
        cy.url().should('eq', 'http://localhost:3000/login')
        cy.contains("h1", "Anmelden/Registrieren");
    })

    it('redirects to HOME', () => {
        cy.getDataTest('Logo').click({ force: true, multiple: true })
        cy.url().should('eq', 'http://localhost:3000/')
        cy.contains("h1", "Create your own cards");

    })

    it('redirects to login when unauth', () => {
        cy.visit('http://localhost:3000/konto')
        cy.contains("h1", "Anmelden/Registrieren")
        cy.visit('http://localhost:3000/karteneditor')
        cy.contains("h1", "Anmelden/Registrieren")
        cy.visit('http://localhost:3000/uben')
        cy.contains("h1", "Anmelden/Registrieren")

    })
})

describe('responsive navbar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport('iphone-6')
    })

    it('close and open navbar', () => {
        cy.getDataTest('CloseNavButton').should('not.be.visible')
        cy.getDataTest('NavButton').click()
        cy.getDataTest('CloseNavButton').should('be.visible').click();
        cy.getDataTest('CloseNavButton').should('not.be.visible')
    })

})

/// <reference types="cypress" />
context('Viewport', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('view in multiple devices', () => {
        const delay = 10;
        cy.viewport(2999, 2999)
        cy.wait(delay)
        cy.viewport('macbook-15')
        cy.wait(delay)
        cy.viewport('macbook-13')
        cy.wait(delay)
        cy.viewport('macbook-11')
        cy.wait(delay)
        cy.viewport('ipad-2')
        cy.wait(delay)
        cy.viewport('ipad-mini')
        cy.wait(delay)
        cy.viewport('iphone-6+')
        cy.wait(delay)
        cy.viewport('iphone-6')
        cy.wait(delay)
        cy.viewport('iphone-5')
        cy.wait(delay)
        cy.viewport('iphone-4')
        cy.wait(delay)
        cy.viewport('iphone-3')
        cy.wait(delay)
        cy.viewport('ipad-2', 'portrait')
        cy.wait(delay)
        cy.viewport('iphone-4', 'landscape')
        cy.wait(delay)
    })
})