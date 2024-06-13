import "cypress-html-validate/commands";

import urls1 from "../../support/urls-contributions-to-validate-1.json";
import urls2 from "../../support/urls-contributions-to-validate-2.json";
import urls3 from "../../support/urls-contributions-to-validate-3.json";

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

describe("Validate html for contributions - part 1", () => {
  urls1.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
describe("Validate html for contributions - part 2", () => {
  urls2.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
describe("Validate html for contributions - part 3", () => {
  urls3.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
