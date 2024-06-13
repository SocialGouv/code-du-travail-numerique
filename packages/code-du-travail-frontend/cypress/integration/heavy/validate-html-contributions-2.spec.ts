import "cypress-html-validate/commands";
import urls3 from "../../support/urls-contributions-to-validate-3.json";
import urls4 from "../../support/urls-contributions-to-validate-4.json";

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
describe("Validate html for contributions - part 3", () => {
  urls3.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});

describe("Validate html for contributions - part 4", () => {
  urls4.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
