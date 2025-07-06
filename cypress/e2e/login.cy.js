describe("Switch between sign up and sign in", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.getDataTest('NavLinkLogin').click()
        cy.url().should('eq', 'http://localhost:3000/login')
    })

    it("Switch between sign up and sign in", () => {
        cy.contains("h1", "Registrieren");
        cy.wait(2000);
        cy.get("#SwitchToSignUp").click()
        cy.wait(2000);
        cy.get("#SwitchToSignIn").click()
        cy.wait(2000);
    })
})

describe("Incorrect sign up", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.getDataTest('NavLinkLogin').click()
        cy.url().should('eq', 'http://localhost:3000/login')
        const delay = 2000;
        cy.wait(delay);
        cy.get("#SwitchToSignUp").click()
        cy.wait(delay);
    })


    it("Sign up without info", () => {
        const delay = 2000;
        cy.get("form#signup > button").click();
        cy.contains("Gib deine E-Mail-Adresse ein")
        cy.wait(delay);
    })

    it("Sign up without email format", () => {
        const delay = 2000;
        cy.get("form#signup > input[name=email]").type("testMail");
        cy.get("form#signup > button").click();
        cy.wait(delay);
    })

    it("Sign up without password", () => {
        const delay = 2000;
        cy.get("form#signup > input[name=email]").type("testguy@dw.com");
        cy.get("form#signup > button").click();
        cy.contains("Passwörter müssen mindestens 3 Zeichen lang sein")
        cy.wait(delay);
    })

    it("Sign up without password confirmation", () => {
        const delay = 2000;
        cy.get("form#signup > input[name=email]").type("testguy@dw.com");
        cy.get("form#signup > input[name=password]").type("12345");
        cy.get("form#signup > button").click();
        cy.contains("Die Passwörter stimmen nicht überein")
        cy.wait(delay);
    })

    it("Sign up when you already have an account", () => {
        const delay = 1000;
        cy.get("form#signup > input[name=email]").type("youAlreadyHaveAnAccount@dw.com");
        cy.wait(delay);
        cy.get("form#signup > input[name=password]").type("12jidfs/add)8/&s");
        cy.wait(delay);
        cy.get("form#signup > input[name=confirmPassword]").type("12jidfs/add)8/&s");
        cy.wait(delay);
        cy.get("form#signup > button").click();
        cy.wait(delay);
        cy.contains("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal")
    })
})

describe("Correct sign up", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.getDataTest('NavLinkLogin').click()
        cy.url().should('eq', 'http://localhost:3000/login')
        const delay = 2000;
        cy.wait(delay);
        cy.get("#SwitchToSignUp").click()
        cy.wait(delay);
    })

    it("Sign up successfully", () => {
        cy.signUp("CorrectSignUp@dw.com", "12jidfs/add)8/&s", "12jidfs/add)8/&s");
        cy.wait(2000);
    })
})

describe("Incorrect sign in", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1920, 1080);
        cy.getDataTest('NavLinkLogin').click()
        cy.url().should('eq', 'http://localhost:3000/login')
        const delay = 2000;
        cy.wait(delay);
    })

    it("Sign in without data", () => {
        cy.get("form#signin > button").click();
        cy.wait(2000);
    })

    it("Sign in without password", () => {
        cy.get("form#signin > [name=email]").type("youAlreadyHaveAnAccount@dw.com")
        cy.get("form#signin > button").click();
        cy.wait(2000);
    })

    it("Sign in with wrong email", () => {
        cy.get("form#signin > [name=email]").type("WrongMail@dw.com")
        cy.get("form#signin > [name=password]").type("12jidfs/add)8/&s")
        cy.get("form#signin > button").click();
        cy.contains("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal")
        cy.wait(2000);
    })

    it("Sign in with wrong password", () => {
        cy.get("form#signin > [name=email]").type("youAlreadyHaveAnAccount@dw.com")
        cy.get("form#signin > [name=password]").type("12jidfs/add)8/&ssdsd")
        cy.get("form#signin > button").click();
        cy.contains("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal")
        cy.wait(2000);
    })

    it("Sign in with wrong email and password", () => {
        cy.get("form#signin > [name=email]").type("yourAccount@dw.com")
        cy.get("form#signin > [name=password]").type("12jidfs/add)8/&ssdsd")
        cy.get("form#signin > button").click();
        cy.contains("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal")
        cy.wait(2000);
    })
})

describe("Correct sign in", () => {
    it("Sign In and go to login", () => {
        cy.signIn("youAlreadyHaveAnAccount@dw.com", "12jidfs/add)8/&s")
        cy.wait(2000);
        cy.visit('http://localhost:3000/login')
        cy.url().should('eq', 'http://localhost:3000/konto')
    })
})


