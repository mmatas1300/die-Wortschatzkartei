
describe('Search app cards - unauth', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.getDataTest('NavLinkWorterbuch').click()
        cy.url().should('eq', 'http://localhost:3000/worterbuch')
    })

    it('search cards', () => {
        const delay = 1000;
        const searchCardSuccessful = (searchField, refIsNowVisible) => {
            cy.getDataTest('SearchField').type(searchField)
            cy.wait(delay)
            cy.getDataTest('SearchButton').click();
            cy.wait(delay)
            cy.getDataTest(refIsNowVisible).should('be.visible');
            cy.wait(delay);
            cy.getDataTest('ReturnLettersGrid').click();
            cy.wait(delay);
            cy.getDataTest('SearchField').clear();
            cy.wait(delay);
        }

        const searchCardUnsuccessful = (searchField, refIsNowVisible) => {
            cy.getDataTest('SearchField').type(searchField)
            cy.wait(delay)
            cy.getDataTest('SearchButton').click();
            cy.wait(delay)
            cy.getDataTest(refIsNowVisible).should('be.visible');
            cy.wait(delay);
            cy.getDataTest('SearchField').clear();
            cy.wait(delay);
        }
        searchCardSuccessful("Obst", "Obst");
        searchCardUnsuccessful("2345", "Notification")
        searchCardSuccessful("searchField","NoCardsFoundNotification")
    })
})

describe('Navigate in Worterbuch with app cards - unauth ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.getDataTest('NavLinkWorterbuch').click()
        cy.url().should('eq', 'http://localhost:3000/worterbuch')
    })

    it('click in letters and return', () => {
        const alphabet = Array.from(Array(26)).map((e, i) => i + 65);
        alphabet.splice(23, 2);
        alphabet.forEach((letter) => {
            cy.getDataTest(String.fromCharCode(letter)).click();
            cy.url().should('eq', 'http://localhost:3000/worterbuch/' + String.fromCharCode(letter))
            cy.contains('Wörter mit '+ String.fromCharCode(letter))
            cy.wait(100)
            cy.getDataTest('ReturnToLettersGrid').click();
            cy.url().should('eq', 'http://localhost:3000/worterbuch')
        })
    })
})