import "cypress-html-validate/commands";

describe("Validate html", () => {
  describe("page should be valid", () => {
    [
      "/convention-collective",
      "/convention-collective/3248-metallurgie",
      "/convention-collective/2941-aide-accompagnement-soins-et-services-a-domicile-bad",
      "/convention-collective/16-transports-routiers-et-activites-auxiliaires-du-transport",
      "/contribution",
      "/contribution/2614-les-conges-pour-evenements-familiaux",
      "/contribution/3248-comment-determiner-lanciennete-du-salarie",
      "/contribution/292-quelles-sont-les-consequences-du-non-respect-du-preavis-par-le-salarie-ou-lemployeur",
      "/contribution/2120-quelle-est-la-duree-de-preavis-en-cas-de-licenciement",
    ].forEach((url) => {
      it("page: " + url, () => {
        cy.visit(url);
        cy.htmlvalidate({
          rules: {
            "heading-level": "error",
            "require-sri": "off",
            "valid-id": "off",
            "no-implicit-button-type": "off",
            "prefer-native-element": "off",
            "aria-label-misuse": "off",
            "long-title": "off",
            "wcag/h63": "off",
          },
        });
      });
    });
  });
});
