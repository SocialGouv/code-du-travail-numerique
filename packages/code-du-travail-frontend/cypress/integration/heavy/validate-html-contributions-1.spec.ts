import "cypress-html-validate/commands";

import urls1 from "../../support/urls-contributions-to-validate-1.json";

import { ConfigData } from "cypress-html-validate";
import {localConfig} from "./validate-html.spec";


describe("Validate html for contributions - part 1", () => {
  urls1.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
