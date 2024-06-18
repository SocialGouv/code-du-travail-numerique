import "cypress-html-validate/commands";
import urls2 from "../../support/urls-contributions-to-validate-2.json";
import {localConfig} from "./validate-html.spec";

describe("Validate html for contributions - part 2", () => {
  urls2.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
