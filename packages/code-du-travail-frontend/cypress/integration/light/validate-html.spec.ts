import "cypress-html-validate/commands";

describe("Validate html", () => {
  const urls: string[] = ["/convention-collective", "/contribution"];
  before(() => {
    cy.request(
      "https://code-du-travail-numerique-preprod.dev.fabrique.social.gouv.fr/api/plan-du-site"
    ).then((response) => {
      const agreements = response.body.agreements;
      const contributions = response.body.contributions;
      contributions.forEach((contrib) => {
        urls.push("/contribution/" + contrib.generic.slug);
        contrib.agreements.forEach((doc) => {
          urls.push("/contribution/" + doc.slug);
        });
      });
      agreements.forEach((doc) => {
        urls.push("/convention-collective/" + doc.slug);
      });
    });
  });
  it("pages should be valid", () => {
    urls.forEach((url) => {
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
