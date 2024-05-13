import "cypress-html-validate/commands";
import urls5 from "../../support/urls-contributions-to-validate-5.json";
import urls6 from "../../support/urls-contributions-to-validate-6.json";
import urls7 from "../../support/urls-contributions-to-validate-7.json";

import { ConfigData } from "cypress-html-validate";

const localConfig: ConfigData = {
  rules: {
    "heading-level": "error",
    "require-sri": "off",
    "valid-id": "off",
    "prefer-native-element": "off",
    "no-implicit-button-type": "off",
    "aria-label-misuse": "off",
    "long-title": "off",
    "script-type": "off",
    "no-dup-id": "off",
    "wcag/h63": "off",
    "wcag/h32": "off",
  },
};
describe("Validate html for contributions - part 5", () => {
  urls5.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
describe("Validate html for contributions - part 6", () => {
  urls6.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
describe("Validate html for contributions - part 7", () => {
  urls7.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
