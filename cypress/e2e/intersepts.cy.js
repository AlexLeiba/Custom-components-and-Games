// import { ApiRequestFeedPage } from "../../src/pages/Cypress/ApiRequestFeedPage";
describe("intersepts test", () => {
  //   beforeEach(() => {
  //     cy.visit("/requests");
  //   });

  it("test intercepts", () => {
    // cy.visit("/requests");

    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts", {
      statusCode: 200,
      //   body: "posts.json",
      fixture: "posts.json",
    }).as("getTodos");

    // cy.mount(<ApiRequestFeedPage />);
    cy.visit("/requests");
    cy.wait("@getTodos").its("response.statusCode").should("eq", 200);
  });
});
