describe("todo list", () => {
  beforeEach(() => {
    cy.visit("/todo");
    cy.location("pathname").should("eq", "/todo");
  });

  it("Add todo list item", () => {
    // check if the page content has loaded
    cy.contains(/Add new todo list/i);

    // check if the form is hidden before the flag button was clicked
    // cy.get("[data-test=todo-form]").should("not.be.visible");
    cy.contains("TODO").should("not.exist");

    // retrieve from dom the ADD todo list flag button and click on it
    cy.getDataTest("add-todo-list-button").click();

    // retrieve form and type in it
    cy.getDataTest("todo-form").should("be.visible");

    // create aliase from input element
    cy.getDataTest("todo-input").as("todoInput");

    // type in input
    cy.get("@todoInput").type("Learn cypress");

    // submit form
    cy.getDataTest("submit-todo-button").click();

    //open again todo list
    cy.getDataTest("add-todo-list-button").click();

    // type in input second todo item
    cy.get("@todoInput").type("Learn react");

    // submit form
    cy.getDataTest("submit-todo-button").click();

    // assert if form is not visible after submit
    // cy.getDataTest("todo-form").should("not.be.visible");
    cy.contains("TODO").should("not.exist");

    // assert if items are visible on the page
    cy.contains("Learn cypress");
    cy.contains("Learn react");

    // delete one item
    cy.getDataTest("delete-todo-button").first().click();

    // assert if only one item remained on the page
    cy.contains("Learn cypress").should("not.exist");
    cy.contains("Learn react").should("exist");

    // delete second item
    cy.getDataTest("delete-todo-button").first().click();

    // assert if no items are visible on the page
    cy.contains("Learn cypress").should("not.exist");
    cy.contains("Learn react").should("not.exist");
  });
});
