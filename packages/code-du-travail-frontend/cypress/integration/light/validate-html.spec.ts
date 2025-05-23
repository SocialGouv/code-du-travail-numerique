import "cypress-html-validate/commands";
import { localConfig } from "../html-validation/validate-html.spec";

describe("Validation de l'html d'un échantillon de pages", () => {
  [
    "/convention-collective/3248-metallurgie",
    "/contribution",
    "/contribution/les-conges-pour-evenements-familiaux",
    "/contribution/2614-les-conges-pour-evenements-familiaux",
    "/information/acquisition-de-conges-payes-pendant-un-arret-maladie-les-nouvelles-regles",
  ].forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
