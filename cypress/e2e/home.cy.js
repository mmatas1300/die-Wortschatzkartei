describe('render home', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('displays FAQ component', () => {
        cy.get('#FAQ')
    })

    it('redirects to login', () => {
        cy.get('#GetStartedButton').click()
        cy.url().should('eq', 'http://localhost:3000/login')
    })
})