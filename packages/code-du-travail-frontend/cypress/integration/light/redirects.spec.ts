describe("Redirects", () => {
  it("page: /convention-collective/650 should redirect to new meta", () => {
    cy.visit("/convention-collective/650");
    cy.checkUrlIs("/convention-collective/3248-metallurgie");
  });
});
