describe("Render FAQ", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.getDataTest('NavLinkHilfe').click()
        cy.url().should('eq', 'http://localhost:3000/hilfe')
    })

    it('displays FAQ component', () => {
        cy.getDataTest('FAQ');
        cy.contains("How can I get started?");
    })

})


describe("Send email to admin", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.getDataTest('NavLinkHilfe').click()
        cy.url().should('eq', 'http://localhost:3000/hilfe')
    })

    it('Send email to admin', () => {
        cy.get("[name=name]").type("Test Guy");
        cy.get("[name=email]").type("guy@test.com");
        cy.get("[name=message]").type("this is a test");
        cy.get("form#KontaktForm > button").click();
        cy.getDataTest("Notification").contains("Nachricht gesendet!");
    })

})