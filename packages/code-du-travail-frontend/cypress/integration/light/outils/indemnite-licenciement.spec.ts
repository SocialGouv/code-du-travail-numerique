import { formatToEuro } from "../../../support/utils";

describe("Outil - Indemnité de licenciement", () => {
  it("Calcul de l'indemnité de licenciement", () => {
    cy.visit("/outils/indemnite-licenciement");
    cy.get("h1").should("have.text", "Calculer l'indemnité de licenciement");
    cy.get("button").contains("Commencer").click({ force: true });

    cy.get('label:contains("Non")').eq(0).click();
    cy.get('label:contains("Non")').eq(1).click();
    cy.contains("Suivant").click();

    cy.contains(
      "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
    ).click();
    cy.contains("Suivant").click();

    cy.get("#dateEntree").type("2003-01-01");
    cy.get("#dateNotification").type("2026-06-01");
    cy.get("#dateSortie").type("2026-06-01");

    cy.contains("Oui").click();
    cy.get("[id='0.duration']").type("1");
    cy.contains("Ajouter une absence").click();
    cy.contains("Absence 2").should("be.focused");
    cy.get("[id='1.duration']").type("1");
    cy.contains("Suivant").click();

    cy.get('label:contains("Oui")').eq(0).click();
    cy.get("#salary").type("1000");
    cy.contains("Suivant").click();

    cy.get("p").should(
      "contain",
      "À partir des éléments que vous avez saisis, l’indemnité de licenciement est estimée à :"
    );
    cy.get("p strong").should("contain", formatToEuro(6916.67));
    cy.get("h4").should(
      "contain",
      "Attention il peut exister un montant plus favorable"
    );
    cy.contains("Imprimer le résultat").should("be.visible");
  });
});
