/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  // https://on.cypress.io/interacting-with-elements

  it("Route / | Renders ok", () => {
    cy.get("th[data-cy=key-header]").should("contain", "Key");
    cy.get("th[data-cy=summary-header]").should("contain", "Summary");
    cy.get("th[data-cy=type-header]").should("contain", "Type");
  });
  // it("Route / | Plus and minus work ok", () => {
  //   cy.get("button[data-cy=plus]").click();
  //   cy.get("button[data-cy=plus]").click();
  //   cy.get("button[data-cy=plus]").click();
  //   cy.get("h2[data-cy=number-display]").should("contain", "4");
  //   cy.get("button[data-cy=minus]").click();
  //   cy.get("button[data-cy=minus]").click();
  //   cy.get("button[data-cy=minus]").click();
  //   cy.get("h2[data-cy=number-display]").should("contain", "1");
  // });
});
