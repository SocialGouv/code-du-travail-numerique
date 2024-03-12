import "cypress-html-validate/commands";

import urls from "../../support/urls-to-validate.json"

describe("Validate html", () => {

  urls.forEach((url) => {
    it("pages should be valid: " + url, () => {
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
