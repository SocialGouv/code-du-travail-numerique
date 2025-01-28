import "cypress-html-validate/commands";

import urls from "../../support/urls-to-validate.json";
import { ConfigData } from "cypress-html-validate";

export const localConfig: ConfigData = {
  rules: {
    "heading-level": "error",
    "require-sri": "off",
    "valid-id": "off",
    "prefer-native-element": "off",
    "no-implicit-button-type": "off",
    "aria-label-misuse": "off",
    "long-title": "off",
    "script-type": "off",
    "wcag/h63": "off",
    "no-redundant-role": "off",
    "no-missing-references": "off",
  },
};

describe("Validate html", () => {
  urls.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate(localConfig);
    });
  });
});
