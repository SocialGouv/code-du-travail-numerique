import "cypress-html-validate/commands";

import urls1 from "../../support/urls-contributions-to-validate-1.json";
import urls2 from "../../support/urls-contributions-to-validate-2.json";
import urls3 from "../../support/urls-contributions-to-validate-3.json";
import urls4 from "../../support/urls-contributions-to-validate-4.json";
import urls5 from "../../support/urls-contributions-to-validate-5.json";
import urls6 from "../../support/urls-contributions-to-validate-6.json";
import urls7 from "../../support/urls-contributions-to-validate-7.json";

import { ConfigData } from "cypress-html-validate";

describe("Validate html for contributions", () => {
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
  const files = [urls1, urls2, urls3, urls4, urls5, urls6, urls7];
  for (let i = 0; i < 7; i++) {
    describe("Part " + (i + 1), () => {
      files[i].forEach((url) => {
        it("page should be valid: " + url, () => {
          cy.visit(url);
          cy.htmlvalidate(localConfig);
        });
      });
    });
  }
});
