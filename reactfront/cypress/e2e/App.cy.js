describe("App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("Should display the title", () => {
        cy.get("h1", { timeout: 10000 }).contains("Crea tu Nota");
    });
});
