describe("multipage test", () => {
  beforeEach(() => {});

  it("test multipage navigation", () => {
    cy.visit("/cypress-tests");

    cy.location("pathname").should("eq", "/cypress-tests");

    cy.visit("/requests");
    cy.location("pathname").should("eq", "/requests");
  });
});
