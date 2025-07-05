describe('navigate no auth', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080)
    })

    it('redirects to worterbuch', () => {
        cy.get('#navLinkWorterbuch').click()
        cy.url().should('eq', 'http://localhost:3000/worterbuch')
    })

    it('redirects to hilfe', () => {
        cy.get('#navLinkHilfe').click()
        cy.url().should('eq', 'http://localhost:3000/hilfe')
    })

    it('redirects to Login', () => {
        cy.get('#navLinkLogin').click()
        cy.url().should('eq', 'http://localhost:3000/login')
    })

    it('redirects to HOME', () => {
        cy.get('#logo').click({ force: true })
        cy.url().should('eq', 'http://localhost:3000/')
    })
})

describe('responsive navbar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport('iphone-6')
    })

    it('close and open navbar', () => {
        cy.get('#CloseNavButton').should('not.be.visible')
        cy.get('#NavButton').click()
        cy.get('#CloseNavButton').should('be.visible').click();
        cy.get('#CloseNavButton').should('not.be.visible')
    })

})

/// <reference types="cypress" />
context('Viewport', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('view in multiple devices', () => {
        cy.viewport(2999, 2999)
        cy.wait(3000)
        cy.viewport('macbook-15')
        cy.wait(3000)
        cy.viewport('macbook-13')
        cy.wait(3000)
        cy.viewport('macbook-11')
        cy.wait(3000)
        cy.viewport('ipad-2')
        cy.wait(3000)
        cy.viewport('ipad-mini')
        cy.wait(3000)
        cy.viewport('iphone-6+')
        cy.wait(3000)
        cy.viewport('iphone-6')
        cy.wait(3000)
        cy.viewport('iphone-5')
        cy.wait(3000)
        cy.viewport('iphone-4')
        cy.wait(3000)
        cy.viewport('iphone-3')
        cy.wait(3000)
        cy.viewport('ipad-2', 'portrait')
        cy.wait(3000)
        cy.viewport('iphone-4', 'landscape')
        cy.wait(3000)
    })
})


