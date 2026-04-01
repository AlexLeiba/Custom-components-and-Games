describe("forms test", () => {
  beforeEach(() => {
    cy.visit("/cypress-tests");
  });

  //   asert if we have content on the page
  it("test form page title", () => {
    cy.contains(/^Hello cypress forms$/i);
  });

  it("Test inputs values", () => {
    // query dom element by data-test attribute and type in it
    cy.get("[data-test=input-text]")
      .type("Hello cypress")
      .should("have.value", "Hello cypress");

    cy.contains("Submit").click();
  });

  it.only("Test submitted values", () => {
    cy.get(["data-test=display-text"]).should("not.be.visible");
    cy.get(["data-test=display-number"]).should("not.be.visible");

    cy.get("[data-test=input-text]").type("Hello cypress");
    cy.get("[data-test=input-number]").type("123");
    cy.get("[data-test=button-submit]").click();

    cy.get("[data-test=display-text]").should("be.visible");
    cy.get("[data-test=display-number]").should("be.visible");
  });

  it("Test valid form with Aliases and Custom Commands", () => {
    // test if title form exists
    cy.contains(/Hello cypress forms/i);

    // test if form exists
    cy.getDataTest("form").should("exist");

    // create an alias for form input elements
    cy.get("[data-test=form] [type=text]").as("textInput");
    cy.get("[data-test=form] [type=number]").as("numberInput");

    // type in inputs
    cy.get("@textInput").type("Hello cypress");

    cy.get("@numberInput").type("123");

    // submit form
    cy.getDataTest("form").submit();

    // wait 3 seconds
    cy.wait(3000);
    // clear inputs after submit with aliases
    cy.get("@textInput").clear().should("have.value", "");
    cy.get("@numberInput").clear().should("have.value", "");
  });
});
