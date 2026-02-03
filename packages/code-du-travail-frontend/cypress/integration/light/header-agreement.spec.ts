const openHeaderAgreementModal = () => {
  // On desktop we have #fr-header-agreement-button-desktop.
  // On mobile we have #fr-header-agreement-button.
  cy.get("body").then(($body) => {
    const desktopBtn = $body.find("#fr-header-agreement-button-desktop");
    if (desktopBtn.length) {
      cy.get("#fr-header-agreement-button-desktop").click();
    } else {
      cy.get("#fr-header-agreement-button").click();
    }
  });

  cy.get("#agreement-modal").should("be.visible");
};

describe("Header agreement selector", () => {
  it("should allow selecting an agreement and persist it in localStorage", () => {
    cy.visit("/");
    openHeaderAgreementModal();

    cy.get("#agreement-modal").within(() => {
      cy.selectByLabel(
        "Nom de la convention collective ou son numéro d’identification IDCC (4 chiffres)"
      )
        .as("agreementInput")
        .type("2247");

      cy.get("ul[role='listbox'] li")
        .contains("Entreprises de courtage d'assurances", { matchCase: false })
        .click();
    });

    cy.get("#agreement-modal").should("not.exist");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "convention")
      .should("include", '"num":2247');

    // Reload and ensure header shows a selected CC (via stored value)
    cy.reload();
    cy.get("body").then(($body) => {
      const desktopBtn = $body.find("#fr-header-agreement-button-desktop");
      if (desktopBtn.length) {
        cy.get("#fr-header-agreement-button-desktop").should(
          "contain",
          "CC 2247"
        );
      } else {
        cy.get("#fr-header-agreement-button").should("contain", "CC 2247");
      }
    });
  });
});
