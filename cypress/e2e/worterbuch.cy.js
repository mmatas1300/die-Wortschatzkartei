
describe('search cards App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.get('#navLinkWorterbuch').click()
        cy.url().should('eq', 'http://localhost:3000/worterbuch')
    })

    it('search cards', () => {
        const searchCardSuccessful = (searchField, refIsNowVisible) => {
            cy.get('#SearchField').type(searchField)
            cy.wait(2000)
            cy.get('#SearchButton').click();
            cy.wait(2000)
            cy.get(refIsNowVisible).should('be.visible');
            cy.wait(2000);
            cy.get('#ReturnLettersGrid').click();
            cy.wait(2000);
            cy.get('#SearchField').clear();
            cy.wait(2000);
        }

        const searchCardUnsuccessful = (searchField, refIsNowVisible) => {
            cy.get('#SearchField').type(searchField)
            cy.wait(2000)
            cy.get('#SearchButton').click();
            cy.wait(2000)
            cy.get(refIsNowVisible).should('be.visible');
            cy.wait(2000);
            cy.get('#SearchField').clear();
            cy.wait(2000);
        }
        searchCardSuccessful("Obst", "#Obst");
        searchCardUnsuccessful("2345", "#Notification")
        searchCardSuccessful("searchField","#NoCardsFoundNotification")
    })
})

describe('navigate in all letters App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.get('#navLinkWorterbuch').click()
        cy.url().should('eq', 'http://localhost:3000/worterbuch')
    })

    it('click in letters and return', () => {
        const alphabet = Array.from(Array(26)).map((e, i) => i + 65);
        alphabet.splice(23, 2);
        alphabet.forEach((letter) => {
            cy.get('#' + String.fromCharCode(letter)).click();
            cy.url().should('eq', 'http://localhost:3000/worterbuch/' + String.fromCharCode(letter))
            cy.wait(100)
            cy.get('#ReturnToLettersGrid').click();
            cy.url().should('eq', 'http://localhost:3000/worterbuch')
        })
    })
})