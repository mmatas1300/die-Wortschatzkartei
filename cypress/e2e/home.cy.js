describe('Render home - unauth', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('displays FAQ component', () => {
        cy.getDataTest('FAQ');
    })

    it('redirects to login', () => {
        cy.getDataTest('GetStartedButton').click();
        cy.url().should('eq', 'http://localhost:3000/login');
    })
})