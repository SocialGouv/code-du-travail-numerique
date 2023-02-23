describe("Contributions", () => {
  it("rechercher et voir une contribution", () => {
    cy.visit("/");
    cy.get("#searchbar").type("durée maximale CDD");
    cy.get("#content").get("button").contains("Rechercher").click();
    cy.get("#content li").should("have.length", 7);
    cy.contains("Quelle peut être la durée maximale d'un CDD").click();

    cy.url().should(
      "include",
      "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd?q=dur%C3%A9e%20maximale%20CDD"
    );
  });
});
