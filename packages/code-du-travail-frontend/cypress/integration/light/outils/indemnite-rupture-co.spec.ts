import { formatToEuro } from "../../../support/utils";

describe("Outil - Indemnité de rupture conventionnelle", () => {
  it("Calcul de l'indemnité de rupture conventionnelle", () => {
    cy.visit("/outils/indemnite-rupture-conventionnelle");
    cy.get("h1").should(
      "have.text",
      "Calculer l'indemnité de rupture conventionnelle"
    );
    cy.contains("Commencer").click();

    cy.contains("Contrat à durée indéterminée (CDI)").click();
    cy.get('label:contains("Non")').eq(0).click();
    cy.contains("Suivant").click();

    cy.contains(
      "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
    ).click();
    cy.contains("Suivant").click();

    cy.get("#dateEntree").type("2001-01-01");
    cy.get("#dateSortie").type("2025-01-01");

    cy.contains("Oui").click();
    cy.get("[id='0.duration']").type("1");
    cy.contains("Ajouter une absence").click();
    cy.get("[id='1.duration']").type("1");
    cy.contains("Suivant").click();

    cy.contains("Non").click();
    cy.get('label:contains("Oui")').eq(1).click();
    cy.get("#salary").type("1000");
    cy.contains("Suivant").click();

    cy.get("p").should(
      "contain",
      "À partir des éléments que vous avez saisis, l’indemnité de rupture conventionnelle est estimée à :"
    );
    cy.get("p strong").should("contain", formatToEuro(7111.11));
    cy.get("h3").should(
      "contain",
      "Attention il peut exister un montant plus favorable"
    );
    cy.contains("Imprimer le résultat").should("be.visible");
  });
});
