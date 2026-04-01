// descripte block is a test suite (test per file). its used to group a seo of tests group together. It can contain multiple It or test blocks.
describe("fundamental test", () => {
  // it or test block is a single test case. It should contain one or more assertions that test a specific aspect of the application.

  beforeEach(() => {
    // before each test will run this code
    cy.visit("/cypress-tests");
  });

  it.skip("should have title and desc", () => {
    cy.visit("/cypress-tests");
    cy.get("[data-test=heading]").should("have.text", "Hello cypress");
    cy.get("[data-test=paragraph]").should("have.text", "this is a paragraph");
  });

  it.skip("input type text should display the value", () => {
    // cy.visit("/cypress-tests");
    cy.get("[data-test=input-text]")
      .type("Hello world")
      .should("have.value", "Hello world");

    cy.get("[data-test=input-number]").type("123").should("have.value", "123");
  });

  it("submit form button should display the form data", () => {
    // cy.visit("/cypress-tests");
    cy.get("[data-test=input-text]").type("Hello world");
    cy.get("[data-test=input-number]").type("123");

    // undisplayed submitted values
    cy.get("[data-test-display-text]").should("not.exist");
    cy.get("[data-test-display-number]").should("not.exist");

    cy.get("[data-test=button-submit]").click();

    //displayed submitted values
    // Used a custom command to get element by data-test attribute
    cy.getDataTest("display-text").should("contain.text", "Hello world");

    cy.getDataTest("display-number").should("contain.text", "123");
  });

  it("display div content", () => {
    // cy.visit("/cypress-tests");

    cy.get("[data-test=div-container] p").should("have.text", "Ceau");
    cy.get("[data-test=div-container] button").should("have.text", "Click");
  });
});
