import "cypress-html-validate/commands";

import urls from "../../support/urls-contributions-to-validate.json";
import { localConfig } from "./validate-html.spec";

describe("Validate html for contributions - part 1", () => {
  urls.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
