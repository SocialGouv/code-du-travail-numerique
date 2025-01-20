describe("Fiche Service public", () => {
  it("je vois une page fiche service public", () => {
    cy.visit("/fiche-service-public/salaire-primes-et-avantages");
    cy.checkTitleAndMetaDescription(
      "Salaire, primes et avantages - Code du travail numérique",
      "Le montant du salaire est fixé librement au cours d'une négociation entre l'employeur et le salarié. Certaines dispositions légales et conventionnelles doivent toutefois être respectées. Le salaire se compose de l'ensemble des sommes versées en argent et des avantages en nature que perçoit le salarié."
    );
    cy.findAllByRole("heading", { level: 1 }).should(
      "have.text",
      "Salaire, primes et avantages"
    );
    cy.get("head > link[rel='canonical']")
      .should("have.prop", "href")
      .and(
        "equal",
        "https://www.service-public.fr/particuliers/vosdroits/F2301"
      );

    cy.contains("a", "Fiche service-public.fr")
      .should("have.attr", "href")
      .and(
        "contain",
        "https://www.service-public.fr/particuliers/vosdroits/F2301"
      );
    cy.get("body").should("contain", "01/11/2024");
    cy.get("h2").first().should("contain", "Salaire");
  });

  it("je vois une fiche service public avec un accordéon ouvert", () => {
    cy.visit("/fiche-service-public/salaire-primes-et-avantages#salaire");
    cy.findAllByRole("heading", { level: 1 }).click();
    cy.get("h2").get('[aria-expanded="true"]').should("contain", "Salaire");
  });
});
