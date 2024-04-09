import "cypress-html-validate/commands";

import urls from "../../support/urls-contributions-to-validate.json"

describe("Validate html for contributions", () => {

  urls.forEach((url) => {
    it("page should be valid: " + url, () => {
      cy.visit(url);
      cy.htmlvalidate({
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
      });
    });
  });
});
